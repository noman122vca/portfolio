import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { profileData } from '../data/profileData';
import {
  PhotoshopIcon,
  IllustratorIcon,
  PremiereProIcon,
  AfterEffectsIcon,
  CapCutIcon,
  MetaMarketingIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  BehanceIcon,
  YouTubeIcon,
  GitHubIcon
} from './Icons';
import { ArrowDown, FileText, MessageSquare, Sparkles } from 'lucide-react';

const ORBIT_TOOLS = [
  {
    id: 'pr',
    name: 'Adobe Premiere Pro',
    left: '0%',
    top: '50%',
    renderLogo: () => <PremiereProIcon />,
    borderGlow: 'shadow-[0_0_20px_rgba(234,119,255,0.8)] border-2 border-[#EA77FF]',
  },
  {
    id: 'ae',
    name: 'Adobe After Effects',
    left: '25%',
    top: '6.7%',
    renderLogo: () => <AfterEffectsIcon />,
    borderGlow: 'shadow-[0_0_20px_rgba(153,153,255,0.8)] border-2 border-[#9999FF]',
  },
  {
    id: 'capcut',
    name: 'CapCut Video Editor',
    left: '75%',
    top: '6.7%',
    renderLogo: () => <CapCutIcon />,
    borderGlow: 'shadow-[0_0_22px_rgba(255,255,255,0.85)] border-2 border-white',
  },
  {
    id: 'meta',
    name: 'Meta Video Marketing',
    left: '100%',
    top: '50%',
    renderLogo: () => <MetaMarketingIcon />,
    borderGlow: 'shadow-[0_0_22px_rgba(255,255,255,0.85)] border-2 border-white',
  },
  {
    id: 'ps',
    name: 'Adobe Photoshop',
    left: '75%',
    top: '93.3%',
    renderLogo: () => <PhotoshopIcon />,
    borderGlow: 'shadow-[0_0_20px_rgba(49,168,255,0.8)] border-2 border-[#31A8FF]',
  },
  {
    id: 'ai',
    name: 'Adobe Illustrator',
    left: '25%',
    top: '93.3%',
    renderLogo: () => <IllustratorIcon />,
    borderGlow: 'shadow-[0_0_20px_rgba(255,154,0,0.8)] border-2 border-[#FF9A00]',
  },
];

function OrbitRing({ isMobile = false, isFastOrbit = false }) {
  const badgeSize = isMobile ? 'w-[42px] h-[42px] sm:w-[46px] sm:h-[46px]' : 'w-14 h-14 xl:w-16 xl:h-16';
  const duration = isFastOrbit ? 4.5 : isMobile ? 22 : 26;

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-20 ${
        isMobile ? 'w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]' : 'w-[430px] h-[430px] xl:w-[500px] xl:h-[500px]'
      }`}
    >
      {/* Concentric Glass Orbit Track with Glow */}
      <div
        className={`absolute inset-0 rounded-full border border-dashed transition-all duration-300 pointer-events-none ${
          isFastOrbit
            ? 'border-[#00E5FF]/80 shadow-[0_0_35px_rgba(0,229,255,0.55)]'
            : 'border-[#00E5FF]/45 shadow-[0_0_20px_rgba(0,229,255,0.25)]'
        }`}
      />
      <div className="absolute inset-[-8px] rounded-full border border-white/[0.08] pointer-events-none" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full pointer-events-none"
      >
        {ORBIT_TOOLS.map((tool) => (
          <div
            key={tool.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{ left: tool.left, top: tool.top }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.25, transition: { type: 'spring', stiffness: 400, damping: 14 } }}
              className="relative cursor-pointer select-none group"
              title={tool.name}
            >
              <div
                className={`relative ${badgeSize} rounded-2xl overflow-hidden flex items-center justify-center ${tool.borderGlow} backdrop-blur-xl bg-[#071A22]/90 transition-transform duration-200`}
              >
                {tool.renderLogo()}
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero({ onOpenCV }) {
  const [avatarSrc, setAvatarSrc] = useState(profileData.avatarUrl);
  const [isFastOrbit, setIsFastOrbit] = useState(false);
  const { t, isBN } = useLanguage();

  const socialChannels = [
    { name: 'WhatsApp', url: profileData.whatsappLink, renderLogo: () => <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Meta', url: profileData.facebookLink, renderLogo: () => <MetaMarketingIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Behance', url: profileData.behanceLink, renderLogo: () => <BehanceIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'LinkedIn', url: profileData.linkedinLink, renderLogo: () => <LinkedInIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Facebook', url: profileData.facebookLink, renderLogo: () => <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Instagram', url: profileData.instagramLink, renderLogo: () => <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'YouTube', url: profileData.youtubeLink, renderLogo: () => <YouTubeIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  ];

  return (
    <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 sm:space-y-6 text-center lg:text-left z-10"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wider uppercase font-mono shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                {t.hero.badge}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.hero.available}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              {t.hero.headlinePre}{' '}
              <span className="text-[#00E5FF] drop-shadow-[0_0_25px_rgba(0,229,255,0.65)] font-extrabold">
                {t.hero.headlineHighlight}
              </span>
            </h1>

            {/* Introduction Bio matching Image 2 */}
            <p className="text-sm sm:text-base text-neutral-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {isBN ? (
                <>
                  <span className="text-white font-semibold">আসসালামু আলাইকুম, আমি মো: ইফতেখার হোসেন নোমান।</span> গ্রাফিক ডিজাইন ও ভিডিও এডিটিংয়ের একজন দক্ষ ও নিবেদিতপ্রাণ ক্রিয়েটর হিসেবে আমি যেকোনো ধারণাকে আকর্ষণীয় ভিজ্যুয়াল গল্পে রূপান্তর করতে ভালোবাসি। সৃজনশীল কাজের সূক্ষ্মতা ও আধুনিক ডিজিটাল কৌশলের সমন্বয়ে কনটেন্ট ক্রিয়েটর ও ব্র্যান্ডগুলোর কাঙ্ক্ষিত দর্শক তৈরি করতে সহায়তা করি।
                </>
              ) : (
                <>
                  <span className="text-white font-semibold">Hi, I am Md. Eftekar Hossen Noman.</span> As a trained and motivated creator in Video Editing and Graphic Design, I transform ideas into compelling visual narratives. Combining creative precision with marketing strategy, I help brands and creators captivate their audience across digital platforms.
                </>
              )}
            </p>

            {/* CTAs matching Image 2 (Single Row guaranteed on desktop) */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <a
                href="#projects"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-neutral-100 text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 group hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <span>{t.hero.selectedWorks}</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-4.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#0D1F2D]/90 hover:bg-[#132A3D] border border-cyan-900/40 hover:border-[#00E5FF]/50 text-white font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00E5FF]" />
                <span>{t.hero.letsConnect}</span>
              </a>

              <button
                onClick={onOpenCV}
                className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full hover:bg-white/[0.05] text-white hover:text-[#00E5FF] font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00E5FF]" />
                <span>{t.hero.resumePdf}</span>
              </button>
            </div>

            {/* Works Counter Row matching Image 2 */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-0.5">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                WORKS:
              </span>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-[#00E5FF]/40 text-xs text-neutral-300 font-medium transition-all"
              >
                <span>🎬</span>
                <span>{isBN ? 'ভিডিও এডিটিং' : 'Video Editing'}</span>
                <span className="text-neutral-400 font-mono">(9)</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/40 hover:border-[#00E5FF] text-xs text-[#00E5FF] font-medium transition-all shadow-[0_0_12px_rgba(0,229,255,0.15)]"
              >
                <span>🎨</span>
                <span>{isBN ? 'গ্রাফিক ডিজাইন' : 'Graphic Design'}</span>
                <span className="text-[#00E5FF]/80 font-mono">(9)</span>
              </a>
            </div>

            {/* Social channels preview matching Image 2 */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-mono text-neutral-400 mr-1">
                {t.hero.verifiedChannels}
              </span>
              <div className="flex items-center gap-2 sm:gap-2.5">
                {socialChannels.map((c) => (
                  <a
                    key={c.name}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={c.name}
                    className="p-1.5 sm:p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00E5FF]/60 hover:scale-110 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  >
                    {c.renderLogo()}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Symmetrical 3D Holographic Orbit & Ultra-Glassic Avatar */}
          <div className="relative flex items-center justify-center py-6 sm:py-10 z-10">
            {/* Ambient Cyan Holographic Glow Wave */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,_rgba(0,229,255,0.25)_0%,_rgba(0,180,216,0.1)_45%,_transparent_70%)] blur-2xl pointer-events-none"
            />

            {/* Desktop Orbit Ring */}
            <div className="hidden sm:block">
              <OrbitRing isMobile={false} isFastOrbit={isFastOrbit} />
            </div>
            {/* Mobile Orbit Ring */}
            <div className="block sm:hidden">
              <OrbitRing isMobile={true} isFastOrbit={isFastOrbit} />
            </div>

            {/* Central Holographic Ultra-Glassic Avatar Container */}
            <motion.div
              animate={{ y: [-7, 7, -7] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              onHoverStart={() => setIsFastOrbit(true)}
              onHoverEnd={() => setIsFastOrbit(false)}
              className="relative w-52 h-52 sm:w-64 sm:h-64 xl:w-72 xl:h-72 rounded-full cursor-pointer z-30 transition-all duration-300 hover:scale-105 select-none"
            >
              {/* Concentric Outer Cyan Halo Ring matching Image 1 */}
              <div className="absolute -inset-4 sm:-inset-5 xl:-inset-6 rounded-full border-2 border-[#00E5FF]/75 shadow-[0_0_25px_rgba(0,229,255,0.45)] pointer-events-none" />
              
              {/* Secondary subtle frosted glass aura */}
              <div className="absolute -inset-2 rounded-full border border-white/10 pointer-events-none" />

              {/* Inner Precision Circular Rim & Photo Frame */}
              <div className="w-full h-full rounded-full overflow-hidden border-[3.5px] border-[#00E5FF] bg-[#071A22] relative group shadow-[0_0_35px_rgba(0,229,255,0.7),inset_0_0_15px_rgba(0,229,255,0.3)]">
                {/* Authentic Portrait Image */}
                <img
                  src={avatarSrc}
                  alt={profileData.name}
                  onError={() => {
                    if (avatarSrc !== './noman-avatar.jpg') {
                      setAvatarSrc('./noman-avatar.jpg');
                    } else if (avatarSrc !== './eftekar-avatar.jpg') {
                      setAvatarSrc('./eftekar-avatar.jpg');
                    }
                  }}
                  className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                />

                {/* Curved Glass Specular Highlight (Optical Glass Glare) */}
                <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(ellipse_at_35%_25%,_rgba(255,255,255,0.4)_0%,_rgba(255,255,255,0.1)_35%,_transparent_65%)]" />

                {/* Animated Glass Shimmer Sweep (Motion Sheen) */}
                <motion.div
                  initial={{ x: '-150%', opacity: 0 }}
                  animate={{
                    x: ['-150%', '160%'],
                    opacity: [0, 0.65, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 w-1/2 h-full -skew-x-25 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none blur-[1px]"
                />

                {/* Fine Glass Outer Edge Accent */}
                <div className="absolute inset-0 rounded-full pointer-events-none border border-white/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
