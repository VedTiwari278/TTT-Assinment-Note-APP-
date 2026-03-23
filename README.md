# Notes App (Frontend + Backend)

This repository contains:

- `frontend` -> React + Vite app
- `backend` -> Node.js + Express + MongoDB API

## Prerequisites

- Node.js 18+ (recommended: Node 20)
- npm
- Docker Desktop (only if running with Docker)

---

## 1. Run Locally (Without Docker)

### Backend

1. Open terminal in `backend`
2. Install dependencies
3. Start server

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000` (based on your `.env` `PORT`).

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` (default Vite port).

---

## 2. Environment Variables

Create/update `backend/.env` with required values:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
MONGODB_DEV_URL=mongodb://127.0.0.1:27017/notesdb
MONGODB_PROD_URL=mongodb://127.0.0.1:27017/notesdb
```

If using Docker Compose, `MONGODB_DEV_URL` is overridden to `mongodb://mongo:27017/notesdb`.

---

## 3. Run Backend with Docker

From `backend` folder:

```bash
cd backend
docker build -t notes-backend .
docker run --env-file .env -p 5000:5000 notes-backend
```

---

## 4. Run Backend + Mongo with Docker Compose

From `backend` folder:

```bash
cd backend
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

---

## 5. Typical Dev Workflow

1. Start backend (`npm run dev` in `backend`)
2. Start frontend (`npm run dev` in `frontend`)
3. Open `http://localhost:5173`

For API calls from frontend, ensure:

- backend is running
- `FRONTEND_URL` in backend `.env` matches frontend URL
- frontend API base URL points to `http://localhost:5000/api/v1`

