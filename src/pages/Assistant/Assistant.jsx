import React, { useState } from "react";
import "./Assistant.css";
import FileUploadComponent from "../../file_upload";
import ReactMarkdown from "react-markdown";

export const AssistantPage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };


  const askQuestion = async (question) => {
    return await fetch("http://127.0.0.1:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call the backend with the question
    const res = await fetch('http://127.0.0.1:5000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    console.log(data.answer)
    setResponse(data.answer);   // Assuming the backend returns the assistant's response // Assuming the backend returns the assistant's response
  };

  return (
    <div className="Assistant-container">
      <div className="Assistant-section">
        <h1>Ask the Assistant</h1>

        <form onSubmit={handleSubmit} className="Assistant-ask-form">
          <input
            type="text"
            value={question}
            onChange={handleInputChange}
            placeholder="Enter your question"
          />

          <FileUploadComponent/>

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>

      <div className="Assistant-section">
        <h1>Response:</h1>
        <p className="Assistant-response">
          {response ? (
            <ReactMarkdown>{response}</ReactMarkdown>
          ) : (
            <span className="Assistant-response-placeholder">
              Ask a question above to get started!
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AssistantPage;
