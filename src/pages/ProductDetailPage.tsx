import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Truck,
  ShieldCheck,
  Hammer,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
} from 'lucide-react';
import {
  Product,
  PRODUCTS,
  WOOD_OPTIONS,
  TEXTILE_OPTIONS,
  WoodType,
  TextileType,
  formatINR,
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FaqSection } from '../components/FaqSection';
import { Reveal, FORMA_EASE } from '../components/MotionPrimitives';
import { PageRoute } from '../components/Navbar';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: PageRoute, options?: { sectionId?: string }) => void;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (payload: {
    product: Product;
    wood: WoodType;
    textile: TextileType;
    quantity: number;
    openDrawer?: boolean;
  }) => void;
}

function ChairBlueprintSvg({ dimensions }: { dimensions: Product['dimensions'] }) {
  return (
    <svg
      viewBox="0 0 420 240"
      className="w-full max-w-[380px] h-auto text-[#4A4A4A]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chair technical elevation blueprint"
    >
      {/* Front Elevation (Left) */}
      <g stroke="currentColor" strokeWidth="1.2">
        {/* Backrest */}
        <path d="M58 44 C78 52, 132 52, 152 44 C156 68, 152 94, 140 102 C122 108, 88 108, 70 102 C58 94, 54 68, 58 44 Z" />
        {/* Back legs */}
        <line x1="72" y1="102" x2="66" y2="198" />
        <line x1="138" y1="102" x2="144" y2="198" />
        {/* Seat */}
        <path d="M58 128 Q105 136 152 128 L149 138 Q105 144 61 138 Z" />
        {/* Front rail */}
        <line x1="66" y1="143" x2="144" y2="143" />
        {/* Width Dimension */}
        <line x1="58" y1="216" x2="152" y2="216" stroke="#8C8C8C" strokeWidth="0.9" />
        <line x1="58" y1="211" x2="58" y2="221" stroke="#8C8C8C" strokeWidth="0.9" />
        <line x1="152" y1="211" x2="152" y2="221" stroke="#8C8C8C" strokeWidth="0.9" />
      </g>
      <text x="105" y="232" textAnchor="middle" fill="#6E6E6E" fontSize="11">
        W {dimensions.width}
      </text>

      {/* Side Elevation (Right) */}
      <g stroke="currentColor" strokeWidth="1.2">
        {/* Backrest profile */}
        <path d="M254 44 C264 62, 266 86, 260 104" strokeWidth="2.4" strokeLinecap="round" />
        {/* Rear leg */}
        <line x1="258" y1="96" x2="246" y2="198" />
        {/* Front leg */}
        <line x1="336" y1="134" x2="344" y2="198" />
        {/* Seat profile */}
        <path d="M255 128 C280 135, 314 134, 344 129 C346 134, 342 138, 336 138 L254 137 Z" />
        {/* Depth Dimension */}
        <line x1="246" y1="216" x2="344" y2="216" stroke="#8C8C8C" strokeWidth="0.9" />
        <line x1="246" y1="211" x2="246" y2="221" stroke="#8C8C8C" strokeWidth="0.9" />
        <line x1="344" y1="211" x2="344" y2="221" stroke="#8C8C8C" strokeWidth="0.9" />
        {/* Total Height Dimension */}
        <line x1="376" y1="44" x2="376" y2="198" stroke="#8C8C8C" strokeWidth="0.9" />
        <line x1="371" y1="44" x2="381" y2="44" stroke="#8C8C8C" strokeWidth="0.9" />
        <line x1="371" y1="198" x2="381" y2="198" stroke="#8C8C8C" strokeWidth="0.9" />
        {/* Seat Height Dimension */}
        <line x1="220" y1="130" x2="220" y2="198" stroke="#8C8C8C" strokeWidth="0.9" />
        <line x1="215" y1="130" x2="225" y2="130" stroke="#8C8C8C" strokeWidth="0.9" />
        <line x1="215" y1="198" x2="225" y2="198" stroke="#8C8C8C" strokeWidth="0.9" />
      </g>
      <text x="295" y="232" textAnchor="middle" fill="#6E6E6E" fontSize="11">
        D {dimensions.depth}
      </text>
      <text x="392" y="124" textAnchor="middle" fill="#6E6E6E" fontSize="10.5" transform="rotate(-90 392 124)">
        H {dimensions.height}
      </text>
      <text x="206" y="166" textAnchor="middle" fill="#6E6E6E" fontSize="10" transform="rotate(-90 206 166)">
        SH {dimensions.seatHeight}
      </text>
    </svg>
  );
}

export function ProductDetailPage({
  product,
  onNavigate,
  onSelectProduct,
  onAddToCart,
}: ProductDetailPageProps) {
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [selectedWood, setSelectedWood] = useState<WoodType>(product.defaultWood);
  const [selectedTextile, setSelectedTextile] = useState<TextileType>(product.defaultTextile);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const relatedCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveThumbIndex(0);
    setSelectedWood(product.defaultWood);
    setSelectedTextile(product.defaultTextile);
    setQuantity(1);
    setJustAdded(false);
  }, [product.id, product.defaultWood, product.defaultTextile]);

  const activeGalleryItem = product.gallery[activeThumbIndex] ?? product.gallery[0];
  const activeWoodOption = WOOD_OPTIONS.find((w) => w.id === selectedWood) ?? WOOD_OPTIONS[0];
  const activeTextileOption =
    TEXTILE_OPTIONS.find((t) => t.id === selectedTextile) ?? TEXTILE_OPTIONS[0];

  const woodVariantPhoto =
    activeThumbIndex === 0 && product.woodImages?.[selectedWood]
      ? product.woodImages[selectedWood]
      : null;

  const displayedMainImage = woodVariantPhoto || activeGalleryItem.main;
  const applySubtleWoodFilter =
    !woodVariantPhoto &&
    activeGalleryItem.kind !== 'dimensions' &&
    selectedWood !== product.defaultWood;

  const availableWoodOptions = WOOD_OPTIONS.filter((w) => product.availableWoods.includes(w.id));
  const availableTextileOptions = TEXTILE_OPTIONS.filter((t) =>
    product.availableTextiles.includes(t.id)
  );

  const relatedOrder = [
    'ry-dining-chair',
    'fluffy-lounge-chair',
    'veng-lounge-chair',
    'unfluffy-lounge-chair',
    'hunter-leather-lounge-chair',
    'hertug-dining-chair',
    'veng-dining-chair',
  ];
  const relatedProducts = relatedOrder
    .filter((id) => id !== product.id)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const scrollRelated = (direction: -1 | 1) => {
    if (!relatedCarouselRef.current) return;
    const distance = Math.max(320, relatedCarouselRef.current.clientWidth * 0.65);
    relatedCarouselRef.current.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  const handleAddClick = () => {
    onAddToCart({
      product,
      wood: selectedWood,
      textile: selectedTextile,
      quantity,
      openDrawer: false,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuyNow = () => {
    onAddToCart({
      product,
      wood: selectedWood,
      textile: selectedTextile,
      quantity,
      openDrawer: true,
    });
  };

  return (
    <main>
      {/* 1. BREADCRUMB + HERO PURCHASE MODULE */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-6 sm:pt-8 pb-16 lg:pb-24">
        <nav aria-label="Breadcrumb" className="text-[12px] text-[#848484] flex items-center gap-1.5 mb-5">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#1F1F1F] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={() => onNavigate('collection')}
            className="hover:text-[#1F1F1F] transition-colors cursor-pointer"
          >
            Shop
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#1F1F1F]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Thumbnail Rail + Main Studio Stage */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3">
            <div
              className="flex sm:flex-col gap-2.5 sm:w-[96px] shrink-0 overflow-x-auto sm:overflow-visible forma-no-scrollbar"
              role="tablist"
              aria-label="Product gallery views"
            >
              {product.gallery.map((item, idx) => {
                const isActive = idx === activeThumbIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveThumbIndex(idx)}
                    className={`w-[76px] h-[76px] sm:w-[96px] sm:h-[96px] shrink-0 bg-white p-2 flex items-center justify-center border overflow-hidden transition-colors cursor-pointer ${
                      isActive ? 'border-[#1F1F1F]' : 'border-transparent hover:border-[#CCCCCC]'
                    }`}
                  >
                    {item.kind === 'dimensions' ? (
                      <ChairBlueprintSvg dimensions={product.dimensions} />
                    ) : (
                      <img
                        src={item.thumb}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-contain mix-blend-multiply ${item.cropClass || ''}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex-1 bg-white aspect-[540/628] relative overflow-hidden flex items-center justify-center p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {activeGalleryItem.kind === 'dimensions' ? (
                  <motion.div
                    key="dimensions-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: FORMA_EASE }}
                    className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8"
                  >
                    <ChairBlueprintSvg dimensions={product.dimensions} />
                    <div className="mt-8 w-full max-w-[400px] border-t border-[#E5E5E5] pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-[11px] text-[#848484]">Width</p>
                        <p className="mt-0.5 text-[14px] text-[#1F1F1F] tabular-nums">
                          {product.dimensions.width}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#848484]">Depth</p>
                        <p className="mt-0.5 text-[14px] text-[#1F1F1F] tabular-nums">
                          {product.dimensions.depth}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#848484]">Height</p>
                        <p className="mt-0.5 text-[14px] text-[#1F1F1F] tabular-nums">
                          {product.dimensions.height}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#848484]">Seat Height</p>
                        <p className="mt-0.5 text-[14px] text-[#1F1F1F] tabular-nums">
                          {product.dimensions.seatHeight}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.img
                    key={`${displayedMainImage}-${activeThumbIndex}-${selectedWood}`}
                    src={displayedMainImage}
                    alt={`${product.name} in ${selectedWood} wood and ${selectedTextile} textile`}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.32, ease: FORMA_EASE }}
                    style={{
                      filter: applySubtleWoodFilter ? activeWoodOption.filterCss : undefined,
                    }}
                    className={`w-full h-full object-contain mix-blend-multiply ${activeGalleryItem.cropClass || ''}`}
                  />
                )}
              </AnimatePresence>

              <div className="absolute bottom-4 left-5 text-[11.5px] text-[#848484] flex items-center gap-2 pointer-events-none">
                <span>{selectedWood}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedTextile}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Contiguous Purchase Module */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <h1 className="text-[28px] sm:text-[32px] font-normal tracking-[-0.015em] text-[#1F1F1F] leading-tight">
              {product.name}
            </h1>
            <p className="mt-1 text-[11.5px] text-[#9A9A9A] tabular-nums">ID: {product.sku}</p>

            <div className="mt-4 flex flex-col gap-1">
              <div className="text-[12.5px] text-[#1F1F1F] tabular-nums">
                <span className="font-medium">{product.rating}</span>
                <span className="text-[#848484]">/5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5" aria-label={`Rated ${product.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.round(product.rating)
                          ? 'fill-[#E6A119] text-[#E6A119]'
                          : 'text-[#D4D4D4]'
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-[11.5px] text-[#848484] tabular-nums">
                  ({product.reviewCount.toLocaleString('en-IN')})
                </span>
              </div>
            </div>

            <p className="mt-3 text-[26px] sm:text-[28px] font-normal text-[#1F1F1F] tabular-nums">
              {formatINR(product.price)}
            </p>

            <p className="mt-3 text-[13.5px] leading-[1.6] text-[#555555] max-w-[440px]">
              {product.shortIntro}
            </p>

            {/* Wood Selection */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between mb-2 gap-2">
                <span className="text-[12px] text-[#737373]">Wood</span>
                <span className="text-[11.5px] text-[#8A8A8A] truncate">{activeWoodOption.originNote}</span>
              </div>
              <div className="flex flex-wrap items-start gap-2.5">
                {availableWoodOptions.map((wood) => {
                  const isSelected = wood.id === selectedWood;
                  return (
                    <button
                      key={wood.id}
                      type="button"
                      onClick={() => {
                        setSelectedWood(wood.id);
                        if (activeGalleryItem.kind === 'dimensions') {
                          setActiveThumbIndex(0);
                        }
                      }}
                      aria-pressed={isSelected}
                      className={`group flex flex-col items-start p-1 transition-colors cursor-pointer border ${
                        isSelected
                          ? 'border-[#1F1F1F] bg-white'
                          : 'border-transparent hover:border-[#CCCCCC]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        style={{ background: wood.swatchStyle }}
                        className="w-[54px] h-[42px] block"
                      />
                      <span
                        className={`mt-1 text-[11px] leading-none ${
                          isSelected ? 'text-[#1F1F1F]' : 'text-[#737373]'
                        }`}
                      >
                        {wood.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Textile Selection */}
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-[12px] text-[#737373]">Textile</span>
                <span className="text-[11.5px] text-[#8A8A8A]">{activeTextileOption.label}</span>
              </div>
              <div className="flex flex-wrap items-start gap-2.5">
                {availableTextileOptions.map((textile) => {
                  const isSelected = textile.id === selectedTextile;
                  return (
                    <button
                      key={textile.id}
                      type="button"
                      onClick={() => setSelectedTextile(textile.id)}
                      aria-pressed={isSelected}
                      className={`group flex flex-col items-start p-1 transition-colors cursor-pointer border ${
                        isSelected
                          ? 'border-[#1F1F1F] bg-white'
                          : 'border-transparent hover:border-[#CCCCCC]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        style={{ background: textile.swatchStyle }}
                        className="w-[54px] h-[42px] block"
                      />
                      <span
                        className={`mt-1 text-[11px] leading-none ${
                          isSelected ? 'text-[#1F1F1F]' : 'text-[#737373]'
                        }`}
                      >
                        {textile.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-5">
              <span className="block text-[12px] text-[#737373] mb-2">Quantity</span>
              <div className="inline-flex items-center bg-white border border-[#DCDCDC]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 flex items-center justify-center text-[#1F1F1F] hover:bg-[#F2F2F2] transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
                <span className="w-10 text-center text-[13.5px] text-[#1F1F1F] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="w-9 h-9 flex items-center justify-center text-[#1F1F1F] hover:bg-[#F2F2F2] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Estimated Delivery */}
            <p className="mt-5 text-[12.5px] text-[#4E4E4E]">
              Estimation delivery:{' '}
              <span className="text-[#228B22] font-medium">{product.estimatedDelivery}</span>
            </p>

            {/* Primary Dual CTAs */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddClick}
                className="h-12 px-4 border border-[#1F1F1F] bg-transparent text-[#1F1F1F] text-[13.5px] hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#228B22]" strokeWidth={2} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <span>Add to Cart</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="h-12 px-4 bg-[#1F1F1F] text-white text-[13.5px] hover:bg-[#333333] transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DESCRIPTION, SPECS & CARE GUIDE */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-10 lg:py-14">
        <Reveal>
          <h2 className="text-[26px] sm:text-[28px] font-normal tracking-[-0.015em] text-[#1F1F1F] mb-6">
            Description
          </h2>

          <div className="max-w-[780px] space-y-4 text-[13.5px] sm:text-[14px] leading-[1.7] text-[#4E4E4E]">
            {product.descriptionParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 max-w-[780px]">
            <h3 className="text-[14px] font-medium text-[#1F1F1F] mb-3">Key Features</h3>
            <ul className="space-y-1.5 text-[13.5px] leading-[1.65] text-[#4E4E4E] list-disc pl-5">
              {product.keyFeatures.map((feature) => (
                <li key={feature.title}>
                  <strong className="font-medium text-[#1F1F1F]">{feature.title}:</strong>{' '}
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 max-w-[780px]">
            <h3 className="text-[14px] font-medium text-[#1F1F1F] mb-3">
              Specifications &amp; Dimensions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 border-t border-b border-[#DCDCDC] py-4 gap-4">
              <div>
                <p className="text-[11.5px] text-[#848484]">Width</p>
                <p className="mt-0.5 text-[13.5px] text-[#1F1F1F] tabular-nums">
                  {product.dimensions.width}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] text-[#848484]">Depth</p>
                <p className="mt-0.5 text-[13.5px] text-[#1F1F1F] tabular-nums">
                  {product.dimensions.depth}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] text-[#848484]">Height</p>
                <p className="mt-0.5 text-[13.5px] text-[#1F1F1F] tabular-nums">
                  {product.dimensions.height}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] text-[#848484]">Seat Height</p>
                <p className="mt-0.5 text-[13.5px] text-[#1F1F1F] tabular-nums">
                  {product.dimensions.seatHeight}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] text-[#848484]">Weight</p>
                <p className="mt-0.5 text-[13.5px] text-[#1F1F1F] tabular-nums">
                  {product.dimensions.weight}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-[780px]">
            <h3 className="text-[14px] font-medium text-[#1F1F1F] mb-3">Care Guide</h3>
            <ul className="space-y-1.5 text-[13.5px] leading-[1.65] text-[#4E4E4E] list-disc pl-5">
              {product.careGuide.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 3. DELIVERY GUARANTEES */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-10 lg:py-14">
        <Reveal>
          <h2 className="text-[26px] sm:text-[28px] font-normal tracking-[-0.015em] text-[#1F1F1F] mb-7">
            Delivery
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-[#DCDCDC] lg:max-w-[920px]">
            <div className="py-7 px-4 flex flex-col items-center text-center gap-3 border-r border-b lg:border-b-0 border-[#DCDCDC]">
              <Truck className="w-6 h-6 text-[#3A3A3A]" strokeWidth={1.3} />
              <p className="text-[11.5px] tracking-[0.04em] leading-snug text-[#2B2B2B]">
                FREE
                <br />
                SHIPPING
              </p>
            </div>
            <div className="py-7 px-4 flex flex-col items-center text-center gap-3 lg:border-r border-b lg:border-b-0 border-[#DCDCDC]">
              <ShieldCheck className="w-6 h-6 text-[#3A3A3A]" strokeWidth={1.3} />
              <p className="text-[11.5px] tracking-[0.04em] leading-snug text-[#2B2B2B]">
                36 MONTHS
                <br />
                WARRANTY*
              </p>
            </div>
            <div className="py-7 px-4 flex flex-col items-center text-center gap-3 border-r border-[#DCDCDC]">
              <Hammer className="w-6 h-6 text-[#3A3A3A]" strokeWidth={1.3} />
              <p className="text-[11.5px] tracking-[0.04em] leading-snug text-[#2B2B2B]">
                FREE
                <br />
                INSTALLATION*
              </p>
            </div>
            <div className="py-7 px-4 flex flex-col items-center text-center gap-3">
              <RotateCcw className="w-6 h-6 text-[#3A3A3A]" strokeWidth={1.3} />
              <p className="text-[11.5px] tracking-[0.04em] leading-snug text-[#2B2B2B]">
                RETURN
                <br />
                IN 3 DAYS
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 4. RELATED PRODUCTS CAROUSEL */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-12 pb-6">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Reveal>
            <h2 className="text-[26px] sm:text-[32px] font-normal tracking-[-0.015em] text-[#1F1F1F]">
              Related Product
            </h2>
          </Reveal>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollRelated(-1)}
              aria-label="Scroll related products left"
              className="w-9 h-9 bg-white text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollRelated(1)}
              aria-label="Scroll related products right"
              className="w-9 h-9 bg-white text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={relatedCarouselRef}
          className="flex gap-3 overflow-x-auto forma-no-scrollbar snap-x snap-mandatory pb-2"
        >
          {relatedProducts.map((related) => (
            <div
              key={related.id}
              className="w-[74vw] sm:w-[44vw] md:w-[31vw] lg:w-[318px] shrink-0 snap-start"
            >
              <ProductCard
                product={related}
                onSelect={onSelectProduct}
                imageContainerClassName="aspect-[320/380]"
              />
            </div>
          ))}
        </div>
      </section>

      <FaqSection
        ctaLabel="Know more about us"
        onCtaClick={() => onNavigate('home', { sectionId: 'craftsmanship-story' })}
      />
    </main>
  );
}
