import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { FAQ_ITEMS, IMAGES } from '../data/products';
import { Reveal, FORMA_EASE } from './MotionPrimitives';

interface FaqSectionProps {
  ctaLabel?: string;
  onCtaClick: () => void;
}

export function FaqSection({
  ctaLabel = 'Know more about us',
  onCtaClick,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq-section"
      className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-20 lg:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <Reveal>
            <h2 className="text-[32px] sm:text-[38px] lg:text-[40px] leading-[1.14] tracking-[-0.02em] font-normal text-[#1F1F1F] max-w-[340px] text-balance">
              Everything you need to know about forma
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 lg:mt-20">
            <div className="w-[152px] sm:w-[178px]">
              <img
                src={IMAGES.vengDining}
                alt="FORMA Veng dining chair silhouette"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain mix-blend-multiply select-none"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-4">
          <Reveal>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.65] text-[#4E4E4E] max-w-[540px] mb-10">
              At FORMA, we believe choosing furniture should feel as thoughtful as creating it.
              Find answers about our designs, materials, craftsmanship and shopping experience.
            </p>
          </Reveal>

          <div className="border-t border-[#DCDCDC]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.number} className="border-b border-[#DCDCDC]">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-5">
                      <span className="text-[12px] text-[#8A8A8A] tabular-nums shrink-0">
                        {item.number}
                      </span>
                      <span className="text-[15.5px] sm:text-[16.5px] font-normal text-[#1F1F1F] group-hover:text-[#9D6432] transition-colors">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#737373] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? 'rotate-180 text-[#1F1F1F]' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: FORMA_EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pl-8 sm:pl-10 pr-6 pb-6 text-[13.5px] sm:text-[14px] leading-[1.7] text-[#555555]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Reveal delay={0.1} className="mt-8">
            <button
              type="button"
              onClick={onCtaClick}
              className="forma-link-underline text-[13.5px] text-[#1F1F1F] cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
