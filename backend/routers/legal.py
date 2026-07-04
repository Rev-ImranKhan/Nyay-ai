from services.pdf_service import generate_fir_pdf
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from services.ollama_service import get_legal_advice
from services.fir_service import generate_fir, save_fir
from services.cases_service import find_similar_cases
from gtts import gTTS
from database import get_connection
import os

router = APIRouter(prefix="/legal", tags=["Legal"])

class CaseRequest(BaseModel):
    description: str
    language: str = "hi"

class FIRRequest(BaseModel):
    description: str
    language: str = "hi"

@router.post("/advice")
def get_advice(request: CaseRequest):
    try:
        advice = get_legal_advice(request.description, request.language)
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO cases (description, language, ai_advice) VALUES (?, ?, ?)",
            (request.description, request.language, advice)
        )
        conn.commit()
        case_id = cursor.lastrowid
        conn.close()
        return {
            "case_id": case_id,
            "advice": advice,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/fir")
def create_fir(request: FIRRequest):
    try:
        fir_content = generate_fir(request.description, request.language)
        return {
            "fir_content": fir_content,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/similar-cases")
def get_similar_cases(request: CaseRequest):
    try:
        result = find_similar_cases(request.description)
        return {
            "data": result,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/speak")
def speak_advice(request: CaseRequest):
    try:
        advice = get_legal_advice(request.description, request.language)
        audio_path = os.path.join(os.getcwd(), "output_audio.mp3")
        tts = gTTS(text=advice[:500], lang="hi", slow=False)
        tts.save(audio_path)
        return FileResponse(
            path=audio_path,
            media_type="audio/mpeg",
            filename="response.mp3",
            headers={"Cache-Control": "no-cache"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/download-fir")
def download_fir(request: FIRRequest):
    try:
        fir_content = generate_fir(request.description, request.language)
        pdf_path = generate_fir_pdf(fir_content, request.description)
        return FileResponse(
            path=pdf_path,
            media_type="application/pdf",
            filename="NYAY_AI_FIR_Draft.pdf"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))