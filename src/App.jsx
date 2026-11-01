import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { defaultPortfolioItems } from './data/portfolioData';
import { BackgroundFX } from './components/BackgroundFX';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { SkillsAndTraining } from './components/SkillsAndTraining';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/modals/CVModal';
import { MediaDetailModal } from './components/modals/MediaDetailModal';
import { VideoFormModal } from './components/modals/VideoFormModal';
import { GraphicUploadModal } from './components/modals/GraphicUploadModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { subscribeToPortfolio } from './config/firebase';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'noman_portfolio_items_v5';
const LEGACY_STORAGE_KEY = 'noman_portfolio_items_v4';

export function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isVideoFormOpen, setIsVideoFormOpen] = useState(false);
  const [isGraphicUploadOpen, setIsGraphicUploadOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [cloudPortfolioItems, setCloudPortfolioItems] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Real-time Firestore synchronization
  useEffect(() => {
    const unsubscribe = subscribeToPortfolio(
      (items) => {
        if (Array.isArray(items)) {
          setCloudPortfolioItems(items);
        }
      },
      (err) => {
        console.warn('Firestore subscription fallback:', err?.message || err);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const [portfolioItems, setPortfolioItems] = useState(() => {
    try {
      // Purge legacy storage versions
      for (let i = 1; i <= 18; i++) {
        localStorage.removeItem(`hassan_portfolio_items_v${i}`);
      }
      localStorage.removeItem('noman_portfolio_items_v1');
      localStorage.removeItem('noman_portfolio_items_v2');
      localStorage.removeItem('noman_portfolio_items_v3');
      localStorage.removeItem('noman_portfolio_items_v4');

      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const defaultGraphics = defaultPortfolioItems.filter((item) => item.mediaType === 'graphic');
          const hasGraphics = parsed.some((item) => item.mediaType === 'graphic');
          if (hasGraphics) {
            return parsed.map((item) => {
              if (item.mediaType === 'graphic') {
                const match = defaultGraphics.find((g) => g.id === item.id);
                if (match && match.thumbnailUrl.startsWith('/portfolio/')) {
                  return {
                    ...item,
                    thumbnailUrl: match.thumbnailUrl,
                    mediaUrl: match.mediaUrl,
                  };
                }
              }
              return item;
            });
          }
          return [...parsed, ...defaultGraphics];
        }
      }
    } catch (e) {
      console.error('Error reading saved portfolio items:', e);
    }
    return defaultPortfolioItems;
  });

  // Merge cloud items on top of local portfolio items (eliminating duplicate IDs)
  const displayedPortfolioItems = [
    ...cloudPortfolioItems,
    ...portfolioItems.filter((local) => !cloudPortfolioItems.some((cloud) => cloud.id === local.id)),
  ];

  const updatePortfolioItems = (newItems, message = null) => {
    setPortfolioItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error('Error saving portfolio items to localStorage:', e);
    }
    if (message) {
      showToast(message);
    }
  };

  const handleResetDefault = () => {
    if (
      window.confirm(
        'আপনি কি নিশ্চিত যে পোর্টফোলিওটি পুনরায় ডিফল্ট কাজে রিসেট করতে চান? (Are you sure you want to reset the portfolio to default?)'
      )
    ) {
      setPortfolioItems(defaultPortfolioItems);
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
      showToast('পোর্টফোলিও ডিফল্ট অবস্থায় রিসেট করা হয়েছে');
    }
  };

  const handleOpenAdmin = () => {
    const isAuth = sessionStorage.getItem('noman_admin_auth') === 'true';
    if (isAuth) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#020B0E] text-neutral-200 selection:bg-[#00E5FF] selection:text-black overflow-x-hidden font-sans antialiased">
        {/* Background glow and subtle dot grid */}
        <BackgroundFX />

        {/* Sticky Glassmorphic Navbar */}
        <Navbar
          onOpenCV={() => setIsCVOpen(true)}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero
            onOpenCV={() => setIsCVOpen(true)}
            portfolioItems={displayedPortfolioItems}
          />
          <PortfolioSection
            items={displayedPortfolioItems}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenVideoForm={() => setIsVideoFormOpen(true)}
            onOpenUploadGraphic={() => setIsGraphicUploadOpen(true)}
            onOpenAdmin={handleOpenAdmin}
          />
          <AboutSection />
          <SkillsAndTraining />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Global Footer */}
        <Footer onOpenAdmin={handleOpenAdmin} />

        {/* Modals & Popups */}
        <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />

        <MediaDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          items={displayedPortfolioItems}
          onSelectItem={(item) => setSelectedItem(item)}
        />

        <VideoFormModal
          isOpen={isVideoFormOpen}
          onClose={() => setIsVideoFormOpen(false)}
          items={portfolioItems}
          onUpdateItems={updatePortfolioItems}
          onResetDefault={handleResetDefault}
        />

        <GraphicUploadModal
          isOpen={isGraphicUploadOpen}
          onClose={() => setIsGraphicUploadOpen(false)}
          onAddWork={(newItem, msg) => {
            updatePortfolioItems([newItem, ...portfolioItems], msg);
            setIsGraphicUploadOpen(false);
          }}
        />

        {/* Firebase Cloud CMS Admin Modals */}
        <AdminLoginModal
          isOpen={isAdminLoginOpen}
          onClose={() => setIsAdminLoginOpen(false)}
          onLoginSuccess={() => {
            setIsAdminDashboardOpen(true);
            showToast('অ্যাডমিন মোডে স্বাগতম! (Logged in to Admin Studio)');
          }}
        />

        <AdminDashboardModal
          isOpen={isAdminDashboardOpen}
          onClose={() => setIsAdminDashboardOpen(false)}
          cloudItems={cloudPortfolioItems}
          allPortfolioItems={portfolioItems}
          onLogout={() => {
            sessionStorage.removeItem('noman_admin_auth');
            setIsAdminDashboardOpen(false);
            showToast('অ্যাডমিন লগআউট সফল হয়েছে');
          }}
          onNotify={(msg) => showToast(msg)}
          onAddLocalProject={(newItem) => updatePortfolioItems([newItem, ...portfolioItems])}
          onDeleteProject={(id) => updatePortfolioItems(portfolioItems.filter((item) => item.id !== id))}
          onClearCategory={(type) => {
            const updated = portfolioItems.filter((item) => item.mediaType !== type);
            updatePortfolioItems(updated, type === 'video' ? 'সব ভিডিও প্রজেক্ট মুছে ফেলা হয়েছে' : 'সব গ্রাফিক্স প্রজেক্ট মুছে ফেলা হয়েছে');
          }}
          onResetDefault={handleResetDefault}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#071A22] border border-[#00E5FF]/60 text-white shadow-[0_0_35px_rgba(0,229,255,0.4)] transition-all">
            <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
