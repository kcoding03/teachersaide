import React, { useState } from "react";
import "./Assistant.css";
import FileUploadComponent from "../../file_upload";
import ReactMarkdown from "react-markdown";

const instructorTools = [
	{ label: "Lesson Plan", value: "Generate lesson plans" },
	{ label: "Assignment", value: "Generate an assignment" },
	{ label: "Quiz", value: "Generate a quiz" },
	{ label: "Exam", value: "Generate an exam" },
	{ label: "Project", value: "Generate a project" },
];

const AssistantPage = () => {
	const [question, setQuestion] = useState("");
	const [response, setResponse] = useState("");
	const [files, setFiles] = useState([]);
	const [instructorItems, setInstructorItems] = useState([]);

	const handleInputChange = (event) => {
		setQuestion(event.target.value);
	};

	const handleFileUpload = async () => {
		const formData = new FormData();
		Array.from(files).forEach((file) => {
			formData.append("file", file);
		});

		const uploadResponse = await fetch(
			"http://127.0.0.1:5000/upload_files",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure to use the appropriate header
				},
				body: formData,
			}
		);

		if (uploadResponse.ok) {
			console.log("Files uploaded successfully");
		} else {
			console.log("File upload failed");
		}
	};

	const requestInstructorResources = async () => {
		instructorItems.forEach(async (item) => {
			const res = await askQuestion(item);
			const data = await res.json();

			console.log(data);
		});
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

		await handleFileUpload();
		await requestInstructorResources();

		// Call the backend with the question
		const res = await askQuestion(question);

		const data = await res.json();
		console.log(data.answer);
		setResponse(data.answer); // Assuming the backend returns the assistant's response
	};

	const toggleInstructorItem = (event) => {
		if (event.target.checked) {
			setInstructorItems((prevInstructorItems) => [
				...prevInstructorItems,
				event.target.value,
			]);
		} else {
			setInstructorItems((prevInstructorItems) =>
				prevInstructorItems.filter(
					(item) => item !== event.target.value
				)
			);
		}
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

					<FileUploadComponent
						onChange={(value) => setFiles(value)}
					/>

					<div className="Assistant-instructor-tools">
						<h2>Instructor Tools</h2>
						<p>Select the items you would like to generate</p>

						<div className="Assistant-instructor-tool-items">
							{instructorTools.map((tool) => (
								<div
									key={tool.value}
									className="Assistant-instructor-tool-item"
								>
									<input
										id={tool.value}
										type="checkbox"
										value={tool.value}
										onChange={toggleInstructorItem}
										hidden
									/>
									<label for={tool.value}>{tool.label}</label>
								</div>
							))}
						</div>
					</div>

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
