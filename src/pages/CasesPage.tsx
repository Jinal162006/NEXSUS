import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../services/database';
import { CaseRecord, LegalCategory } from '../types/legal';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Clock,
  FileText,
  CheckSquare,
  Sparkles,
  X,
} from 'lucide-react';

export const CasesPage: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Case Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<LegalCategory>('Business');
  const [newSummary, setNewSummary] = useState('');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('High');

  useEffect(() => {
    setCases(database.getCases());
  }, []);

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = database.createCase({
      title: newTitle.trim(),
      category: newCategory,
      summary: newSummary.trim() || 'Active dispute case tracking.',
      status: 'Active',
      priority: newPriority,
      documentIds: [],
      taskIds: [],
      timeline: [
        {
          title: 'Case Created',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          desc: 'Opened case workspace in NyayaPath.',
        },
      ],
      notes: [],
    });

    setCases(database.getCases());
    setShowCreateModal(false);
    navigate(`/cases/${created.id}`);
  };

  const categories = ['All', 'Business', 'Cyber Crime', 'Consumer', 'Property', 'Employment'];

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
            My Cases
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            Track legal disputes, attached notices, evidence records, and compliance timelines.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Case</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases or notices..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D5D3CB] bg-white focus:outline-hidden focus:border-[#1F242C]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1F242C] text-white font-semibold'
                  : 'bg-white border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((cs) => (
          <div
            key={cs.id}
            onClick={() => navigate(`/cases/${cs.id}`)}
            className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs hover:border-[#1F242C] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#6B7280] uppercase tracking-wider text-[10px]">
                  {cs.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                      cs.priority === 'Urgent'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : cs.priority === 'High'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-stone-50 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {cs.priority}
                  </span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-medium ${
                      cs.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-100 text-stone-800'
                    }`}
                  >
                    {cs.status}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#111827] group-hover:text-black leading-snug">
                {cs.title}
              </h3>

              <p className="text-xs text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
                {cs.summary}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#6B7280]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  {cs.documentIds.length} docs
                </span>
                <span className="flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  {cs.taskIds.length} tasks
                </span>
              </div>
              <span className="font-semibold text-[#1F242C] group-hover:underline flex items-center gap-1">
                Open Workspace <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E3E1D9] space-y-3">
          <Briefcase className="w-8 h-8 text-[#9CA3AF] mx-auto" />
          <h3 className="text-sm font-bold text-[#111827]">No cases found</h3>
          <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
            Create a case manually or use the Legal Guidance Bot to generate one automatically.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-lg bg-[#1F242C] text-white text-xs font-semibold"
          >
            Create Your First Case
          </button>
        </div>
      )}

      {/* Create Case Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E3E1D9] max-w-lg w-full p-6 text-left shadow-xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-3">
              <div className="font-serif text-lg font-bold text-[#111827]">
                Create New Case Record
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#9CA3AF] hover:text-[#111827] text-lg font-bold p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">
                  Case Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. GST Billing Notice & Tax Invoice Reconciliation"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] focus:outline-hidden focus:border-[#1F242C] bg-[#FAF9F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">
                    Legal Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as LegalCategory)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] bg-[#FAF9F5]"
                  >
                    <option value="Business">Business</option>
                    <option value="Cyber Crime">Cyber Crime</option>
                    <option value="Consumer">Consumer</option>
                    <option value="Employment">Employment</option>
                    <option value="Property">Property</option>
                    <option value="Finance">Finance</option>
                  </select>
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
                  Summary / What happened
                </label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Describe notice intimation or dispute details..."
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
                  Create Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesPage;
