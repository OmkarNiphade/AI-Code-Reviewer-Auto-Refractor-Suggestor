from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import review

app = FastAPI(title="AI Code Reviewer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(review.router)

@app.get("/")
def home():
    return {"message": "AI Code Reviewer Backend Running!"}
