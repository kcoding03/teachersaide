from openai import OpenAI

client = OpenAI(
    api_key = "[Key]",
)

assistant = client.beta.assistants.create(
    name="Computer Science Professor's Assistant",
    instructions="You are an expert computer scientist. Use you knowledge base to answer questions about computer science classes guidelines.",
    model="gpt-4o-mini",
    tools=[{"type": "file_search"}],
)