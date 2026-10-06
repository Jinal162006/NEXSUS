import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper, Calendar, ArrowRight, Bookmark, Tag } from 'lucide-react';
import { LegalUpdateItem } from '../types/legal';
import { database } from '../services/database';

interface UpdatesPageProps {
  onExploreInGuidance?: (headline: string) => void;
  onToggleSaveUpdate?: (id: string) => void;
  savedUpdatesIds?: string[];
}

export const UpdatesPage: React.FC<UpdatesPageProps> = ({
  onExploreInGuidance,
  onToggleSaveUpdate,
  savedUpdatesIds: propSavedUpdatesIds,
}) => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<LegalUpdateItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [loading, setLoading] = useState(true);
  const [savedUpdatesIds, setSavedUpdatesIds] = useState<string[]>(
    propSavedUpdatesIds || database.getPreferences().savedUpdatesIds
  );

  const categories = [
    'All',
    'Cyber Crime',
    'Consumer',
    'Employment',
    'Property',
    'Business',
    'Finance',
    'Technology',
    'General',
  ];

  const tags = ['All', 'New Law', 'Amendment', 'Regulatory', 'Court Ruling', 'Public Advisory'];

  useEffect(() => {
    fetchUpdates();
  }, [selectedCategory, selectedTag]);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedTag !== 'All') params.append('tag', selectedTag);

      const res = await fetch(`/api/updates?${params.toString()}`);
      const data = await res.json();
      setUpdates(data.updates || []);
    } catch (err) {
      console.error('Failed to load updates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = (id: string) => {
    if (onToggleSaveUpdate) {
      onToggleSaveUpdate(id);
    } else {
      database.toggleBookmarkUpdate(id);
      setSavedUpdatesIds(database.getPreferences().savedUpdatesIds);
    }
  };

  const handleExplore = (headline: string) => {
    if (onExploreInGuidance) {
      onExploreInGuidance(headline);
    } else {
      navigate('/guidance');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-2 text-left">
      {/* Header */}
      <div className="border-b border-[#E7E5DF] pb-5 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
            LEGISLATIVE AWARENESS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
          Legal Updates & Amendments
        </h1>
        <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
          Recent legislative changes, regulatory circulars, and judicial precedents explained.
        </p>
      </div>

      {/* Category Pills */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] shrink-0 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[11px] rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1F242C] text-white font-semibold'
                  : 'bg-white border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] shrink-0 mr-1">
            Type:
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 text-[11px] rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#1F242C] text-white font-semibold'
                  : 'bg-white border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Updates Stream */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#9CA3AF]">Loading legal updates...</div>
      ) : (
        <div className="space-y-4">
          {updates.map((update) => (
            <div
              key={update.id}
              className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs hover:border-[#1F242C] transition-all text-left"
            >
              <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#111827]">
                    {update.category}
                  </span>
                  <span aria-hidden="true" className="text-[#9CA3AF]">·</span>
                  <span className="text-[10px] font-mono text-[#6B7280]">{update.tag}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px]">{update.date}</span>
                  <button
                    onClick={() => handleToggleSave(update.id)}
                    className="text-[#9CA3AF] hover:text-[#111827] cursor-pointer"
                    title="Bookmark Update"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        savedUpdatesIds.includes(update.id)
                          ? 'fill-[#1F242C] text-[#1F242C]'
                          : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#111827] leading-snug mb-3">
                {update.headline}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0]">
                  <span className="font-semibold text-[#111827] block mb-0.5">
                    What Changed?
                  </span>
                  <p className="text-[#4B5563] leading-relaxed">{update.whatChanged}</p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
                  <span className="font-semibold text-emerald-950 block mb-0.5">
                    Why It Matters?
                  </span>
                  <p className="text-emerald-900 leading-relaxed">{update.whyItMatters}</p>
                </div>

                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="font-semibold text-stone-900 block mb-0.5">
                    Who Is Affected?
                  </span>
                  <p className="text-stone-700 leading-relaxed">{update.whoAffected}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-[11px]">
                <span className="text-[#6B7280] font-mono">Source: {update.source}</span>
                <button
                  onClick={() => handleExplore(`Explain this legal change: ${update.headline}`)}
                  className="font-semibold text-[#1F242C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore in Guidance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdatesPage;
