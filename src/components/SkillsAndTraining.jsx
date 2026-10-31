import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { asSunnahData, nsdaData } from '../data/trainingData';
import { Award, CheckCircle, ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';

export function SkillsAndTraining() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 sm:py-28 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.skills?.badge || 'EXPERTISE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.skills?.headline || `${t.skills?.titlePre || 'MY SKILLS &'} ${t.skills?.titleHighlight || 'EXPERTISE'}`}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t.skills?.subheadline || t.skills?.subtitle || 'Crafted through dedicated practice and certified institutional training.'}
          </p>
        </div>

        {/* Dual Accreditation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* As-Sunnah Skill Development Institute Card */}
          <div className="rounded-3xl p-6 sm:p-8 glass-card border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 p-1 border border-white/20 shrink-0">
                    <img
                      src="/as-sunnah-logo.png"
                      alt={asSunnahData.institute}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#00E5FF] uppercase tracking-wider block">
                      {asSunnahData.courseTag} • {asSunnahData.batch}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {asSunnahData.institute}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                  {asSunnahData.statusTag}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {asSunnahData.description}
              </p>

              {/* Core Competencies Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-neutral-400 font-bold block">
                  {asSunnahData.competenciesTitle}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {asSunnahData.competencies.map((comp) => (
                    <div
                      key={comp.id}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00E5FF] shrink-0" />
                        <h4 className="text-xs font-bold text-white leading-tight">{comp.title}</h4>
                      </div>
                      <p className="text-[11px] text-neutral-400 pl-6">{comp.tools}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{asSunnahData.experienceTag}</span>
              <span className="text-[#00E5FF] font-bold">{asSunnahData.readinessTag}</span>
            </div>
          </div>

          {/* NSDA Government Certification Card */}
          <div className="rounded-3xl p-6 sm:p-8 glass-card border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 p-2 border border-white/20 shrink-0">
                    <img
                      src={nsdaData.logo}
                      alt={nsdaData.institute}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                      {nsdaData.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {nsdaData.institute}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
                  Level 3
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {nsdaData.description}
              </p>

              {/* NSDA Competencies */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-neutral-400 font-bold block">
                  CBT&A ASSESSED COMPETENCIES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {nsdaData.competencies.map((comp) => (
                    <div
                      key={comp.id}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                        <h4 className="text-xs font-bold text-white leading-tight">{comp.title}</h4>
                      </div>
                      <p className="text-[11px] text-neutral-400 pl-6">{comp.tools}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>National Skills Development Authority</span>
              <span className="text-amber-400 font-bold">PMO Recognized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
