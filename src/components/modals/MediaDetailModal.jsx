import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar, Tag } from 'lucide-react';

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

export function MediaDetailModal({ item, onClose, items = [], onSelectItem }) {
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
                <img
                  src={item.mediaUrl || item.thumbnailUrl}
                  alt={item.title}
                  className="max-h-[70vh] w-auto mx-auto object-contain rounded-xl"
                />
              )}
            </div>

            {/* Description and Metadata */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {item.title}
                </h2>
                {item.mediaUrl && item.mediaType === 'video' && (
                  <a
                    href={item.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00E5FF]/40 text-xs font-mono text-neutral-300 hover:text-[#00E5FF] transition-colors self-start sm:self-auto"
                  >
                    <span>Watch External</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
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
