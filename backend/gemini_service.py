import google.generativeai as genai
import os
from dotenv import load_dotenv
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def generate_description(title):

    prompt = f"""
Generate a professional task description for:

{title}

Keep it under 80 words.
"""

    try:

        response = model.generate_content(prompt)

        return (
            response.text
            .replace("**", "")
            .replace("*", "")
            .strip()
        )

    except Exception as e:

        print(f"Gemini API error: {e}")

        return f"""
Task: {title}

Complete the assigned work according to project requirements.
Ensure testing, documentation, and timely delivery.
""".strip()