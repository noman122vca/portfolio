import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { X, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

export function GraphicUploadModal({ isOpen, onClose, onAddWork }) {
  const { isBN } = useLanguage();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Graphic Design');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Graphic Design, Photoshop, Commercial Art');

  if (!isOpen) return null;

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl) return;

    const newItem = {
      id: `graphic-custom-${Date.now()}`,
      title: title.trim() || 'New Graphic Design Artwork',
      category,
      mediaType: 'graphic',
      thumbnailUrl: imageUrl,
      mediaUrl: imageUrl,
      description: description.trim() || 'High-impact brand visual artwork and creative design manipulation.',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      dateAdded: '2026',
      isHighlighted: false,
    };

    onAddWork(newItem, isBN ? '✓ নতুন গ্রাফিক ডিজাইন সফলভাবে যুক্ত হয়েছে!' : '✓ Graphic artwork successfully added to portfolio!');
    setTitle('');
    setImageUrl('');
    setDescription('');

    // Smooth scroll to projects
    const projEl = document.getElementById('projects');
    if (projEl) {
      projEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          className="relative w-full max-w-xl bg-[#071A22] border border-[#00E5FF]/40 rounded-3xl shadow-[0_0_60px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isBN ? 'গ্রাফিক ডিজাইন আপলোড করুন' : 'Upload Graphic Design'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-300">
                Design Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Brand Identity Poster"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-300">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#09151A] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
              >
                <option value="Graphic Design">Graphic Design</option>
                <option value="Social Media">Social Media</option>
                <option value="Branding">Branding</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-300">
                Image Source (File or Web URL) *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#00E5FF]/20 file:text-[#00E5FF] hover:file:bg-[#00E5FF]/30 cursor-pointer"
              />
              <div className="text-center text-xs text-neutral-500 py-1">OR URL</div>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or direct image URL"
                value={imageUrl.startsWith('data:') ? '' : imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-xs"
              />
            </div>

            {imageUrl && (
              <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center max-h-40 overflow-hidden">
                <img src={imageUrl} alt="Preview" className="max-h-36 object-contain rounded-lg" />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-300">Description</label>
              <textarea
                rows={2}
                placeholder="Design concept & software used..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-300">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="Photoshop, Poster, Typography"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] text-white text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!imageUrl}
              className="w-full py-3 rounded-xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {isBN ? 'পোর্টফোলিওতে সংরক্ষণ করুন' : 'Save to Portfolio'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
