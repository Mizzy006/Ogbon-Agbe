from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {
        "message": "Ọgbọ́nÀgbẹ̀ backend is running"
    }


@app.get("/health")
async def health():
        return {
        "status": "healthy"
    }