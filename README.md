# ⚖️ NYAY AI — Multilingual AI Legal Assistant for India

> An applied GenAI solution that makes legal help accessible to every Indian, in their own language.

## 🎯 Overview

NYAY AI is an end-to-end **Generative AI application** built to solve a real-world 
problem — most Indians can't access legal guidance due to language barriers and low 
legal literacy. This project applies **LLM-powered reasoning** to simplify legal 
procedures, auto-draft FIRs, and deliver multilingual legal assistance with voice support.

Built as a demonstration of **applied AI engineering**: prompt design, multilingual 
LLM orchestration, document generation pipelines, and full-stack integration.

## ✨ Key Features

- 🗣️ **Legal Q&A in 9 Indian languages** — powered by LLM-based multilingual understanding
- 📝 **Automated FIR draft generation** — structured legal document creation using generative AI
- 📄 **PDF export** of legal documents via ReportLab
- 🎙️ **Voice input & output** — accessible for users with low literacy
- ⚡ **Low-latency AI responses** using Groq's LPU inference (Llama 3.3-70B)

## 🧠 AI/GenAI Components

| Component | Purpose |
|---|---|
| Groq API (Llama 3.3-70B) | Core reasoning engine for legal Q&A and FIR drafting |
| Prompt Engineering | Structured prompts for multilingual legal accuracy |
| Voice Pipeline | Speech-to-text and text-to-speech integration |
| Document Generation | LLM output structured into formal legal PDFs |

## 🛠️ Tech Stack

**Backend:** FastAPI, Python  
**Frontend:** React, Tailwind CSS  
**AI/LLM:** Groq API (Llama 3.3-70B)  
**Document Generation:** ReportLab  
**Database:** SQLite

## 🚀 Getting Started

### Backend
\`\`\`bash
cd backend
pip install -r requirements.txt
python main.py
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

Create a `.env` file inside `backend/`:
\`\`\`
GROQ_API_KEY=your_key_here
\`\`\`

## 📌 Roadmap / Future Improvements

- [ ] RAG-based retrieval (ChromaDB/FAISS) for grounded, citation-backed legal answers
- [ ] Support for additional regional languages and dialects
- [ ] Integration with live court case tracking APIs

## 👤 About the Developer

Built by **Imran Khan**, BCA final-year student focused on **Applied AI Engineering** 
and **Generative AI solution development** — building practical, deployable AI products 
that solve real problems, not just demos.

📫 Open to **AI Solution Developer** / **Applied AI Engineer** roles.
