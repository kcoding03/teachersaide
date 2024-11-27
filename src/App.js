import React, { useEffect , useState} from 'react';
import FileUploadComponent from './file_upload';

const App = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the backend with the question
    const res = await fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    console.log(data.answer)
    setResponse(data.answer);  // Assuming the backend returns the assistant's response
  };




  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Your Teachers Aide!
        </p>
      </header>
      <h1>Ask the Assistant</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Enter your question"
        />
        <button type="submit">Submit</button>
      </form>
      
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
      <FileUploadComponent />
    </div>
  );
}

export default App;
