// utils/createVectorStore.js
export const createVectorStore = async (apiKey) => {
    try {
      const response = await fetch('https://api.openai.com/v1/vector_stores', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'OpenAI-Beta': 'assistants=v2',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Computer Science',
        }),
      });
  
      const data = await response.json();
      return data.id;  // Returning the vector store ID
    } catch (error) {
      console.error('Error creating vector store:', error);
    }
  };
  