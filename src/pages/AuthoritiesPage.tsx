import React, { useState, useEffect } from 'react';
import { Search, Landmark, ShieldCheck, MapPin, Globe, ExternalLink, Filter } from 'lucide-react';
import { AuthorityDetail } from '../types/legal';
import { AuthorityCard } from '../components/guidance/AuthorityCard';

export const AuthoritiesPage: React.FC = () => {
  const [authorities, setAuthorities] = useState<AuthorityDetail[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Cyber Crime',
    'Consumer',
    'Employment',
    'Property',
    'Business',
    'Finance',
    'Privacy',
    'Family',
    'General',
  ];

  useEffect(() => {
    fetchAuthorities();
  }, [search, selectedCategory, selectedState, onlineOnly]);

  const fetchAuthorities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedState !== 'All') params.append('state', selectedState);
      if (search.trim()) params.append('search', search.trim());
      if (onlineOnly) params.append('onlineOnly', 'true');

      const res = await fetch(`/api/authorities?${params.toString()}`);
      const data = await res.json();
      setAuthorities(data.authorities || []);
    } catch (err) {
      console.error('Failed to load authorities:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24 text-left">
      {/* Header */}
      <div className="border-b border-[#E7E5DF] pb-5 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1F242C] text-white">
            FORUMS & JURISDICTION DIRECTORY
          </span>
          <span className="text-xs text-[#6B7280]">Where Should I Go?</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#111827] mt-1">
          Authority & Forum Directory
        </h2>
        <p className="text-xs text-[#4B5563] mt-0.5">
          Find designated tribunals, ombudsmen, commissions, and cyber cells competent to handle your legal matter.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search forums, tribunals, handles (e.g., '1930', 'Labour Commissioner', 'RERA', 'Ombudsman')..."
            className="w-full bg-white rounded-xl border border-[#D5D3CB] pl-10 pr-4 py-2.5 text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1F242C] shadow-xs"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1F242C] text-white font-semibold'
                    : 'bg-white border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-[#374151] cursor-pointer select-none shrink-0 bg-white px-3 py-1.5 rounded-lg border border-[#D5D3CB]">
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(e) => setOnlineOnly(e.target.checked)}
              className="rounded text-[#1F242C] focus:ring-0"
            />
            <span>Online E-Filing Available</span>
          </label>
        </div>
      </div>

      {/* Directory Cards */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#6B7280] flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-[#1F242C] border-t-transparent rounded-full animate-spin" />
          <span>Searching authority directory...</span>
        </div>
      ) : authorities.length === 0 ? (
        <div className="py-16 text-center text-xs text-[#6B7280] bg-white rounded-xl border border-[#E3E1D9] p-8">
          No authorities match the specified criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {authorities.map((auth) => (
            <AuthorityCard key={auth.id} authority={auth} />
          ))}
        </div>
      )}
    </div>
  );
};
