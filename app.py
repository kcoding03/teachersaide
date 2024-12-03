from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI 
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
key = os.getenv('OPENAI_API_KEY')

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
vector_store_id = None
assistant_id = None
thread_id = None
file_ids = []

@app.route('/create_assistant', methods=['POST'])
def create_assistant():
    data = request.get_json()
    # print(data) 
    assistant_name = data['assistant_name']
    vector_store_name = data['vector_store_name']

    global vector_store_id
    global assistant_id
    global thread_id

    vector_store = client.beta.vector_stores.create(name=vector_store_name)

    
    assistant = client.beta.assistants.create(
        name=assistant_name,
        model="gpt-4o-mini",
        tools=[{"type": "file_search"}],
    )
    assistant_id = assistant.id
    vector_store_id = vector_store.id
    # Associate the vector store with the assistant
    assistant = client.beta.assistants.update(
        assistant_id=assistant_id,
        tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
    )

    return jsonify({
        "message": "Assistant and Vector Store created successfully",
        "assistant_id": assistant_id,
        "vector_store_id": vector_store_id
    })


@app.route('/upload_files', methods=['POST'])
def upload_files():
    global file_ids
    files = request.files.getlist('file')

    # Path where files are saved
    saved_files = []
    for file in files:
        # Save file locally
        file_path = f"./uploads/{file.filename}"
        file.save(file_path)
        saved_files.append(file_path)
        
        

    # Upload the files to OpenAI's vector store
   
    file_streams = [open(file, "rb") for file in saved_files]
    for file in saved_files:
        message_file = client.files.create(
            file=open(file, "rb"), purpose="assistants"
        )
        file_ids.append(message_file.id)

    # Upload the files to OpenAI vector store and poll for the status
    file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
        vector_store_id=vector_store_id, files=file_streams
    )
    # Check if file upload was successful
    
    if file_batch.status == "succeeded":
        return jsonify({"message": "Files uploaded successfully", "file_batch_status": file_batch.status})
    else:
        # Handling the case where the batch failed but no direct 'error' attribute
        return jsonify({"message": "File upload failed", "status": file_batch.status})


@app.route('/ask', methods=['POST'])
def ask_assistant():
    global query
    query = request.json.get('question')  # The question sent from the frontend
    
    if not query:
        return jsonify({"error": "No question provided"}), 400
    if not assistant_id:
        return jsonify({"error": "Assistant ID is not set"}), 400

    thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": query,
            # Attach the new file to the message.
            "attachments": [
                {"file_id": file_id, "tools": [{"type": "file_search"}]} for file_id in file_ids
            ],
        }
    ]
)
    thread_id = thread.id

    run = client.beta.threads.runs.create_and_poll(
    thread_id=thread_id, assistant_id=assistant_id
)
    messages = list(client.beta.threads.messages.list(thread_id=thread_id, run_id=run.id))

    if not messages:
        return jsonify({"error": "No messages returned from the assistant"}), 500

    message_content = messages[0].content[0].text
    annotations = message_content.annotations
    citations = []
    for index, annotation in enumerate(annotations):
        message_content.value = message_content.value.replace(annotation.text, f"[{index}]")
        if file_citation := getattr(annotation, "file_citation", None):
            cited_file = client.files.retrieve(file_citation.file_id)
            citations.append(f"[{index}] {cited_file.filename}")

    return jsonify({"answer": message_content.value})

if __name__ == "__main__":
    app.run(debug=True)