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
import { ArrowDown, FileDown, Send, Sparkles } from 'lucide-react';

const ORBIT_TOOLS = [
  {
    id: 'ps',
    name: 'Adobe Photoshop',
    left: '50%',
    top: '0%',
    renderLogo: () => <PhotoshopIcon />,
    borderGlow: 'shadow-[0_0_18px_rgba(49,168,255,0.7)] border-2 border-[#31A8FF]',
  },
  {
    id: 'ai',
    name: 'Adobe Illustrator',
    left: '93.3%',
    top: '25%',
    renderLogo: () => <IllustratorIcon />,
    borderGlow: 'shadow-[0_0_18px_rgba(255,154,0,0.7)] border-2 border-[#FF9A00]',
  },
  {
    id: 'pr',
    name: 'Adobe Premiere Pro',
    left: '93.3%',
    top: '75%',
    renderLogo: () => <PremiereProIcon />,
    borderGlow: 'shadow-[0_0_18px_rgba(234,119,255,0.7)] border-2 border-[#EA77FF]',
  },
  {
    id: 'ae',
    name: 'Adobe After Effects',
    left: '50%',
    top: '100%',
    renderLogo: () => <AfterEffectsIcon />,
    borderGlow: 'shadow-[0_0_18px_rgba(153,153,255,0.7)] border-2 border-[#9999FF]',
  },
  {
    id: 'capcut',
    name: 'CapCut Video Editor',
    left: '6.7%',
    top: '75%',
    renderLogo: () => <CapCutIcon />,
    borderGlow: 'shadow-[0_0_18px_rgba(255,255,255,0.7)] border-2 border-white',
  },
  {
    id: 'meta',
    name: 'Meta Video Marketing',
    left: '6.7%',
    top: '25%',
    renderLogo: () => <MetaMarketingIcon />,
    borderGlow: 'shadow-[0_0_18px_rgba(0,198,255,0.7)] border-2 border-[#00c6ff]',
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
      <div
        className={`absolute inset-0 rounded-full border border-dashed transition-all duration-300 pointer-events-none ${
          isFastOrbit
            ? 'border-[#00E5FF]/70 shadow-[0_0_30px_rgba(0,229,255,0.45)]'
            : 'border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
        }`}
      />
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
                className={`relative ${badgeSize} rounded-2xl overflow-hidden flex items-center justify-center ${tool.borderGlow} transition-transform duration-200 bg-transparent`}
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
  const { t } = useLanguage();

  const socialChannels = [
    { name: 'WhatsApp', url: profileData.whatsappLink, renderLogo: () => <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Facebook', url: profileData.facebookLink, renderLogo: () => <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Instagram', url: profileData.instagramLink, renderLogo: () => <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'LinkedIn', url: profileData.linkedinLink, renderLogo: () => <LinkedInIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'Behance', url: profileData.behanceLink, renderLogo: () => <BehanceIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { name: 'YouTube', url: profileData.youtubeLink, renderLogo: () => <YouTubeIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
    ...(profileData.githubLink ? [{ name: 'GitHub', url: profileData.githubLink, renderLogo: () => <GitHubIcon className="w-5 h-5 sm:w-6 sm:h-6" /> }] : [])
  ];

  return (
    <section className="relative pt-10 sm:pt-16 pb-20 sm:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left z-10"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wider uppercase font-mono shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Sparkles className="w-3.5 h-3.5" />
                {t.hero.badge}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.hero.available}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              {t.hero.headlinePre}{' '}
              <span className="accent-gradient-text headline-glow">
                {t.hero.headlineHighlight}
              </span>
            </h1>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {t.hero.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)] transition-all cursor-pointer flex items-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.hero.selectedWorks}</span>
                <ArrowDown className="w-4 h-4 stroke-[3] group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-6 sm:px-8 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#00E5FF]/50 text-white font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="w-4 h-4 text-[#00E5FF]" />
                <span>{t.hero.letsConnect}</span>
              </a>

              <button
                onClick={onOpenCV}
                className="px-6 sm:px-7 py-3.5 rounded-2xl border border-[#00E5FF]/40 hover:border-[#00E5FF] bg-[#00E5FF]/5 hover:bg-[#00E5FF]/15 text-[#00E5FF] font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileDown className="w-4 h-4" />
                <span>{t.hero.resumePdf}</span>
              </button>
            </div>

            {/* Social channels preview */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-mono text-neutral-400 mr-2">
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

          {/* Avatar and Animated Orbit */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Desktop Orbit Ring */}
            <div className="hidden sm:block">
              <OrbitRing isMobile={false} isFastOrbit={isFastOrbit} />
            </div>
            {/* Mobile Orbit Ring */}
            <div className="block sm:hidden">
              <OrbitRing isMobile={true} isFastOrbit={isFastOrbit} />
            </div>

            {/* Central Avatar */}
            <motion.div
              onHoverStart={() => setIsFastOrbit(true)}
              onHoverEnd={() => setIsFastOrbit(false)}
              className="relative w-48 h-48 sm:w-64 sm:h-64 xl:w-72 xl:h-72 rounded-full p-2 bg-gradient-to-tr from-[#00E5FF]/60 via-[#0284c7]/40 to-transparent shadow-[0_0_60px_rgba(0,229,255,0.35)] cursor-pointer z-30 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-[#071A22] relative group">
                <img
                  src={avatarSrc}
                  alt={profileData.name}
                  onError={() => setAvatarSrc(profileData.avatarExternal)}
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
