import { apiKey } from "./apiKey";
import { vectorStoreId } from "./vector_store"
// utils/uploadFile.js
export const uploadFileToVectorStore = async (file, vectorStoreId, apiKey) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('https://api.openai.com/v1/vector_stores/file_batches', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'OpenAI-Beta': 'assistants=v2',
          'Content-Type': 'application/json',
        },
        body: formData,
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  