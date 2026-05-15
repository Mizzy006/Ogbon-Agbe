from fastapi import FastAPI
from app.firebase import db

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Ọgbọ́nÀgbẹ̀ backend running"}

@app.get("/test-firestore")
async def test_firestore():
    doc_ref = db.collection("test").document("hello")

    doc_ref.set({
        "message": "Firestore connected successfully"
    })

    return {"status": "success"}                 