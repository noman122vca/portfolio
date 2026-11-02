import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { asSunnahData } from '../data/trainingData';
import { CheckCircle } from 'lucide-react';

export function SkillsAndTraining() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 sm:py-28 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.skills?.headline || `${t.skills?.titlePre || 'MY SKILLS &'} ${t.skills?.titleHighlight || 'EXPERTISE'}`}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t.skills?.subheadline || t.skills?.subtitle || 'Crafted through dedicated practice and certified institutional training.'}
          </p>
        </div>

        {/* Institutional Training - Centered Premium Card */}
        <div className="max-w-4xl mx-auto">
          {/* As-Sunnah Skill Development Institute Card */}
          <div className="rounded-3xl p-6 sm:p-10 glass-card border border-white/10 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-2xl shadow-[#00E5FF]/5">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white p-2 border border-white/30 shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center">
                    <img
                      src="./as-sunnah-logo.png"
                      alt={asSunnahData.institute}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider block">
                      {asSunnahData.courseTag} • {asSunnahData.batch}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {asSunnahData.institute}
                    </h3>
                  </div>
                </div>
                <span className="self-start sm:self-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                  {asSunnahData.statusTag}
                </span>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                {asSunnahData.description}
              </p>

              {/* Core Competencies Checklist */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-neutral-400 font-bold block uppercase tracking-wider">
                  {asSunnahData.competenciesTitle}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {asSunnahData.competencies.map((comp) => (
                    <div
                      key={comp.id}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 hover:border-[#00E5FF]/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#00E5FF] shrink-0" />
                        <h4 className="text-sm font-bold text-white leading-tight">{comp.title}</h4>
                      </div>
                      <p className="text-xs text-neutral-400 pl-6.5">{comp.tools}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-neutral-400">
              <span>{asSunnahData.experienceTag}</span>
              <span className="text-[#00E5FF] font-bold">{asSunnahData.readinessTag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
