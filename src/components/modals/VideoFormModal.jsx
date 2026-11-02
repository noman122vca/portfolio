import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { X, Plus, RefreshCw, Trash2, Video, Film, Smartphone, AlertTriangle, Code, Copy, Check, Image as ImageIcon, Info } from 'lucide-react';

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
  const m5 = trimmed.match(/\/live\/([a-zA-Z0-9_-]{11})/);
  if (m5) return m5[1];
  const m6 = trimmed.match(/\/v\/([a-zA-Z0-9_-]{11})/);
  if (m6) return m6[1];
  return null;
}

export function VideoFormModal({ isOpen, onClose, items, onUpdateItems, onResetDefault }) {
  const { isBN } = useLanguage();
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Video Editing');
  const [videoFormat, setVideoFormat] = useState('landscape');
  const [customThumbnail, setCustomThumbnail] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Video Editing, Premiere Pro, Motion');
  const [copiedItem, setCopiedItem] = useState(null);
  const [exportedAll, setExportedAll] = useState(false);

  if (!isOpen) return null;

  const detectedYtId = extractYouTubeId(videoUrl);
  const isFb = videoUrl.includes('facebook.com') || videoUrl.includes('fb.watch') || videoUrl.includes('fb.com');
  const isChannel = videoUrl.includes('/@') || videoUrl.includes('/channel/');
  const autoThumbnail = detectedYtId
    ? `https://img.youtube.com/vi/${detectedYtId}/hqdefault.jpg`
    : '';
  const finalThumbnail = customThumbnail.trim() || autoThumbnail || './portfolio/fb_reel_4.jpg';

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    const isReelOrShort = (videoUrl.includes('/shorts/') || videoUrl.includes('/reel/') || videoUrl.includes('fb.watch'));

    const newItem = {
      id: `custom-video-${Date.now()}`,
      title: title.trim() || (isFb ? 'Facebook Video Production' : (isChannel ? 'YouTube Official Channel Video' : `New Video Project #${items.length + 1}`)),
      category,
      mediaType: 'video',
      videoFormat: isReelOrShort ? 'reel' : videoFormat,
      thumbnailUrl: finalThumbnail,
      mediaUrl: videoUrl.trim(),
      description: description.trim() || 'Dynamic video project featuring professional editing and kinetic motion graphics.',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      dateAdded: '2026',
      isHighlighted: false,
    };

    onUpdateItems([newItem, ...items], isBN ? '✓ নতুন ভিডিও প্রজেক্ট সফলভাবে যুক্ত হয়েছে!' : '✓ Video project successfully added to portfolio!');
    setVideoUrl('');
    setTitle('');
    setCustomThumbnail('');
    setDescription('');
    onClose();

    // Smooth scroll to projects
    const projEl = document.getElementById('projects');
    if (projEl) {
      projEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyItemJson = (item) => {
    const jsonStr = JSON.stringify(item, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedItem(item.id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const exportAllJson = () => {
    const jsonStr = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setExportedAll(true);
    setTimeout(() => setExportedAll(false), 2500);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm(isBN ? 'আপনি কি এই প্রজেক্টটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this project?')) {
      onUpdateItems(items.filter((item) => item.id !== id), isBN ? 'প্রজেক্ট মুছে ফেলা হয়েছে' : 'Project removed');
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
                  {isBN ? 'ভিডিও লিংক (YouTube / Facebook / Reels / Shorts) *' : 'Video URL (YouTube / Facebook / Reels / Shorts) *'}
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://youtu.be/... or https://www.facebook.com/reel/... or https://fb.watch/..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
                />
              </div>

              {isFb && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/30 text-sky-300 text-xs">
                  <Info className="w-4 h-4 shrink-0 text-[#1877F2] mt-0.5" />
                  <span>
                    {isBN
                      ? '✓ ফেসবুক ভিডিও / রিল লিংক সনাক্ত হয়েছে! নিচে আকর্ষণীয় থাম্বনেইল ছবি আপলোড করুন এবং প্রজেক্ট টাইটেল দিন।'
                      : '✓ Facebook Video / Reel detected! Please upload a cover thumbnail and title below.'}
                  </span>
                </div>
              )}

              {isChannel && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <span>
                    {isBN
                      ? 'ইউটিউব চ্যানেল লিংক সনাক্ত হয়েছে। অনুগ্রহ করে নিচে টাইটেল এবং কাস্টম থাম্বনেইল দিন (বা নির্দিষ্ট ভিডিও লিংক পেস্ট করুন)।'
                      : 'YouTube Channel URL detected. Please specify a title and thumbnail below (or paste a specific video/short URL).'}
                  </span>
                </div>
              )}

              {/* Custom Thumbnail Input */}
              <div className="space-y-2.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono font-bold text-[#00E5FF]">
                    {isBN ? '📷 ভিডিও থাম্বনেইল ছবি (ডিভাইস থেকে সিলেক্ট করুন)' : '📷 Video Thumbnail Cover (Select from Device)'}
                  </label>
                  {isFb && !customThumbnail && (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {isBN ? 'ফেসবুকের জন্য কাস্টম ছবি আবশ্যক' : 'Custom Image Recommended'}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold cursor-pointer transition-all">
                    <span>{isBN ? '📁 কম্পিউটার / ফোন থেকে ছবি নির্বাচন করুন' : '📁 Choose Image from Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="url"
                    placeholder={isBN ? 'বা ছবির অনলাইন লিংক (Or Image URL)...' : 'Or thumbnail image URL...'}
                    value={customThumbnail.startsWith('data:') ? '' : customThumbnail}
                    onChange={(e) => setCustomThumbnail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500"
                  />
                </div>

                {customThumbnail.trim() || autoThumbnail ? (
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/40 border border-[#00E5FF]/30">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={customThumbnail.trim() || autoThumbnail}
                        alt="Preview"
                        className="w-20 aspect-video object-cover rounded-lg shrink-0 bg-neutral-900 border border-white/10"
                      />
                      <div className="text-xs truncate">
                        <span className="text-[#00E5FF] font-bold block">
                          {detectedYtId ? `✓ YouTube Thumbnail (${detectedYtId})` : (isBN ? '✓ থাম্বনেইল ছবি যুক্ত হয়েছে' : '✓ Custom Thumbnail Loaded')}
                        </span>
                        <span className="text-neutral-400 font-mono text-[11px] truncate block max-w-sm">
                          {videoUrl || (isBN ? 'থাম্বনেইল প্রস্তুত' : 'Ready')}
                        </span>
                      </div>
                    </div>
                    {customThumbnail && (
                      <button
                        type="button"
                        onClick={() => setCustomThumbnail('')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors text-xs cursor-pointer"
                        title={isBN ? 'ছবি সরান' : 'Remove Image'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : isFb ? (
                  <div className="p-2.5 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 text-[11px] text-sky-300 flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0 text-[#1877F2]" />
                    <span>
                      {isBN
                        ? 'ফেসবুক ভিডিওর জন্য ওপরের বাটন চেপে একটি আকর্ষণীয় কাভার ছবি আপলোড করতে পারেন।'
                        : 'You can upload a custom cover image from your device for this Facebook video.'}
                    </span>
                  </div>
                ) : null}
              </div>

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

            {/* Developer Handover & Export JSON Tool */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#00E5FF]/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {isBN ? 'ক্লায়েন্ট বা ডেভেলপার এক্সপোর্ট' : 'Developer & Client Export'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={exportAllJson}
                  className="px-3 py-1.5 rounded-lg bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {exportedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{exportedAll ? (isBN ? 'কপি হয়েছে!' : 'Copied!') : (isBN ? 'সব কাজের কোড কপি' : 'Copy All JSON')}</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                {isBN 
                  ? '💡 ক্লায়েন্ট কীভাবে কাজ দেখবে? আপনি বা ক্লায়েন্ট এখানে যেকোনো কাজ যুক্ত করলে তা এই ব্রাউজারে সাথে সাথে দেখতে পাবেন। তবে পৃথিবীর সকল দর্শকের জন্য স্থায়ী করতে \'সব কাজের কোড কপি\' করে portfolioData.js এ বসিয়ে গিট পুশ করুন।'
                  : '💡 Permanent Global Deployment: Added items render immediately on your browser. To make them permanently available to all clients globally, click Copy All JSON, paste into portfolioData.js, and git push.'}
              </p>
            </div>

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
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => copyItemJson(vid)}
                        className="p-2 rounded-lg text-neutral-400 hover:text-[#00E5FF] hover:bg-white/5 transition-colors"
                        title={isBN ? 'এই প্রজেক্টের কোড কপি করুন' : 'Copy Project JSON'}
                      >
                        {copiedItem === vid.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(vid.id)}
                        className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
