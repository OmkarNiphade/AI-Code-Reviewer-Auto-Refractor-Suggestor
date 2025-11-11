import openai
import json
import re
import os
from dotenv import load_dotenv
from app.utils.prompt_template import REVIEW_PROMPT

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

async def analyze_code(code: str):
    try:
        prompt = REVIEW_PROMPT + "\n" + code

        # Synchronous OpenAI API call (no await!)
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a strict senior code reviewer. Always return a valid JSON object."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        output_text = response.choices[0].message.content.strip()
        cleaned_output = re.sub(r"```json|```", "", output_text).strip()

        try:
            parsed = json.loads(cleaned_output)
        except json.JSONDecodeError:
            parsed = {"raw_output": cleaned_output}

        return {
            "code_smells": parsed.get("code_smells", []),
            "time_complexity": parsed.get("time_complexity", "N/A"),
            "space_complexity": parsed.get("space_complexity", "N/A"),
            "refactored_code": parsed.get("refactored_code", ""),
            "test_cases": parsed.get("test_cases", []),
            "raw_output": parsed.get("raw_output", ""),
        }

    except Exception as e:
        print("Error in analyze_code:", e)
        return {"error": str(e)}
