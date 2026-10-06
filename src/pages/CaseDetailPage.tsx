import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { database } from '../services/database';
import { CaseRecord, TaskRecord, LegalDocument } from '../types/legal';
import {
  Briefcase,
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  CheckSquare,
  Compass,
  Plus,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Upload,
} from 'lucide-react';

export const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentCase, setCurrentCase] = useState<CaseRecord | undefined>(undefined);
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents' | 'tasks' | 'notes'>('overview');
  const [newNote, setNewNote] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    if (!id) return;
    const c = database.getCaseById(id);
    if (!c) {
      navigate('/cases');
      return;
    }
    setCurrentCase(c);
    const allTasks = database.getTasks().filter((t) => t.caseId === id);
    setTasks(allTasks);
    const allDocs = database.getDocuments().filter((d) => d.caseId === id);
    setDocuments(allDocs);
  }, [id, navigate]);

  if (!currentCase) return null;

  const handleToggleTask = (taskId: string) => {
    database.toggleTaskComplete(taskId);
    if (id) setTasks(database.getTasks().filter((t) => t.caseId === id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !id) return;

    database.createTask({
      title: newTaskTitle.trim(),
      description: `Task created inside case ${currentCase.title}`,
      caseId: id,
      caseTitle: currentCase.title,
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      priority: 'Medium',
      status: 'To Do',
    });

    setTasks(database.getTasks().filter((t) => t.caseId === id));
    setNewTaskTitle('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !id) return;

    const updatedNotes = [...currentCase.notes, newNote.trim()];
    const updated = database.updateCase(id, { notes: updatedNotes });
    if (updated) setCurrentCase(updated);
    setNewNote('');
  };

  return (
    <div className="space-y-6 max-w-5xl text-left">
      {/* Back button & Title Header */}
      <div>
        <button
          onClick={() => navigate('/cases')}
          className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] flex items-center gap-1.5 mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cases</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1F242C] text-white">
                {currentCase.category}
              </span>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase ${
                  currentCase.priority === 'Urgent'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {currentCase.priority} Priority
              </span>
              <span className="text-xs text-[#6B7280]">
                Updated {currentCase.lastUpdated}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#111827]">
              {currentCase.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/documents')}
              className="px-3.5 py-2 rounded-lg border border-[#D5D3CB] bg-white text-xs font-semibold hover:bg-[#FAF9F5] flex items-center gap-1.5 shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Attach Document</span>
            </button>
            <button
              onClick={() => navigate('/guidance')}
              className="px-3.5 py-2 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black flex items-center gap-1.5 shadow-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Ask Guidance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E7E5DF] overflow-x-auto scrollbar-thin">
        {[
          { key: 'overview', label: 'Overview', icon: <Briefcase className="w-3.5 h-3.5" /> },
          { key: 'timeline', label: 'Timeline', icon: <Calendar className="w-3.5 h-3.5" /> },
          { key: 'documents', label: `Documents (${documents.length})`, icon: <FileText className="w-3.5 h-3.5" /> },
          { key: 'tasks', label: `Tasks (${tasks.length})`, icon: <CheckSquare className="w-3.5 h-3.5" /> },
          { key: 'notes', label: `Notes (${currentCase.notes.length})`, icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-[#1F242C] text-[#111827]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Case Summary
            </h3>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              {currentCase.summary}
            </p>
            {currentCase.guidanceQuery && (
              <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] text-xs">
                <span className="font-semibold text-[#111827] block mb-0.5">
                  Initial User Query:
                </span>
                <span className="text-[#4B5563]">"{currentCase.guidanceQuery}"</span>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                ATTACHED DOCUMENTS
              </span>
              <div className="text-xl font-bold font-serif text-[#111827] mt-1">
                {documents.length}
              </div>
              <span className="text-[11px] text-[#6B7280]">Verified files</span>
            </div>

            <div className="bg-white rounded-xl border border-[#E3E1D9] p-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                ACTIVE ACTION TASKS
              </span>
              <div className="text-xl font-bold font-serif text-[#111827] mt-1">
                {tasks.filter((t) => t.status !== 'Completed').length}
              </div>
              <span className="text-[11px] text-[#6B7280]">Due deadlines</span>
            </div>

            <div className="bg-white rounded-xl border border-[#E3E1D9] p-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                TIMELINE STAGES
              </span>
              <div className="text-xl font-bold font-serif text-[#111827] mt-1">
                {currentCase.timeline.length}
              </div>
              <span className="text-[11px] text-[#6B7280]">Logged milestones</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 shadow-2xs space-y-6">
          <div className="border-b border-[#EAE8E0] pb-3">
            <h3 className="text-sm font-bold text-[#111827]">Case Chronology</h3>
            <p className="text-xs text-[#6B7280]">Sequential audit of notices received, analyses, and responses.</p>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EAE8E0]">
            {currentCase.timeline.map((evt, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#1F242C] ring-4 ring-white" />
                <div className="text-[10px] font-mono text-[#6B7280]">{evt.date}</div>
                <h4 className="text-xs font-bold text-[#111827] mt-0.5">{evt.title}</h4>
                <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">{evt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Documents */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111827]">Linked Evidence & Notices</h3>
            <button
              onClick={() => navigate('/documents')}
              className="px-3 py-1.5 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black"
            >
              + Upload Document
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate('/documents')}
                className="p-4 bg-white rounded-xl border border-[#E3E1D9] flex items-center justify-between hover:border-[#1F242C] cursor-pointer transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] text-[#2C3E50]">
                    <FileText className="w-5 h-5 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111827]">{doc.name}</h4>
                    <div className="text-[10px] text-[#6B7280] mt-0.5">
                      {doc.size} · Uploaded {doc.uploadedDate} · {doc.status}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold text-[#1F242C] hover:underline">
                  View Analysis →
                </span>
              </div>
            ))}

            {documents.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-[#E3E1D9] text-xs text-[#6B7280]">
                No documents attached to this case yet. Upload notices or proof in the Document Center.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111827]">Case Action Items</h3>
          </div>

          {/* Quick Add Task */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add action item for this case..."
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] bg-white focus:outline-hidden focus:border-[#1F242C]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black cursor-pointer shadow-xs"
            >
              Add Task
            </button>
          </form>

          <div className="bg-white rounded-xl border border-[#E3E1D9] divide-y divide-[#F3F4F6] p-2">
            {tasks.map((task) => {
              const isCompleted = task.status === 'Completed';
              return (
                <div key={task.id} className="p-3 flex items-start gap-3 text-left">
                  <button
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                    className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                      isCompleted
                        ? 'bg-[#1F242C] border-[#1F242C] text-white'
                        : 'border-[#D5D3CB] hover:border-black'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-semibold ${
                          isCompleted ? 'line-through text-[#9CA3AF]' : 'text-[#111827]'
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200">
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[10px] text-[#6B7280]">
                      <span>Due {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {tasks.length === 0 && (
              <div className="p-6 text-center text-xs text-[#9CA3AF]">
                No action tasks created yet for this case.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <form onSubmit={handleAddNote} className="space-y-2">
            <textarea
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add observation, lawyer meeting notes, or vendor phone remarks..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] bg-white focus:outline-hidden focus:border-[#1F242C]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black cursor-pointer shadow-xs"
              >
                Save Note
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {currentCase.notes.map((note, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-white border border-[#E3E1D9] text-xs text-[#374151] leading-relaxed"
              >
                {note}
              </div>
            ))}

            {currentCase.notes.length === 0 && (
              <div className="p-6 text-center text-xs text-[#9CA3AF] bg-white rounded-lg border border-[#E3E1D9]">
                No notes recorded yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseDetailPage;
