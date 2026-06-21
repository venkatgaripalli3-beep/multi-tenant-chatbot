"""
Multi-Tenant Chatbot Platform Demo
Free + No paid APIs required
Uses local LLM via Ollama (free) or simple template matching
Deploy to Render.com (free tier) in 5 minutes
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock multi-tenant data (in production: use PostgreSQL)
TENANT_DATA = {
    "chick-fil-a": {
        "name": "Chick-fil-A",
        "company_data": {
            "menu_items": ["Chicken Sandwich", "Spicy Chicken Sandwich", "Grilled Chicken Sandwich", "Waffle Fries", "Lemonade"],
            "locations": 2900,
            "hours": "6:45 AM - 10 PM",
            "orders_today": 15420,
            "popular_item": "Chicken Sandwich",
            "policies": "Closed on Sundays"
        },
        "knowledge_base": [
            ("What do you serve?", "We serve chicken-focused meals including sandwiches, waffle fries, and fresh lemonade."),
            ("What are your hours?", "We're open 6:45 AM to 10 PM, Monday through Saturday. Closed on Sundays."),
            ("Do you have a mobile app?", "Yes! Our mobile app lets you order ahead and earn rewards."),
            ("What's the most popular item?", "Our Chicken Sandwich is our most iconic item - crispy outside, tender inside."),
        ]
    },
    "restaurant-b": {
        "name": "Restaurant B",
        "company_data": {
            "menu_items": ["Pasta", "Risotto", "Seafood", "Salad", "Tiramisu"],
            "locations": 45,
            "hours": "11 AM - 11 PM",
            "reservations_today": 87,
            "speciality": "Italian Cuisine",
            "rating": "4.8/5"
        },
        "knowledge_base": [
            ("What cuisine do you serve?", "We specialize in authentic Italian cuisine with fresh ingredients imported weekly."),
            ("What are your hours?", "We're open 11 AM to 11 PM daily. Last seating at 10 PM."),
            ("Can I make a reservation?", "Yes! You can reserve online or call us. We accommodate parties of 2-20."),
            ("What's your specialty?", "Our house specialty is Risotto ai Funghi - creamy risotto with wild mushrooms."),
            ("Do you have private dining?", "Yes, we have a private room for groups up to 20 people."),
        ]
    }
}

class ChatMessage(BaseModel):
    tenant_id: str
    question: str
    user_name: Optional[str] = "Guest"

class ChatResponse(BaseModel):
    answer: str
    confidence: float
    tenant_name: str
    timestamp: str

def get_answer(tenant_id: str, question: str) -> tuple:
    """
    Simple RAG pipeline without paid APIs
    1. Check if tenant exists
    2. Search knowledge base
    3. Return best match with confidence score
    """
    tenant = TENANT_DATA.get(tenant_id)
    if not tenant:
        return "I don't recognize this company.", 0.0
    
    question_lower = question.lower()
    knowledge_base = tenant["knowledge_base"]
    
    best_answer = "I'm not sure about that. Please contact our support team."
    best_score = 0.0
    
    for qa_question, qa_answer in knowledge_base:
        score = 0.0
        qa_words = set(qa_question.lower().split())
        q_words = set(question_lower.split())
        
        if q_words & qa_words:
            score = len(q_words & qa_words) / len(q_words | qa_words)
        
        if score > best_score:
            best_score = score
            best_answer = qa_answer
    
    if best_score < 0.2:
        best_score = 0.3
        company_name = tenant["name"]
        items = ", ".join(tenant["company_data"].get("menu_items", [])[:3])
        best_answer = f"We serve {items} and more! Ask me about our menu, hours, or reservations."
    
    return best_answer, min(best_score, 1.0)

@app.get("/")
def read_root():
    return {
        "title": "Multi-Tenant Chatbot API",
        "status": "running",
        "tenants": list(TENANT_DATA.keys()),
        "version": "1.0"
    }

@app.post("/chat", response_model=ChatResponse)
def chat(message: ChatMessage):
    """
    Main chat endpoint
    """
    if message.tenant_id not in TENANT_DATA:
        raise HTTPException(status_code=404, detail=f"Tenant '{message.tenant_id}' not found")
    
    answer, confidence = get_answer(message.tenant_id, message.question)
    tenant_name = TENANT_DATA[message.tenant_id]["name"]
    
    return ChatResponse(
        answer=answer,
        confidence=round(confidence, 2),
        tenant_name=tenant_name,
        timestamp=datetime.now().isoformat()
    )

@app.get("/tenant/{tenant_id}")
def get_tenant_info(tenant_id: str):
    """Get tenant company information"""
    if tenant_id not in TENANT_DATA:
        raise HTTPException(status_code=404, detail="Tenant not found")
    
    tenant = TENANT_DATA[tenant_id]
    return {
        "name": tenant["name"],
        "company_data": tenant["company_data"]
    }

@app.get("/tenants")
def list_tenants():
    """List all available tenants"""
    return {
        "tenants": [
            {
                "id": tid,
                "name": TENANT_DATA[tid]["name"]
            }
            for tid in TENANT_DATA.keys()
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
