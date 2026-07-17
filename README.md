# ⚖️ NYAY AI — Multilingual AI Legal Assistant for India

**🔗 Live Demo:** https://nyay-ai-two.vercel.app
**📂 GitHub:**  https://github.com/Rev-ImranKhan/Nyay-ai

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-teal)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Groq](https://img.shields.io/badge/LLM-Groq_Llama_3.3-orange)
![License](https://img.shields.io/badge/License-MIT-green)

> **An applied Generative AI solution built to make legal help accessible to every Indian — in their own language.**

---

## 📖 Table of Contents
* [Overview](#-overview)
* [Problem Statement](#-problem-statement)
* [Key Features](#-key-features)
* [AI/GenAI Architecture](#-aigenai-architecture)
* [Tech Stack](#%EF%B8%8F-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Roadmap](#-roadmap--future-improvements)
* [About the Developer](#-about-the-developer)

---

## 🎯 Overview

**NYAY AI** is a full-stack, LLM-powered legal assistant designed to bridge India's 
legal literacy gap. It combines natural language understanding, multilingual reasoning, 
and automated document generation to help everyday users understand legal processes, 
draft First Information Reports (FIRs), and get guidance — all through text or voice, 
in 9 Indian languages.

This project was built as a demonstration of **applied AI/ML engineering**: from prompt 
design and LLM orchestration to full-stack deployment — showcasing how generative AI can 
solve real, high-impact social problems.

## ❗ Problem Statement

Access to legal help in India is limited by:
* **Language barriers** — most legal literature and support is English/Hindi-centric
* **Low legal literacy** — citizens often don't know how to draft an FIR or approach legal procedures
* **Cost & accessibility** — legal consultation isn't affordable or available to everyone

NYAY AI addresses this by putting an AI-powered legal assistant in users' pockets — free, 
multilingual, and voice-enabled.

## ✨ Key Features

| Feature | Description |
|---|---|
| 🗣️ Multilingual Legal Q&A | Ask legal questions in 9 Indian languages, get accurate guidance |
| 📝 FIR Draft Generation | AI auto-generates structured, formal FIR drafts from user input |
| 📄 PDF Export | Download generated legal documents as ready-to-use PDFs |
| 🎙️ Voice Input/Output | Speak your query, hear the response — built for accessibility |
| ⚡ Fast AI Inference | Powered by Groq's LPU for near-instant LLM responses |

## 🧠 AI/GenAI Architecture

| Component | Role |
|---|---|
| **Groq API (Llama 3.3-70B)** | Core LLM for legal reasoning, Q&A, and FIR content generation |
| **Prompt Engineering** | Custom prompts tuned for legal accuracy and multilingual consistency |
| **Voice Service** | Speech-to-text & text-to-speech pipeline for accessibility |
| **PDF Service (ReportLab)** | Converts LLM-generated text into structured legal documents |
| **Database (SQLite)** | Stores case history and user session data |

## 🛠️ Tech Stack

**Backend:** FastAPI, Python  
**Frontend:** React, Tailwind CSS  
**AI/LLM:** Groq API (Llama 3.3-70B)  
**Document Generation:** ReportLab  
**Database:** SQLite

## 📂 Project Structure

```
nyay-ai/
├── backend/
│   ├── main.py              # FastAPI entry point
│   ├── database.py          # DB models & connection
│   ├── routers/             # API route handlers
│   └── services/
│       ├── fir_service.py       # FIR draft generation logic
│       ├── pdf_service.py       # PDF generation
│       ├── voice_service.py     # Speech-to-text / text-to-speech
│       └── cases_service.py     # Case management logic
├── frontend/
│   ├── src/                 # React components
│   └── public/
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
* Python 3.10+
* Node.js 16+
* Groq API key ([get one here](https://console.groq.com))

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:
```
GROQ_API_KEY=your_key_here
```

Run the server:
```bash
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📌 Roadmap / Future Improvements

* [ ] **RAG-based retrieval** (ChromaDB/FAISS) for grounded, citation-backed legal answers
* [ ] Support for additional regional languages and dialects
* [ ] Integration with live court case tracking APIs
* [ ] User authentication and case history dashboard

## 👤 About the Developer

Built by **Imran Khan** — BCA final-year student specializing in **Applied AI Engineering** 
and **Generative AI solution development**. Focused on building practical, deployable AI 
products that solve real-world problems rather than just demos.

📫 Open to **AI Solution Developer** / **Applied AI Engineer** roles.  
🔗 [GitHub](https://github.com/Rev-ImranKhan) 
```

