# Project File Structure

```
multi-tenant-chatbot/
├── README.md                          # Main project overview
├── DEPLOYMENT_GUIDE.md                # Step-by-step deployment
├── LINKEDIN_POST_TEMPLATES.md         # Ready-to-use LinkedIn posts
├── .gitignore                         # Git ignore file
│
├── backend/
│   ├── multi_tenant_chatbot_demo.py   # Main FastAPI app (server.py in prod)
│   ├── requirements.txt               # Dependencies: fastapi, uvicorn, pydantic
│   ├── .env.example                   # Environment variables template
│   └── app/
│       ├── __init__.py
│       ├── models.py                  # Pydantic models (ChatMessage, ChatResponse)
│       ├── database.py                # Mock DB layer (scales to PostgreSQL)
│       ├── rag_pipeline.py            # Mock RAG (scales to ChromaDB + Claude)
│       └── api/
│           ├── __init__.py
│           ├── chat.py                # Chat endpoints
│           └── tenants.py             # Tenant management endpoints
│
├── frontend/
│   ├── package.json                   # React dependencies
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js                     # Main component (paste frontend_react.jsx here)
│       ├── index.css
│       └── index.js
│
└── .github/
    └── workflows/
        └── deploy.yml                 # GitHub Actions for auto-deploy
```

---

## Files You Have:

### ✅ Backend
- `multi_tenant_chatbot_demo.py` - Complete working API

### ✅ Frontend
- `frontend_react.jsx` - Complete working React component

### ✅ Documentation
- `README.md` - GitHub project overview
- `DEPLOYMENT_GUIDE.md` - Detailed deployment steps
- `LINKEDIN_POST_TEMPLATES.md` - Ready-to-post content

### ✅ This File
- `PROJECT_STRUCTURE.md` - Folder organization

---

## How to Organize Your Project

### Option 1: Start Simple (Recommended for First Deploy)
```bash
multi-tenant-chatbot/
├── multi_tenant_chatbot_demo.py
├── frontend/
│   ├── package.json
│   └── src/App.js
├── requirements.txt
├── README.md
└── DEPLOYMENT_GUIDE.md
```

Just these files. Deploy in 10 minutes.

### Option 2: Production-Ready (After First Success)
Add structured folders as shown above.

---

## Step-by-Step File Setup

### 1. Create GitHub Repo
```bash
mkdir multi-tenant-chatbot
cd multi-tenant-chatbot
git init
```

### 2. Add Backend Files
```bash
# Create backend folder
mkdir backend
cd backend

# Create requirements.txt
cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
python-multipart==0.0.6
EOF

# Copy multi_tenant_chatbot_demo.py here
cp ../multi_tenant_chatbot_demo.py .

cd ..
```

### 3. Add Frontend Files
```bash
# Create React app
npx create-react-app frontend
cd frontend

# Copy the React component
# (Paste contents of frontend_react.jsx into src/App.js)

cd ..
```

### 4. Add Documentation
```bash
cp README.md .
cp DEPLOYMENT_GUIDE.md .
cp LINKEDIN_POST_TEMPLATES.md .
```

### 5. Create .gitignore
```bash
cat > .gitignore << 'EOF'
# Python
venv/
__pycache__/
*.py[cod]
*$py.class

# Node
frontend/node_modules/
frontend/.env.local

# IDE
.vscode/
.idea/
*.swp

# Environment
.env
.env.local

# OS
.DS_Store
EOF
```

---

## Running Locally (Full Verification)

### Terminal 1: Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or: venv\Scripts\activate on Windows
pip install -r requirements.txt
python multi_tenant_chatbot_demo.py
# Should print: Uvicorn running on http://0.0.0.0:8000
```

### Terminal 2: Frontend
```bash
cd frontend
npm install  # First time only
npm start
# Should open http://localhost:3000
```

### Terminal 3: Test
```bash
# Test backend is running
curl http://localhost:8000

# Should return:
# {"title":"Multi-Tenant Chatbot API","status":"running",...}
```

---

## Before Deploying

### Checklist:
- [ ] Backend runs locally without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Can chat between companies (switch tabs)
- [ ] All files committed to git
- [ ] GitHub repo created and pushed
- [ ] README is clear
- [ ] DEPLOYMENT_GUIDE.md is complete

---

## Environment Variables (For Production)

### Backend `.env` (Example)
```
ANTHROPIC_API_KEY=sk-...           # Leave blank for demo
DATABASE_URL=postgresql://...      # Leave blank for demo
ALLOWED_ORIGINS=https://yourdomain.vercel.app
```

### Frontend `.env` (React)
```
REACT_APP_API_URL=https://your-api.onrender.com
```

For the free demo, you don't need these. They're for when you scale.

---

## Folder Structure Explained

### `backend/`
- **Purpose**: FastAPI server
- **Key file**: `multi_tenant_chatbot_demo.py`
- **Dependencies**: Listed in `requirements.txt`
- **Deployment**: Push to Render, which runs `uvicorn multi_tenant_chatbot_demo:app`

### `frontend/`
- **Purpose**: React user interface
- **Key file**: `src/App.js` (paste `frontend_react.jsx` content here)
- **Dependencies**: Listed in `package.json`
- **Deployment**: Push to Vercel, which runs `npm start`

### Documentation
- **README.md**: What it is, how to use, tech stack
- **DEPLOYMENT_GUIDE.md**: Exact steps to deploy to Render + Vercel
- **LINKEDIN_POST_TEMPLATES.md**: Ready-to-copy LinkedIn posts

---

## Scaling Later

When you want to add features:

### Add ChromaDB for Real RAG:
```bash
backend/
├── app/
│   ├── rag_pipeline.py      # Move mock RAG here
│   ├── chromadb_client.py   # New: ChromaDB integration
│   └── embeddings.py        # New: Embedding logic
```

### Add Database:
```bash
backend/
├── app/
│   ├── database.py          # Replace mock with PostgreSQL
│   ├── models.py            # Add SQLAlchemy ORM models
│   └── config.py            # Database connection
```

### Add Authentication:
```bash
backend/
├── app/
│   ├── auth.py              # JWT token handling
│   ├── security.py          # Password hashing
│   └── middleware.py        # Auth middleware
```

But for now? Keep it simple. The simple version is production-ready.

---

## Deployment File Locations

### Render expects:
- Python entry point: `multi_tenant_chatbot_demo.py` (or inside backend folder)
- Runtime: Python 3.11
- Start command: `uvicorn multi_tenant_chatbot_demo:app --host 0.0.0.0`

### Vercel expects:
- React app: `frontend/` folder
- Package manager: npm
- Build output: `frontend/build`

The file structure above works with both.

---

## Git Commands to Initialize

```bash
# From project root
git init
git add .
git commit -m "Initial commit: multi-tenant chatbot demo"
git branch -M main
git remote add origin https://github.com/USERNAME/multi-tenant-chatbot
git push -u origin main
```

Now your repo is live. Ready to deploy from GitHub.

---

## Summary

**Minimum files needed:**
1. `multi_tenant_chatbot_demo.py` (backend)
2. `frontend/src/App.js` (frontend)
3. `requirements.txt` (Python deps)
4. `package.json` (React deps - auto-created by create-react-app)
5. `README.md`
6. `.gitignore`

**That's it.** Push to GitHub, deploy to Render + Vercel.

The rest is optional for when you scale.

Good luck! 🚀
