import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AboutPage } from './pages/AboutPage';
import { OnboardingPage } from './pages/OnboardingPage';

// Authenticated Pages
import { DashboardPage } from './pages/DashboardPage';
import { GuidancePage } from './pages/GuidancePage';
import { CasesPage } from './pages/CasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { TasksPage } from './pages/TasksPage';
import { RightsPage } from './pages/RightsPage';
import { FeedPage } from './pages/FeedPage';
import { QuizPage } from './pages/QuizPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { AuthoritiesPage } from './pages/AuthoritiesPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  useEffect(() => {
    document.title = 'NyayaPath — Understand your rights. Find your way forward.';
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ========================================================
              PUBLIC ROUTES
              ======================================================== */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* ========================================================
              AUTHENTICATED ROUTES (Inside AppLayout with Sidebar)
              ======================================================== */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/guidance" element={<GuidancePage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/cases/:id" element={<CaseDetailPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/rights" element={<RightsPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/authorities" element={<AuthoritiesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
