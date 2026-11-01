import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { cvData } from '../../data/cvData';
import { X, FileDown, GraduationCap, Award, CheckCircle2, User, Phone, Mail, MapPin, Briefcase } from 'lucide-react';

export function CVModal({ isOpen, onClose }) {
  const { isBN } = useLanguage();
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#071A22] border border-[#00E5FF]/40 rounded-3xl shadow-[0_0_60px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
            <div>
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-wider uppercase block">
                {isBN ? 'কারিকুলাম ভিটা (সিভি)' : 'Curriculum Vitae'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {cvData.fullName} ({cvData.displayName})
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={cvData.pdfDownloadUrl}
                download="Md-Eftekar-Hossen-Noman-CV.pdf"
                className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>{isBN ? 'পিডিএফ ডাউনলোড' : 'Download PDF'}</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-140px)] leading-relaxed">
            {/* Contact Details Bar */}
            <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-300 pb-4 border-b border-white/10">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#00E5FF]" /> {cvData.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#00E5FF]" /> {cvData.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#00E5FF]" /> {cvData.address}</span>
            </div>

            {/* Career Objective */}
            <div className="space-y-2">
              <h3 className="text-sm font-mono font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{isBN ? 'ক্যারিয়ার অবজেক্টিভ' : 'Career Objective'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                {cvData.careerObjective}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isBN ? 'মূল দক্ষতা ও সক্ষমতা' : 'Core Competencies'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cvData.coreCompetencies.map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white text-[#00E5FF]">{c.domain}</h4>
                    <p className="text-xs text-neutral-300 font-light">{c.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Training */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{isBN ? 'প্রফেশনাল ট্রেনিং' : 'Professional Training'}</span>
              </h3>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white">{cvData.professionalTraining.course}</h4>
                  <span className="text-xs font-mono text-[#00E5FF]">{cvData.professionalTraining.duration}</span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">{cvData.professionalTraining.institute}</p>
                <p className="text-xs text-neutral-300 pt-1">{cvData.professionalTraining.keyAreas}</p>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>{isBN ? 'শিক্ষাগত যোগ্যতা' : 'Educational Background'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cvData.education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white">{edu.degree}</h4>
                    <p className="text-xs text-neutral-400">{edu.institute}</p>
                    <p className="text-[11px] font-mono text-[#00E5FF]">
                      {edu.status || `${edu.year} • GPA ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic & Professional References */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{isBN ? 'রেফারেন্স' : 'Professional References'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cvData.references.map((ref, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white">{ref.name}</h4>
                    <p className="text-xs text-[#00E5FF]">{ref.designation}</p>
                    <p className="text-xs text-neutral-400">{ref.institute}</p>
                    <p className="text-xs font-mono text-neutral-300 pt-1">
                      {ref.mobile} • {ref.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
