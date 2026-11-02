import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { profileData } from '../data/profileData';
import { Menu, X, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';

export function Navbar({ onOpenCV, onOpenAdmin, isAdmin = false, onLogoutAdmin }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const { language, setLanguage, isBN, t } = useLanguage();

  const handleAudioWelcome = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const text = isBN
      ? `আসসালামু আলাইকুম, আমি ${profileData.name}। গ্রাফিক ডিজাইনার এবং ক্রিয়েটিভ ক্রিয়েটর। আমার পোর্টফোলিওতে আপনাকে স্বাগতম।`
      : `Hello, I am ${profileData.name}, Graphic Designer and Creative Creator. Welcome to my creative portfolio.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.lang = isBN ? 'bn-BD' : 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) =>
        (isBN ? v.lang.startsWith('bn') : v.lang.startsWith('en')) &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    );
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border border-[#00E5FF]/40 group-hover:border-[#00E5FF] transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] shrink-0">
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-extrabold text-white text-xs sm:text-sm xl:text-base tracking-tight group-hover:text-[#00E5FF] transition-colors uppercase whitespace-nowrap">
                  {profileData.name}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00E5FF] fill-[#00E5FF]/20 shrink-0" />
              </div>
              <span className="text-[10px] sm:text-xs text-neutral-400 block font-mono whitespace-nowrap">
                {t.nav.role}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (lg and up) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0">
            <a
              href="#projects"
              className="text-xs 2xl:text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.projects}
            </a>
            <a
              href="#about"
              className="text-xs 2xl:text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.about}
            </a>
            <a
              href="#skills"
              className="text-xs 2xl:text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.skills}
            </a>
            <a
              href="#profiles"
              className="text-xs 2xl:text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.profiles}
            </a>
            <a
              href="#contact"
              className="text-xs 2xl:text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Action Controls & Mobile/Tablet Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Audio TTS Greeting (hidden on mobile, visible on sm+) */}
            <button
              onClick={handleAudioWelcome}
              className={`hidden sm:inline-flex p-2 sm:p-2.5 rounded-xl border text-xs font-semibold items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                isPlayingAudio
                  ? 'border-[#00E5FF] bg-[#00E5FF]/20 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                  : 'border-white/10 hover:border-white/30 text-neutral-300 hover:text-white bg-white/[0.03]'
              }`}
              title={isPlayingAudio ? t.nav.stopWelcome : t.nav.playWelcome}
              aria-label="Toggle audio greeting"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 animate-pulse text-[#00E5FF] shrink-0" />
                  <span className="hidden xl:inline whitespace-nowrap">{t.nav.stopWelcome}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span className="hidden xl:inline whitespace-nowrap">{t.nav.playWelcome}</span>
                </>
              )}
            </button>

            {/* Language Switcher - 2-pill on sm+ */}
            <div className="hidden sm:flex items-center p-0.5 sm:p-1 rounded-full bg-white/[0.04] border border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  language === 'en'
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.5)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="View in English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  language === 'bn'
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.5)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="বাংলা ভাষায় দেখুন"
              >
                বাংলা
              </button>
            </div>

            {/* Mobile Language Toggle (compact single button on < sm) */}
            <button
              type="button"
              onClick={() => setLanguage(isBN ? 'en' : 'bn')}
              className="sm:hidden px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#00E5FF] cursor-pointer shrink-0"
              title="Toggle language"
            >
              {isBN ? 'EN' : 'বাংলা'}
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] cursor-pointer shrink-0 whitespace-nowrap"
            >
              {t.nav.letsTalk}
            </a>

            {/* Mobile/Tablet Menu Button (< lg) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#00E5FF] transition-all cursor-pointer lg:hidden shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Drawer (< lg) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#020B0E]/95 backdrop-blur-xl px-4 sm:px-6 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
            >
              {t.nav.projects}
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
            >
              {t.nav.about}
            </a>
            <a
              href="#skills"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
            >
              {t.nav.skills}
            </a>
            <a
              href="#profiles"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
            >
              {t.nav.profiles}
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Drawer Actions */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleAudioWelcome();
              }}
              className="sm:hidden w-full py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[#00E5FF]" />
              <span>{isPlayingAudio ? t.nav.stopWelcome : t.nav.playWelcome}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="sm:hidden w-full py-2.5 px-3 rounded-xl bg-[#00E5FF] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              {t.nav.letsTalk}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
