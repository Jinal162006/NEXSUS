import React, { useEffect, useRef, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Maximize,
  Bookmark,
  BookmarkCheck,
  Share2,
  MessageCircle,
  ExternalLink,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Headphones,
  Video,
} from 'lucide-react';
import type { LegalReel } from '../../data/legalReels';

const REEL_PLAY_EVENT = 'nyayapath-reel-play';
const SAVE_KEY = 'nyayapath-saved-reels';

interface ReelCardProps {
  reel: LegalReel;
  index: number;
  total: number;
  onExplore?: (title: string) => void;
}

export const ReelCard: React.FC<ReelCardProps> = ({ reel, index, total, onExplore }) => {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(reel.mediaType === 'video');
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem(SAVE_KEY) || '[]') as string[];
      setSaved(ids.includes(reel.id));
    } catch {
      setSaved(false);
    }
  }, [reel.id]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const onPlay = () => {
      setPlaying(true);
      window.dispatchEvent(new CustomEvent(REEL_PLAY_EVENT, { detail: reel.id }));
    };
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => {
      setProgress(media.currentTime || 0);
      setDuration(Number.isFinite(media.duration) ? media.duration : 0);
    };
    const onLoadedMetadata = () => setDuration(Number.isFinite(media.duration) ? media.duration : 0);
    const onOtherMediaPlay = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (id !== reel.id) media.pause();
    };

    media.addEventListener('play', onPlay);
    media.addEventListener('pause', onPause);
    media.addEventListener('timeupdate', onTimeUpdate);
    media.addEventListener('loadedmetadata', onLoadedMetadata);
    window.addEventListener(REEL_PLAY_EVENT, onOtherMediaPlay);

    return () => {
      media.removeEventListener('play', onPlay);
      media.removeEventListener('pause', onPause);
      media.removeEventListener('timeupdate', onTimeUpdate);
      media.removeEventListener('loadedmetadata', onLoadedMetadata);
      window.removeEventListener(REEL_PLAY_EVENT, onOtherMediaPlay);
    };
  }, [reel.id]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
          media.pause();
          return;
        }

        if (entry.intersectionRatio >= 0.72 && reel.mediaType === 'video') {
          media.muted = true;
          setMuted(true);
          media.play().catch(() => setPlaying(false));
        }
      },
      { threshold: [0, 0.72, 1] }
    );

    observer.observe(media);
    return () => observer.disconnect();
  }, [reel.mediaType]);

  const togglePlay = () => {
    const media = mediaRef.current;
    if (!media) return;
    if (media.paused) {
      media.play().catch(() => setPlaying(false));
    } else {
      media.pause();
    }
  };

  const toggleMute = () => {
    const media = mediaRef.current;
    if (!media || reel.mediaType === 'audio') return;
    media.muted = !media.muted;
    setMuted(media.muted);
  };

  const setSeek = (value: number) => {
    const media = mediaRef.current;
    if (!media || !duration) return;
    media.currentTime = value;
    setProgress(value);
  };

  const toggleSave = () => {
    try {
      const ids = JSON.parse(localStorage.getItem(SAVE_KEY) || '[]') as string[];
      const next = ids.includes(reel.id) ? ids.filter((id) => id !== reel.id) : [...ids, reel.id];
      localStorage.setItem(SAVE_KEY, JSON.stringify(next));
      setSaved(next.includes(reel.id));
    } catch {
      setSaved((value) => !value);
    }
  };

  const share = async () => {
    const url = `${window.location.origin}/feed?reel=${encodeURIComponent(reel.id)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: reel.title, text: reel.description, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // User cancelled sharing or clipboard is unavailable.
    }
  };

  const openGuidance = () => onExplore?.(`I watched the NyayaPath legal reel "${reel.title}". Explain this topic in simple language and tell me what I should know or do next.`);

  const move = (direction: 'next' | 'prev') => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-nyayapath-reel]'));
    const currentIndex = cards.findIndex((card) => card.dataset.reelId === reel.id);
    if (currentIndex < 0) return;
    const nextIndex = direction === 'next' ? Math.min(total - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
    cards[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <article
      data-nyayapath-reel
      data-reel-id={reel.id}
      className="min-h-[calc(100vh-185px)] md:min-h-[760px] snap-start flex items-center justify-center py-3 md:py-6"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(310px,520px)_300px] gap-5 items-stretch justify-center">
        <div className="relative overflow-hidden rounded-2xl bg-[#111315] border border-[#24272B] shadow-xl">
          <div className="absolute z-20 top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 bg-black/65 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md">
              {reel.mediaType === 'video' ? <Video className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
              {reel.mediaType === 'video' ? 'Legal Reel' : 'Audio Reel'}
            </span>
            <span className="bg-black/65 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-md">
              {index + 1} / {total}
            </span>
          </div>

          {reel.mediaType === 'video' ? (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={reel.assetPath}
              className="w-full aspect-[9/16] object-cover max-h-[78vh] mx-auto bg-black"
              playsInline
              preload="metadata"
              loop
              muted={muted}
              onClick={togglePlay}
            />
          ) : (
            <div className="aspect-[9/16] max-h-[78vh] flex flex-col items-center justify-center px-8 py-10 bg-[#1B1E22] text-white">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8" />
              </div>
              <div className="text-center max-w-xs">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 font-bold">Uploaded legal audio</div>
                <h3 className="text-lg font-serif font-bold mt-2 leading-snug">{reel.title}</h3>
                <p className="text-xs text-white/65 mt-3 leading-relaxed">{reel.description}</p>
              </div>
              <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={reel.assetPath} preload="metadata" className="w-full mt-7" controls />
            </div>
          )}

          <div className="absolute z-20 bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="flex gap-1.5">
              <button onClick={togglePlay} className="p-2.5 rounded-full bg-black/65 text-white hover:bg-black/80" title={playing ? 'Pause' : 'Play'}>
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              {reel.mediaType === 'video' && (
                <button onClick={toggleMute} className="p-2.5 rounded-full bg-black/65 text-white hover:bg-black/80" title={muted ? 'Unmute' : 'Mute'}>
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}
              {reel.mediaType === 'video' && (
                <button
                  onClick={() => {
                    const media = mediaRef.current as HTMLVideoElement | null;
                    media?.requestFullscreen?.();
                  }}
                  className="p-2.5 rounded-full bg-black/65 text-white hover:bg-black/80"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-1.5">
              <button onClick={toggleSave} className="p-2.5 rounded-full bg-black/65 text-white hover:bg-black/80" title={saved ? 'Saved' : 'Save'}>
                {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
              <button onClick={share} className="p-2.5 rounded-full bg-black/65 text-white hover:bg-black/80" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {reel.mediaType === 'video' && (
            <div className="absolute z-20 left-3 right-3 bottom-[68px] flex items-center gap-2 text-white text-[9px]">
              <span>{formatTime(progress)}</span>
              <input
                aria-label="Reel progress"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(progress, duration || 0)}
                onChange={(event) => setSeek(Number(event.target.value))}
                className="w-full accent-white"
              />
              <span>{formatTime(duration)}</span>
            </div>
          )}

          <div className="absolute z-20 right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
            <button onClick={() => move('prev')} disabled={index === 0} className="p-2 rounded-full bg-black/55 text-white disabled:opacity-25" title="Previous reel">
              <ChevronUp className="w-4 h-4" />
            </button>
            <button onClick={() => move('next')} disabled={index === total - 1} className="p-2 rounded-full bg-black/55 text-white disabled:opacity-25" title="Next reel">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <aside className="bg-white border border-[#E3E1D9] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#6B7280]">{reel.category}</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9CA3AF]">{reel.feedType}</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-[#111827] mt-2 leading-tight">{reel.title}</h2>
            <p className="text-sm text-[#4B5563] mt-3 leading-relaxed">{reel.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {reel.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-[#F5F4F0] border border-[#E7E5DF] text-[#4B5563]">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <button onClick={openGuidance} className="w-full py-2.5 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" /> Ask NyayaPath
            </button>
            <button onClick={() => onExplore?.(`Tell me more about ${reel.title}`)} className="w-full py-2.5 rounded-lg border border-[#D5D3CB] text-[#1F242C] text-xs font-semibold hover:border-[#1F242C] transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> Learn More
            </button>
            <p className="text-[10px] text-[#9CA3AF] text-center pt-1">{reel.source}</p>
          </div>
        </aside>
      </div>
    </article>
  );
};
