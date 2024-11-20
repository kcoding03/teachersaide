import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Your Teachers Aide!
        </p>
      </header>
      <form id="fileForm" enctype="multipart/form-data" method="post">
        <label for="fileInput">Upload a file: </label>
        <input type="file" id="fileInput" name="file" />
        <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default App;
