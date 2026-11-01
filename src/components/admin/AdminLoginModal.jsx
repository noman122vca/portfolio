import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, X, KeyRound } from 'lucide-react';
import { verifyAdminPassword } from '../../config/firebase';
import { useLanguage } from '../../context/LanguageContext';

export function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { isBN } = useLanguage();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (verifyAdminPassword(password)) {
        sessionStorage.setItem('noman_admin_auth', 'true');
        onLoginSuccess();
        setPassword('');
        onClose();
      } else {
        setError(true);
      }
      setLoading(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#071A22] border border-[#00E5FF]/40 rounded-3xl shadow-[0_0_60px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isBN ? 'ক্লায়েন্ট অ্যাডমিন পোর্টাল' : 'Client Admin Portal'}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  {isBN ? 'পাসওয়ার্ড দিয়ে ড্যাশবোর্ডে প্রবেশ করুন' : 'Enter password to access CMS'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-300">
                {isBN ? 'অ্যাডমিন পাসওয়ার্ড (Admin Password)' : 'Admin Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`w-full pl-4 pr-11 py-3 rounded-xl bg-white/[0.04] border text-white text-sm transition-all outline-none ${
                    error
                      ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'border-white/10 focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400 font-medium pt-1 flex items-center gap-1.5 animate-shake">
                  <span>⚠️</span>
                  <span>{isBN ? 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' : 'Incorrect password! Please try again.'}</span>
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400 space-y-1 leading-relaxed">
              <div className="flex items-center gap-1.5 text-neutral-300 font-bold">
                <KeyRound className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>{isBN ? 'ডিফল্ট পাসওয়ার্ড:' : 'Default Access Password:'}</span>
                <code className="text-[#00E5FF] px-1.5 py-0.5 rounded bg-black/40 font-mono">noman@admin2026</code>
              </div>
              <p>{isBN ? 'লগইন করার পর ক্লায়েন্ট সরাসরি ভিডিও ও ডিজাইন পাবলিশ করতে পারবেন।' : 'Allows the client to publish new videos and artworks in real time.'}</p>
            </div>

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full py-3 rounded-xl bg-[#00E5FF] hover:bg-[#38BDF8] text-black font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? (isBN ? 'যাচাই করা হচ্ছে...' : 'Verifying...') : (isBN ? 'লগইন করুন' : 'Unlock Admin Studio')}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
