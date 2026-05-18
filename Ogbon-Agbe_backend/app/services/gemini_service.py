import google.generativeai as genai
from app.core.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-pro")


async def analyze_farm_image(image_bytes: bytes):

    prompt = """
    You are an agricultural diagnostic AI for Nigerian farmers.

    Analyze the image and return:

    1. Likely disease or issue
    2. Confidence level
    3. Recommended treatment
    4. Severity level

    Return concise JSON-style output.
    """

    response = model.generate_content(
        [
            prompt,
            {
                "mime_type": "image/jpeg",
                "data": image_bytes
            }
        ]
    )

    return response.text