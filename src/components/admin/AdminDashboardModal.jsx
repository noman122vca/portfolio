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
  if (m5) return m5[1];
  return null;
}

export function AdminDashboardModal({
  isOpen,
  onClose,
  cloudItems = [],
  onLogout,
  onNotify,
  onAddLocalProject
}) {
  const { isBN } = useLanguage();
  const [activeTab, setActiveTab] = useState('add-video'); // 'add-video' | 'add-graphic' | 'manage'
  const [submitting, setSubmitting] = useState(false);

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
  const [graphicDesc, setGraphicDesc] = useState('');
  const [graphicTags, setGraphicTags] = useState('Graphic Design, Photoshop, Visual Art');

  if (!isOpen) return null;

  const detectedYtId = extractYouTubeId(videoUrl);
  const isFb = videoUrl.includes('facebook.com') || videoUrl.includes('fb.watch') || videoUrl.includes('fb.com');
  const isChannel = videoUrl.includes('/@') || videoUrl.includes('/channel/');
  const autoYtThumb = detectedYtId ? `https://img.youtube.com/vi/${detectedYtId}/hqdefault.jpg` : '';
  const finalVideoThumb = videoCustomThumb.trim() || autoYtThumb || (isFb ? 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=80' : 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80');

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

  const handlePublishVideo = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    setSubmitting(true);

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

    try {
      await addProjectToCloud(newVideo);
      onNotify(isBN ? '✓ ভিডিও ক্লাউডে সফলভাবে লাইভ পাবলিশ হয়েছে!' : '✓ Video successfully published live to cloud portfolio!');
    } catch (err) {
      console.warn('Firestore cloud sync pending, falling back to local portfolio:', err);
      if (onAddLocalProject) {
        onAddLocalProject(newVideo);
      }
      onNotify(isBN
        ? '✓ ভিডিও পোর্টফোলিওতে সফলভাবে যুক্ত হয়েছে! (ক্লাউড সিঙ্কের জন্য Firebase Console এ Firestore ডাটাবেস তৈরি করুন)'
        : '✓ Video added to portfolio! (To enable global sync, create Firestore database in Firebase Console)');
    }

    setVideoUrl('');
    setVideoTitle('');
    setVideoCustomThumb('');
    setVideoDesc('');
    onClose();
    setSubmitting(false);

    // Smooth scroll to projects
    const projEl = document.getElementById('projects');
    if (projEl) projEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePublishGraphic = async (e) => {
    e.preventDefault();
    if (!graphicImage.trim()) return;
    setSubmitting(true);

    const newGraphic = {
      id: `graphic-${Date.now()}`,
      title: graphicTitle.trim() || 'Creative Brand Visual Artwork',
      category: graphicCategory,
      mediaType: 'graphic',
      thumbnailUrl: graphicImage.trim(),
      mediaUrl: graphicImage.trim(),
      description: graphicDesc.trim() || 'High-impact creative brand advertising design and promotional visual artwork.',
      tags: graphicTags.split(',').map((t) => t.trim()).filter(Boolean),
      dateAdded: '2026',
      isHighlighted: false,
    };

    try {
      await addProjectToCloud(newGraphic);
      onNotify(isBN ? '✓ গ্রাফিক ডিজাইন ক্লাউডে সফলভাবে লাইভ পাবলিশ হয়েছে!' : '✓ Graphic artwork successfully published live to cloud!');
    } catch (err) {
      console.warn('Firestore cloud sync pending, falling back to local portfolio:', err);
      if (onAddLocalProject) {
        onAddLocalProject(newGraphic);
      }
      onNotify(isBN
        ? '✓ গ্রাফিক আর্টওয়ার্ক পোর্টফোলিওতে যুক্ত হয়েছে!'
        : '✓ Graphic artwork added to portfolio!');
    }

    setGraphicTitle('');
    setGraphicImage('');
    setGraphicDesc('');
    onClose();
    setSubmitting(false);

    const projEl = document.getElementById('projects');
    if (projEl) projEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteCloudItem = async (id, title) => {
    if (window.confirm(isBN ? `আপনি কি "${title}" প্রজেক্টটি ডাটাবেস থেকে ডিলিট করতে চান?` : `Delete "${title}" from cloud database?`)) {
      try {
        await deleteProjectFromCloud(id);
        onNotify(isBN ? 'প্রজেক্ট ডিলিট করা হয়েছে' : 'Project removed from cloud');
      } catch (err) {
        console.error(err);
        alert('Failed to delete item.');
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
                  ? 'border-[#00E5FF] text-[#00E5FF]'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isBN ? 'লাইভ ক্লাউড প্রজেক্টস' : 'Manage Cloud Projects'} ({cloudItems.length})</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 max-h-[calc(92vh-150px)]">
            {/* Tab 1: Add Video */}
            {activeTab === 'add-video' && (
              <form onSubmit={handlePublishVideo} className="space-y-4">
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

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300">
                    {isBN ? 'থাম্বনেইল ইমেজ (স্বয়ংক্রিয় বা কাস্টম ছবি)' : 'Thumbnail Image (Auto or Custom)'}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleVideoThumbUpload}
                      className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#00E5FF]/20 file:text-[#00E5FF] cursor-pointer"
                    />
                    <input
                      type="url"
                      placeholder="Or direct image URL..."
                      value={videoCustomThumb.startsWith('data:') ? '' : videoCustomThumb}
                      onChange={(e) => setVideoCustomThumb(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                {finalVideoThumb && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-[#00E5FF]/20">
                    <img
                      src={finalVideoThumb}
                      alt="Preview"
                      className="w-20 aspect-video object-cover rounded-lg bg-neutral-900"
                    />
                    <div className="text-xs truncate">
                      <span className="text-[#00E5FF] font-bold block">
                        {detectedYtId ? `✓ YouTube ID: ${detectedYtId}` : '✓ Thumbnail Ready'}
                      </span>
                      <span className="text-neutral-400 font-mono text-[11px] truncate block max-w-sm">
                        {videoUrl || 'Waiting for URL...'}
                      </span>
                    </div>
                  </div>
                )}

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
                  disabled={submitting || !videoUrl.trim()}
                  className="w-full py-3.5 rounded-2xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  <span>{submitting ? (isBN ? 'ক্লাউডে পাবলিশ হচ্ছে...' : 'Publishing to Cloud...') : (isBN ? 'সবার জন্য লাইভ পাবলিশ করুন (Publish to Website)' : 'Publish to Live Website')}</span>
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
                  disabled={submitting || !graphicImage.trim()}
                  className="w-full py-3.5 rounded-2xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  <span>{submitting ? (isBN ? 'ক্লাউডে পাবলিশ হচ্ছে...' : 'Publishing to Cloud...') : (isBN ? 'সবার জন্য লাইভ পাবলিশ করুন (Publish Artwork)' : 'Publish Artwork to Website')}</span>
                </button>
              </form>
            )}

            {/* Tab 3: Manage Cloud Items */}
            {activeTab === 'manage' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-mono text-neutral-400">
                    {isBN ? 'ক্লাউড ফায়ারবেসে থাকা মোট প্রজেক্ট:' : 'Total Cloud Projects in Firestore:'} {cloudItems.length}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Real-time Sync Active</span>
                  </span>
                </div>

                {cloudItems.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400 space-y-2">
                    <p className="text-sm">{isBN ? 'এখনো কোনো নতুন ক্লাউড প্রজেক্ট যোগ করা হয়নি।' : 'No custom cloud items added yet.'}</p>
                    <p className="text-xs text-neutral-500">{isBN ? 'উপরে "+ ভিডিও" বা "+ গ্রাফিক" ট্যাবে গিয়ে সহজেই লাইভ প্রজেক্ট যোগ করুন।' : 'Use the tabs above to publish your first cloud project.'}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cloudItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-16 aspect-video object-cover rounded-xl bg-black shrink-0"
                          />
                          <div className="truncate text-xs">
                            <span className="font-bold text-white block truncate">{item.title}</span>
                            <span className="text-neutral-400 font-mono">
                              {item.category} • {item.mediaType}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleDeleteCloudItem(item.id, item.title)}
                            className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Delete from Firestore"
                          >
                            <Trash2 className="w-4 h-4" />
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
