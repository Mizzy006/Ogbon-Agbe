import io
import json
from PIL import Image

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException

from app.core.security import verify_firebase_token
from app.core.gemini import model

router = APIRouter()

@router.post("/analyze")
async def analyze_crop_disease(
    file: UploadFile = File(...),
    user=Depends(verify_firebase_token)
):
    try:
        # Read uploaded image
        image_bytes = await file.read()

        image = Image.open(io.BytesIO(image_bytes))

        prompt = """
        You are an agricultural AI assistant.

        Analyze this crop image carefully.

        Return ONLY valid JSON in this format:

        {
          "diagnosis": "name of disease",
          "confidence": 0.95,
          "treatment": [
            "step 1",
            "step 2",
            "step 3"
          ]
        }

        If healthy:
        {
          "diagnosis": "Healthy Crop",
          "confidence": 0.99,
          "treatment": [
            "No treatment needed"
          ]
        }
        """

        response = model.generate_content(
            [prompt, image]
        )

        raw_text = response.text.strip()

        # Remove markdown formatting if Gemini adds it
        raw_text = raw_text.replace("```json", "")
        raw_text = raw_text.replace("```", "")

        result = json.loads(raw_text)

        return {
            "success": True,
            "data": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )