import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar, Tag, Trash2, Play, RefreshCw, Film } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

function getYouTubeId(url) {
  if (!url) return null;
  const trimmed = url.trim();
  const m1 = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (m1) return m1[1];
  const m2 = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m2) return m2[1];
  const m3 = trimmed.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (m3) return m3[1];
  const m4 = trimmed.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (m4) return m4[1];
  const m5 = trimmed.match(/\/live\/([a-zA-Z0-9_-]{11})/);
  return m5 ? m5[1] : null;
}

const FB_SHARE_MAP = {
  '1PvJ2AVPcW': 'https://www.facebook.com/reel/1363652169086347/',
  '1JHsYSCzHV': 'https://www.facebook.com/reel/1087490990911079/',
  '14tbBerDfhX': 'https://www.facebook.com/reel/2405190683344268/',
  '1dpxHiLsvR': 'https://www.facebook.com/reel/969138829584724/',
  '1BpqhUz3P6': 'https://www.facebook.com/reel/2328405841255761/',
  '1Dq2NQ4pK8': 'https://www.facebook.com/reel/1074169458775398/',
  '1DnvPg6csm': 'https://www.facebook.com/reel/27212899438408418/',
  '18XgyxBSfG': 'https://www.facebook.com/reel/4306337859656139/',
  '1BTQ4SN7Hb': 'https://www.facebook.com/reel/2226215068110349/',
  '19yYLp9Wqg': 'https://www.facebook.com/reel/1646995013757948/',
  '19jUy8CUcK': 'https://www.facebook.com/reel/1594156038557415/',
};

function resolveVideoEmbed(url) {
  if (!url) return { embedUrl: '', type: 'direct' };
  const trimmed = url.trim();
  const ytId = getYouTubeId(trimmed);
  if (ytId) {
    return {
      embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`,
      type: 'youtube',
    };
  }
  if (
    trimmed.includes('facebook.com') ||
    trimmed.includes('fb.watch') ||
    trimmed.includes('fb.com')
  ) {
    let canonical = trimmed;
    for (const [key, reelUrl] of Object.entries(FB_SHARE_MAP)) {
      if (trimmed.includes(key)) {
        canonical = reelUrl;
        break;
      }
    }
    return {
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonical)}&show_text=0&autoplay=1`,
      type: 'facebook',
      originalUrl: trimmed,
    };
  }
  if (trimmed.includes('vimeo.com')) {
    const vimeoId = trimmed.split('vimeo.com/')[1]?.split('?')[0]?.split('/')[0];
    if (vimeoId && /^\d+$/.test(vimeoId)) {
      return {
        embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
        type: 'vimeo',
      };
    }
  }
  if (trimmed.includes('drive.google.com')) {
    const driveIdMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (driveIdMatch) {
      return {
        embedUrl: `https://drive.google.com/file/d/${driveIdMatch[1]}/preview`,
        type: 'drive',
      };
    }
  }
  if (trimmed.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) {
    return { embedUrl: trimmed, type: 'direct' };
  }
  return { embedUrl: trimmed, type: 'external' };
}

export function MediaDetailModal({ item, onClose, items = [], onSelectItem, isAdmin = false, onDeleteItem }) {
  const { isBN } = useLanguage ? useLanguage() : { isBN: false };
  const [tryIframe, setTryIframe] = useState(true);

  useEffect(() => {
    setTryIframe(true);
  }, [item?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const sameTypeItems = items.filter((i) => i.mediaType === item.mediaType);
  const currentIndex = sameTypeItems.findIndex((i) => i.id === item.id);

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onSelectItem(sameTypeItems[currentIndex - 1]);
    } else {
      onSelectItem(sameTypeItems[sameTypeItems.length - 1]);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < sameTypeItems.length - 1) {
      onSelectItem(sameTypeItems[currentIndex + 1]);
    } else {
      onSelectItem(sameTypeItems[0]);
    }
  };

  const videoMeta = item.mediaType === 'video' ? resolveVideoEmbed(item.mediaUrl) : null;
  const isReel = item.mediaType === 'video' && item.videoFormat === 'reel';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative w-full max-h-[92vh] bg-[#071A22] border border-[#00E5FF]/40 rounded-3xl shadow-[0_0_60px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden z-10 ${
            isReel ? 'max-w-xl' : 'max-w-5xl'
          }`}
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono font-bold uppercase">
                {item.category}
              </span>
              {item.videoFormat && (
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 text-[11px] font-mono">
                  {item.videoFormat}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {(isAdmin || !item?.id?.includes('noman-fb-')) && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(isBN ? `আপনি কি "${item.title}" ভিডিওটি স্থায়ীভাবে মুছে ফেলতে চান?` : `Are you sure you want to delete "${item.title}"?`)) {
                      if (onDeleteItem) onDeleteItem(item.id, item.title);
                      onClose();
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer mr-2 border border-red-400/40"
                  title={isBN ? "এই প্রজেক্টটি স্থায়ীভাবে ডিলিট করুন" : "Delete Project"}
                >
                  <Trash2 className="w-3.5 h-3.5 text-white" />
                  <span>{isBN ? 'মুছুন (Delete)' : 'Delete'}</span>
                </button>
              )}
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors ml-2"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media Player Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              {item.mediaType === 'video' && videoMeta ? (
                videoMeta.type === 'direct' ? (
                  <video
                    src={videoMeta.embedUrl}
                    controls
                    autoPlay
                    className={`w-full ${isReel ? 'max-h-[65vh] aspect-[9/16]' : 'aspect-video'}`}
                  />
                ) : videoMeta.type === 'facebook' ? (
                  tryIframe ? (
                    <div className={`relative w-full ${isReel ? 'aspect-[9/16] max-h-[70vh]' : 'aspect-video'} bg-black flex flex-col items-center justify-center`}>
                      <iframe
                        src={videoMeta.embedUrl}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setTryIframe(false)}
                          className="px-3 py-1.5 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-mono border border-white/20 transition-all cursor-pointer"
                        >
                          {isBN ? '🎬 পোস্টার মোড' : '🎬 Cinema Mode'}
                        </button>
                        <a
                          href={item.mediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold shadow-[0_0_15px_rgba(24,119,242,0.5)] transition-all"
                        >
                          <span>{isBN ? 'ফেসবুকে দেখুন' : 'Watch on Facebook'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className={`relative w-full ${isReel ? 'aspect-[9/16] max-h-[70vh]' : 'aspect-video'} bg-neutral-950 rounded-2xl overflow-hidden group flex items-center justify-center border border-white/10`}>
                      {/* Cinema Video Poster */}
                      <img
                        src={(!item.thumbnailUrl || item.thumbnailUrl.includes('video_fallback')) ? './portfolio/fb_reel_4.jpg' : item.thumbnailUrl}
                        alt={item.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = './portfolio/fb_reel_4.jpg';
                        }}
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] group-hover:scale-105 group-hover:brightness-[0.7] transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#1877F2]/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                          <Film className="w-3.5 h-3.5" />
                          <span>Facebook Cinema HD</span>
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 z-20">
                        <a
                          href={item.mediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold shadow-[0_0_20px_rgba(24,119,242,0.6)] transition-all cursor-pointer"
                        >
                          <span>{isBN ? 'ফেসবুকে খুলুন' : 'Open Facebook'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Central Glowing Play Launcher */}
                      <div className="relative z-20 flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md">
                        <button
                          type="button"
                          onClick={() => setTryIframe(true)}
                          className="relative group/play flex items-center justify-center cursor-pointer"
                          title={isBN ? 'ভিডিওটি প্লে করুন' : 'Play video'}
                        >
                          <span className="absolute -inset-3 rounded-full bg-[#1877F2]/20 opacity-50" />
                          <span className="absolute -inset-2 rounded-full bg-[#00E5FF]/40 blur-md group-hover:blur-lg transition-all" />
                          <div className="relative w-20 h-20 rounded-full bg-[#1877F2] hover:bg-[#166FE5] border-2 border-white/40 flex items-center justify-center text-white shadow-[0_0_35px_rgba(24,119,242,0.8)] transition-all transform group-hover/play:scale-105 active:scale-95">
                            <Play className="w-8 h-8 fill-current ml-1 text-white" />
                          </div>
                        </button>

                        <div className="space-y-2">
                          <a
                            href={item.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#1877F2] hover:bg-[#166FE5] text-white font-extrabold text-sm shadow-[0_0_25px_rgba(24,119,242,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>{isBN ? 'ফেসবুকে ফুল এইচডি ভিডিওটি দেখুন' : 'Watch Full HD Video on Facebook'}</span>
                            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                          </a>
                          <p className="text-[11px] text-neutral-300 font-light leading-relaxed max-w-xs mx-auto drop-shadow-md">
                            {isBN
                              ? 'ফেসবুকের ক্রস-সাইট সিকিউরিটি বিধিনিষেধের কারণে সর্বোচ্চ ৪K/এইচডি কোয়ালিটি ও অরিজিনাল সাউন্ড সহ দেখতে সরাসরি ফেসবুকে প্লে করুন।'
                              : 'Due to Facebook cross-site permissions, launch directly in Facebook for full 4K/HD fidelity and original audio.'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setTryIframe(true)}
                          className="text-[11px] text-neutral-400 hover:text-white underline transition-colors cursor-pointer pt-1 flex items-center gap-1 mx-auto"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>{isBN ? 'ব্রাউজার আইফ্রেমে লোড করার চেষ্টা করুন' : 'Try embedding inside browser'}</span>
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div className={`w-full ${isReel ? 'aspect-[9/16] max-h-[65vh]' : 'aspect-video'}`}>
                    <iframe
                      src={videoMeta.embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                )
              ) : (
                <div className="relative group/graphic w-full flex items-center justify-center">
                  <img
                    src={item.mediaUrl || item.thumbnailUrl}
                    alt={item.title}
                    className="max-h-[70vh] w-auto mx-auto object-contain rounded-xl shadow-2xl"
                  />
                  {item.externalUrl && item.externalUrl.includes('facebook.com') && (
                    <div className="absolute top-3 right-3 z-20">
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold shadow-[0_0_15px_rgba(24,119,242,0.5)] transition-all"
                      >
                        <span>View on Facebook</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Description and Metadata */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {item.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => onDeleteItem && onDeleteItem(item.id, item.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all cursor-pointer border border-rose-400/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>প্রজেক্ট মুছুন (Admin)</span>
                    </button>
                  )}
                  {item.externalUrl ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/50 hover:bg-[#1877F2] text-xs font-bold text-white shadow-[0_0_15px_rgba(24,119,242,0.3)] transition-all"
                    >
                      <span>{item.externalUrl.includes('facebook.com') ? 'View on Facebook' : 'View External'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : item.mediaUrl && item.mediaType === 'video' ? (
                    <a
                      href={item.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00E5FF]/40 text-xs font-mono text-neutral-300 hover:text-[#00E5FF] transition-colors"
                    >
                      <span>Watch External</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                {item.description}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-neutral-400 text-xs font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{item.dateAdded}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
