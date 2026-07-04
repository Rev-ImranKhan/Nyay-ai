import os
from groq import Groq
from dotenv import load_dotenv
from database import get_connection

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_fir(case_description: str, language: str = "hi") -> str:
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""Generate a proper FIR draft in the SAME language as the case description.

Case: {case_description}

Include:
1. Complainant Details
2. Incident Description
3. Accused Details
4. Applicable IPC Sections
5. Relief Sought

Use professional legal language."""
            }
        ],
        max_tokens=1500
    )
    
    return response.choices[0].message.content

def save_fir(case_id: int, fir_content: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO fir_drafts (case_id, fir_content) VALUES (?, ?)",
        (case_id, fir_content)
    )
    conn.commit()
    conn.close()
    return cursor.lastrowid