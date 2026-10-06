import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  RotateCcw,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { ChatMessage, GuidanceResponse } from '../types/legal';
import { ChatComposer } from '../components/guidance/ChatComposer';
import { ChatMessageView } from '../components/guidance/ChatMessageView';
import {
  getStoredChatHistory,
  saveStoredChatHistory,
} from '../utils/storage';
import { database } from '../services/database';

export const GuidancePage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latestGuidance, setLatestGuidance] = useState<GuidanceResponse | undefined>(undefined);
  const [savedRightsIds, setSavedRightsIds] = useState<string[]>(database.getPreferences().savedRightsIds);
  const [createdCaseId, setCreatedCaseId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const history = getStoredChatHistory();
    if (history && history.length > 0) {
      setMessages(history);
      const lastGuidance = [...history].reverse().find((m) => m.guidanceData)?.guidanceData;
      if (lastGuidance) {
        setLatestGuidance(lastGuidance);
      }
    } else {
      const welcomeMsg: ChatMessage = {
        id: 'welcome-msg',
        sender: 'assistant',
        timestamp: Date.now(),
        text: 'Welcome to NyayaPath Guidance. Explain your legal situation in everyday language. We will break down possible legal areas, codified rights, procedural routes, competent authorities, evidence checklists, and prioritized next steps.',
        quickReplies: [
          'My business received a GST billing legal notice',
          'My online payment was fraudulent',
          'My employer has not paid my salary',
          'My landlord refuses to return my security deposit',
          'I bought a defective product online',
          'I received a defamation notice',
        ],
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveStoredChatHistory(messages);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (
    text: string,
    file?: { name: string; type: string; base64?: string; previewUrl?: string; size?: string }
  ) => {
    if (!text.trim() && !file) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: Date.now(),
      text: text || 'Please review this attached legal document/notice.',
      attachedFile: file
        ? {
            name: file.name,
            type: file.type,
            previewUrl: file.previewUrl,
            size: file.size,
          }
        : undefined,
    };

    const loadingMsg: ChatMessage = {
      id: `loading-${Date.now()}`,
      sender: 'assistant',
      timestamp: Date.now(),
      text: 'Analyzing legal context and applicable codified remedies...',
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setIsLoading(true);

    try {
      let endpoint = '/api/guidance';
      let payload: any = {
        query: text || 'Analyze this document and explain applicable rights.',
        previousContext: latestGuidance,
      };

      if (file && file.base64) {
        endpoint = '/api/guidance/image';
        payload = {
          imageBase64: file.base64,
          mimeType: file.type || 'image/jpeg',
          prompt: text || 'Review this legal document, notice, or receipt.',
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const responseData = await res.json();
      const guidance: GuidanceResponse = responseData.data;

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        timestamp: Date.now(),
        text: guidance.summary,
        guidanceData: guidance,
      };

      setLatestGuidance(guidance);
      setMessages((prev) => prev.filter((m) => !m.isLoading).concat(assistantMsg));
    } catch (err) {
      console.error('Failed to get guidance:', err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        timestamp: Date.now(),
        text: 'Server guidance service returned fallback data.',
        isError: true,
      };
      setMessages((prev) => prev.filter((m) => !m.isLoading).concat(errorMsg));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCaseFromGuidance = (guidance: GuidanceResponse) => {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newCase = database.createCase({
      title: `${guidance.possibleArea} — Dispute Case`,
      category: guidance.category,
      summary: guidance.summary || guidance.whatThisMayInvolve,
      status: 'Active',
      priority: 'High',
      documentIds: [],
      taskIds: [],
      guidanceQuery: guidance.userQuery,
      timeline: [
        {
          title: 'Guidance Session Completed',
          date: today,
          desc: `Identified primary route: ${guidance.routes?.[0]?.title || 'Regulatory Grievance'}.`,
        },
      ],
      notes: [
        `Recommended Forum: ${guidance.authority?.name || 'Jurisdictional Authority'}`,
        `Immediate Next Step: ${guidance.nextSteps?.[0] || 'Collect dispute evidence'}`,
      ],
    });

    // Also auto-create a starting task
    if (guidance.nextSteps && guidance.nextSteps.length > 0) {
      database.createTask({
        title: guidance.nextSteps[0],
        description: `Action item recommended by NyayaPath Guidance for ${newCase.title}`,
        caseId: newCase.id,
        caseTitle: newCase.title,
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        priority: 'High',
        status: 'To Do',
      });
    }

    setCreatedCaseId(newCase.id);
  };

  const handleToggleSaveRight = (rightId: string) => {
    database.toggleBookmarkRight(rightId);
    setSavedRightsIds(database.getPreferences().savedRightsIds);
  };

  const handleClearHistory = () => {
    if (confirm('Reset guidance conversation and history?')) {
      const resetMsg: ChatMessage = {
        id: 'welcome-reset',
        sender: 'assistant',
        timestamp: Date.now(),
        text: 'Session reset. Explain your legal situation in your own words.',
      };
      setMessages([resetMsg]);
      setLatestGuidance(undefined);
      setCreatedCaseId(null);
      saveStoredChatHistory([resetMsg]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto text-left">
      {/* Editorial Header */}
      <div className="pb-3 border-b border-[#E7E5DF] flex items-center justify-between shrink-0 bg-[#FAF9F5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              CORE INTELLIGENCE
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-[#111827]">
            Legal Guidance Bot
          </h2>
          <p className="text-xs text-[#4B5563]">
            Describe what happened in natural language. Our system maps out rights, routes, forums, and required evidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {latestGuidance && (
            <button
              onClick={() => handleCreateCaseFromGuidance(latestGuidance)}
              disabled={Boolean(createdCaseId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
                createdCaseId
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-[#1F242C] text-white hover:bg-black'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{createdCaseId ? 'Case Created' : 'Create Case'}</span>
            </button>
          )}

          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-lg border border-[#D5D3CB] bg-white text-[#6B7280] hover:text-[#111827] text-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset Session"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Case Created Success Banner */}
      {createdCaseId && (
        <div className="my-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Case recorded in your workspace with linked initial tasks.</span>
          </div>
          <button
            onClick={() => navigate(`/cases/${createdCaseId}`)}
            className="font-semibold underline flex items-center gap-1"
          >
            <span>Open Case</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Messages Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-1 sm:px-2 py-4 space-y-2 scrollbar-thin">
        {messages.map((msg) => (
          <ChatMessageView
            key={msg.id}
            message={msg}
            onFollowUpClick={(query) => handleSendMessage(query)}
            onSaveRight={handleToggleSaveRight}
            savedRightsIds={savedRightsIds}
            onCreateCase={
              msg.guidanceData
                ? () => handleCreateCaseFromGuidance(msg.guidanceData!)
                : undefined
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Multimodal Bottom Composer: Camera, Upload, Text, Microphone, Send */}
      <div className="shrink-0 mt-2">
        <ChatComposer
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onSelectSuggestion={(prompt) => handleSendMessage(prompt)}
          showSuggestions={messages.length <= 2}
        />
      </div>
    </div>
  );
};

export default GuidancePage;
