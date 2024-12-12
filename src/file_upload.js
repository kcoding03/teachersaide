import React, {useEffect} from 'react';

export const createAssistantAndVectorStore = async () => {
    const url = "http://127.0.0.1:5000/create_assistant"; // Flask endpoint to create assistant
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
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
    
    const handleFileUpload = async (e) => {
      const files = e.target.files;
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("file", file);
      });
  
      const uploadResponse = await fetch("http://127.0.0.1:5000/upload_files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure to use the appropriate header
        },
        body: formData,
      });
  
      if (uploadResponse.ok) {
        console.log("Files uploaded successfully");
      } else {
        console.log("File upload failed");
      }
    };

    return (
        <label className='btn'>
          <span>Upload Files</span>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            hidden
          />
        </label>
      );
    };
  

    export default FileUploadComponent;