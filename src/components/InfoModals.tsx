import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, Mail, Clock, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { IMAGES } from '../data/products';
import { FORMA_EASE } from './MotionPrimitives';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

function ModalShell({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClass = 'max-w-[560px]',
}: BaseModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: FORMA_EASE }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative w-full ${maxWidthClass} bg-[#F2F2F2] border border-[#DCDCDC] z-10 overflow-hidden`}
          >
            <div className="px-6 py-4 border-b border-[#DCDCDC] flex items-center justify-between">
              <h3 className="text-[16px] font-normal text-[#1F1F1F]">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1 -mr-1 text-[#1F1F1F] hover:text-[#9D6432] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function WorkshopVideoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Inside the FORMA Joinery Workshop"
      maxWidthClass="max-w-[780px]"
    >
      <div className="space-y-5">
        <div className="relative bg-[#1F1F1F] aspect-[16/9] overflow-hidden">
          <img
            src={IMAGES.workshopCraft}
            alt="FORMA craftspeople inspecting wooden chair joinery and blueprints"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 text-white">
            <p className="text-[12px] tracking-[0.06em] uppercase text-white/80">
              Workshop Film · 02:40
            </p>
            <h4 className="mt-1 text-[22px] sm:text-[26px] font-normal leading-snug">
              Hand-Shaping Maple, Oak, Cherry &amp; Walnut Since 1890
            </h4>
            <p className="mt-2 text-[13px] text-white/85 max-w-[540px] leading-relaxed">
              Every FORMA chair passes through fourteen stages of kiln-seasoning, steam bending,
              mortise-and-tenon joinery, hand-sanding, and natural oil finishing before leaving our
              studio floor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-[13px]">
          <div className="bg-white p-4">
            <p className="text-[#1F1F1F] font-medium">01. Timber Selection</p>
            <p className="mt-1 text-[#6E6E6E] leading-relaxed">
              Boards are grain-matched by hand across Maple, Oak, Cherry, and Walnut.
            </p>
          </div>
          <div className="bg-white p-4">
            <p className="text-[#1F1F1F] font-medium">02. Precision Joinery</p>
            <p className="mt-1 text-[#6E6E6E] leading-relaxed">
              Structural dowels and mortise joints ensure stability across decades.
            </p>
          </div>
          <div className="bg-white p-4">
            <p className="text-[#1F1F1F] font-medium">03. Natural Oil Finish</p>
            <p className="mt-1 text-[#6E6E6E] leading-relaxed">
              Breathable matte oils preserve the tactile warmth of solid hardwood.
            </p>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export function AccountModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="FORMA Showroom & Client Care">
      <div className="space-y-5 text-[14px] text-[#4E4E4E]">
        <p className="leading-relaxed">
          Visit our Mumbai flagship showroom to experience our Maple, Oak, Cherry, and Walnut wood
          samples and textile upholstery swatches in person.
        </p>

        <div className="bg-white p-5 space-y-3 border border-[#E5E5E5] text-[13.5px]">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#9D6432] shrink-0 mt-0.5" strokeWidth={1.6} />
            <span>FORMA Store, Linking Road, Bandra West, Mumbai, Maharashtra – 400050, India</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#9D6432] shrink-0" strokeWidth={1.6} />
            <span className="tabular-nums">+91 83579 43935</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#9D6432] shrink-0" strokeWidth={1.6} />
            <span>formashop@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#9D6432] shrink-0" strokeWidth={1.6} />
            <span>Mon – Sun, 10:30 AM – 8:00 PM IST</span>
          </div>
        </div>

        <p className="text-[12.5px] text-[#737373]">
          Customer account sign-in and order tracking require a backend authentication provider.
          Connect your preferred store backend when moving to production.
        </p>
      </div>
    </ModalShell>
  );
}

export function PolicyModal({
  title,
  onClose,
}: {
  title: string | null;
  onClose: () => void;
}) {
  return (
    <ModalShell isOpen={Boolean(title)} onClose={onClose} title={title || ''}>
      {title === 'Shipping & Return' ? (
        <div className="space-y-4 text-[13.5px] leading-relaxed text-[#4E4E4E]">
          <div className="flex items-start gap-3 bg-white p-4">
            <Truck className="w-4 h-4 text-[#9D6432] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[#1F1F1F] font-medium">Complimentary White-Glove Shipping</p>
              <p className="mt-0.5 text-[#6E6E6E]">
                Every chair ships insured with protective packaging and free in-room placement.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-4">
            <ShieldCheck className="w-4 h-4 text-[#9D6432] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[#1F1F1F] font-medium">36-Month Structural Warranty</p>
              <p className="mt-0.5 text-[#6E6E6E]">
                Covers solid hardwood frames, joinery integrity, and manufacturing craftsmanship.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-4">
            <RotateCcw className="w-4 h-4 text-[#9D6432] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[#1F1F1F] font-medium">3-Day Easy Return Window</p>
              <p className="mt-0.5 text-[#6E6E6E]">
                Unused chairs in original condition may be returned within 3 days of delivery.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-[13.5px] leading-relaxed text-[#4E4E4E]">
          <p>
            FORMA crafts timeless solid-wood chairs designed in Maple, Oak, Cherry, and Walnut.
          </p>
          <p>
            For inquiries regarding {title?.toLowerCase()}, bespoke wood finishes, or interior trade
            specifications, please contact our Bandra West studio at{' '}
            <span className="text-[#1F1F1F]">formashop@gmail.com</span> or{' '}
            <span className="text-[#1F1F1F] tabular-nums">+91 83579 43935</span>.
          </p>
        </div>
      )}
    </ModalShell>
  );
}
