import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Play, Eye, PlusCircle, Video, Image as ImageIcon, Sparkles, Film, Smartphone, LayoutGrid, SlidersHorizontal, ShieldCheck, Trash2, LogOut } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

function PortfolioCard({ item, onSelectItem, isAdmin, onDeleteItem }) {
  const safeThumbnail = (!item.thumbnailUrl || item.thumbnailUrl.includes('video_fallback'))
    ? './portfolio/fb_reel_4.jpg'
    : item.thumbnailUrl;

  return (
    <div
      onClick={() => onSelectItem(item)}
      className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer border border-white/10 hover:border-[#00E5FF]/60 flex flex-col justify-between h-full"
    >
      {/* Media Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#040C0E]">
        <img
          src={safeThumbnail}
          alt={item.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = './portfolio/fb_reel_4.jpg';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B0E] via-transparent to-transparent opacity-80" />

        {/* Format & Category Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
          <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/10">
            {item.category}
          </span>
          {item.mediaType === 'video' && item.videoFormat && (
            <span className="px-2 py-0.5 rounded-md bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-[10px] font-mono font-bold uppercase">
              {item.videoFormat === 'reel' ? 'Reel / 9:16' : '16:9 HD'}
            </span>
          )}
        </div>

        {/* 1-Click Delete Button (Active for Admin or any custom-added project) */}
        {(isAdmin || !item.id.includes('noman-fb-')) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`আপনি কি "${item.title}" প্রজেক্টটি মুছে ফেলতে চান?`)) {
                onDeleteItem(item.id, item.title);
              }
            }}
            className="absolute top-3 right-3 z-30 px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.8)] backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-bold border border-red-400/50"
            title="এই প্রজেক্টটি সরাসরি ডিলিট করুন (Delete Project)"
          >
            <Trash2 className="w-3.5 h-3.5 text-white" />
            <span>মুছুন</span>
          </button>
        )}

        {/* Hover Overlay Play / View Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
          <div className="w-14 h-14 rounded-full bg-[#00E5FF] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.7)] transform scale-75 group-hover:scale-100 transition-transform">
            {item.mediaType === 'video' ? (
              <Play className="w-6 h-6 fill-black ml-1" />
            ) : (
              <Eye className="w-6 h-6 stroke-[2.5]" />
            )}
          </div>
        </div>
      </div>

      {/* Content info */}
      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors leading-snug line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 font-light leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Tags */}
        <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-400 text-[11px] font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection({
  items,
  onSelectItem,
  onOpenVideoForm,
  onOpenUploadGraphic,
  onOpenAdmin,
  isAdmin = false,
  onDeleteItem,
  onLogoutAdmin,
}) {
  const { t, isBN } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [videoFormatFilter, setVideoFormatFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filteredItems = items.filter((item) => {
    // Media type or category filter
    if (selectedFilter === 'video' && item.mediaType !== 'video') return false;
    if (selectedFilter === 'graphic' && item.mediaType !== 'graphic') return false;
    if (selectedFilter === 'social' && item.category !== 'Social Media') return false;
    if (selectedFilter === 'branding' && item.category !== 'Branding' && !item.tags.includes('Brand Identity')) return false;

    // Video format sub-filter
    if (item.mediaType === 'video' && videoFormatFilter !== 'all') {
      if (videoFormatFilter === 'landscape' && item.videoFormat !== 'landscape') return false;
      if (videoFormatFilter === 'reel' && item.videoFormat !== 'reel') return false;
    }

    return true;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wider uppercase font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.portfolio?.badge || 'PORTFOLIO'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t.portfolio?.headline || `${t.portfolio?.titlePre || 'MY CREATIVE'} ${t.portfolio?.titleHighlight || 'PORTFOLIO'}`}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              {t.portfolio?.subheadline || t.portfolio?.subtitle || ''}
            </p>
          </div>

          {/* Admin Fast Action Bar (Only visible when logged in as Admin) */}
          {isAdmin && (
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/40">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isBN ? '🛡️ অ্যাডমিন মোড সক্রিয়' : '🛡️ Admin Active'}</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="px-3.5 py-1.5 rounded-xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
                  title="ওপেন ক্লাউড CMS ড্যাশবোর্ড"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{isBN ? 'CMS ড্যাশবোর্ড' : 'CMS Studio'}</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenVideoForm}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00E5FF]/20 border border-white/20 hover:border-[#00E5FF]/50 text-white hover:text-[#00E5FF] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{isBN ? '+ ভিডিও যোগ' : '+ Add Video'}</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenUploadGraphic}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00E5FF]/20 border border-white/20 hover:border-[#00E5FF]/50 text-white hover:text-[#00E5FF] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{isBN ? '+ গ্রাফিক্স যোগ' : '+ Add Graphic'}</span>
                </button>
                <button
                  type="button"
                  onClick={onLogoutAdmin}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="অ্যাডমিন মোড থেকে লগআউট করুন"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isBN ? 'লগআউট' : 'Logout'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Pills and View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: t.portfolio?.filters?.all || t.portfolio?.tabs?.all || 'All Showcase' },
              { id: 'video', label: t.portfolio?.filters?.video || t.portfolio?.tabs?.video || 'Video Projects' },
              { id: 'graphic', label: t.portfolio?.filters?.graphic || t.portfolio?.tabs?.graphic || 'Graphic Design' },
              { id: 'social', label: t.portfolio?.filters?.social || 'Social Media' },
              { id: 'branding', label: t.portfolio?.filters?.branding || 'Branding' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                    : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Video format sub-filter (shows when video or all is selected) */}
            {(selectedFilter === 'all' || selectedFilter === 'video') && (
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
                <button
                  onClick={() => setVideoFormatFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    videoFormatFilter === 'all' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.portfolio?.formats?.all || 'All'}
                </button>
                <button
                  onClick={() => setVideoFormatFilter('landscape')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    videoFormatFilter === 'landscape' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>{t.portfolio?.formats?.landscape || '16:9'}</span>
                </button>
                <button
                  onClick={() => setVideoFormatFilter('reel')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    videoFormatFilter === 'reel' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{t.portfolio?.formats?.reel || '9:16'}</span>
                </button>
              </div>
            )}

            {/* View Mode Switcher (Grid vs 3D Coverflow Slider) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Grid Layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="3D Touch Slider"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3D Slider</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Showcase: Grid or 3D Coverflow Swiper */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <PortfolioCard
                    item={item}
                    onSelectItem={onSelectItem}
                    isAdmin={isAdmin}
                    onDeleteItem={onDeleteItem}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative py-4 px-2">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow, Keyboard, A11y]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={filteredItems.length > 3}
              speed={600}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 160,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              className="w-full pb-14"
            >
              {filteredItems.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="max-w-[340px] sm:max-w-[420px] md:max-w-[460px]"
                >
                  <PortfolioCard
                    item={item}
                    onSelectItem={onSelectItem}
                    isAdmin={isAdmin}
                    onDeleteItem={onDeleteItem}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
