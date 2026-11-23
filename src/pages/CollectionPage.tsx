import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import {
  PRODUCTS,
  ProductCategory,
  WoodType,
  WOOD_OPTIONS,
  IMAGES,
  getProductById,
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FaqSection } from '../components/FaqSection';
import { Reveal, StaggerGroup, StaggerItem, FORMA_EASE } from '../components/MotionPrimitives';
import { PageRoute } from '../components/Navbar';

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'name-asc';

interface CollectionPageProps {
  initialCategory?: ProductCategory | 'All';
  initialSort?: SortOption;
  onNavigate: (page: PageRoute, options?: { sectionId?: string }) => void;
  onSelectProduct: (productId: string) => void;
}

const CATEGORIES: (ProductCategory | 'All')[] = [
  'All',
  'Dining Chairs',
  'Lounge Chairs',
  'Arm Chairs',
  'Bar Stools',
];

const SORT_LABELS: Record<SortOption, string> = {
  popularity: 'Popularity',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  newest: 'Newest First',
  'name-asc': 'Name: A to Z',
};

export function CollectionPage({
  initialCategory = 'All',
  initialSort = 'popularity',
  onNavigate,
  onSelectProduct,
}: CollectionPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(initialCategory);
  const [selectedWood, setSelectedWood] = useState<WoodType | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [showFilters, setShowFilters] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [showAllLoaded, setShowAllLoaded] = useState(false);

  const isDefaultEditorialView =
    selectedCategory === 'All' && selectedWood === 'All' && sortBy === 'popularity';

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedWood !== 'All' && !p.availableWoods.includes(selectedWood)) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || a.popularityRank - b.popularityRank;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'popularity':
        default:
          return a.popularityRank - b.popularityRank;
      }
    });
  }, [selectedCategory, selectedWood, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) + (selectedWood !== 'All' ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedWood('All');
    setSortBy('popularity');
  };

  const hertug = getProductById('hertug-dining-chair');
  const vengLounge = getProductById('veng-lounge-chair');
  const vengArm = getProductById('veng-arm-chair');
  const broadway = getProductById('broadway-lounge-chair');
  const vengBarStool = getProductById('veng-bar-stool');
  const unfluffy = getProductById('unfluffy-lounge-chair');
  const krysset = getProductById('krysset-lounge-chair');
  const fluffy = getProductById('fluffy-lounge-chair');
  const ryDining = getProductById('ry-dining-chair');
  const extraEditorialProducts = [
    getProductById('veng-dining-chair'),
    getProductById('hunter-leather-lounge-chair'),
  ];

  return (
    <main>
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-6 sm:pt-8 pb-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[12px] text-[#848484] flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#1F1F1F] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#1F1F1F]">Shop</span>
        </nav>

        {/* Page Title */}
        <Reveal>
          <h1 className="mt-3 text-[34px] sm:text-[42px] lg:text-[46px] font-normal tracking-[-0.02em] text-[#1F1F1F] leading-tight">
            Shop All The Products
          </h1>
        </Reveal>

        {/* Toolbar Row */}
        <div className="mt-8 sm:mt-10 pb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5">
            <p className="text-[12.5px] sm:text-[13px] text-[#7A7A7A] tabular-nums">
              {isDefaultEditorialView
                ? `Explore Our ${PRODUCTS.length} Chair Designs`
                : `Showing ${filteredProducts.length} of ${PRODUCTS.length} Chair Designs`}
            </p>

            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
              className="inline-flex items-center gap-2 text-[12.5px] text-[#1F1F1F] hover:text-[#9D6432] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</span>
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-[12px] text-[#737373] hover:text-[#1F1F1F] transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" strokeWidth={1.6} />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="relative flex items-center gap-2 text-[12.5px]">
            <span className="text-[#7A7A7A]">Sort by</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortDropdownOpen((v) => !v)}
                aria-expanded={sortDropdownOpen}
                className="inline-flex items-center gap-1.5 border-b border-[#1F1F1F] pb-0.5 text-[#1F1F1F] cursor-pointer whitespace-nowrap"
              >
                <span>{SORT_LABELS[sortBy]}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    sortDropdownOpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={1.5}
                />
              </button>

              <AnimatePresence>
                {sortDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: FORMA_EASE }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#DCDCDC] z-30 py-1 shadow-sm"
                  >
                    {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSortBy(option);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-[12.5px] transition-colors cursor-pointer ${
                          sortBy === option
                            ? 'bg-[#F2F2F2] text-[#1F1F1F] font-medium'
                            : 'text-[#555555] hover:bg-[#FAFAFA] hover:text-[#1F1F1F]'
                        }`}
                      >
                        {SORT_LABELS[option]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Collapsible Minimal Filter Bar */}
        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: FORMA_EASE }}
              className="overflow-hidden border-t border-b border-[#DCDCDC] mb-6"
            >
              <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-6">
                  <p className="text-[11.5px] text-[#7A7A7A] mb-2.5">Category</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {CATEGORIES.map((category) => {
                      const active = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                          className={`text-[13px] pb-0.5 transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'text-[#1F1F1F] border-b border-[#1F1F1F]'
                              : 'text-[#6E6E6E] hover:text-[#1F1F1F]'
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-6">
                  <p className="text-[11.5px] text-[#7A7A7A] mb-2.5">Wood Material</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedWood('All')}
                      className={`text-[13px] pb-0.5 transition-colors cursor-pointer ${
                        selectedWood === 'All'
                          ? 'text-[#1F1F1F] border-b border-[#1F1F1F]'
                          : 'text-[#6E6E6E] hover:text-[#1F1F1F]'
                      }`}
                    >
                      All Woods
                    </button>
                    {WOOD_OPTIONS.map((wood) => {
                      const active = selectedWood === wood.id;
                      return (
                        <button
                          key={wood.id}
                          type="button"
                          onClick={() => setSelectedWood(active ? 'All' : wood.id)}
                          className={`inline-flex items-center gap-2 px-2 py-1 border transition-colors cursor-pointer ${
                            active
                              ? 'border-[#1F1F1F] bg-white text-[#1F1F1F]'
                              : 'border-transparent hover:border-[#D4D4D4] text-[#5A5A5A]'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            style={{ background: wood.swatchStyle }}
                            className="w-4 h-4 block shrink-0"
                          />
                          <span className="text-[12.5px]">{wood.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRODUCT GRID */}
        {isDefaultEditorialView ? (
          <div className="mt-2">
            {/* Block 1 */}
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10">
              <StaggerItem className="sm:col-span-2">
                <ProductCard
                  product={hertug}
                  onSelect={onSelectProduct}
                  imageContainerClassName="aspect-[652/588]"
                />
              </StaggerItem>
              <StaggerItem className="lg:self-end">
                <ProductCard
                  product={vengLounge}
                  onSelect={onSelectProduct}
                  imageContainerClassName="aspect-[320/256]"
                />
              </StaggerItem>
              <StaggerItem className="lg:self-start">
                <ProductCard
                  product={vengArm}
                  onSelect={onSelectProduct}
                  imageSrc={IMAGES.vengDining}
                  imageContainerClassName="aspect-[316/260]"
                />
              </StaggerItem>
            </StaggerGroup>

            {/* Block 2 */}
            <StaggerGroup className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10">
              <StaggerItem className="lg:self-end">
                <ProductCard
                  product={broadway}
                  onSelect={onSelectProduct}
                  imageSrc={IMAGES.broadwayLounge}
                  imageContainerClassName="aspect-[320/260]"
                />
              </StaggerItem>
              <StaggerItem className="sm:col-span-2">
                <ProductCard
                  product={vengBarStool}
                  onSelect={onSelectProduct}
                  imageContainerClassName="aspect-[652/588]"
                />
              </StaggerItem>
              <StaggerItem className="lg:self-start">
                <ProductCard
                  product={unfluffy}
                  onSelect={onSelectProduct}
                  imageContainerClassName="aspect-[316/260]"
                />
              </StaggerItem>
            </StaggerGroup>

            {/* Block 3 */}
            <StaggerGroup className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10">
              <StaggerItem className="lg:self-end">
                <ProductCard
                  product={krysset}
                  onSelect={onSelectProduct}
                  imageContainerClassName="aspect-[320/256]"
                />
              </StaggerItem>
              <StaggerItem className="lg:self-start">
                <ProductCard
                  product={fluffy}
                  onSelect={onSelectProduct}
                  imageContainerClassName="aspect-[320/260]"
                />
              </StaggerItem>
              <StaggerItem className="sm:col-span-2">
                <ProductCard
                  product={ryDining}
                  onSelect={onSelectProduct}
                  imageContainerClassName="aspect-[648/588]"
                />
              </StaggerItem>
            </StaggerGroup>

            <AnimatePresence>
              {showAllLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: FORMA_EASE }}
                  className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10"
                >
                  {extraEditorialProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={onSelectProduct}
                      imageContainerClassName="aspect-[320/360]"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-16 flex justify-center">
              {!showAllLoaded ? (
                <button
                  type="button"
                  onClick={() => setShowAllLoaded(true)}
                  className="text-[13px] text-[#7A7A7A] hover:text-[#1F1F1F] transition-colors py-2 px-4 cursor-pointer"
                >
                  Load More ...
                </button>
              ) : (
                <p className="text-[12.5px] text-[#8A8A8A]">
                  Showing all {PRODUCTS.length} designs in the collection
                </p>
              )}
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[17px] text-[#1F1F1F]">No chairs match the selected filters.</p>
            <p className="mt-1.5 text-[13.5px] text-[#737373]">
              Try selecting another category or wood finish.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 px-6 py-2.5 bg-[#1F1F1F] text-white text-[13px] hover:bg-[#333333] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: FORMA_EASE }}
                >
                  <ProductCard
                    product={product}
                    onSelect={onSelectProduct}
                    imageContainerClassName="aspect-[320/360]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <FaqSection
        ctaLabel="Know more about us"
        onCtaClick={() => onNavigate('home', { sectionId: 'craftsmanship-story' })}
      />
    </main>
  );
}
