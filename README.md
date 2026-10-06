# 🎧 LinguaAI — Full-Stack MERN AI Language Learning & Listening Platform

> **"Spotify + Duolingo + AI Tutor"** for automated topic-based language learning, native text-to-speech audio, and pronunciation practice.

---

## 🌟 Key Features

1. **Automated AI Lesson Generation**:
   - Enter any topic in English (e.g., *"Introducing myself"*, *"Ordering food at a restaurant"*, *"Going to the supermarket"*).
   - Select Target Language (**German 🇩🇪, English 🇬🇧, French 🇫🇷, Spanish 🇪🇸, Italian 🇮🇹, Japanese 🇯🇵, Hindi 🇮🇳**).
   - Select CEFR Level (**Beginner, A1, A2, B1**).
   - AI automatically generates structured native sentences, natural English translations, extracted vocabulary, level-appropriate grammar explanations, and practice quizzes.

2. **3 Listening Modes**:
   - **Normal Mode (1.0x)**: Crisp native sentence audio playback.
   - **Slow Mode (0.75x)**: Reduced speed playback designed for beginners.
   - **Night Listening Mode**: Automated playlist playback with configurable pauses (2s / 3s / 5s) and a **Sleep Timer** (10m, 15m, 20m, 30m).

3. **Pronunciation & Speaking Tools**:
   - **Sentence Repetition**: Target Audio → 3s Pause → Target Audio repeat.
   - **Shadowing Mode**: Step-by-step interactive vocal practice (`🎧 Listen → 🗣️ Repeat → ➡️ Next`).

4. **Vocabulary & Grammar Breakdown**:
   - Instant vocabulary cards with 🔊 audio pronunciation.
   - Key grammar rules automatically extracted for the chosen CEFR level.

5. **Practice Quiz**:
   - Multiple Choice, Fill in the Blank, and Listening Audio quizzes with instant feedback and progress saving.

6. **Progress Dashboard & User Auth**:
   - CEFR progress %, completed lessons count, total listening hours, vocabulary bank size, and daily streak tracking.
   - JWT authentication with secure `bcryptjs` password hashing.

---

## 🏗️ Tech Stack & Service Architecture

### Backend (`server/`)
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB & Mongoose ORM
- **AI Service**: OpenAI API (`gpt-4o-mini` with JSON schema validation)
- **TTS Service**: OpenAI TTS (`tts-1`) + Browser WebSpeech fallback helper
- **Auth**: JSON Web Tokens (JWT) & bcryptjs
- **Pattern**: `Controller → Service → Model` architecture

```
server/
├── config/             # DB & Language Registry configs
├── controllers/        # Express Route Controllers
├── services/           # Business logic & AI/TTS pipelines
├── models/             # User, Lesson, Progress Mongoose Schemas
├── routes/             # REST API Endpoints
├── middleware/         # Auth & Error Handling middleware
├── utils/              # Concurrency (pMap) & JSON Parser utils
├── prompts/            # CEFR Level-specific OpenAI Prompts
├── generated-audio/    # MP3 audio static files storage
├── app.js              # Express app setup
└── server.js           # Server entry point
```

### Frontend (`client/`)
- **Framework**: React.js with Vite
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **State**: React Context API (`AuthContext`, `AudioContext`, `LessonContext`)
- **Styling**: Vanilla CSS glassmorphism & responsive high-contrast design system

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Home, Dashboard, Lesson, Quiz, Progress, Settings
│   ├── services/       # Axios API client & TTS audio helpers
│   ├── context/        # Context Providers for Auth, Audio, and Lessons
│   ├── utils/          # Language metadata & CEFR helpers
│   ├── layouts/        # App navbar & layout wrappers
│   ├── App.jsx
│   └── main.jsx
```

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB daemon running locally or a MongoDB Atlas URI

### 1. Backend Setup
```bash
cd server
npm install
```

Create `.env` inside `server/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lingua_ai
JWT_SECRET=super_secret_jwt_key_lingua_ai_2026
OPENAI_API_KEY=your_openai_api_key_here
TTS_PROVIDER=openai
CLIENT_URL=http://localhost:5173
```

Run Backend in development mode:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | Log in user and receive JWT |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `POST` | `/api/lessons/generate` | Trigger AI lesson generation pipeline |
| `GET` | `/api/lessons` | Fetch user / public lessons |
| `GET` | `/api/lessons/:id` | Fetch single lesson by ID |
| `POST` | `/api/audio/generate` | Synthesize target language audio |
| `POST` | `/api/progress` | Record completed sentences / listening time |
| `GET` | `/api/progress/dashboard` | Fetch dashboard analytics |
| `POST` | `/api/quiz/submit` | Submit quiz answers and grade score |

---

## 🔒 Environment & Security
- OpenAI API keys are kept strictly on the Node.js backend.
- Passwords are salted and hashed using `bcryptjs`.
- Audio files are generated using controlled concurrency (3-5 items at a time) to prevent memory bottlenecks.
