import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  Product,
  ProductCategory,
  TextileType,
  WoodType,
  getProductById,
} from './data/products';
import { Navbar, PageRoute } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { AccountModal, PolicyModal, WorkshopVideoModal } from './components/InfoModals';
import { ScrollProgressBar, FORMA_EASE } from './components/MotionPrimitives';
import { HomePage } from './pages/HomePage';
import { CollectionPage, SortOption } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

const CART_STORAGE_KEY = 'forma_cart_v1';

function parseHashRoute(): { page: PageRoute; productId: string } {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash || hash === 'home') {
    return { page: 'home', productId: 'veng-dining-chair' };
  }
  if (hash === 'shop' || hash === 'collection') {
    return { page: 'collection', productId: 'veng-dining-chair' };
  }
  if (hash.startsWith('product/')) {
    const id = hash.slice('product/'.length);
    return { page: 'product', productId: id || 'veng-dining-chair' };
  }
  return { page: 'home', productId: 'veng-dining-chair' };
}

export default function App() {
  const initialRoute = parseHashRoute();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedProductId, setSelectedProductId] = useState<string>(initialRoute.productId);
  const [collectionPreset, setCollectionPreset] = useState<{
    category: ProductCategory | 'All';
    sort: SortOption;
    nonce: number;
  }>({ category: 'All', sort: 'popularity', nonce: 0 });

  // Overlays
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  // Persistent Shopping Bag State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors in private contexts
    }
  }, [cartItems]);

  // Listen for browser back/forward hash navigation
  useEffect(() => {
    const onHashChange = () => {
      const next = parseHashRoute();
      setCurrentPage(next.page);
      setSelectedProductId(next.productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback(
    (
      page: PageRoute,
      options?: { sectionId?: string; filter?: string; productId?: string }
    ) => {
      if (page === 'collection' && options?.filter) {
        const f = options.filter;
        if (f === 'newest') {
          setCollectionPreset((p) => ({ category: 'All', sort: 'newest', nonce: p.nonce + 1 }));
        } else if (f === 'popular') {
          setCollectionPreset((p) => ({ category: 'All', sort: 'popularity', nonce: p.nonce + 1 }));
        } else if (
          f === 'Dining Chairs' ||
          f === 'Lounge Chairs' ||
          f === 'Arm Chairs' ||
          f === 'Bar Stools'
        ) {
          setCollectionPreset((p) => ({ category: f, sort: 'popularity', nonce: p.nonce + 1 }));
        }
      } else if (page === 'collection' && !options?.filter) {
        setCollectionPreset((p) => ({ category: 'All', sort: 'popularity', nonce: p.nonce + 1 }));
      }

      const nextHash =
        page === 'home'
          ? '#/home'
          : page === 'collection'
          ? '#/shop'
          : `#/product/${options?.productId || selectedProductId}`;

      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }

      setCurrentPage(page);
      if (options?.productId) {
        setSelectedProductId(options.productId);
      }

      if (options?.sectionId) {
        setTimeout(() => {
          const el = document.getElementById(options.sectionId!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [selectedProductId]
  );

  const handleSelectProduct = useCallback(
    (productId: string) => {
      navigate('product', { productId });
    },
    [navigate]
  );

  const handleAddToCart = useCallback(
    ({
      product,
      wood,
      textile,
      quantity,
      openDrawer = false,
    }: {
      product: Product;
      wood: WoodType;
      textile: TextileType;
      quantity: number;
      openDrawer?: boolean;
    }) => {
      const key = `${product.id}::${wood}::${textile}`;
      const image = product.woodImages?.[wood] || product.cardImage;
      setCartItems((prev) => {
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          return prev.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            name: product.name,
            price: product.price,
            image,
            wood,
            textile,
            quantity,
          },
        ];
      });

      if (openDrawer) {
        setCartOpen(true);
      }
    },
    []
  );

  const handleUpdateCartQuantity = useCallback((key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemoveCartItem = useCallback((key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const currentProduct = getProductById(selectedProductId);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F2F2F2] text-[#1F1F1F]">
        <ScrollProgressBar />

        <Navbar
          currentPage={currentPage}
          onNavigate={navigate}
          cartCount={totalCartCount}
          onOpenCart={() => setCartOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenAccount={() => setAccountOpen(true)}
        />

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <motion.div
                key="page-home"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: FORMA_EASE }}
              >
                <HomePage
                  onNavigate={navigate}
                  onSelectProduct={handleSelectProduct}
                  onOpenWorkshopModal={() => setWorkshopOpen(true)}
                  onOpenAccountModal={() => setAccountOpen(true)}
                />
              </motion.div>
            )}

            {currentPage === 'collection' && (
              <motion.div
                key={`page-collection-${collectionPreset.nonce}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: FORMA_EASE }}
              >
                <CollectionPage
                  initialCategory={collectionPreset.category}
                  initialSort={collectionPreset.sort}
                  onNavigate={navigate}
                  onSelectProduct={handleSelectProduct}
                />
              </motion.div>
            )}

            {currentPage === 'product' && (
              <motion.div
                key={`page-product-${currentProduct.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: FORMA_EASE }}
              >
                <ProductDetailPage
                  product={currentProduct}
                  onNavigate={navigate}
                  onSelectProduct={handleSelectProduct}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Footer onNavigate={navigate} onOpenPolicy={(title) => setActivePolicy(title)} />

        {/* Interactive Drawers & Modals */}
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onNavigateToShop={() => navigate('collection')}
        />

        <SearchOverlay
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSelectProduct={handleSelectProduct}
        />

        <WorkshopVideoModal isOpen={workshopOpen} onClose={() => setWorkshopOpen(false)} />

        <AccountModal isOpen={accountOpen} onClose={() => setAccountOpen(false)} />

        <PolicyModal title={activePolicy} onClose={() => setActivePolicy(null)} />
      </div>
    </MotionConfig>
  );
}
