import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { profileData } from '../data/profileData';
import { Sparkles, Palette, Video, TrendingUp, Award, Quote } from 'lucide-react';

export function AboutSection() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: <Palette className="w-6 h-6 text-[#00E5FF]" />,
      title: t.about?.pillars?.p1Title || t.about?.mindset?.[0]?.title || 'Creative Mindset',
      desc: t.about?.pillars?.p1Desc || t.about?.mindset?.[0]?.description || 'Unique visual solutions.',
    },
    {
      icon: <Video className="w-6 h-6 text-[#00E5FF]" />,
      title: t.about?.pillars?.p2Title || t.about?.mindset?.[1]?.title || 'Continuous Learning',
      desc: t.about?.pillars?.p2Desc || t.about?.mindset?.[1]?.description || 'Evolving with modern software.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#00E5FF]" />,
      title: t.about?.pillars?.p3Title || t.about?.mindset?.[2]?.title || 'Professional Dedication',
      desc: t.about?.pillars?.p3Desc || t.about?.mindset?.[2]?.description || 'Delivering pixel-perfect quality.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl p-6 sm:p-8 glass-card border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#00E5FF]/40 bg-[#071A22] shrink-0">
                  <img
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{profileData.name}</h3>
                  <p className="text-xs font-mono text-[#00E5FF]">{profileData.officialName}</p>
                  <p className="text-xs text-neutral-400">{profileData.address}</p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 relative">
                <Quote className="w-8 h-8 text-[#00E5FF]/20 absolute top-2 right-2" />
                <p className="text-sm italic text-neutral-300 leading-relaxed relative z-10">
                  "{profileData.aboutQuote}"
                </p>
              </div>

              {/* Quick Pillars */}
              <div className="space-y-3 pt-2">
                {pillars.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="p-2 rounded-lg bg-[#00E5FF]/10 shrink-0">
                      {p.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{p.title}</h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wider uppercase font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.about?.badge || 'ABOUT ME'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.about?.headlinePre || 'A LITTLE ABOUT'}{' '}
              <span className="accent-gradient-text headline-glow">
                {t.about?.headlineName || 'HASSAN'}
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              {(t.about?.paragraphs || profileData.aboutParagraphs).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#00E5FF] block font-mono">100%</span>
                <span className="text-xs text-neutral-400">{t.about?.stats?.satisfaction || 'Client Satisfaction'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block font-mono">24/7</span>
                <span className="text-xs text-neutral-400">{t.about?.stats?.support || 'Direct Communication'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#00E5FF] block font-mono">Batch 41</span>
                <span className="text-xs text-neutral-400">{t.about?.stats?.batchLevel || t.about?.stats?.nsdaLevel || 'As-Sunnah SDI Certified'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
