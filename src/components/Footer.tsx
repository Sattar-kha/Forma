import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PageRoute } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageRoute, options?: { sectionId?: string; filter?: string }) => void;
  onOpenPolicy: (policyTitle: string) => void;
}

export function Footer({ onNavigate, onOpenPolicy }: FooterProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#9D6432] text-white w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-16 sm:pt-20 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-[26px] sm:text-[32px] leading-[1.22] tracking-[-0.015em] font-normal text-white max-w-[390px] text-balance">
                Discover new designs, stories and exclusive offers from Forma.
              </h2>

              <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-[340px]">
                <div className="flex items-center border-b border-white/60 focus-within:border-white transition-colors pb-2">
                  <label htmlFor="forma-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="forma-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                      if (subscribed) setSubscribed(false);
                    }}
                    placeholder="Email"
                    className="w-full bg-transparent text-[13.5px] text-white placeholder:text-white/70 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="p-1 text-white hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform cursor-pointer shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                {error && (
                  <p role="alert" className="mt-2 text-[12px] text-[#FFE1C6]">
                    {error}
                  </p>
                )}

                {subscribed && (
                  <p className="mt-2.5 text-[12px] text-white/95 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                    <span>Subscribed (preview mode — connect an email provider for live mailings).</span>
                  </p>
                )}
              </form>

              <address className="not-italic mt-10 text-[12.5px] leading-[1.7] text-white/85 space-y-2.5 max-w-[280px]">
                <p>
                  FORMA Store, Linking Road, Bandra West, Mumbai, Maharashtra – 400050, India
                </p>
                <p>
                  <a
                    href="mailto:formashop@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    formashop@gmail.com
                  </a>
                </p>
                <p>
                  <a href="tel:+918357943935" className="hover:text-white transition-colors tabular-nums">
                    +91 83579 43935
                  </a>
                </p>
              </address>
            </div>

            <p className="mt-14 lg:mt-20 text-[11px] text-white/65">
              Copyright © 2026 FORMA. All rights reserved.
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="grid grid-cols-3 gap-6 sm:gap-10">
                <div>
                  <h3 className="text-[13px] font-medium text-white mb-4">Shop</h3>
                  <ul className="space-y-2.5 text-[12.5px] text-white/80">
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigate('collection', { filter: 'newest' })}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        New Arrival
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigate('collection', { filter: 'popular' })}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Best Seller
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigate('collection', { filter: 'Lounge Chairs' })}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Trending
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigate('collection', { filter: 'Dining Chairs' })}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Offers
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[13px] font-medium text-white mb-4">About</h3>
                  <ul className="space-y-2.5 text-[12.5px] text-white/80">
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigate('home', { sectionId: 'craftsmanship-story' })}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Our Heritage
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigate('home', { sectionId: 'craftsmanship-story' })}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Craftsmanship
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigate('home', { sectionId: 'testimonials-section' })}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Customer Stories
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigate('home', { sectionId: 'faq-section' })}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        FAQ
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[13px] font-medium text-white mb-4">Social</h3>
                  <ul className="space-y-2.5 text-[12.5px] text-white/80">
                    <li>
                      <button
                        type="button"
                        onClick={() => onOpenPolicy('Instagram')}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Instagram
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onOpenPolicy('Pinterest')}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Pinterest
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onOpenPolicy('LinkedIn')}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        LinkedIn
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onOpenPolicy('Design Journal')}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Journal
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-10 text-[12px] text-white/80">
                <button
                  type="button"
                  onClick={() => onOpenPolicy('Shipping & Return')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Shipping &amp; Return
                </button>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('Terms & Condition')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Terms &amp; Condition
                </button>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('Privacy Policy')}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </div>
            </div>

            <div className="mt-14 lg:mt-16 pt-2 select-none" aria-hidden="true">
              <div className="text-[clamp(4rem,13vw,9.75rem)] leading-[0.8] tracking-[-0.025em] font-normal text-white">
                FORMA
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
