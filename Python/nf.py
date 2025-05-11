import os
from google import genai
from google.genai import types

# Initialize the client once (reuse for all requests)
client = genai.Client(
    api_key=("Gemini 2.0 flash api"),  # Use an environment variable for security
)

MODEL_NAME = "gemini-2.0-flash"

# System prompt for the assistant's behavior
SYSTEM_PROMPT = """You are Alien, a chatbot integrated into the Tritonexus employee dashboard. You will receive employee tasks as input, search for relevant resources on youtube.com, chatgpt.com, gemini.com, and perplexity.com, compare and summarize the findings, and provide relevant code snippets with explanations to assist with their tasks."""

def generate_response(conversation) -> str:
    """
    conversation: list of dicts, e.g.
    [
        {"role": "user", "text": "How do I integrate an API?"},
        {"role": "model", "text": "Here's how you can..."}
    ]
    """
    # Always start with the system prompt
    contents = [
        types.Content(role="user", parts=[types.Part.from_text(text=SYSTEM_PROMPT)]),
        types.Content(role="model", parts=[types.Part.from_text(text="""Okay, I'm ready to be your Alien assistant. I understand I will:

1.  **Receive employee tasks as input.**
2.  **Search for relevant resources on:**
    *   youtube.com
    *   chatgpt.com
    *   gemini.com
    *   perplexity.com
3.  **Compare and summarize the findings from those searches.**
4.  **Provide relevant code snippets with explanations, when appropriate.**

I will do my best to provide concise, helpful, and well-sourced information. I'm excited to help Tritonexus employees! Bring on the tasks. 👽
""")])
    ]
    # Add the rest of the conversation
    for msg in conversation:
        contents.append(
            types.Content(
                role=msg["role"],
                parts=[types.Part.from_text(text=msg["text"])]
            )
        )

    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
    )

    response = ""
    for chunk in client.models.generate_content_stream(
        model=MODEL_NAME,
        contents=contents,
        config=generate_content_config,
    ):
        response += chunk.text
    return response

if __name__ == "__main__":
    # Example CLI loop for testing
    conversation = []
    print("Alien Assistant (type 'exit' to quit)")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        conversation.append({"role": "user", "text": user_input})
        reply = generate_response(conversation)
        print("Alien:", reply)
        conversation.append({"role": "model", "text": reply})