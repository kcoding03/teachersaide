// utils/createAssistant.js
import { apiKey } from "./apiKey";
import { vectorStoreId } from "./vector_store"

export const createAssistant = async (vectorStoreId, apiKey) => {
    try {
      const response = await fetch('https://api.openai.com/v1/assistants', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'OpenAI-Beta': 'assistants=v2',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          prompt: 'Provide class help to Computer Science Professor.',
          tool_resources: {
            file_search: {
              vector_store_ids: [vectorStoreId],
            },
          },
        }),
      });
  
      const data = await response.json();
      return data.id;  // Returning assistant ID
    } catch (error) {
      console.error('Error creating assistant:', error);
    }
  };
  