import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { X, Plus, RefreshCw, Trash2, Video, Film, Smartphone, AlertTriangle } from 'lucide-react';

function extractYouTubeId(url) {
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
  return null;
}

export function VideoFormModal({ isOpen, onClose, items, onUpdateItems, onResetDefault }) {
  const { isBN } = useLanguage();
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Video Editing');
  const [videoFormat, setVideoFormat] = useState('landscape');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Video Editing, Premiere Pro, Motion');

  if (!isOpen) return null;

  const detectedYtId = extractYouTubeId(videoUrl);
  const previewThumbnail = detectedYtId
    ? `https://img.youtube.com/vi/${detectedYtId}/hqdefault.jpg`
    : '';

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    const newItem = {
      id: `custom-video-${Date.now()}`,
      title: title.trim() || `New Video Project #${items.length + 1}`,
      category,
      mediaType: 'video',
      videoFormat: (videoUrl.includes('/shorts/') || videoUrl.includes('/reel/')) ? 'reel' : videoFormat,
      thumbnailUrl: previewThumbnail || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
      mediaUrl: videoUrl.trim(),
      description: description.trim() || 'Dynamic video project featuring professional editing and kinetic motion graphics.',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      dateAdded: '2026',
      isHighlighted: false,
    };

    onUpdateItems([newItem, ...items]);
    setVideoUrl('');
    setTitle('');
    setDescription('');
    onClose();
  };

  const handleDeleteItem = (id) => {
    if (window.confirm(isBN ? 'আপনি কি এই প্রজেক্টটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this project?')) {
      onUpdateItems(items.filter((item) => item.id !== id));
    }
  };

  const videoItems = items.filter((i) => i.mediaType === 'video');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#071A22] border border-[#00E5FF]/40 rounded-3xl shadow-[0_0_60px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden z-10 max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
                <Video className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isBN ? 'ভিডিও যুক্ত ও পরিচালনা করুন' : 'Manage Video Portfolio'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {/* Add New Video Form */}
            <form onSubmit={handleAddVideo} className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-sm font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
                {isBN ? '+ নতুন ভিডিও যুক্ত করুন' : '+ Add New Video'}
              </h3>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-neutral-300">
                  YouTube / Vimeo / Video URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://youtu.be/... or https://youtube.com/shorts/..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
                />
              </div>

              {previewThumbnail && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-[#00E5FF]/20">
                  <img
                    src={previewThumbnail}
                    alt="Preview"
                    className="w-20 aspect-video object-cover rounded-lg"
                  />
                  <div className="text-xs">
                    <span className="text-emerald-400 font-bold block">✓ YouTube ID Detected: {detectedYtId}</span>
                    <span className="text-neutral-400">Auto-extracted thumbnail verified</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">Video Title</label>
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">Video Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setVideoFormat('landscape')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        videoFormat === 'landscape'
                          ? 'bg-[#00E5FF] text-black'
                          : 'bg-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>16:9 Landscape</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoFormat('reel')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        videoFormat === 'reel'
                          ? 'bg-[#00E5FF] text-black'
                          : 'bg-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>9:16 Reel</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-neutral-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Project details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] cursor-pointer"
              >
                {isBN ? 'পোর্টফোলিওতে যোগ করুন' : 'Add to Portfolio'}
              </button>
            </form>

            {/* Existing Video List */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                {isBN ? 'বর্তমান ভিডিও প্রজেক্টসমূহ' : 'Current Video Projects'} ({videoItems.length})
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {videoItems.map((vid) => (
                  <div
                    key={vid.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-14 aspect-video object-cover rounded-md shrink-0 bg-black"
                      />
                      <div className="truncate text-xs">
                        <span className="font-bold text-white block truncate">{vid.title}</span>
                        <span className="text-neutral-400 font-mono">{vid.videoFormat}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(vid.id)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset to Factory Default */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{isBN ? 'ডিফল্ট কাজে ফিরে যেতে চান?' : 'Need to reset default showcase?'}</span>
              </div>
              <button
                type="button"
                onClick={onResetDefault}
                className="px-3 py-1.5 rounded-lg border border-red-500/30 hover:border-red-500 text-red-400 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isBN ? 'রিসেট ডিফল্ট' : 'Reset to Default'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
