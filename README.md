NyayaPath
Understand your rights. Find your way forward.
From legal confusion to the right path.

NyayaPath is a LegalTech web application designed to help users understand legal issues, explore possible legal routes, identify relevant authorities and documents, learn legal concepts, and manage legal-related information in one place.
This repository is a React + TypeScript + Vite frontend with an Express/Node.js backend and an optional Google Gemini-powered legal guidance service.
Features
- Legal Guidance — Describe a legal problem and receive structured legal information and navigation support.
- Multimodal Guidance — Submit an image/document together with a prompt for AI-assisted analysis.
- Cases — View and manage demo case records and timelines.
- Documents — Organize legal documents and associated analysis data.
- Tasks — Track case-related tasks and due dates.
- Know Your Rights — Browse rights and legal-awareness information.
- Legal Reels / Feed — Short-form legal awareness content with feed filtering and reel interactions.
- Daily Legal Quiz — Daily questions with explanations, sources, and interest-based prioritization.
- Legal Updates — Browse legal/news-style update content from the application's demo data.
- Authorities Directory — Find authorities by category, jurisdiction, state, and online filing availability.
- Profile & Onboarding — User profile and preference flows.
Technology Stack
Frontend
- React 19 — component-based UI
- TypeScript — static typing
- Vite 8 — development server and production build tool
- React Router DOM 7 — client-side routing
- Tailwind CSS 4 — utility-first styling
- Lucide React — icon library
- Motion — UI animation and transitions
Backend
- Node.js — server runtime
- Express 4 — REST API layer
- tsx — TypeScript execution for the server
- dotenv — environment configuration
AI
- Google Gemini API via @google/genai
- Configured model in server/services/gemini.ts: gemini-3.8-flash
- Structured JSON responses are requested for legal guidance.
- A deterministic fallback guidance engine is included for cases where a Gemini API key is unavailable or the Gemini request fails.
Client-side persistence
The current application uses browser localStorage for several user-facing records and preferences, including cases, tasks, documents, notifications, and user preferences.
The current source does not implement a production SQL/MongoDB database layer.

Media / Reels
- HTML5 <video> for MP4 reels
- HTML5 <audio> for standalone MP3 audio content
- Local media assets can be served from the public asset directory
- IntersectionObserver can be used for viewport-based reel play/pause behavior
- localStorage for saved reel state
- Web Share API with clipboard fallback for sharing
Application Architecture
┌───────────────────────────────┐
│       React Frontend          │
│  React + TypeScript + Vite    │
│      Tailwind + Router        │
└──────────────┬────────────────┘
               │
               │ HTTP / JSON
               ▼
┌───────────────────────────────┐
│       Express Backend         │
│          Node.js              │
└───────────┬───────────┬───────┘
            │           │
            │           │
            ▼           ▼
┌────────────────┐  ┌───────────────────┐
│ Google Gemini  │  │ Demo / Fallback    │
│ API            │  │ Guidance Engine    │
└────────────────┘  └───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ Structured legal guidance     │
│ response returned to frontend │
└───────────────────────────────┘
Main Routes
Public
Route	Purpose
/	Landing page
/login	Login
/signup	Signup
/about	About NyayaPath
/onboarding	Initial onboarding


Application
Route	Purpose
/dashboard	Main user dashboard
/guidance	Legal Guidance bot
/cases	Cases list
/cases/:id	Case details
/documents	Legal documents
/tasks	Tasks and deadlines
/rights	Know Your Rights
/feed	Legal Reels / awareness feed
/quiz	Daily Legal Quiz
/updates	Legal Updates
/authorities	Authority directory
/profile	User profile


API Endpoints
Health
GET /api/health
Returns API health status and whether a usable Gemini key is configured.
Legal Guidance
POST /api/guidance
Example request:
{
  "query": "My online payment was fraudulent and the bank has not resolved it.",
  "previousContext": null
}
The backend forwards the request to the Gemini service when an API key is available. Otherwise, it uses the fallback guidance engine.
Multimodal Guidance
POST /api/guidance/image
Accepts base64-encoded image/document content, MIME type, and an optional prompt.
Rights
GET /api/rights
Supports optional filtering with category and search.
Authorities
GET /api/authorities
Supports category, search, state, and onlineOnly filters.
Legal Updates
GET /api/updates
Supports category and tag filters.
Awareness Feed
GET /api/feed
Supports type and category filters.
Daily Quiz
GET /api/quiz/today
Supports optional interests and dateStr parameters.
Quiz Answer Check
POST /api/quiz/submit
Checks an answer and returns correctness, explanation, and source data.
Legal Guidance AI Flow
User enters a legal question
        │
        ▼
GuidancePage.tsx
        │
        │ POST /api/guidance
        ▼
Express server.ts
        │
        ▼
server/services/gemini.ts
        │
        ├── Gemini API available ──► Gemini
        │
        └── unavailable / failed ─► fallback guidance engine
        │
        ▼
Structured GuidanceResponse
        │
        ▼
Guidance UI
The Gemini prompt instructs the model to use cautious language, avoid guaranteed outcomes, avoid fabricated legal authorities/citations, and return structured JSON matching the application's guidance schema.
Project Structure
nyayapath/
├── server.ts
├── vite.config.ts
├── package.json
├── tsconfig.json
├── .env.example
├── index.html
│
├── server/
│   ├── data/
│   │   └── demoData.ts
│   └── services/
│       ├── gemini.ts
│       └── guidanceEngine.ts
│
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    │
    ├── components/
    │   └── Navbar.tsx
    │
    ├── context/
    │   └── AuthContext.tsx
    │
    ├── pages/
    │   ├── LandingPage.tsx
    │   ├── LoginPage.tsx
    │   ├── SignupPage.tsx
    │   ├── AboutPage.tsx
    │   ├── OnboardingPage.tsx
    │   ├── DashboardPage.tsx
    │   ├── GuidancePage.tsx
    │   ├── CasesPage.tsx
    │   ├── CaseDetailPage.tsx
    │   ├── DocumentsPage.tsx
    │   ├── TasksPage.tsx
    │   ├── RightsPage.tsx
    │   ├── FeedPage.tsx
    │   ├── QuizPage.tsx
    │   ├── UpdatesPage.tsx
    │   ├── AuthoritiesPage.tsx
    │   └── ProfilePage.tsx
    │
    ├── services/
    │   ├── auth.ts
    │   └── database.ts
    │
    ├── types/
    │   └── legal.ts
    │
    └── utils/
        └── storage.ts
Environment Variables
Create a local environment file based on .env.example.
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="http://localhost:3000"
GEMINI_API_KEY is required for live Gemini-powered responses. Without a valid key, the application falls back to the local deterministic guidance engine.
Do not commit real API keys to Git.
Getting Started
Prerequisites
- Node.js
- npm
- A Gemini API key for live AI guidance
Install dependencies
npm install
Configure environment
Create .env.local (or another environment file loaded by your setup) and add:
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="http://localhost:3000"
Start development server
npm run dev
The Express server starts on port 3000 by default and serves the Vite application.
Open:
http://localhost:3000
Type-check
npm run lint
Production build
npm run build
Start production server
npm start
Legal Reels / Feed
The /feed route is intended to provide short-form legal awareness content.
The reel architecture supports:
- Real MP4 video playback
- Original video audio preservation
- Standalone MP3 audio items where applicable
- Play / pause
- Mute / unmute
- Progress controls
- Fullscreen
- Next / previous navigation
- Save to local storage
- Share using Web Share API or clipboard fallback
- "Ask NyayaPath" handoff to /guidance
- Topic/category filtering
- Mobile vertical reel presentation
- Desktop centered 9:16 presentation
For local reel assets, keep media files in a public/static asset directory so the browser can request them directly.
Example:
public/
└── reels/
    ├── reel-01.mp4
    ├── reel-02.mp4
    ├── reel-03.mp4
    ├── reel-04.mp4
    ├── reel-05.mp4
    ├── reel-06.mp4
    ├── audio-01.mp3
    ├── audio-02.mp3
    └── audio-03.mp3
External creator content should use official embeddable/source mechanisms rather than downloading and re-uploading third-party media.
Data & Demo Content
The current repository includes demo datasets in:
server/data/demoData.ts
These are used by the rights, authorities, updates, feed, and quiz endpoints.
Several application records shown in the UI are also seeded as demo data in:
src/services/database.ts
These records are persisted client-side using localStorage.
Authentication Status
The repository contains login/signup UI and an authentication service abstraction. The current source should be treated as a demo/prototype authentication flow, not as a production-grade identity system.
A production deployment should replace demo authentication with a real provider such as Firebase Authentication, Auth0, Clerk, or another properly configured identity service.
Security & Privacy Notes
- Never expose GEMINI_API_KEY in client-side source code.
- Keep secrets in environment variables or the hosting platform's secret manager.
- Validate uploaded file type and size before processing in production.
- Do not treat AI output as verified legal advice.
- Verify legal provisions, dates, authorities, and URLs against authoritative sources before production use.
- Do not store sensitive user documents in browser localStorage for a production legal product.
Legal Disclaimer
NyayaPath is designed for legal information and navigation support. It is not a substitute for a qualified lawyer, legal representation, or professional legal judgment.
AI-generated or demo content should be independently verified before taking legal action.
Scripts
Command	Purpose
npm run dev	Start Express + Vite development server
npm run build	Create production frontend build
npm run start	Start the server
npm run preview	Preview Vite production output
npm run lint	Type-check the TypeScript project
npm run clean	Remove generated build/server artifacts


Project Goal
NyayaPath aims to bridge the gap between legal confusion and the right next step by combining:
Legal Guidance
+ Legal Awareness
+ Rights Education
+ Authority Navigation
+ Case / Task Organization
+ Document Context
+ Daily Learning
into one accessible LegalTech platform.