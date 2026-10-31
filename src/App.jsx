import React, { useState } from 'react';
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

const STORAGE_KEY = 'hassan_portfolio_items_v18';

export function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isVideoFormOpen, setIsVideoFormOpen] = useState(false);
  const [isGraphicUploadOpen, setIsGraphicUploadOpen] = useState(false);

  const [portfolioItems, setPortfolioItems] = useState(() => {
    try {
      // Purge legacy storage versions
      for (let i = 1; i <= 17; i++) {
        localStorage.removeItem(`hassan_portfolio_items_v${i}`);
      }

      const saved = localStorage.getItem(STORAGE_KEY);
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

  const updatePortfolioItems = (newItems) => {
    setPortfolioItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error('Error saving portfolio items to localStorage:', e);
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
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#020B0E] text-neutral-200 selection:bg-[#00E5FF] selection:text-black overflow-x-hidden font-sans antialiased">
        {/* Background glow and subtle dot grid */}
        <BackgroundFX />

        {/* Sticky Glassmorphic Navbar */}
        <Navbar onOpenCV={() => setIsCVOpen(true)} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero onOpenCV={() => setIsCVOpen(true)} />
          <PortfolioSection
            items={portfolioItems}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenVideoForm={() => setIsVideoFormOpen(true)}
            onOpenUploadGraphic={() => setIsGraphicUploadOpen(true)}
          />
          <AboutSection />
          <SkillsAndTraining />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Modals & Popups */}
        <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />

        <MediaDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          items={portfolioItems}
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
          onAddWork={(newItem) => {
            updatePortfolioItems([newItem, ...portfolioItems]);
            setIsGraphicUploadOpen(false);
          }}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
