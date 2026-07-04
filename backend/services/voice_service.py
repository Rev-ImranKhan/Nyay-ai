import whisper
from gtts import gTTS
from deep_translator import GoogleTranslator
import os

model = whisper.load_model("base")

# Language mapping
LANGUAGE_MAP = {
    "hi": "hi",      # Hindi
    "en": "en",      # English  
    "ta": "ta",      # Tamil
    "te": "te",      # Telugu
    "mr": "mr",      # Marathi
    "bn": "bn",      # Bengali
    "gu": "gu",      # Gujarati
    "pa": "pa",      # Punjabi
}

def speech_to_text(audio_path: str) -> dict:
    """Koi bhi language mein bolo — automatically detect hogi"""
    result = model.transcribe(audio_path)
    detected_lang = result["language"]
    text = result["text"]
    
    # English mein translate karo processing ke liye
    if detected_lang != "en":
        english_text = GoogleTranslator(
            source=detected_lang,
            target='english'
        ).translate(text)
    else:
        english_text = text
    
    return {
        "original_text": text,
        "english_text": english_text,
        "detected_language": detected_lang
    }

def text_to_speech(text: str, language: str = "hi") -> str:
    """Text ko audio mein convert karo"""
    lang_code = LANGUAGE_MAP.get(language, "hi")
    output_path = "output_audio.mp3"
    tts = gTTS(text=text, lang=lang_code, slow=False)
    tts.save(output_path)
    return output_path

def translate_to_english(text: str, source_lang: str) -> str:
    if source_lang == "en":
        return text
    return GoogleTranslator(
        source=source_lang,
        target='english'
    ).translate(text)