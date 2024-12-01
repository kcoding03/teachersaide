import React, {useEffect} from 'react';

const createAssistantAndVectorStore = async () => {
    const url = "http://127.0.0.1:5000/create_assistant"; // Flask endpoint to create assistant
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer [key]",  // Ensure to use the appropriate header
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
  const FileUploadComponent = () => {
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
          "Authorization": "Bearer [Key]",  // Ensure to use the appropriate header
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
      <div style={styles.container}>
      <label style={styles.label} htmlFor="fileInput">
        Upload Files
      </label>
      <input
        id="fileInput"
        type="file"
        multiple
        onChange={handleFileUpload}
        style={styles.input}
      />
    </div>
      );
    };
    
    const styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "auto",
      },
      label: {
        display: "inline-block",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#007bff",
        color: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        textAlign: "center",
        transition: "background-color 0.3s ease",
        marginBottom: "1rem",
      },
      labelHover: {
        backgroundColor: "#0056b3",
      },
      input: {
        display: "none", // Hides the default input element
      },
    };

    export default FileUploadComponent;