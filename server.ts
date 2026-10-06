import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { generateLegalGuidance, generateMultimodalLegalGuidance } from './server/services/gemini';
import {
  DEMO_RIGHTS,
  DEMO_AUTHORITIES,
  DEMO_UPDATES,
  DEMO_FEED_POSTS,
  DEMO_QUIZ_QUESTIONS,
} from './server/data/demoData';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'NyayaPath API',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    timestamp: new Date().toISOString(),
  });
});

// 1. Legal Guidance Text Endpoint
app.post('/api/guidance', async (req, res) => {
  try {
    const { query, previousContext } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required and must be a string.' });
    }

    const result = await generateLegalGuidance(query, previousContext);
    return res.json(result);
  } catch (error) {
    console.error('API /api/guidance error:', error);
    return res.status(500).json({ error: 'Internal guidance generation failed.' });
  }
});

// 2. Multimodal Image / Document Guidance Endpoint
app.post('/api/guidance/image', async (req, res) => {
  try {
    const { imageBase64, mimeType, prompt } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image base64 data is required.' });
    }

    const result = await generateMultimodalLegalGuidance(imageBase64, mimeType || 'image/jpeg', prompt || '');
    return res.json(result);
  } catch (error) {
    console.error('API /api/guidance/image error:', error);
    return res.status(500).json({ error: 'Internal multimodal guidance failed.' });
  }
});

// 3. Rights Directory Endpoint
app.get('/api/rights', (req, res) => {
  const { category, search } = req.query;
  let results = [...DEMO_RIGHTS];

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter((r) => r.category.toLowerCase() === category.toLowerCase());
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.simpleMeaning.toLowerCase().includes(q) ||
        r.reference.toLowerCase().includes(q)
    );
  }

  res.json({ rights: results, total: results.length });
});

// 4. Authorities Directory Endpoint
app.get('/api/authorities', (req, res) => {
  const { category, search, state, onlineOnly } = req.query;
  let results = [...DEMO_AUTHORITIES];

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.handles.toLowerCase().includes(q) ||
        a.jurisdiction.toLowerCase().includes(q)
    );
  }

  if (state && typeof state === 'string' && state !== 'All') {
    results = results.filter((a) => a.state?.toLowerCase().includes(state.toLowerCase()));
  }

  if (onlineOnly === 'true') {
    results = results.filter((a) => Boolean(a.onlineFilingUrl));
  }

  res.json({ authorities: results, total: results.length });
});

// 5. Legal Updates Endpoint
app.get('/api/updates', (req, res) => {
  const { category, tag } = req.query;
  let results = [...DEMO_UPDATES];

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter((u) => u.category.toLowerCase() === category.toLowerCase());
  }

  if (tag && typeof tag === 'string' && tag !== 'All') {
    results = results.filter((u) => u.tag.toLowerCase() === tag.toLowerCase());
  }

  res.json({ updates: results, total: results.length });
});

// 6. Awareness Feed Endpoint
app.get('/api/feed', (req, res) => {
  const { type, category } = req.query;
  let results = [...DEMO_FEED_POSTS];

  if (type && typeof type === 'string' && type !== 'All') {
    results = results.filter((p) => p.type.toLowerCase() === type.toLowerCase());
  }

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  res.json({ feed: results, total: results.length });
});

// 7. Daily Quiz Endpoint
app.get('/api/quiz/today', (req, res) => {
  const { interests, dateStr } = req.query;
  const userInterests: string[] = typeof interests === 'string' && interests ? interests.split(',') : [];

  // Deterministic daily rotation using calendar date
  const now = new Date();
  const dateKey =
    typeof dateStr === 'string' && dateStr ? dateStr : `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  // Simple string hash
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  // If user specified interests, prioritize questions in matching categories
  let prioritizedPool = [...DEMO_QUIZ_QUESTIONS];
  if (userInterests.length > 0) {
    const matched = DEMO_QUIZ_QUESTIONS.filter((q) =>
      userInterests.some((interest) => q.category.toLowerCase().includes(interest.toLowerCase()))
    );
    const unmatched = DEMO_QUIZ_QUESTIONS.filter(
      (q) => !userInterests.some((interest) => q.category.toLowerCase().includes(interest.toLowerCase()))
    );
    prioritizedPool = [...matched, ...unmatched];
  }

  // Select 5 questions deterministically
  const dailyCount = 5;
  const startIndex = positiveHash % prioritizedPool.length;
  const selectedQuestions = [];

  for (let i = 0; i < dailyCount; i++) {
    const idx = (startIndex + i) % prioritizedPool.length;
    selectedQuestions.push(prioritizedPool[idx]);
  }

  res.json({
    date: dateKey,
    quizTitle: "Today's Legal Challenge",
    subtitle: 'Test your legal awareness in two minutes.',
    totalQuestions: selectedQuestions.length,
    isPersonalized: userInterests.length > 0,
    questions: selectedQuestions,
  });
});

// 8. Quiz Answer Check Endpoint
app.post('/api/quiz/submit', (req, res) => {
  const { questionId, selectedIndex } = req.body;
  const question = DEMO_QUIZ_QUESTIONS.find((q) => q.id === questionId);

  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }

  const isCorrect = question.correctIndex === selectedIndex;
  res.json({
    questionId,
    selectedIndex,
    isCorrect,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    source: question.source,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NyayaPath Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
