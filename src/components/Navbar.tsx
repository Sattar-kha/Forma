import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { FORMA_EASE } from './MotionPrimitives';

export type PageRoute = 'home' | 'collection' | 'product';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, options?: { sectionId?: string; category?: string }) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showHomeWordmark, setShowHomeWordmark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowHomeWordmark(y > 180);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showCenterLogo = currentPage !== 'home' || showHomeWordmark;

  const handleLinkClick = (page: PageRoute, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, { sectionId });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
          scrolled
            ? 'bg-[#F2F2F2]/92 backdrop-blur-md border-b border-[#E2E2E2]'
            : 'bg-[#F2F2F2] border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 h-16 flex items-center justify-between gap-4">
          {/* Left Zone */}
          <div className="flex items-center gap-7 flex-1">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2 -ml-2 text-[#1F1F1F] hover:opacity-70 transition-opacity"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
              <button
                type="button"
                onClick={() => handleLinkClick('collection')}
                className={`text-[13.5px] tracking-[0.01em] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  currentPage === 'collection'
                    ? 'text-[#1F1F1F] underline underline-offset-4 decoration-[#1F1F1F]/60'
                    : 'text-[#2B2B2B] hover:text-[#9D6432]'
                }`}
              >
                Shop
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('home', 'explore-collections')}
                className="text-[13.5px] tracking-[0.01em] text-[#2B2B2B] hover:text-[#9D6432] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                Collection
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('home', 'craftsmanship-story')}
                className="text-[13.5px] tracking-[0.01em] text-[#2B2B2B] hover:text-[#9D6432] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                About
              </button>
            </nav>
          </div>

          {/* Center Zone */}
          <div className="flex items-center justify-center shrink-0">
            <AnimatePresence initial={false}>
              {showCenterLogo && (
                <motion.button
                  type="button"
                  key="header-wordmark"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: FORMA_EASE }}
                  onClick={() => handleLinkClick('home')}
                  className="text-[22px] sm:text-[26px] font-normal tracking-[0.04em] text-[#1F1F1F] whitespace-nowrap cursor-pointer select-none"
                  aria-label="FORMA Home"
                >
                  FORMA
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Right Zone */}
          <div className="flex items-center justify-end gap-4 sm:gap-6 flex-1">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search chairs"
              className="p-1.5 text-[#1F1F1F] hover:text-[#9D6432] transition-colors cursor-pointer"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={onOpenAccount}
              aria-label="Account and showroom"
              className="p-1.5 text-[#1F1F1F] hover:text-[#9D6432] transition-colors cursor-pointer"
            >
              <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative p-1.5 text-[#1F1F1F] hover:text-[#9D6432] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2, ease: FORMA_EASE }}
                    className="absolute -top-0.5 -right-1 min-w-[16px] h-[16px] px-1 bg-[#1F1F1F] text-white text-[10px] font-medium tabular-nums flex items-center justify-center leading-none"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/35 z-50 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: FORMA_EASE }}
              aria-label="Mobile menu"
              className="fixed top-0 left-0 bottom-0 w-[82%] max-w-[320px] bg-[#F2F2F2] z-50 flex flex-col justify-between p-6 md:hidden border-r border-[#DFDFDF]"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#DCDCDC]">
                  <button
                    type="button"
                    onClick={() => handleLinkClick('home')}
                    className="text-[22px] tracking-[0.04em] text-[#1F1F1F]"
                  >
                    FORMA
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 -mr-2 text-[#1F1F1F]"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="mt-8 flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={() => handleLinkClick('home')}
                    className="text-left text-[20px] text-[#1F1F1F] hover:text-[#9D6432] transition-colors"
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('collection')}
                    className="text-left text-[20px] text-[#1F1F1F] hover:text-[#9D6432] transition-colors"
                  >
                    Shop All Chairs
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('home', 'explore-collections')}
                    className="text-left text-[20px] text-[#1F1F1F] hover:text-[#9D6432] transition-colors"
                  >
                    Collections
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('home', 'craftsmanship-story')}
                    className="text-left text-[20px] text-[#1F1F1F] hover:text-[#9D6432] transition-colors"
                  >
                    Craftsmanship &amp; About
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkClick('home', 'faq-section')}
                    className="text-left text-[20px] text-[#1F1F1F] hover:text-[#9D6432] transition-colors"
                  >
                    FAQ
                  </button>
                </nav>
              </div>

              <div className="pt-6 border-t border-[#DCDCDC] text-[12px] text-[#6E6E6E] space-y-1">
                <p className="text-[#1F1F1F]">FORMA Store, Bandra West</p>
                <p>Mumbai, Maharashtra – 400050</p>
                <p>+91 83579 43935</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
