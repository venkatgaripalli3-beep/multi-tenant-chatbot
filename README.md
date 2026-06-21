# 🚀 Multi-Tenant AI Chatbot Platform

A free, production-ready SaaS chatbot demo that shows how to build isolated chat systems for multiple companies.

## 🎯 What Problem Does This Solve?

Companies want instant AI-powered customer support without:
- Paying per message to OpenAI
- Building custom chatbots separately
- Managing data isolation

**Solution**: A single platform serving 100+ companies, each with isolated data.

## ✨ Features

✅ **Multi-tenant architecture** - Complete data isolation between companies
✅ **FastAPI backend** - RESTful API with async support
✅ **React frontend** - Clean, modern UI
✅ **Confidence scoring** - Shows how confident the AI is in its answer
✅ **Free deployment** - Render + Vercel (zero cost)
✅ **Scalable design** - Ready to add PostgreSQL, RAG, real LLMs

## 🏗️ Architecture

```
┌─────────────────────┐
│   React Frontend    │
│   (Vercel)          │
└──────────┬──────────┘
           │
           │ HTTP/REST
           ▼
┌─────────────────────┐
│  FastAPI Backend    │
│   (Render)          │
└──────────┬──────────┘
           │
     ┌─────┴──────┐
     ▼            ▼
┌─────────┐  ┌─────────┐
│Chick-   │  │Restau-  │
│fil-A's  │  │rant B's │
│Data DB  │  │Data DB  │
└─────────┘  └─────────┘
```

Each company has:
- Isolated database
- Own knowledge base
- Private API credentials
- Separate chat history

## 🚀 Quick Start (5 Minutes)

### Local Development

```bash
# 1. Clone
git clone https://github.com/yourusername/multi-tenant-chatbot
cd multi-tenant-chatbot

# 2. Backend
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn pydantic python-multipart
python multi_tenant_chatbot_demo.py

# 3. Frontend (new terminal)
npx create-react-app frontend
# Copy frontend_react.jsx into frontend/src/App.js
npm start
```

### Deployed

**Frontend**: https://your-app.vercel.app
**Backend**: https://your-api.onrender.com

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step.

## 📊 Demo

**Companies included**:
1. Chick-fil-A (QSR)
   - Menu items, hours, locations
   - Sample questions: "What do you serve?" "Are you open Sundays?"

2. Restaurant B (Italian)
   - Reservations, specialties, hours
   - Sample questions: "Can I make a reservation?" "What's your best dish?"

## 🔧 API Endpoints

```bash
# Chat
POST /chat
{
  "tenant_id": "chick-fil-a",
  "question": "What do you serve?"
}

# Tenant info
GET /tenant/{tenant_id}

# All tenants
GET /tenants
```

## 💻 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, CSS-in-JS |
| Backend | FastAPI, Python 3.9+ |
| Database | Mock (scales to PostgreSQL) |
| Deployment | Vercel + Render |
| Cost | **$0** |

## 📈 Roadmap (Next Features)

- [ ] Real LLM (Claude API / Ollama)
- [ ] ChromaDB for semantic search
- [ ] PostgreSQL with row-level security
- [ ] Company authentication (JWT)
- [ ] Analytics dashboard
- [ ] Webhook support

## 🎓 Learning Outcomes

By building this, you'll understand:
- **Multi-tenant SaaS architecture**
- **Data isolation patterns**
- **REST API design**
- **React component patterns**
- **Deployment automation**
- **Confidence scoring in AI**

## 🤝 Interview-Ready

This project demonstrates:
1. **Backend skills**: FastAPI, async, multi-tenancy
2. **Frontend skills**: React, state management
3. **Full-stack**: Complete end-to-end feature
4. **Scalability thinking**: Designed for 100+ companies
5. **DevOps**: Deployed on modern cloud platforms

## 📝 How to Scale to Production

### Phase 1: Add Real LLM
```python
# Replace mock RAG with Claude
from anthropic import Anthropic

def get_answer(tenant_id: str, question: str):
    client = Anthropic()
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=500,
        system=f"You are {TENANT_DATA[tenant_id]['name']} support bot",
        messages=[{"role": "user", "content": question}]
    )
    return response.content[0].text, 1.0
```

### Phase 2: Add ChromaDB
```python
import chromadb

def create_tenant_collection(tenant_id: str, documents: list):
    client = chromadb.Client()
    collection = client.create_collection(name=f"company_{tenant_id}")
    collection.add(ids=[str(i) for i in range(len(documents))], documents=documents)
    return collection
```

### Phase 3: Add PostgreSQL
- Separate schema per tenant
- Row-level security (RLS)
- Automatic backup
- Query optimization

## 🔒 Security Features

- ✅ Input validation (Pydantic)
- ✅ CORS enabled
- ✅ Tenant isolation
- ✅ Ready for authentication
- ✅ Rate limiting ready

## 📄 License

MIT - Free to use and modify

## 👨‍💻 Author

Your Name | AI/ML Engineer
- 🔗 LinkedIn: linkedin.com/in/yourprofile
- 🐙 GitHub: github.com/yourusername

## 🎬 See It In Action

Live demo: [INSERT YOUR DEPLOYED URL]
GitHub: [INSERT YOUR GITHUB LINK]

---

**Questions or feedback?** Create an issue or reach out!

Made with ❤️ for builders interested in SaaS & AI
