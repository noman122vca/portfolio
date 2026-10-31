import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { profileData } from '../data/profileData';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { WhatsAppIcon } from './Icons';

export function ContactSection() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(t.contact.form.serviceOptions[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated async submission with zero-maintenance client experience
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');

      // Auto reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.contact?.badge || '06 / INQUIRIES'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.contact?.headline || `${t.contact?.titlePre || 'Let\'s Discuss Your Next'} ${t.contact?.titleHighlight || 'Creative Project'}`}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t.contact?.subheadline || t.contact?.subtitle || 'Need high-retention video editing or compelling graphic design? Send a message directly.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 glass-card border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {t.contact?.directInfo || 'Direct Inquiries & Contact'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {t.contact?.directDesc || t.contact?.subtitle || 'Send a message directly or connect via WhatsApp and Email.'}
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={profileData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-white transition-all group"
              >
                <div className="p-2 rounded-xl bg-[#25D366] text-white shrink-0 group-hover:scale-110 transition-transform">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-400 block">WhatsApp Chat</span>
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#25D366] transition-colors">
                    {profileData.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-white transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-400 block">Official Email</span>
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {profileData.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${profileData.phone}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-white transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-400 block">Call Directly</span>
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {profileData.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white">
                <div className="p-2.5 rounded-xl bg-white/10 text-neutral-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-400 block">Location</span>
                  <span className="text-xs sm:text-sm text-neutral-300">
                    {profileData.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Project Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 glass-card border border-white/10 relative overflow-hidden">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {t.contact.form.submittedTitle}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 max-w-md mx-auto leading-relaxed">
                  {t.contact.form.submittedDesc}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">
                      {t.contact.form.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.form.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 text-sm sm:text-base text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">
                      {t.contact.form.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contact.form.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 text-sm sm:text-base text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">
                    {t.contact.form.serviceLabel}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#09151A] border border-white/10 focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 text-sm sm:text-base text-white transition-colors cursor-pointer"
                  >
                    {(t.contact?.form?.serviceOptions || [
                      "Video Editing (YouTube / Commercial)",
                      "Reels / Shorts / TikTok (9:16)",
                      "Graphic Design & Branding",
                      "Social Media Ad Creative"
                    ]).map((opt) => (
                      <option key={opt} value={opt} className="bg-[#040C0E] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">
                    {t.contact.form.messageLabel} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 text-sm sm:text-base text-white placeholder-neutral-500 transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.form.submitBtn}</span>
                      <Send className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
