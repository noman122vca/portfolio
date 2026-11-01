import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { profileData } from '../data/profileData';
import { Menu, X, FileDown, Volume2, VolumeX, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export function Navbar({ onOpenCV, onOpenAdmin }) {
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
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-[#00E5FF]/40 group-hover:border-[#00E5FF] transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-tight group-hover:text-[#00E5FF] transition-colors">
                  {profileData.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]/20" />
              </div>
              <span className="text-xs text-neutral-400 block font-mono">
                {t.nav.role}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#projects" className="text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors">
              {t.nav.projects}
            </a>
            <a href="#about" className="text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors">
              {t.nav.about}
            </a>
            <a href="#skills" className="text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors">
              {t.nav.skills}
            </a>
            <a href="#profiles" className="text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors">
              {t.nav.profiles}
            </a>
            <a href="#contact" className="text-sm font-medium text-neutral-300 hover:text-[#00E5FF] transition-colors">
              {t.nav.contact}
            </a>
          </nav>

          {/* Controls: Audio TTS, Language, CV, Contact */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio TTS Greeting */}
            <button
              onClick={handleAudioWelcome}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'border-[#00E5FF] bg-[#00E5FF]/20 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                  : 'border-white/10 hover:border-white/30 text-neutral-300 hover:text-white bg-white/[0.03]'
              }`}
              title={isPlayingAudio ? t.nav.stopWelcome : t.nav.playWelcome}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 animate-pulse text-[#00E5FF]" />
                  <span className="hidden xl:inline">{t.nav.stopWelcome}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden xl:inline">{t.nav.playWelcome}</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
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
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === 'bn'
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.5)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="বাংলা ভাষায় দেখুন"
              >
                বাংলা
              </button>
            </div>

            {/* CV Modal Trigger */}
            <button
              onClick={onOpenCV}
              className="px-4 py-2 rounded-xl border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/10 text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
            >
              <FileDown className="w-4 h-4" />
              <span>{t.nav.resume}</span>
            </button>

            {/* Admin Studio Trigger */}
            <button
              onClick={onOpenAdmin}
              className="px-3.5 py-2 rounded-xl border border-white/10 hover:border-[#00E5FF]/40 text-neutral-300 hover:text-[#00E5FF] bg-white/[0.03] hover:bg-[#00E5FF]/5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title={isBN ? "ক্লায়েন্ট অ্যাডমিন প্যানেল (ভিডিও ও ডিজাইন আপলোড)" : "Client Admin Studio (Upload Videos & Art)"}
            >
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              <span className="hidden xl:inline">{isBN ? "অ্যাডমিন" : "Admin"}</span>
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] cursor-pointer"
            >
              {t.nav.letsTalk}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(isBN ? 'en' : 'bn')}
              className="px-2 py-1 rounded-lg bg-white/10 text-xs font-bold text-white border border-white/10"
            >
              {isBN ? 'EN' : 'বাংলা'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-b border-white/10 bg-[#020B0E]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium"
            >
              {t.nav.projects}
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium"
            >
              {t.nav.about}
            </a>
            <a
              href="#skills"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium"
            >
              {t.nav.skills}
            </a>
            <a
              href="#profiles"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium"
            >
              {t.nav.profiles}
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-sm font-medium"
            >
              {t.nav.contact}
            </a>
          </nav>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleAudioWelcome();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-[#00E5FF]" />
              <span>{isPlayingAudio ? t.nav.stopWelcome : t.nav.playWelcome}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCV && onOpenCV();
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#00E5FF] hover:bg-[#00E5FF]/10 flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span>{t.nav.resume}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin && onOpenAdmin();
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-white bg-white/5 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] border border-white/10 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              <span>{isBN ? 'ক্লায়েন্ট অ্যাডমিন প্যানেল' : 'Client Admin Studio'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
