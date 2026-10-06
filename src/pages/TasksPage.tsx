import React, { useState, useEffect } from 'react';
import { database } from '../services/database';
import { TaskRecord, CaseRecord } from '../types/legal';
import {
  CheckSquare,
  Plus,
  Clock,
  Calendar,
  Filter,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Briefcase,
  X,
} from 'lucide-react';

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [activeView, setActiveView] = useState<'all' | 'today' | 'upcoming' | 'overdue' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [newCaseId, setNewCaseId] = useState<string>('');

  useEffect(() => {
    setTasks(database.getTasks());
    setCases(database.getCases());
  }, []);

  const handleToggleComplete = (id: string) => {
    database.toggleTaskComplete(id);
    setTasks(database.getTasks());
  };

  const handleDeleteTask = (id: string) => {
    database.deleteTask(id);
    setTasks(database.getTasks());
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const linkedCase = cases.find((c) => c.id === newCaseId);

    database.createTask({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Action step for dispute resolution',
      caseId: newCaseId || undefined,
      caseTitle: linkedCase?.title,
      dueDate: newDueDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      priority: newPriority,
      status: 'To Do',
    });

    setTasks(database.getTasks());
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewDueDate('');
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((t) => {
    if (activeView === 'completed') return t.status === 'Completed';
    if (t.status === 'Completed') return false;
    if (activeView === 'today') return t.dueDate === todayStr;
    if (activeView === 'overdue') return t.dueDate < todayStr;
    if (activeView === 'upcoming') return t.dueDate > todayStr;
    return true; // 'all' pending
  });

  return (
    <div className="space-y-6 max-w-5xl text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
            Task Management
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            Track procedural deadlines, document collection requirements, and legal notice replies.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E7E5DF] overflow-x-auto scrollbar-thin">
        {[
          { key: 'all', label: `Pending (${tasks.filter((t) => t.status !== 'Completed').length})` },
          { key: 'today', label: 'Due Today' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'overdue', label: 'Overdue' },
          { key: 'completed', label: `Completed (${tasks.filter((t) => t.status === 'Completed').length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveView(tab.key as any)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeView === tab.key
                ? 'border-[#1F242C] text-[#111827]'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-[#E3E1D9] divide-y divide-[#F3F4F6] shadow-2xs">
        {filteredTasks.map((task) => {
          const isCompleted = task.status === 'Completed';
          const isOverdue = task.dueDate < todayStr && !isCompleted;

          return (
            <div
              key={task.id}
              className="p-4 flex items-start justify-between gap-3 text-left hover:bg-[#FAF9F5] transition-colors group"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => handleToggleComplete(task.id)}
                  className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    isCompleted
                      ? 'bg-[#1F242C] border-[#1F242C] text-white'
                      : 'border-[#D5D3CB] hover:border-black'
                  }`}
                  aria-label="Toggle completed"
                >
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-bold ${
                        isCompleted ? 'line-through text-[#9CA3AF]' : 'text-[#111827]'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                        task.priority === 'Urgent'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : task.priority === 'High'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-stone-50 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {task.description && (
                    <p className="text-[11px] text-[#4B5563] mt-1 leading-relaxed">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[#6B7280]">
                    <span
                      className={`flex items-center gap-1 font-medium ${
                        isOverdue ? 'text-rose-700 font-bold' : ''
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      Due: {task.dueDate} {isOverdue && '(Overdue)'}
                    </span>

                    {task.caseTitle && (
                      <span className="flex items-center gap-1 text-[#2C3E50] font-medium truncate max-w-xs">
                        <Briefcase className="w-3 h-3" />
                        {task.caseTitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-[#9CA3AF] hover:text-rose-600 rounded-md transition-opacity cursor-pointer shrink-0"
                title="Delete Task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="p-12 text-center text-xs text-[#9CA3AF] space-y-2">
            <CheckSquare className="w-6 h-6 mx-auto text-[#D5D3CB]" />
            <p>No tasks in this view.</p>
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E3E1D9] max-w-md w-full p-6 text-left shadow-xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-3">
              <div className="font-serif text-lg font-bold text-[#111827]">
                Create Action Task
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#9CA3AF] hover:text-[#111827] text-lg font-bold p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Collect invoice records from XYZ Logistics"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] focus:outline-hidden focus:border-[#1F242C] bg-[#FAF9F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">
                  Connect to Case (Optional)
                </label>
                <select
                  value={newCaseId}
                  onChange={(e) => setNewCaseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] bg-[#FAF9F5]"
                >
                  <option value="">No Case (General Action)</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] bg-[#FAF9F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] bg-[#FAF9F5]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">
                  Description / Sub-steps
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Additional details, reference numbers or evidence notes..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] focus:outline-hidden focus:border-[#1F242C] bg-[#FAF9F5]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#D5D3CB] text-xs font-semibold hover:bg-[#FAF9F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black cursor-pointer shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
