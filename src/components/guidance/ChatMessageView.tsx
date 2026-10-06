import React from 'react';
import {
  Compass,
  FileText,
  User,
  Scale,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import { ChatMessage, GuidanceResponse } from '../../types/legal';
import { RightsCard } from './RightsCard';
import { RouteCard } from './RouteCard';
import { RoutePath } from './RoutePath';
import { AuthorityCard } from './AuthorityCard';
import { DocumentChecklist } from './DocumentChecklist';
import { TimelineCard } from './TimelineCard';
import { NextStepCard } from './NextStepCard';
import { SourceCard } from './SourceCard';
import { SectionExplainerCard } from './SectionExplainerCard';

interface ChatMessageViewProps {
  message: ChatMessage;
  onFollowUpClick?: (followUpQuery: string, guidanceContext?: GuidanceResponse) => void;
  onSaveRight?: (rightId: string) => void;
  savedRightsIds?: string[];
  onAddReminder?: (title: string) => void;
  onCreateCase?: () => void;
}

export const ChatMessageView: React.FC<ChatMessageViewProps> = ({
  message,
  onFollowUpClick,
  onSaveRight,
  savedRightsIds = [],
  onAddReminder,
  onCreateCase,
}) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  const g = message.guidanceData;

  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <div className="text-xs text-[#6B7280] bg-[#F4F3EE] border border-[#E3E1D9] px-3.5 py-1.5 rounded-full shadow-2xs text-center max-w-md">
          {message.text}
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end my-3">
        <div className="max-w-[85%] sm:max-w-[70%] bg-[#1F242C] text-white rounded-2xl rounded-tr-xs p-3.5 sm:p-4 text-left shadow-xs">
          {message.attachedFile && (
            <div className="mb-2 p-2 rounded-lg bg-white/10 border border-white/15 flex items-center gap-2 text-xs">
              {message.attachedFile.previewUrl ? (
                <img
                  src={message.attachedFile.previewUrl}
                  alt="Attachment"
                  className="w-10 h-10 object-cover rounded border border-white/20"
                />
              ) : (
                <FileText className="w-5 h-5 text-stone-300" />
              )}
              <div className="truncate">
                <div className="font-semibold truncate">{message.attachedFile.name}</div>
                <div className="text-[10px] text-stone-300">{message.attachedFile.size}</div>
              </div>
            </div>
          )}
          <p className="text-sm leading-relaxed">{message.text}</p>
          <div className="text-[10px] text-stone-400 mt-1.5 text-right font-mono">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  }

  // Assistant / Guidance Message
  if (message.isLoading) {
    return (
      <div className="flex justify-start my-4">
        <div className="bg-white rounded-2xl rounded-tl-xs border border-[#E3E1D9] p-4 text-left shadow-xs flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-[#1F242C] border-t-transparent animate-spin" />
          <span className="text-xs text-[#4B5563] font-medium">
            Reviewing your question and statutory pathways...
          </span>
        </div>
      </div>
    );
  }

  if (message.isError || !g) {
    return (
      <div className="flex justify-start my-4">
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-left max-w-xl text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Guidance Notice</span>
            <p>{message.text || 'Unable to review question at this time. Showing available reference guidance.'}</p>
          </div>
        </div>
      </div>
    );
  }

  const followUpButtons = [
    'Explain my rights',
    'Where should I go?',
    'What documents do I need?',
    'What should I do first?',
    'Explain this section',
    'What are my options?',
  ];

  return (
    <div className="flex justify-start my-4">
      <div className="w-full max-w-4xl bg-transparent space-y-4">
        {/* SECTION 1: POSSIBLE LEGAL AREA */}
        <div className="bg-white rounded-xl border border-[#E3E1D9] p-4 sm:p-5 text-left shadow-xs">
          <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-2.5 mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-[#1F242C] text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                1. POSSIBLE LEGAL AREA
              </span>
            </div>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C]">
              {g.category}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111827] leading-tight">
            {g.possibleArea}
          </h3>

          <p className="text-xs sm:text-sm text-[#374151] mt-2 leading-relaxed">
            {g.summary}
          </p>
        </div>

        {/* SECTION 2: WHAT THIS MAY INVOLVE */}
        {g.whatThisMayInvolve && (
          <div className="bg-[#FAF9F5] rounded-xl border border-[#E3E1D9] p-4 sm:p-5 text-left shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                2. WHAT THIS MAY INVOLVE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              {g.whatThisMayInvolve}
            </p>
          </div>
        )}

        {/* SECTION 3: KNOW YOUR RIGHTS */}
        {g.rights && g.rights.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F242C] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#2C3E50]" />
                3. KNOW YOUR RIGHTS ({g.rights.length} Potentially Relevant)
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {g.rights.map((right) => (
                <RightsCard
                  key={right.id}
                  right={right}
                  isSaved={savedRightsIds.includes(right.id)}
                  onToggleSave={onSaveRight}
                />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: POSSIBLE ROUTES */}
        {g.routes && g.routes.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F242C] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#2C3E50]" />
                4. POSSIBLE ROUTES FORWARD
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {g.routes.map((route, i) => (
                <RouteCard key={route.id || i} route={route} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION: LEGAL ROUTE PATH (Major differentiator) */}
        {g.routeJourney && (
          <RoutePath
            situation={g.routeJourney.situation || g.userQuery}
            legalArea={g.routeJourney.legalArea || g.possibleArea}
            recommendedRoute={g.routeJourney.recommendedRoute}
            authorityForum={g.routeJourney.authorityForum || g.authority.name}
            primaryDocuments={g.routeJourney.primaryDocuments || g.documents.map((d) => d.name)}
            immediateNextStep={g.routeJourney.immediateNextStep || g.nextSteps[0]}
          />
        )}

        {/* SECTION 5: WHERE SHOULD I GO? (Authority / Forum) */}
        {g.authority && (
          <div>
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F242C]">
                5. WHERE SHOULD I GO? (AUTHORITY / FORUM)
              </span>
            </div>
            <AuthorityCard authority={g.authority} />
          </div>
        )}

        {/* SECTION 6: DOCUMENTS / EVIDENCE CHECKLIST */}
        {g.documents && g.documents.length > 0 && (
          <div>
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F242C]">
                6. DOCUMENTS & EVIDENCE PREPARATION
              </span>
            </div>
            <DocumentChecklist documents={g.documents} />
          </div>
        )}

        {/* SECTION 7: TIMELINE */}
        {g.timeline && g.timeline.length > 0 && (
          <div>
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F242C]">
                7. ESTIMATED TIMELINE
              </span>
            </div>
            <TimelineCard timeline={g.timeline} />
          </div>
        )}

        {/* SECTION 8: POSSIBLE NEXT STEP */}
        {g.nextSteps && g.nextSteps.length > 0 && (
          <div>
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F242C]">
                8. POSSIBLE IMMEDIATE NEXT STEPS
              </span>
            </div>
            <NextStepCard nextSteps={g.nextSteps} onAddReminder={onAddReminder} />
          </div>
        )}

        {/* SECTION: STATUTORY EXPLAINER (if available) */}
        {g.relevantSectionExplainer && (
          <SectionExplainerCard explainer={g.relevantSectionExplainer} />
        )}

        {/* SECTION 9 & 10: SOURCES & DISCLAIMER */}
        <SourceCard sources={g.sources} disclaimer={g.disclaimer} />

        {/* Follow-up / Action Section */}
        {onCreateCase && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={onCreateCase}
              className="px-4 py-2 rounded-xl bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>+ Create Case Record from this Analysis</span>
            </button>
          </div>
        )}

        {/* FOLLOW-UP QUESTIONS: Quick Action Pills */}
        <div className="bg-white rounded-xl border border-[#E3E1D9] p-4 text-left shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] font-semibold mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#1F242C]" />
            <span>Continue the conversation / Ask follow-up:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {followUpButtons.map((btn, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onFollowUpClick && onFollowUpClick(btn, g)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#FAF9F5] border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C] hover:text-[#111827] hover:bg-white transition-all flex items-center gap-1 shadow-2xs"
              >
                <span>{btn}</span>
                <ArrowRight className="w-3 h-3 text-[#6B7280]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
