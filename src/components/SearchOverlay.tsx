import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { PRODUCTS, formatINR } from '../data/products';
import { FORMA_EASE } from './MotionPrimitives';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export function SearchOverlay({ isOpen, onClose, onSelectProduct }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const q = query.trim().toLowerCase();
  const matches = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.availableWoods.some((w) => w.toLowerCase().includes(q)) ||
          p.sku.includes(q)
      )
    : PRODUCTS.slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/35 z-50"
          />
          <motion.div
            initial={{ y: '-100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0.6 }}
            transition={{ duration: 0.34, ease: FORMA_EASE }}
            role="dialog"
            aria-label="Search FORMA collection"
            className="fixed top-0 left-0 right-0 bg-[#F2F2F2] z-50 border-b border-[#DCDCDC]"
          >
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-6 sm:py-8">
              <div className="flex items-center gap-4 border-b border-[#1F1F1F]/30 pb-3.5">
                <Search className="w-5 h-5 text-[#5A5A5A] shrink-0" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search chairs by name, category, or wood (Maple, Oak, Cherry, Walnut)..."
                  className="w-full bg-transparent text-[16px] sm:text-[18px] text-[#1F1F1F] placeholder:text-[#8A8A8A] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="p-1.5 text-[#1F1F1F] hover:text-[#9D6432] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-6">
                <p className="text-[12px] text-[#737373] mb-4">
                  {q ? `${matches.length} matching designs` : 'Popular Chair Designs'}
                </p>

                {matches.length === 0 ? (
                  <p className="py-8 text-[14px] text-[#5A5A5A]">
                    No chairs found matching &ldquo;{query}&rdquo;. Try searching for Veng, Hertug,
                    Krysset, Walnut, or Lounge.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-h-[55vh] overflow-y-auto pb-2">
                    {matches.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          onSelectProduct(product.id);
                          onClose();
                        }}
                        className="group text-left bg-white p-3 sm:p-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                      >
                        <div className="aspect-[4/4] flex items-center justify-center p-2 overflow-hidden">
                          <img
                            src={product.cardImage}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-400 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-3 flex items-end justify-between gap-2">
                          <div>
                            <p className="text-[12.5px] text-[#6E6E6E] group-hover:text-[#1F1F1F] transition-colors">
                              {product.name}
                            </p>
                            <p className="text-[13.5px] text-[#1F1F1F] tabular-nums">
                              {formatINR(product.price)}
                            </p>
                          </div>
                          <ArrowUpRight
                            className="w-3.5 h-3.5 text-[#8A8A8A] group-hover:text-[#1F1F1F] shrink-0"
                            strokeWidth={1.5}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
