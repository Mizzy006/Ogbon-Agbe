from fastapi import FastAPI
from app.api.routes.farmguard import router as farmguard_router

app = FastAPI(title="Ọgbọ́nÀgbẹ̀ API")

app.include_router(
    farmguard_router,
    prefix="/api"
)


@app.get("/")
async def root():
    return {
        "message": "Ọgbọ́nÀgbẹ̀ backend running"
    }

    from fastapi import FastAPI
from app.api.routes import farmguard

app = FastAPI()

app.include_router(
    farmguard.router,
    prefix="/farmguard",
    tags=["FarmGuard"]
)