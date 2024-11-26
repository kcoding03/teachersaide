import './App.css';
import React, { useState } from 'react';
import { createVectorStore } from './vector_store';
import { uploadFileToVectorStore } from './file_upload';
import { createAssistant } from './assistant';
import { apiKey } from "./apiKey";

function App() {
  const [file, setFile] = useState(null);
  const [vectorStoreId, setVectorStoreId] = useState(null);
  const [assistantId, setAssistantId] = useState(null);


  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Handle vector store creation
  const handleCreateVectorStore = async () => {
    const vectorStoreId = await createVectorStore(apiKey);  // Calling the function
    setVectorStoreId(vectorStoreId);
    console.log('Vector store created:', vectorStoreId);
  };

  // Handle file upload
  const handleUploadFile = async () => {
    if (!file || !vectorStoreId) {
      console.log('Please select a file and create a vector store first.');
      return;
    }
    const fileData = await uploadFileToVectorStore(file, vectorStoreId, apiKey);  // Calling the function
    console.log('File uploaded:', fileData);
    handleCreateAssistant();  // Proceed to create assistant after file upload
  };

  // Handle assistant creation
  const handleCreateAssistant = async () => {
    if (!vectorStoreId) {
      console.log('Vector store ID is required to create the assistant.');
      return;
    }
    const assistantId = await createAssistant(vectorStoreId, apiKey);  // Calling the function
    setAssistantId(assistantId);
    console.log('Assistant created:', assistantId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Your Teachers Aide!
        </p>
      </header>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleCreateVectorStore}>Create Vector Store</button>
      <button onClick={handleUploadFile}>Upload File</button>
      <button onClick={handleCreateAssistant}>Create Assistant</button>
      <div>
        {assistantId && <p>Assistant ID: {assistantId}</p>}
        {vectorStoreId && <p>Vector Store ID: {vectorStoreId}</p>}
      </div>
    </div>
  );
}

export default App;
