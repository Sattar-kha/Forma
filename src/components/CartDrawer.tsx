import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import { WoodType, TextileType, formatINR } from '../data/products';
import { FORMA_EASE } from './MotionPrimitives';

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  wood: WoodType;
  textile: TextileType;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  onNavigateToShop: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToShop,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [formError, setFormError] = useState('');
  const [orderRef, setOrderRef] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      if (checkoutStep === 'confirmed') {
        setCheckoutStep('bag');
      }
    }, 300);
  };

  const handlePlaceDemoOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      setFormError('Please enter your name and a valid email address.');
      return;
    }
    setFormError('');
    setOrderRef(`FRM-${Math.floor(100000 + Math.random() * 900000)}`);
    onClearCart();
    setCheckoutStep('confirmed');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/35 z-50"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.36, ease: FORMA_EASE }}
            aria-label="Shopping Bag"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-[#F2F2F2] z-50 flex flex-col border-l border-[#DCDCDC]"
          >
            <div className="px-6 py-5 border-b border-[#DCDCDC] flex items-center justify-between bg-[#F2F2F2]">
              <div className="flex items-baseline gap-2.5">
                <h2 className="text-[18px] font-normal text-[#1F1F1F]">
                  {checkoutStep === 'bag'
                    ? 'Shopping Bag'
                    : checkoutStep === 'checkout'
                    ? 'Order Request'
                    : 'Request Received'}
                </h2>
                {checkoutStep === 'bag' && (
                  <span className="text-[12.5px] text-[#737373] tabular-nums">
                    ({totalCount} {totalCount === 1 ? 'item' : 'items'})
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close shopping bag"
                className="p-1.5 -mr-1.5 text-[#1F1F1F] hover:text-[#9D6432] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {checkoutStep === 'confirmed' ? (
                <div className="py-12 flex flex-col items-start gap-4">
                  <CheckCircle2 className="w-9 h-9 text-[#228B22]" strokeWidth={1.4} />
                  <h3 className="text-[22px] font-normal text-[#1F1F1F]">
                    Thank you, {customerName || 'Guest'}.
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-[#555555]">
                    Your demonstration order reference is{' '}
                    <span className="text-[#1F1F1F] font-medium tabular-nums">{orderRef}</span>.
                  </p>
                  <p className="text-[12.5px] leading-[1.6] text-[#737373] bg-white p-4 border border-[#E2E2E2]">
                    Frontend demonstration mode: no live payment was charged and no order was sent
                    to an external payment gateway. Connect your commerce backend or payment
                    provider to enable live checkout.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStep('bag');
                      onClose();
                    }}
                    className="mt-4 px-6 py-3 bg-[#1F1F1F] text-white text-[13.5px] hover:bg-[#333333] transition-colors cursor-pointer"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : checkoutStep === 'checkout' ? (
                <form id="forma-demo-checkout" onSubmit={handlePlaceDemoOrder} className="space-y-5">
                  <p className="text-[13px] leading-[1.6] text-[#5A5A5A] bg-white p-3.5 border border-[#E2E2E2]">
                    Preview checkout — no real payment is collected in this frontend prototype.
                  </p>

                  <div>
                    <label htmlFor="checkout-name" className="block text-[12px] text-[#5A5A5A] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Aarav Mehta"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4D4D4] text-[14px] text-[#1F1F1F] focus:outline-none focus:border-[#1F1F1F]"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-email" className="block text-[12px] text-[#5A5A5A] mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4D4D4] text-[14px] text-[#1F1F1F] focus:outline-none focus:border-[#1F1F1F]"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-city" className="block text-[12px] text-[#5A5A5A] mb-1.5">
                      Delivery City &amp; Postal Code
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="Mumbai – 400050"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D4D4D4] text-[14px] text-[#1F1F1F] focus:outline-none focus:border-[#1F1F1F]"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-[12.5px] text-[#B42318]">
                      {formError}
                    </p>
                  )}

                  <div className="pt-4 border-t border-[#DCDCDC] space-y-2 text-[13.5px]">
                    <div className="flex justify-between text-[#5A5A5A]">
                      <span>Items ({totalCount})</span>
                      <span className="tabular-nums text-[#1F1F1F]">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#5A5A5A]">
                      <span>Shipping &amp; Installation</span>
                      <span className="text-[#228B22]">Free</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#DCDCDC] text-[15px] font-medium text-[#1F1F1F]">
                      <span>Estimated Total</span>
                      <span className="tabular-nums">{formatINR(subtotal)}</span>
                    </div>
                  </div>
                </form>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <ShoppingBag className="w-10 h-10 text-[#9A9A9A] mb-4" strokeWidth={1.2} />
                  <p className="text-[16px] text-[#1F1F1F]">Your bag is currently empty</p>
                  <p className="mt-1.5 text-[13px] text-[#737373] max-w-[260px]">
                    Explore our contemporary wooden chairs in Maple, Oak, Cherry, and Walnut.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToShop();
                    }}
                    className="mt-6 px-6 py-2.5 bg-[#1F1F1F] text-white text-[13px] hover:bg-[#333333] transition-colors cursor-pointer"
                  >
                    Explore All Chairs
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#DCDCDC]">
                  {items.map((item) => (
                    <li key={item.key} className="py-5 first:pt-0 flex gap-4">
                      <div className="w-20 h-24 bg-white shrink-0 flex items-center justify-center p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-[14.5px] text-[#1F1F1F] leading-snug">
                              {item.name}
                            </h3>
                            <p className="mt-0.5 text-[12px] text-[#737373]">
                              {item.wood} · {item.textile}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="p-1 text-[#8A8A8A] hover:text-[#1F1F1F] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.4} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#D4D4D4] bg-white">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, -1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-[#1F1F1F] hover:bg-[#F2F2F2] transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" strokeWidth={1.6} />
                            </button>
                            <span className="w-8 text-center text-[12.5px] tabular-nums text-[#1F1F1F]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-[#1F1F1F] hover:bg-[#F2F2F2] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" strokeWidth={1.6} />
                            </button>
                          </div>

                          <p className="text-[14px] text-[#1F1F1F] tabular-nums">
                            {formatINR(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {checkoutStep === 'bag' && items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#DCDCDC] bg-[#F2F2F2] space-y-4">
                <div className="space-y-1.5 text-[13.5px]">
                  <div className="flex items-center justify-between text-[#5A5A5A]">
                    <span>Shipping</span>
                    <span className="text-[#228B22]">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-[15.5px] text-[#1F1F1F] pt-1">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium">{formatINR(subtotal)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 px-5 bg-[#1F1F1F] text-white text-[13.5px] flex items-center justify-center gap-2 hover:bg-[#333333] transition-colors cursor-pointer"
                >
                  <span>Proceed to Order Preview</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            )}

            {checkoutStep === 'checkout' && (
              <div className="px-6 py-5 border-t border-[#DCDCDC] bg-[#F2F2F2] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('bag')}
                  className="px-4 py-3 border border-[#1F1F1F] text-[#1F1F1F] text-[13px] hover:bg-white transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="forma-demo-checkout"
                  className="flex-1 py-3 px-5 bg-[#1F1F1F] text-white text-[13.5px] hover:bg-[#333333] transition-colors cursor-pointer"
                >
                  Submit Demo Order
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
