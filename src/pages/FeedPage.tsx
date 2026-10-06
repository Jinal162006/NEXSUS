import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, List } from 'lucide-react';
import { FeedPost } from '../types/legal';
import { FeedCard } from '../components/feed/FeedCard';
import { ReelCard } from '../components/feed/ReelCard';
import { OldNewComparison } from '../components/feed/OldNewComparison';
import { LEGAL_REELS } from '../data/legalReels';
import { database } from '../services/database';

interface FeedPageProps {
  onExploreInGuidance?: (query: string) => void;
  onToggleSavePost?: (id: string) => void;
  savedFeedIds?: string[];
}

export const FeedPage: React.FC<FeedPageProps> = ({
  onExploreInGuidance,
  onToggleSavePost,
  savedFeedIds: propSavedFeedIds,
}) => {
  const navigate = useNavigate();
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedReelCategory, setSelectedReelCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'feed' | 'reels'>('reels');
  const [loading, setLoading] = useState(true);
  const [savedFeedIds, setSavedFeedIds] = useState<string[]>(
    propSavedFeedIds || database.getPreferences().savedFeedIds
  );

  const types = [
    'All',
    'KNOW YOUR RIGHTS',
    'NEW LAWS',
    'AMENDMENTS',
    'OLD LAW VS NEW LAW',
    'LEGAL TERMS',
    'LEGAL AWARENESS',
  ];

  const categories = [
    'All',
    'Cyber Crime',
    'Consumer',
    'Employment',
    'Property',
    'Business',
    'Privacy',
  ];

  const reelCategories = [
    'All',
    'Know Your Rights',
    'Rules & Regulations',
    'GST / Business',
    'Cyber Crime',
    'Consumer',
    'Legal Awareness',
    'Legal Basics',
    'Legal Terms',
  ];

  useEffect(() => {
    if (viewMode === 'feed') fetchFeed();
  }, [selectedType, selectedCategory, viewMode]);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      let url = '/api/feed';
      const params = new URLSearchParams();
      if (selectedType !== 'All') params.append('type', selectedType);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      setFeedPosts(data.feed || []);
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = (id: string) => {
    if (onToggleSavePost) {
      onToggleSavePost(id);
    } else {
      database.toggleBookmarkFeed(id);
      setSavedFeedIds(database.getPreferences().savedFeedIds);
    }
  };

  const handleExplore = (query: string) => {
    if (onExploreInGuidance) {
      onExploreInGuidance(query);
    } else {
      navigate('/guidance');
    }
  };

  const filteredReels = useMemo(() => {
    if (selectedReelCategory === 'All') return LEGAL_REELS;
    return LEGAL_REELS.filter(
      (reel) => reel.category === selectedReelCategory || reel.feedType === selectedReelCategory
    );
  }, [selectedReelCategory]);

  return (
    <div className="max-w-6xl mx-auto py-2 text-left">
      <div className="border-b border-[#E7E5DF] pb-5 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
            SHORT-FORM LEGAL EDUCATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
            Legal Reels & Feed
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5 max-w-2xl">
            Real uploaded legal videos plus uploaded legal-awareness audio, presented in one focused feed.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white border border-[#D5D3CB] p-1 rounded-xl self-start sm:self-auto shadow-2xs">
          <button
            onClick={() => setViewMode('feed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'feed' ? 'bg-[#1F242C] text-white shadow-2xs' : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Feed View</span>
          </button>
          <button
            onClick={() => setViewMode('reels')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'reels' ? 'bg-[#1F242C] text-white shadow-2xs' : 'text-[#4B5563] hover:text-[#111827]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Legal Reels</span>
          </button>
        </div>
      </div>

      {viewMode === 'feed' ? (
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] shrink-0 mr-1">Type:</span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 text-[11px] rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedType === t
                    ? 'bg-[#1F242C] text-white font-semibold'
                    : 'bg-white border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] shrink-0 mr-1">Topic:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 text-[11px] rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-[#1F242C] text-white font-semibold'
                    : 'bg-white border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] shrink-0 mr-1">Filter:</span>
            {reelCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedReelCategory(category)}
                className={`px-3 py-1.5 text-[11px] rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedReelCategory === category
                    ? 'bg-[#1F242C] text-white font-semibold'
                    : 'bg-white border border-[#D5D3CB] text-[#374151] hover:border-[#1F242C]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-2">
            {filteredReels.length} uploaded legal media items · 6 video reels + 3 audio reels
          </p>
        </div>
      )}

      {viewMode === 'feed' ? (
        loading ? (
          <div className="p-12 text-center text-xs text-[#9CA3AF]">Loading legal awareness cards...</div>
        ) : (
          <div className="space-y-4 max-w-3xl">
            {feedPosts.map((post) => (
              <div key={post.id}>
                {post.type === 'OLD LAW VS NEW LAW' ? (
                  <OldNewComparison
                    post={post}
                    onExplore={(t) => handleExplore(`Explain the legal change: ${t}`)}
                  />
                ) : (
                  <FeedCard
                    post={post}
                    isSaved={savedFeedIds.includes(post.id)}
                    onToggleSave={handleToggleSave}
                    onExploreInGuidance={handleExplore}
                  />
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="h-[calc(100vh-205px)] min-h-[680px] overflow-y-auto snap-y snap-mandatory scroll-smooth pr-1">
          {filteredReels.map((reel, index) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={index}
              total={filteredReels.length}
              onExplore={handleExplore}
            />
          ))}
        </div>
      )}

      {viewMode === 'feed' && !loading && feedPosts.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E3E1D9] text-xs text-[#6B7280]">
          No legal feed cards found matching your selection.
        </div>
      )}
      {viewMode === 'reels' && filteredReels.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E3E1D9] text-xs text-[#6B7280]">
          No uploaded legal reels match this filter.
        </div>
      )}
    </div>
  );
};

export default FeedPage;
