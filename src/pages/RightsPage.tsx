import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Scale, Bookmark, Filter, ArrowRight, ShieldCheck } from 'lucide-react';
import { RightItem } from '../types/legal';
import { RightsCard } from '../components/guidance/RightsCard';
import { database } from '../services/database';

interface RightsPageProps {
  onStartGuidanceWithRight?: (rightTitle: string) => void;
  onToggleSaveRight?: (id: string) => void;
  savedRightsIds?: string[];
}

export const RightsPage: React.FC<RightsPageProps> = ({
  onStartGuidanceWithRight,
  onToggleSaveRight,
  savedRightsIds: propSavedRightsIds,
}) => {
  const navigate = useNavigate();
  const [rights, setRights] = useState<RightItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [savedRightsIds, setSavedRightsIds] = useState<string[]>(
    propSavedRightsIds || database.getPreferences().savedRightsIds
  );

  const categories = [
    'All',
    'Cyber Crime',
    'Consumer',
    'Employment',
    'Property',
    'Business',
    'Privacy',
    'Family',
    'General',
  ];

  useEffect(() => {
    fetchRights();
  }, [search, selectedCategory]);

  const fetchRights = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/rights?${params.toString()}`);
      const data = await res.json();
      setRights(data.rights || []);
    } catch (err) {
      console.error('Failed to load rights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = (id: string) => {
    if (onToggleSaveRight) {
      onToggleSaveRight(id);
    } else {
      database.toggleBookmarkRight(id);
      setSavedRightsIds(database.getPreferences().savedRightsIds);
    }
  };

  const handleStartGuidance = (title: string) => {
    if (onStartGuidanceWithRight) {
      onStartGuidanceWithRight(title);
    } else {
      navigate('/guidance');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-2 text-left">
      {/* Header */}
      <div className="border-b border-[#E7E5DF] pb-5 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
            CITIZEN LEGAL PROTECTIONS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
          Know Your Rights
        </h1>
        <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
          Codified citizen rights, statutory citations, and plain-language legal explainers.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rights (e.g. refund, deposit, salary)..."
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

      {/* Rights Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#9CA3AF]">
          Loading codified rights directory...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rights.map((right) => (
            <RightsCard
              key={right.id}
              right={right}
              isSaved={savedRightsIds.includes(right.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}

      {!loading && rights.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E3E1D9] text-xs text-[#6B7280]">
          No rights found matching your search. Try another category or keyword.
        </div>
      )}
    </div>
  );
};

export default RightsPage;
