from openai_api import client
from openai_api import assistant

# Upload the user provided file to OpenAI
message_file = client.files.create(
    file=open("backend/puzzle_survey.pdf", "rb"), purpose="assistants"
)

# Create a thread and attach the file to the message
thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "Can you generate a lesson plan for procedural puzzle generation?",
            # Attach the new file to the message.
            "attachments": [
                {"file_id": message_file.id, "tools": [{"type": "file_search"}]}
            ],
        }
    ]
)

# The thread now has a vector store with that file in its tool resources.
print(thread.tool_resources.file_search)