import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Video,
  Image as ImageIcon,
  Layers,
  Upload,
  Trash2,
  CheckCircle2,
  Cloud,
  LogOut,
  Sparkles,
  Film,
  Smartphone,
  Info,
  ExternalLink,
  Plus
} from 'lucide-react';
import { addProjectToCloud, deleteProjectFromCloud } from '../../config/firebase';
import { useLanguage } from '../../context/LanguageContext';

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
  return null;
}

const FB_SHARE_THUMB_MAP = {
  '1PvJ2AVPcW': './portfolio/fb_reel_1.jpg',
  '1JHsYSCzHV': './portfolio/fb_reel_2.jpg',
  '14tbBerDfhX': './portfolio/fb_reel_3.jpg',
  '1dpxHiLsvR': './portfolio/fb_reel_4.jpg',
  '1BpqhUz3P6': './portfolio/fb_reel_5.jpg',
  '1Dq2NQ4pK8': './portfolio/fb_reel_6.jpg',
  '1DnvPg6csm': './portfolio/fb_reel_7.jpg',
  '18XgyxBSfG': './portfolio/fb_reel_8.jpg',
  '1BTQ4SN7Hb': './portfolio/fb_reel_9.jpg',
  '19yYLp9Wqg': './portfolio/fb_reel_10.jpg',
  '19jUy8CUcK': './portfolio/fb_reel_11.jpg',
};

function resolveAutoVideoThumbnail(url, detectedYtId) {
  if (detectedYtId) {
    return `https://img.youtube.com/vi/${detectedYtId}/hqdefault.jpg`;
  }
  if (!url) return './portfolio/fb_reel_4.jpg';
  for (const [key, thumb] of Object.entries(FB_SHARE_THUMB_MAP)) {
    if (url.includes(key)) return thumb;
  }
  return './portfolio/fb_reel_4.jpg';
}

export function AdminDashboardModal({
  isOpen,
  onClose,
  cloudItems = [],
  allPortfolioItems = [],
  onLogout,
  onNotify,
  onAddLocalProject,
  onDeleteProject,
  onClearCategory,
  onResetDefault,
}) {
  const { isBN } = useLanguage();
  const [activeTab, setActiveTab] = useState('add-video'); // 'add-video' | 'add-graphic' | 'manage'
  const [manageFilter, setManageFilter] = useState('all'); // 'all' | 'video' | 'graphic'
  const [manageSearch, setManageSearch] = useState('');

  // Video Form State
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('Video Editing');
  const [videoFormat, setVideoFormat] = useState('landscape');
  const [videoCustomThumb, setVideoCustomThumb] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoTags, setVideoTags] = useState('Video Editing, Premiere Pro, Motion');

  // Graphic Form State
  const [graphicTitle, setGraphicTitle] = useState('');
  const [graphicCategory, setGraphicCategory] = useState('Graphic Design');
  const [graphicImage, setGraphicImage] = useState('');
  const [graphicExternalUrl, setGraphicExternalUrl] = useState('');
  const [graphicDesc, setGraphicDesc] = useState('');
  const [graphicTags, setGraphicTags] = useState('Graphic Design, Photoshop, Visual Art');

  if (!isOpen) return null;

  const detectedYtId = extractYouTubeId(videoUrl);
  const isFb = videoUrl.includes('facebook.com') || videoUrl.includes('fb.watch') || videoUrl.includes('fb.com');
  const autoVideoThumb = resolveAutoVideoThumbnail(videoUrl, detectedYtId);
  const finalVideoThumb = videoCustomThumb.trim() || autoVideoThumb;

  const handleVideoThumbUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoCustomThumb(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGraphicImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setGraphicImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublishVideo = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    const isReelOrShort = videoUrl.includes('/shorts/') || videoUrl.includes('/reel/') || videoUrl.includes('fb.watch');

    const newVideo = {
      id: `video-${Date.now()}`,
      title: videoTitle.trim() || (isFb ? 'Facebook Video Production' : (isChannel ? 'YouTube Official Video' : 'New Video Production')),
      category: videoCategory,
      mediaType: 'video',
      videoFormat: isReelOrShort ? 'reel' : videoFormat,
      thumbnailUrl: finalVideoThumb,
      mediaUrl: videoUrl.trim(),
      description: videoDesc.trim() || 'Dynamic video project featuring professional editing and kinetic motion graphics.',
      tags: videoTags.split(',').map((t) => t.trim()).filter(Boolean),
      dateAdded: '2026',
      isHighlighted: false,
    };

    // 1. Immediately persist to local portfolio (Optimistic UI - Zero Waiting!)
    if (onAddLocalProject) {
      onAddLocalProject(newVideo);
    }

    // 2. Immediately close modal & reset form
    setVideoUrl('');
    setVideoTitle('');
    setVideoCustomThumb('');
    setVideoDesc('');
    onClose();

    // 3. Smooth scroll to projects
    const projEl = document.getElementById('projects');
    if (projEl) projEl.scrollIntoView({ behavior: 'smooth' });

    onNotify(isBN ? '✓ ভিডিও পোর্টফোলিওতে সফলভাবে যুক্ত হয়েছে!' : '✓ Video project successfully added to portfolio!');

    // 4. Background cloud sync (non-blocking, timeout guarded)
    addProjectToCloud(newVideo, 3000)
      .then(() => {
        console.log('Video synced to Firebase Firestore Cloud');
      })
      .catch((err) => {
        console.warn('Background cloud sync notice:', err.message);
      });
  };

  const handlePublishGraphic = (e) => {
    e.preventDefault();
    if (!graphicImage.trim()) return;

    const newGraphic = {
      id: `graphic-${Date.now()}`,
      title: graphicTitle.trim() || 'Creative Brand Visual Artwork',
      category: graphicCategory,
      mediaType: 'graphic',
      thumbnailUrl: graphicImage.trim(),
      mediaUrl: graphicImage.trim(),
      externalUrl: graphicExternalUrl.trim() || undefined,
      description: graphicDesc.trim() || 'High-impact creative brand advertising design and promotional visual artwork.',
      tags: graphicTags.split(',').map((t) => t.trim()).filter(Boolean),
      dateAdded: '2026',
      isHighlighted: false,
    };

    // 1. Immediately persist to local portfolio
    if (onAddLocalProject) {
      onAddLocalProject(newGraphic);
    }

    // 2. Immediately close modal & reset form
    setGraphicTitle('');
    setGraphicImage('');
    setGraphicExternalUrl('');
    setGraphicDesc('');
    onClose();

    // 3. Smooth scroll to projects
    const projEl = document.getElementById('projects');
    if (projEl) projEl.scrollIntoView({ behavior: 'smooth' });

    onNotify(isBN ? '✓ গ্রাফিক আর্টওয়ার্ক পোর্টফোলিওতে যুক্ত হয়েছে!' : '✓ Graphic artwork added to portfolio!');

    // 4. Background cloud sync (non-blocking, timeout guarded)
    addProjectToCloud(newGraphic, 3000)
      .then(() => {
        console.log('Graphic synced to Firebase Firestore Cloud');
      })
      .catch((err) => {
        console.warn('Background cloud sync notice:', err.message);
      });
  };

  // Combine all cloud and portfolio items deduplicated by id
  const allMergedItems = [
    ...cloudItems,
    ...allPortfolioItems.filter((local) => !cloudItems.some((cloud) => cloud.id === local.id)),
  ];

  const displayManageItems = allMergedItems.filter((item) => {
    if (manageFilter === 'video' && item.mediaType !== 'video') return false;
    if (manageFilter === 'graphic' && item.mediaType !== 'graphic') return false;
    if (manageSearch.trim() && !item.title.toLowerCase().includes(manageSearch.toLowerCase().trim())) return false;
    return true;
  });

  const handleUpdateItemThumbnail = (item, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newThumb = reader.result;
      const updatedItem = { ...item, thumbnailUrl: newThumb };
      if (onAddLocalProject) {
        onAddLocalProject(updatedItem);
      }
      if (item.isCloud) {
        addProjectToCloud(updatedItem, 3000).catch((e) => console.warn('Cloud thumb sync:', e));
      }
      onNotify(isBN ? `✓ "${item.title}" এর থাম্বনেইল সফলভাবে আপডেট হয়েছে!` : `✓ Thumbnail updated for "${item.title}"!`);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteItem = async (item) => {
    if (window.confirm(isBN ? `আপনি কি "${item.title}" প্রজেক্টটি মুছে ফেলতে চান?` : `Delete "${item.title}"?`)) {
      if (item.isCloud) {
        try {
          await deleteProjectFromCloud(item.id, 3000);
        } catch (err) {
          console.warn('Cloud delete notice:', err.message);
        }
      }
      if (onDeleteProject) {
        onDeleteProject(item.id);
      }
      onNotify(isBN ? 'প্রজেক্ট মুছে ফেলা হয়েছে' : 'Project removed');
    }
  };

  const handleClearAllCategory = (type) => {
    const typeLabel = type === 'video' ? (isBN ? 'সব ভিডিও' : 'all videos') : (isBN ? 'সব গ্রাফিক্স' : 'all graphics');
    if (window.confirm(isBN ? `আপনি কি নিশ্চিতভাবে ${typeLabel} মুছে ফেলতে চান?` : `Are you sure you want to delete ${typeLabel}?`)) {
      if (onClearCategory) {
        onClearCategory(type);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[92vh] bg-[#071A22] border border-[#00E5FF]/40 rounded-3xl shadow-[0_0_80px_rgba(0,229,255,0.3)] flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-black/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    LIVE CLOUD CMS
                  </span>
                  <span className="text-xs text-neutral-400 font-mono hidden sm:inline">Firebase Firestore</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  {isBN ? 'ক্লায়েন্ট কন্টেন্ট ম্যানেজমেন্ট ড্যাশবোর্ড' : 'Client Content Management Studio'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isBN ? 'লগআউট' : 'Logout'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 bg-black/20 px-6 pt-3 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('add-video')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'add-video'
                  ? 'border-[#00E5FF] text-[#00E5FF]'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{isBN ? '+ ভিডিও যোগ করুন' : '+ Publish Video'}</span>
            </button>

            <button
              onClick={() => setActiveTab('add-graphic')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'add-graphic'
                  ? 'border-[#00E5FF] text-[#00E5FF]'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{isBN ? '+ গ্রাফিক ডিজাইন আপলোড' : '+ Upload Graphic'}</span>
            </button>

            <button
              onClick={() => setActiveTab('manage')}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'manage'
                  ? 'border-red-400 text-red-400'
                  : 'border-transparent text-neutral-300 hover:text-white'
              }`}
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-red-300 font-extrabold">{isBN ? '🗑️ ভিডিও মুছুন / পরিচালনা' : '🗑️ Delete / Manage Videos'} ({displayManageItems.length})</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 max-h-[calc(92vh-150px)]">
            {/* Tab 1: Add Video */}
            {activeTab === 'add-video' && (
              <form onSubmit={handlePublishVideo} className="space-y-4">
                {/* Fast Banner to Jump to Delete Tab */}
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-neutral-300 font-medium">
                    {isBN ? '💡 পূর্বে যোগ করা কোনো ভিডিও মুছতে চান?' : '💡 Want to delete an already added video?'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('manage')}
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isBN ? 'ভিডিও মুছুন অপশনে যান' : 'Go to Delete Tab'}</span>
                  </button>
                </div>
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
                    <span>{isBN ? 'ইউটিউব চ্যানেল লিংক সনাক্ত হয়েছে। অনুগ্রহ করে নিচে টাইটেল এবং কাস্টম থাম্বনেইল দিন।' : 'Channel URL detected. Please provide a title and custom thumbnail below.'}</span>
                  </div>
                )}

                <div className="space-y-2.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono font-bold text-[#00E5FF]">
                      {isBN ? '📷 ভিডিও থাম্বনেইল ছবি (ডিভাইস থেকে সিলেক্ট করুন)' : '📷 Video Thumbnail Cover (Select from Device)'}
                    </label>
                    {isFb && !videoCustomThumb && (
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        {isBN ? 'ফেসবুকের জন্য কাস্টম ছবি আবশ্যক' : 'Custom Image Recommended'}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isBN ? '📁 কম্পিউটার / ফোন থেকে ছবি নির্বাচন করুন' : '📁 Choose Image from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleVideoThumbUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="url"
                      placeholder={isBN ? 'বা ছবির অনলাইন লিংক (Or Image URL)...' : 'Or direct image URL...'}
                      value={videoCustomThumb.startsWith('data:') ? '' : videoCustomThumb}
                      onChange={(e) => setVideoCustomThumb(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500"
                    />
                  </div>

                  {videoCustomThumb.trim() || autoYtThumb ? (
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/40 border border-[#00E5FF]/30">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={videoCustomThumb.trim() || autoYtThumb}
                          alt="Preview"
                          className="w-20 aspect-video object-cover rounded-lg bg-neutral-900 shrink-0 border border-white/10"
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
                      {videoCustomThumb && (
                        <button
                          type="button"
                          onClick={() => setVideoCustomThumb('')}
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
                    <label className="block text-xs font-mono text-neutral-300">Project Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Commercial Promotion Video"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-neutral-300">Format</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setVideoFormat('landscape')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          videoFormat === 'landscape' ? 'bg-[#00E5FF] text-black' : 'bg-white/5 text-neutral-400'
                        }`}
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>16:9 Landscape</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoFormat('reel')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          videoFormat === 'reel' ? 'bg-[#00E5FF] text-black' : 'bg-white/5 text-neutral-400'
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
                    placeholder="Project details & software used..."
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={videoTags}
                    onChange={(e) => setVideoTags(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!videoUrl.trim()}
                  className="w-full py-3.5 rounded-2xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  <span>{isBN ? 'সবার জন্য লাইভ পাবলিশ করুন (Publish Video)' : 'Publish to Live Portfolio'}</span>
                </button>
              </form>
            )}

            {/* Tab 2: Add Graphic */}
            {activeTab === 'add-graphic' && (
              <form onSubmit={handlePublishGraphic} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">Design Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern Brand Banner Art"
                    value={graphicTitle}
                    onChange={(e) => setGraphicTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">Category</label>
                  <select
                    value={graphicCategory}
                    onChange={(e) => setGraphicCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09151A] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
                  >
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">Image Artwork *</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGraphicImageUpload}
                      className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#00E5FF]/20 file:text-[#00E5FF] cursor-pointer"
                    />
                    <input
                      type="url"
                      placeholder="Or direct image URL..."
                      value={graphicImage.startsWith('data:') ? '' : graphicImage}
                      onChange={(e) => setGraphicImage(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                {graphicImage && (
                  <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center max-h-40 overflow-hidden">
                    <img src={graphicImage} alt="Artwork preview" className="max-h-36 object-contain rounded-lg" />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">
                    {isBN ? 'ফেসবুক পোস্ট লিংক / এক্সটার্নাল URL (ঐচ্ছিক)' : 'Facebook Post Link / External URL (Optional)'}
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.facebook.com/share/p/..."
                    value={graphicExternalUrl}
                    onChange={(e) => setGraphicExternalUrl(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:border-[#00E5FF]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Concept details..."
                    value={graphicDesc}
                    onChange={(e) => setGraphicDesc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={graphicTags}
                    onChange={(e) => setGraphicTags(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!graphicImage.trim()}
                  className="w-full py-3.5 rounded-2xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  <span>{isBN ? 'সবার জন্য লাইভ পাবলিশ করুন (Publish Artwork)' : 'Publish Artwork to Portfolio'}</span>
                </button>
              </form>
            )}

            {/* Tab 3: Manage Projects */}
            {activeTab === 'manage' && (
              <div className="space-y-5">
                {/* Header Stats & Quick Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-400">
                      {isBN ? 'মোট প্রজেক্ট:' : 'Total Projects:'} <strong className="text-white">{allMergedItems.length}</strong>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      (🎬 {allMergedItems.filter((i) => i.mediaType === 'video').length} • 🎨 {allMergedItems.filter((i) => i.mediaType === 'graphic').length})
                    </span>
                  </div>

                  {/* Bulk Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {onDeleteProject && allMergedItems.some(i => !i.id.includes('noman-fb-') && i.mediaType === 'video') && (
                      <button
                        type="button"
                        onClick={async () => {
                          if (window.confirm(isBN ? 'আপনি কি অতিরিক্ত সকল নতুন টেস্ট ভিডিও (sbmd, basic motion ইত্যাদি) একসাথে মুছে ফেলতে চান?' : 'Delete all newly added custom test videos?')) {
                            const customVideos = allMergedItems.filter(i => !i.id.includes('noman-fb-') && i.mediaType === 'video');
                            for (const cv of customVideos) {
                              if (cv.isCloud) {
                                try { await deleteProjectFromCloud(cv.id, 2000); } catch (e) {}
                              }
                              onDeleteProject(cv.id);
                            }
                            if (onNotify) onNotify(isBN ? 'টেস্ট ভিডিওগুলো সফলভাবে মুছে ফেলা হয়েছে' : 'Test videos removed');
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.5)] flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isBN ? '🗑️ টেস্ট ভিডিওগুলো মুছুন' : 'Purge Test Videos'}</span>
                      </button>
                    )}
                    {onClearCategory && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleClearAllCategory('video')}
                          className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          {isBN ? 'সব ভিডিও মুছুন' : 'Clear All Videos'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleClearAllCategory('graphic')}
                          className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          {isBN ? 'সব গ্রাফিক্স মুছুন' : 'Clear All Graphics'}
                        </button>
                      </>
                    )}
                    {onResetDefault && (
                      <button
                        type="button"
                        onClick={onResetDefault}
                        className="px-2.5 py-1 rounded-lg bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] text-[11px] font-mono transition-colors cursor-pointer"
                      >
                        {isBN ? 'ডিফল্ট রিস্টোর' : 'Reset Default'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 self-start sm:self-auto">
                    {[
                      { id: 'all', label: isBN ? `সব (${allMergedItems.length})` : `All (${allMergedItems.length})` },
                      { id: 'video', label: isBN ? `ভিডিও (${allMergedItems.filter((i) => i.mediaType === 'video').length})` : `Videos (${allMergedItems.filter((i) => i.mediaType === 'video').length})` },
                      { id: 'graphic', label: isBN ? `গ্রাফিক্স (${allMergedItems.filter((i) => i.mediaType === 'graphic').length})` : `Graphics (${allMergedItems.filter((i) => i.mediaType === 'graphic').length})` },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setManageFilter(f.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          manageFilter === f.id
                            ? 'bg-[#00E5FF] text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder={isBN ? 'টাইটেল দিয়ে খুঁজুন...' : 'Search by title...'}
                    value={manageSearch}
                    onChange={(e) => setManageSearch(e.target.value)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-neutral-500 focus:border-[#00E5FF] outline-none"
                  />
                </div>

                {displayManageItems.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400 space-y-2">
                    <p className="text-sm">{isBN ? 'কোনো প্রজেক্ট পাওয়া যায়নি।' : 'No projects found.'}</p>
                    <p className="text-xs text-neutral-500">{isBN ? 'উপরে "+ Add Video" বা "+ Add Graphic" ট্যাবে গিয়ে সহজে নতুন প্রজেক্ট যোগ করুন।' : 'Use the tabs above to publish projects.'}</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                    {displayManageItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/15 flex items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="relative group/thumb w-16 h-12 shrink-0">
                            <img
                              src={item.thumbnailUrl || './portfolio/fb_reel_4.jpg'}
                              alt={item.title}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = './portfolio/fb_reel_4.jpg';
                              }}
                              className="w-16 h-12 object-cover rounded-xl bg-black border border-white/10"
                            />
                            <label
                              className="absolute inset-0 bg-black/70 opacity-0 group-hover/thumb:opacity-100 rounded-xl flex items-center justify-center cursor-pointer transition-opacity text-[#00E5FF]"
                              title={isBN ? 'থাম্বনেইল পরিবর্তন করুন' : 'Change Thumbnail'}
                            >
                              <ImageIcon className="w-4 h-4" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleUpdateItemThumbnail(item, e.target.files?.[0])}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <div className="truncate text-xs">
                            <span className="font-bold text-white block truncate">{item.title}</span>
                            <span className="text-neutral-400 font-mono flex items-center gap-2 mt-0.5">
                              <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-[#00E5FF]">
                                {item.mediaType === 'video' ? '🎬 Video' : '🎨 Graphic'}
                              </span>
                              <span>{item.category}</span>
                              {item.isCloud ? (
                                <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 text-[10px] border border-sky-500/30">Cloud</span>
                              ) : (
                                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30">Active</span>
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Quick Change Thumbnail Button */}
                          <label
                            className="p-2 rounded-xl text-neutral-400 hover:text-[#00E5FF] hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1"
                            title={isBN ? 'থাম্বনেইল পরিবর্তন করুন (Upload new thumbnail)' : 'Change Thumbnail'}
                          >
                            <ImageIcon className="w-4 h-4" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleUpdateItemThumbnail(item, e.target.files?.[0])}
                              className="hidden"
                            />
                          </label>

                          {(item.mediaUrl || item.externalUrl) && (
                            <a
                              href={item.externalUrl || item.mediaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl text-neutral-400 hover:text-[#00E5FF] hover:bg-white/5 transition-colors"
                              title="Open Link"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item)}
                            className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-red-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                            title={isBN ? 'মুছে ফেলুন' : 'Delete Project'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{isBN ? 'মুছুন' : 'Delete'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
