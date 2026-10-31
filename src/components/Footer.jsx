import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { profileData } from '../data/profileData';
import { ArrowUp, CheckCircle2, Heart } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#020B0E] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#00E5FF]/40 bg-[#071A22]">
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-tight">
                  {profileData.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                {t.footer.role}
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400">
            <a href="#" className="hover:text-[#00E5FF] transition-colors">{t.footer.home}</a>
            <a href="#projects" className="hover:text-[#00E5FF] transition-colors">{t.footer.projects}</a>
            <a href="#about" className="hover:text-[#00E5FF] transition-colors">{t.footer.about}</a>
            <a href="#skills" className="hover:text-[#00E5FF] transition-colors">{t.footer.skills}</a>
            <a href="#contact" className="hover:text-[#00E5FF] transition-colors">{t.footer.contact}</a>
          </nav>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.footer.top}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#00E5FF]" />
          </button>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <p>© {new Date().getFullYear()} {profileData.name}. {t.footer.rights}</p>
          <p className="flex items-center gap-1">
            Built with React 19 & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
