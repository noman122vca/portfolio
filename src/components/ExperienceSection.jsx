import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { profileData } from '../data/profileData';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  BehanceIcon,
  YouTubeIcon,
  WhatsAppIcon,
  GitHubIcon
} from './Icons';
import { Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';

export function ExperienceSection() {
  const { t, isBN } = useLanguage();

  const officialProfiles = [
    {
      id: 'facebook',
      name: isBN ? 'ফেসবুক' : 'Facebook',
      handle: profileData.facebook || '@hassanmahmud013',
      url: profileData.facebookLink,
      renderIcon: () => <FacebookIcon className="w-8 h-8" />,
      desc: isBN ? 'সোশ্যাল অ্যাক্টিভিটি ও গ্রাফিক্স আপডেট' : 'Social updates, posters & motion clips',
    },
    {
      id: 'instagram',
      name: isBN ? 'ইনস্টাগ্রাম' : 'Instagram',
      handle: profileData.instagram || '@hassanmahmud013',
      url: profileData.instagramLink,
      renderIcon: () => <InstagramIcon className="w-8 h-8" />,
      desc: isBN ? 'রিলস, মোশন গ্রাফিক্স ও শর্ট ভিডিও' : 'Reels, visual carousels & design feeds',
    },
    {
      id: 'linkedin',
      name: isBN ? 'লিঙ্কডইন' : 'LinkedIn',
      handle: profileData.linkedin || profileData.name,
      url: profileData.linkedinLink,
      renderIcon: () => <LinkedInIcon className="w-8 h-8" />,
      desc: isBN ? 'প্রফেশনাল নেটওয়ার্ক ও ক্যারিয়ার রেকর্ড' : 'Professional network & agency references',
    },
    {
      id: 'behance',
      name: isBN ? 'বিহ্যান্স' : 'Behance',
      handle: profileData.behance || 'behance',
      url: profileData.behanceLink,
      renderIcon: () => <BehanceIcon className="w-8 h-8" />,
      desc: isBN ? 'গ্রাফিক ডিজাইন ও কমার্শিয়াল পোর্টফোলিও' : 'Commercial brand case studies & artwork',
    },
    {
      id: 'youtube',
      name: isBN ? 'ইউটিউব' : 'YouTube',
      handle: profileData.youtube || '@youtube',
      url: profileData.youtubeLink,
      renderIcon: () => <YouTubeIcon className="w-8 h-8" />,
      desc: isBN ? 'ভিডিও এডিটিং শোকেস ও প্রমোশনাল ভিডিও' : 'Long-form edits, promo commercials & shorts',
    },
    {
      id: 'whatsapp',
      name: isBN ? 'হোয়াটসঅ্যাপ' : 'WhatsApp',
      handle: profileData.phone,
      url: profileData.whatsappLink,
      renderIcon: () => <WhatsAppIcon className="w-8 h-8" />,
      desc: isBN ? 'সরাসরি প্রজেক্ট আলোচনা ও মেসেজিং' : 'Direct client messaging & instant consultations',
    },
    ...(profileData.githubLink ? [{
      id: 'github',
      name: isBN ? 'গিটহাব' : 'GitHub',
      handle: profileData.github || '@github',
      url: profileData.githubLink,
      renderIcon: () => <GitHubIcon className="w-8 h-8" />,
      desc: isBN ? 'সোর্স কোড, ওপেন সোর্স ও ডেভেলপার রিপোজিটরি' : 'Source code, open-source projects & repositories',
    }] : [])
  ];

  return (
    <section id="profiles" className="py-20 sm:py-28 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.profiles?.badge || '05 / CHANNELS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.profiles?.headline || t.profiles?.title || 'Official Profiles & Direct Channels'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t.profiles?.subheadline || t.profiles?.subtitle || 'Connect with me directly on YouTube, social media platforms, and creative design networks.'}
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {officialProfiles.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass-card border border-white/10 hover:border-[#00E5FF]/60 flex items-start justify-between gap-4 group transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-1 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-105 transition-transform">
                  {p.renderIcon()}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {p.name}
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                  </div>
                  <span className="text-xs font-mono text-neutral-400 block">{p.handle}</span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed pt-1">
                    {p.desc}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-[#00E5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
