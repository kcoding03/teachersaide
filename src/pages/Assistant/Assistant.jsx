import React, {useState} from 'react';
import './Assistant.css';
import FileUploadComponent from '../../file_upload';
import ReactMarkdown from 'react-markdown';

const AssistantPage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
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
    setResponse(<ReactMarkdown>{data.answer}</ReactMarkdown>);  // Assuming the backend returns the assistant's response
  };

  return (
    <div className="App">
      <div style={styles.container}>
      <h1 style={styles.heading}>Ask the Assistant</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Enter your question"
          style={styles.input}
        />
        <button type="submit" className='btn'>
          Submit
        </button>
      </form>
    </div>
      
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
      <FileUploadComponent />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "10vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  }
};

export default AssistantPage;
