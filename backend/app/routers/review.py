from fastapi import APIRouter
from app.models.review_model import CodeRequest
from app.services.reviewer_service import analyze_code

router = APIRouter(prefix="/review", tags=["Code Review"])

@router.post("/")
async def review_code(request: CodeRequest):
    result = await analyze_code(request.code)
    return result
