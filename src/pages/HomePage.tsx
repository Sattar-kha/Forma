import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import {
  HERO_STRIP_ITEMS,
  BRAND_PILLARS,
  TESTIMONIALS,
  IMAGES,
  getProductById,
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FaqSection } from '../components/FaqSection';
import { Reveal, StaggerGroup, StaggerItem, FORMA_EASE } from '../components/MotionPrimitives';
import { PageRoute } from '../components/Navbar';

interface HomePageProps {
  onNavigate: (page: PageRoute, options?: { sectionId?: string; filter?: string }) => void;
  onSelectProduct: (productId: string) => void;
  onOpenWorkshopModal: () => void;
  onOpenAccountModal: () => void;
}

export function HomePage({
  onNavigate,
  onSelectProduct,
  onOpenWorkshopModal,
  onOpenAccountModal,
}: HomePageProps) {
  const prefersReduced = useReducedMotion();

  const heroStripRef = useRef<HTMLDivElement>(null);
  const slabRef = useRef<HTMLElement>(null);
  const workshopRef = useRef<HTMLElement>(null);
  const featureCarouselRef = useRef<HTMLDivElement>(null);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroStripRef,
    offset: ['start end', 'end start'],
  });
  const heroShiftX = useTransform(heroProgress, [0, 1], prefersReduced ? [0, 0] : [28, -48]);

  const { scrollYProgress: slabProgress } = useScroll({
    target: slabRef,
    offset: ['start end', 'end start'],
  });
  const slabImageY = useTransform(slabProgress, [0, 1], prefersReduced ? [0, 0] : [-20, 20]);
  const slabTextY = useTransform(slabProgress, [0, 1], prefersReduced ? [0, 0] : [16, -16]);

  const { scrollYProgress: workshopProgress } = useScroll({
    target: workshopRef,
    offset: ['start end', 'end start'],
  });
  const workshopScale = useTransform(workshopProgress, [0, 1], prefersReduced ? [1, 1] : [1.06, 1]);

  const scrollHorizontal = (ref: React.RefObject<HTMLDivElement | null>, direction: -1 | 1) => {
    if (!ref.current) return;
    const distance = Math.max(320, ref.current.clientWidth * 0.65);
    ref.current.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  const vengArmChair = getProductById('veng-arm-chair');
  const broadwayLounge = getProductById('broadway-lounge-chair');
  const hertugDining = getProductById('hertug-dining-chair');
  const vengBarStool = getProductById('veng-bar-stool');
  const kryssetLounge = getProductById('krysset-lounge-chair');
  const hunterLeather = getProductById('hunter-leather-lounge-chair');

  const featureProducts = [
    getProductById('ry-dining-chair'),
    getProductById('fluffy-lounge-chair'),
    getProductById('veng-lounge-chair'),
    getProductById('unfluffy-lounge-chair'),
    getProductById('hunter-leather-lounge-chair'),
    getProductById('veng-dining-chair'),
  ];

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="pt-2 sm:pt-4 pb-10 sm:pb-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: FORMA_EASE }}
            className="text-[clamp(4.4rem,16.5vw,13.5rem)] leading-[0.86] tracking-[-0.025em] font-normal text-[#1F1F1F] text-center select-none"
          >
            FORMA
          </motion.h1>

          <div className="mt-7 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.14, ease: FORMA_EASE }}
              className="lg:col-span-6"
            >
              <p className="text-[24px] sm:text-[30px] lg:text-[33px] leading-[1.2] tracking-[-0.015em] font-normal text-[#1F1F1F] max-w-[460px] text-balance">
                Not just another chair, but a thoughtful piece of design for life.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.24, ease: FORMA_EASE }}
              className="lg:col-span-5 lg:col-start-8"
            >
              <p className="text-[13px] sm:text-[13.5px] leading-[1.65] text-[#555555] max-w-[400px]">
                With a legacy of chair-making since 1890, we combine carefully selected wood and
                expert craftsmanship to create lasting quality and character.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('collection')}
                  className="forma-link-underline text-[13px] sm:text-[13.5px] text-[#1F1F1F] cursor-pointer"
                >
                  <span>Explore All Collection</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Staggered White Studio Chair Gallery Strip */}
        <div
          ref={heroStripRef}
          className="mt-10 sm:mt-14 w-full overflow-x-auto forma-no-scrollbar pb-2"
        >
          <motion.div
            style={{ x: heroShiftX }}
            className="flex items-end gap-3 px-5 sm:px-8 lg:px-0 min-w-max lg:justify-center"
          >
            {HERO_STRIP_ITEMS.map((item, idx) => (
              <motion.button
                key={`${item.productId}-${idx}`}
                type="button"
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.72,
                  delay: 0.18 + idx * 0.06,
                  ease: FORMA_EASE,
                }}
                onClick={() => onSelectProduct(item.productId)}
                aria-label={`Inspect ${getProductById(item.productId).name}`}
                className={`group shrink-0 bg-white ${item.widthClass} ${item.heightClass} p-4 sm:p-5 flex items-center justify-center overflow-hidden cursor-pointer`}
              >
                <img
                  src={item.image}
                  alt={getProductById(item.productId).name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. ORGANIC WOOD SLAB STATEMENT */}
      <section ref={slabRef} className="relative w-full py-10 sm:py-16 lg:py-20 overflow-hidden">
        <div className="relative w-full min-h-[340px] sm:min-h-[460px] lg:min-h-[560px] flex items-center justify-center">
          <motion.div
            style={{ y: slabImageY }}
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <img
              src={IMAGES.woodSlab}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover mix-blend-multiply select-none"
            />
          </motion.div>

          <motion.div
            style={{ y: slabTextY }}
            className="relative z-10 max-w-[900px] mx-auto px-6 sm:px-10 text-center"
          >
            <Reveal duration={0.85}>
              <h2 className="text-[24px] sm:text-[34px] lg:text-[42px] leading-[1.24] tracking-[-0.02em] font-normal text-[#1A130D] text-balance">
                Made for everyday comfort, created with timeless design and craftsmanship that
                becomes part of your family&apos;s story.
              </h2>
            </Reveal>
          </motion.div>
        </div>
      </section>

      {/* 3. EXPLORE COLLECTIONS */}
      <section
        id="explore-collections"
        className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-14 sm:py-20 lg:py-24"
      >
        <div className="flex items-baseline justify-between gap-4 mb-8 sm:mb-10">
          <Reveal>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[34px] font-normal tracking-[-0.015em] text-[#1F1F1F]">
              Explore Collections
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <button
              type="button"
              onClick={() => onNavigate('collection')}
              className="forma-link-underline text-[13px] sm:text-[13.5px] text-[#1F1F1F] cursor-pointer"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
          <StaggerItem className="sm:col-span-2">
            <ProductCard
              product={vengArmChair}
              onSelect={onSelectProduct}
              imageSrc={IMAGES.broadwayLounge}
              imageContainerClassName="aspect-[652/492]"
            />
          </StaggerItem>
          <StaggerItem>
            <ProductCard
              product={broadwayLounge}
              onSelect={onSelectProduct}
              imageSrc={IMAGES.hunterLeather}
              imageContainerClassName="aspect-[320/320]"
            />
          </StaggerItem>
          <StaggerItem>
            <ProductCard
              product={hertugDining}
              onSelect={onSelectProduct}
              imageContainerClassName="aspect-[316/380]"
            />
          </StaggerItem>
        </StaggerGroup>

        <StaggerGroup className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
          <StaggerItem>
            <ProductCard
              product={vengBarStool}
              onSelect={onSelectProduct}
              imageContainerClassName="aspect-[320/492]"
            />
          </StaggerItem>
          <div className="hidden lg:block" aria-hidden="true" />
          <StaggerItem>
            <ProductCard
              product={kryssetLounge}
              onSelect={onSelectProduct}
              imageContainerClassName="aspect-[320/440]"
            />
          </StaggerItem>
          <StaggerItem>
            <ProductCard
              product={hunterLeather}
              onSelect={onSelectProduct}
              imageContainerClassName="aspect-[316/320]"
            />
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* 4. FEATURE PRODUCT CAROUSEL */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-8 pb-20 sm:pb-28">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Reveal>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[34px] font-normal tracking-[-0.015em] text-[#1F1F1F]">
              Feature Product
            </h2>
          </Reveal>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollHorizontal(featureCarouselRef, -1)}
              aria-label="Scroll featured products left"
              className="w-9 h-9 bg-white text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollHorizontal(featureCarouselRef, 1)}
              aria-label="Scroll featured products right"
              className="w-9 h-9 bg-white text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={featureCarouselRef}
          className="flex gap-3 overflow-x-auto forma-no-scrollbar snap-x snap-mandatory pb-2"
        >
          {featureProducts.map((product) => (
            <div
              key={product.id}
              className="w-[74vw] sm:w-[44vw] md:w-[31vw] lg:w-[318px] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onSelect={onSelectProduct}
                imageContainerClassName="aspect-[320/380]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP & 4 BRAND PILLARS */}
      <section id="craftsmanship-story" className="w-full bg-[#9D6432] text-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
            <div className="lg:col-span-5 flex flex-col justify-between gap-12">
              <Reveal>
                <div className="max-w-[424px] overflow-hidden bg-[#855226]">
                  <img
                    src={IMAGES.sketchbook}
                    alt="Hand-drawn chair silhouette design sketchbook"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="flex items-end gap-4 max-w-[330px]">
                  <div className="w-[88px] h-[122px] shrink-0 overflow-hidden bg-[#855226]">
                    <img
                      src={IMAGES.workshopCraft}
                      alt="FORMA woodworking craftspeople"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-left"
                    />
                  </div>
                  <div className="pb-1">
                    <p className="text-[12.5px] leading-[1.55] text-white/90">
                      Discover the people, passion and ideas behind FORMA.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenWorkshopModal}
                      className="mt-3 forma-link-underline text-[12.5px] text-white cursor-pointer"
                    >
                      <span>Know More About Us</span>
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:pl-4">
              <Reveal>
                <h2 className="text-[26px] sm:text-[32px] lg:text-[35px] leading-[1.24] tracking-[-0.015em] font-normal text-white lg:indent-28 text-balance">
                  Every great chair begins with a thoughtful idea, carefully chosen materials and a
                  passion for making.
                </h2>
              </Reveal>

              <StaggerGroup className="mt-12 sm:mt-16 space-y-8 sm:space-y-9">
                {BRAND_PILLARS.map((pillar) => (
                  <StaggerItem
                    key={pillar.title}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline pt-1"
                  >
                    <h3 className="sm:col-span-4 text-[17px] sm:text-[18px] font-normal text-white">
                      {pillar.title}
                    </h3>
                    <p className="sm:col-span-8 text-[13.5px] leading-[1.68] text-white/85">
                      {pillar.description}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FULL-WIDTH WORKSHOP VIDEO BANNER */}
      <section
        ref={workshopRef}
        className="relative w-full h-[360px] sm:h-[480px] lg:h-[620px] overflow-hidden bg-[#1F1F1F] group"
      >
        <motion.img
          style={{ scale: workshopScale }}
          src={IMAGES.workshopCraft}
          alt="FORMA furniture makers reviewing chair joinery blueprints in the workshop"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />
        <button
          type="button"
          onClick={onOpenWorkshopModal}
          aria-label="Play workshop craftsmanship story"
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/30 backdrop-blur-sm border border-white/60 flex items-center justify-center text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" strokeWidth={1.5} />
          </span>
        </button>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section
        id="testimonials-section"
        className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-20 lg:pt-28 pb-6"
      >
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
          <Reveal>
            <h2 className="text-[26px] sm:text-[32px] lg:text-[34px] font-normal tracking-[-0.015em] text-[#1F1F1F]">
              What Customer Says
            </h2>
          </Reveal>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollHorizontal(testimonialCarouselRef, -1)}
              aria-label="Previous customer testimonials"
              className="w-9 h-9 bg-white text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollHorizontal(testimonialCarouselRef, 1)}
              aria-label="Next customer testimonials"
              className="w-9 h-9 bg-white text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={testimonialCarouselRef}
          className="flex gap-3 overflow-x-auto forma-no-scrollbar snap-x snap-mandatory pb-2"
        >
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="w-[86vw] sm:w-[500px] shrink-0 snap-start bg-white grid grid-cols-1 sm:grid-cols-12"
            >
              <div className="sm:col-span-5 h-[240px] sm:h-[348px] overflow-hidden bg-[#EAEAEA]">
                <img
                  src={item.image}
                  alt={`Interior space furnished by ${item.author}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${item.imagePositionClass || 'object-center'}`}
                />
              </div>

              <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#E6A119] text-[#E6A119]"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[13.5px] sm:text-[14px] leading-[1.65] text-[#2B2B2B]">
                    {item.quote}
                  </blockquote>
                </div>

                <div>
                  <p className="text-[14.5px] font-normal text-[#1F1F1F]">{item.author}</p>
                  <p className="text-[11.5px] text-[#848484] mt-0.5">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <FaqSection ctaLabel="Contact Our Team" onCtaClick={onOpenAccountModal} />
    </main>
  );
}
