import React, {useEffect} from 'react';

const createAssistantAndVectorStore = async () => {
  const url = "http://127.0.0.1:5000/create_assistant"; // Flask endpoint to create assistant
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,  // Ensure to use the appropriate header
    },
    body: JSON.stringify({
      assistant_name: "Computer Science Professor Assistant",
      vector_store_name: "Computer Science Library"
    }),
  });

  if (response.ok) {
    console.log("Assistant and Vector Store Created Successfully");
  } else {
    console.log("Failed to create Assistant or Vector Store");
  }
};
  
  // Component to handle file uploads and automatic assistant creation
  const FileUploadComponent = ({ onChange = () => {} }) => {
    useEffect(() => {
      // Create assistant and vector store when the app is loaded
      createAssistantAndVectorStore();
    }, []);
  
    return (
        <label className='btn'>
          <span>Upload Files</span>
          <input
            type="file"
            multiple
            onChange={(event) => onChange(event.target.files)}
            hidden
          />
        </label>
      );
    };
  

    export default FileUploadComponent;