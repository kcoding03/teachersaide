// assistant.js

export async function createAssistant(name) {
  try {
      const response = await fetch('http://127.0.0.1:5000/create-assistant', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }), // Sending the assistant name
      });

      if (!response.ok) {
          throw new Error(`Failed to create assistant: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Assistant created:", data);
      return data; // This will include the assistant ID
  } catch (error) {
      console.error("Error creating assistant:", error);
  }
}
