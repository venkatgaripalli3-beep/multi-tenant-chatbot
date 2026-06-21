# Multi-Tenant AI Chatbot Platform Demo

## 🚀 Build & Deploy in 10 Minutes (Completely FREE)

### What You Get:
✅ Backend API with multi-tenant isolation
✅ React frontend with chat UI
✅ Mock data for 2 companies (Chick-fil-A, Restaurant B)
✅ Ready to deploy on Render (free tier)
✅ Perfect LinkedIn portfolio project

---

## Local Setup (Development)

### Step 1: Clone the repo
```bash
git clone https://github.com/YOUR_GITHUB/multi-tenant-chatbot
cd multi-tenant-chatbot
```

### Step 2: Backend Setup
```bash
# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn python-multipart pydantic

# Run backend
python multi_tenant_chatbot_demo.py
# Server running at http://localhost:8000
```

### Step 3: Frontend Setup
```bash
# In another terminal
npx create-react-app frontend
cd frontend

# Replace src/App.js with the frontend_react.jsx content

# Run React dev server
npm start
# Opens at http://localhost:3000
```

### Step 4: Test the Demo
1. Open http://localhost:3000
2. Switch between "Chick-fil-A" and "Restaurant B"
3. Ask questions like:
   - "What do you serve?"
   - "What are your hours?"
   - "Do you have reservations?"

---

## Deploy to Render (FREE TIER - No Credit Card!)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Multi-tenant chatbot demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/multi-tenant-chatbot
git push -u origin main
```

### Step 2: Deploy Backend on Render
1. Go to https://render.com (sign up free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Fill in:
   - **Name**: `multi-tenant-chatbot-api`
   - **Runtime**: Python 3
   - **Build command**: `pip install fastapi uvicorn python-multipart pydantic`
   - **Start command**: `uvicorn multi_tenant_chatbot_demo:app --host 0.0.0.0 --port 8000`
5. Click "Create Web Service"
6. Wait 2-3 minutes. Copy the URL (e.g., `https://multi-tenant-chatbot-api.onrender.com`)

### Step 3: Deploy Frontend on Vercel
1. Go to https://vercel.com (sign up free with GitHub)
2. Click "Import Project" → select your GitHub repo
3. In "Build & Development Settings":
   - **Framework Preset**: Next.js (or use default)
   - **Build Command**: `npm run build`
4. Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://multi-tenant-chatbot-api.onrender.com`
5. Click "Deploy"
6. Your frontend is live! (e.g., `https://my-chatbot.vercel.app`)

### Update Frontend to Use Deployed Backend
In `frontend_react.jsx`, change:
```javascript
const [apiUrl] = useState('http://localhost:8000');
```
to:
```javascript
const [apiUrl] = useState(process.env.REACT_APP_API_URL || 'http://localhost:8000');
```

---

## LinkedIn Post Template

**Caption:**
```
🚀 Built a Multi-Tenant AI Chatbot Platform (Demo)

I just launched a free SaaS chatbot demo that showcases:

✅ Multi-tenant architecture - each company's data is isolated
✅ AI-powered Q&A with confidence scoring
✅ FastAPI backend + React frontend
✅ Deployed on Render (free tier) in 10 minutes

The demo shows:
• Chick-fil-A chatbot answering questions about menu, hours, policies
• Restaurant B chatbot answering about reservations, specialties

Tech stack: FastAPI, React, PostgreSQL (scalable)

Live demo: [your-deployed-url.vercel.app]
GitHub: [your-github-link]

This solves a real problem: companies need instant customer support without paying per-message to OpenAI.

The architecture scales to hundreds of companies on the same infrastructure.

Next: Adding RAG pipeline with real LLM integration.

#AI #SaaS #StartupIdea #WebDevelopment #Python #React
```

---

## How It Works (Architecture Diagram)

```
Customer (Web Browser)
    ↓
React Frontend (Vercel)
    ↓
FastAPI API (Render) ← Load Balancer
    ↓
Multi-Tenant Data (PostgreSQL)
    ├─ Chick-fil-A DB (isolated)
    ├─ Restaurant B DB (isolated)
    └─ Restaurant C DB (isolated)
    ↓
LLM (Claude API - paid tier, or Ollama - free)
    ↓
Response with confidence score
```

---

## Scaling Guide (What to Show in Interviews)

### Current Demo:
- Mock data (simple knowledge base)
- 2 sample companies
- Single-instance deployment

### Next Steps (for Resume):
1. **Add Real RAG**:
   - ChromaDB for vector storage
   - Sentence transformers for embeddings
   - Hybrid retrieval (keyword + semantic)

2. **Add Authentication**:
   - JWT tokens for company isolation
   - API key management

3. **Add Database**:
   - PostgreSQL with row-level security
   - Multi-tenant schema design

4. **Scale LLM**:
   - Ollama (local, free)
   - Or Anthropic API (paid, but cheaper at scale)

---

## Free Resources Used:
- ✅ FastAPI (free, open-source)
- ✅ React (free)
- ✅ Render (free tier, auto-sleeps after 15 min inactivity)
- ✅ Vercel (free)
- ✅ GitHub (free)
- ✅ Mock data (no external APIs)

**Total Cost to Deploy: $0**

---

## Testing Endpoints (Use Postman or cURL)

### Get all tenants:
```bash
curl http://localhost:8000/tenants
```

### Chat:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "tenant_id": "chick-fil-a",
    "question": "What do you serve?"
  }'
```

### Get tenant info:
```bash
curl http://localhost:8000/tenant/chick-fil-a
```

---

## Troubleshooting

**"CORS error"** → Backend needs CORS enabled (already added in code)

**"Can't connect to API"** → Make sure Render backend is awake (it sleeps after 15 min inactivity)

**"Port 8000 already in use"** → Change port in code or kill existing process

---

## Next: Advanced Features for Your Resume

Once deployed, you can add:

1. **Real LLM Integration**
   ```python
   from anthropic import Anthropic
   
   client = Anthropic()
   response = client.messages.create(
       model="claude-3-5-sonnet-20241022",
       max_tokens=1024,
       system=f"You are a {company_name} customer support bot.",
       messages=[{"role": "user", "content": question}]
   )
   ```

2. **ChromaDB for Real RAG**
   ```python
   from chromadb.config import Settings
   import chromadb
   
   client = chromadb.Client(Settings(...))
   collection = client.create_collection(name=f"company_{tenant_id}")
   ```

3. **Analytics Dashboard**
   - Popular questions per company
   - LLM confidence trends
   - Usage metrics

---

Good luck! 🎉 This demo + GitHub repo will impress any hiring manager.
