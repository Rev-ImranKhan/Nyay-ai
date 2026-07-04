import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_legal_advice(query: str, language: str = "hi") -> str:
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """You are NYAY AI — India's first AI legal assistant.
                Always respond in the SAME language as the user's query.
                Give clear practical legal advice based on Indian law.
                Be concise and helpful."""
            },
            {
                "role": "user",
                "content": query
            }
        ],
        max_tokens=1000
    )
    
    return response.choices[0].message.content