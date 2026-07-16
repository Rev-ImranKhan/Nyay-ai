from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routers import legal

app = FastAPI(title="NYAY AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://nyay-ai-two.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

app.include_router(legal.router)

@app.get("/")
def root():
    return {"message": "NYAY AI Backend Chal Raha Hai! ⚖️"}

@app.get("/health")
def health():
    return {"status": "OK"}
