import openai

# Set up your API key
#openai.api_key = "[add key]"

def get_assistant_response(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100
    )
    return response.choices[0].text.strip()
