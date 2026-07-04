@echo off
echo Starting NYAY AI...

:: Terminal 1 - Backend
start "NYAY AI Backend" cmd /k "cd /d C:\Projects\nyay-ai\backend && C:\Projects\nyay-ai\venv\Scripts\activate.bat && uvicorn main:app --reload"

:: Wait 3 seconds
timeout /t 3 /nobreak

:: Terminal 2 - Frontend  
start "NYAY AI Frontend" cmd /k "cd /d C:\Projects\nyay-ai\frontend && npm start"

echo Done! Opening browser...
timeout /t 5 /nobreak
start http://localhost:3000