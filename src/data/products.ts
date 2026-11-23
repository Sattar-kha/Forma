export type WoodType = 'Maple' | 'Oak' | 'Cherry' | 'Walnut';
export type TextileType = 'Apricot' | 'Lightgrey' | 'Burgundy' | 'Slate' | 'Dark blue';
export type ProductCategory = 'Dining Chairs' | 'Lounge Chairs' | 'Arm Chairs' | 'Bar Stools';

export interface WoodOption {
  id: WoodType;
  label: WoodType;
  swatchStyle: string;
  filterCss: string;
  originNote: string;
}

export interface TextileOption {
  id: TextileType;
  label: TextileType;
  swatchStyle: string;
  hex: string;
}

export interface ProductGalleryItem {
  id: string;
  thumb: string;
  main: string;
  alt: string;
  kind?: 'photo' | 'dimensions';
  cropClass?: string;
}

export interface ProductDimensions {
  width: string;
  depth: string;
  height: string;
  seatHeight: string;
  weight: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  popularityRank: number;
  isNew?: boolean;
  isFeatured?: boolean;
  defaultWood: WoodType;
  defaultTextile: TextileType;
  availableWoods: WoodType[];
  availableTextiles: TextileType[];
  cardImage: string;
  altCardImage?: string;
  woodImages?: Partial<Record<WoodType, string>>;
  gallery: ProductGalleryItem[];
  shortIntro: string;
  descriptionParagraphs: string[];
  keyFeatures: { title: string; text: string }[];
  careGuide: string[];
  dimensions: ProductDimensions;
  estimatedDelivery: string;
  designer: string;
  year: string;
}

export const IMAGES = {
  vengDining: '/src/assets/images/forma_veng_dining_1795426312282.jpg',
  hertugDining: '/src/assets/images/forma_hertug_dining_1795426311731.jpg',
  vengBarStool: '/src/assets/images/forma_veng_barstool_1795426339272.jpg',
  vengLounge: '/src/assets/images/forma_veng_lounge_1795426311833.jpg',
  broadwayLounge: '/src/assets/images/forma_broadway_lounge_1795426310378.jpg',
  kryssetLounge: '/src/assets/images/forma_krysset_lounge_1795426346170.jpg',
  ryDining: '/src/assets/images/forma_ry_dining_1795426312219.jpg',
  fluffyLounge: '/src/assets/images/forma_fluffy_lounge_1795426310549.jpg',
  unfluffyLounge: '/src/assets/images/forma_unfluffy_lounge_1795426309273.jpg',
  hunterLeather: '/src/assets/images/forma_hunter_leather_1795426339604.jpg',
  woodSlab: '/src/assets/images/forma_wood_slab_1795426339448.jpg',
  workshopCraft: '/src/assets/images/forma_workshop_craft_1795426312226.jpg',
  sketchbook: '/src/assets/images/forma_sketchbook_1795426312688.jpg',
  interiorDining: '/src/assets/images/forma_interior_dining_1795426313867.jpg',
} as const;

export const WOOD_OPTIONS: WoodOption[] = [
  {
    id: 'Maple',
    label: 'Maple',
    swatchStyle:
      'repeating-linear-gradient(90deg, #DFC6A1 0px, #E6D0AF 4px, #D4B890 8px, #E3CBA7 13px, #CFAF84 16px)',
    filterCss: 'brightness(1.04) saturate(0.88)',
    originNote: 'Pale Nordic hard maple with fine, satin grain',
  },
  {
    id: 'Oak',
    label: 'Oak',
    swatchStyle:
      'repeating-linear-gradient(90deg, #B98754 0px, #C69663 3px, #A97745 7px, #BE8E5B 11px, #9F6E3D 15px)',
    filterCss: 'none',
    originNote: 'European white oak finished in matte natural oil',
  },
  {
    id: 'Cherry',
    label: 'Cherry',
    swatchStyle:
      'repeating-linear-gradient(90deg, #8B4E2A 0px, #9B5C35 4px, #7A4221 7px, #92542F 12px, #713B1D 15px)',
    filterCss: 'sepia(0.18) saturate(1.22) brightness(0.94)',
    originNote: 'Warm heartwood cherry that deepens gracefully over time',
  },
  {
    id: 'Walnut',
    label: 'Walnut',
    swatchStyle:
      'repeating-linear-gradient(90deg, #5B3C29 0px, #694732 4px, #4A2F1F 8px, #5F3F2B 12px, #3E2618 16px)',
    filterCss: 'brightness(0.84) contrast(1.08) sepia(0.14)',
    originNote: 'Rich American black walnut with expressive dark figuring',
  },
];

export const TEXTILE_OPTIONS: TextileOption[] = [
  {
    id: 'Apricot',
    label: 'Apricot',
    swatchStyle:
      'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0) 0 0 / 3px 3px, linear-gradient(135deg, #8A5B40, #764A32)',
    hex: '#84553B',
  },
  {
    id: 'Lightgrey',
    label: 'Lightgrey',
    swatchStyle:
      'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 0) 0 0 / 3px 3px, linear-gradient(135deg, #8B8C8E, #77787A)',
    hex: '#848587',
  },
  {
    id: 'Burgundy',
    label: 'Burgundy',
    swatchStyle:
      'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0) 0 0 / 3px 3px, linear-gradient(135deg, #4E2F36, #3C2127)',
    hex: '#462930',
  },
  {
    id: 'Slate',
    label: 'Slate',
    swatchStyle:
      'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0) 0 0 / 3px 3px, linear-gradient(135deg, #4E5448, #3D4238)',
    hex: '#464C41',
  },
  {
    id: 'Dark blue',
    label: 'Dark blue',
    swatchStyle:
      'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0) 0 0 / 3px 3px, linear-gradient(135deg, #1E3155, #142340)',
    hex: '#192A4A',
  },
];

const DEFAULT_SHORT_INTRO =
  'With a legacy of chair-making since 1890, we combine carefully selected wood and expert craftsmanship to create lasting quality and character.';

const DEFAULT_CARE_GUIDE = [
  'Clean regularly with a soft, dry or slightly damp cloth.',
  'Avoid harsh chemicals and abrasive cleaning materials.',
  'Keep away from prolonged exposure to direct sunlight and excess moisture.',
  'Follow the care recommendations for your selected wood finish.',
];

export const PRODUCTS: Product[] = [
  {
    id: 'veng-dining-chair',
    sku: '4739747',
    name: 'Veng dining chair',
    price: 12000,
    category: 'Dining Chairs',
    rating: 4.5,
    reviewCount: 2473,
    popularityRank: 1,
    isNew: false,
    isFeatured: true,
    defaultWood: 'Maple',
    defaultTextile: 'Apricot',
    availableWoods: ['Maple', 'Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Apricot', 'Lightgrey', 'Burgundy', 'Slate', 'Dark blue'],
    cardImage: IMAGES.vengDining,
    gallery: [
      {
        id: 'veng-1',
        thumb: IMAGES.vengDining,
        main: IMAGES.vengDining,
        alt: 'Veng dining chair three-quarter studio view',
        kind: 'photo',
      },
      {
        id: 'veng-2',
        thumb: IMAGES.vengDining,
        main: IMAGES.vengDining,
        alt: 'Veng dining chair backrest and joinery detail',
        kind: 'photo',
        cropClass: 'scale-125 object-top',
      },
      {
        id: 'veng-3',
        thumb: IMAGES.vengDining,
        main: IMAGES.vengDining,
        alt: 'Veng dining chair sculpted seat profile',
        kind: 'photo',
        cropClass: 'scale-125 -scale-x-125',
      },
      {
        id: 'veng-dims',
        thumb: IMAGES.vengDining,
        main: IMAGES.vengDining,
        alt: 'Veng dining chair architectural dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'The Veng Dining Chair may be the smallest in the Veng family, but its personality is anything but small. Designed by Norwegian designer Torbjørn Bekken in 1960, the chair is known for its expressive character and distinctive sculptural form.',
      'Originally created while Bekken was working with the innovative design studio Rastad & Relling Tegnekontor, the Veng chair represents a thoughtful approach to furniture design. Its timeless character brings together visual expression and everyday functionality, making it a distinctive addition to dining spaces.',
    ],
    keyFeatures: [
      { title: 'Timeless Design', text: 'Originally designed in 1960, with a form that remains relevant today.' },
      { title: 'Sculptural Character', text: 'An expressive silhouette that adds personality to your interiors.' },
      { title: 'Compact Form', text: 'The smallest design in the Veng chair family.' },
      { title: 'Design Heritage', text: 'Created by Norwegian designer Torbjørn Bekken.' },
      { title: 'Versatile Styling', text: 'A distinctive choice for dining spaces and thoughtfully designed interiors.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '50 cm',
      depth: '52 cm',
      height: '79 cm',
      seatHeight: '46 cm',
      weight: '5.8 kg',
    },
    estimatedDelivery: 'Tue, 25 Nov',
    designer: 'Torbjørn Bekken',
    year: '1960',
  },
  {
    id: 'hertug-dining-chair',
    sku: '4739712',
    name: 'Hertug dining chair',
    price: 10000,
    category: 'Dining Chairs',
    rating: 4.7,
    reviewCount: 1842,
    popularityRank: 2,
    isNew: true,
    isFeatured: false,
    defaultWood: 'Walnut',
    defaultTextile: 'Apricot',
    availableWoods: ['Maple', 'Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Apricot', 'Lightgrey', 'Burgundy', 'Slate'],
    cardImage: IMAGES.hertugDining,
    gallery: [
      {
        id: 'hertug-1',
        thumb: IMAGES.hertugDining,
        main: IMAGES.hertugDining,
        alt: 'Hertug dining chair in dark walnut with cognac seat',
        kind: 'photo',
      },
      {
        id: 'hertug-2',
        thumb: IMAGES.hertugDining,
        main: IMAGES.hertugDining,
        alt: 'Hertug dining chair alternate angle',
        kind: 'photo',
        cropClass: 'scale-120 object-top',
      },
      {
        id: 'hertug-dims',
        thumb: IMAGES.hertugDining,
        main: IMAGES.hertugDining,
        alt: 'Hertug dining chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'Defined by its broad, gently curved solid-wood crest rail and tapered architectural legs, the Hertug Dining Chair balances crisp Nordic geometry with generous dining comfort.',
      'Crafted using traditional mortise-and-tenon joinery, the upholstered floating seat offers supple support for long gatherings around the table.',
    ],
    keyFeatures: [
      { title: 'Sculpted Backrest', text: 'Wide steam-bent solid timber backrest engineered for lumbar support.' },
      { title: 'Refined Joinery', text: 'Precision-fitted rails with seamless tactile transitions.' },
      { title: 'Supple Seating', text: 'Gently contoured upholstered pad in full-grain leather or wool weave.' },
      { title: 'Everyday Poise', text: 'Lightweight profile that tucks cleanly beneath dining tables.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '51 cm',
      depth: '50 cm',
      height: '80 cm',
      seatHeight: '45 cm',
      weight: '6.1 kg',
    },
    estimatedDelivery: 'Tue, 25 Nov',
    designer: 'FORMA Studio',
    year: '1964',
  },
  {
    id: 'veng-lounge-chair',
    sku: '4739765',
    name: 'Veng lounge chair',
    price: 16000,
    category: 'Lounge Chairs',
    rating: 4.8,
    reviewCount: 1529,
    popularityRank: 3,
    isFeatured: true,
    defaultWood: 'Walnut',
    defaultTextile: 'Dark blue',
    availableWoods: ['Maple', 'Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Dark blue', 'Slate', 'Burgundy', 'Lightgrey', 'Apricot'],
    cardImage: IMAGES.vengLounge,
    gallery: [
      {
        id: 'veng-lounge-1',
        thumb: IMAGES.vengLounge,
        main: IMAGES.vengLounge,
        alt: 'Veng lounge chair in walnut and deep navy wool',
        kind: 'photo',
      },
      {
        id: 'veng-lounge-2',
        thumb: IMAGES.vengLounge,
        main: IMAGES.vengLounge,
        alt: 'Veng lounge chair sculpted armrest detail',
        kind: 'photo',
        cropClass: 'scale-120 object-center',
      },
      {
        id: 'veng-lounge-dims',
        thumb: IMAGES.vengLounge,
        main: IMAGES.vengLounge,
        alt: 'Veng lounge chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'A relaxed interpretation of the iconic Veng silhouette, the Veng Lounge Chair pairs a reclined sculpted timber frame with sweeping, hand-shaped armrests.',
      'Designed for reading corners, living spaces and architectural lounges, its generously pitched back cradles the body while keeping an airy, open visual footprint.',
    ],
    keyFeatures: [
      { title: 'Relaxed Pitch', text: 'Ergonomic lounge recline crafted for extended reading and conversation.' },
      { title: 'Sculpted Armrests', text: 'Hand-sanded timber arms tapering smoothly toward the front posts.' },
      { title: 'Architectural Frame', text: 'Exposed hardwood joinery celebrating natural wood grain.' },
      { title: 'Tailored Upholstery', text: 'Available across our curated textile and leather palette.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '67 cm',
      depth: '71 cm',
      height: '81 cm',
      seatHeight: '41 cm',
      weight: '9.4 kg',
    },
    estimatedDelivery: 'Wed, 26 Nov',
    designer: 'Torbjørn Bekken',
    year: '1961',
  },
  {
    id: 'veng-arm-chair',
    sku: '4739724',
    name: 'Veng arm chair',
    price: 8000,
    category: 'Arm Chairs',
    rating: 4.6,
    reviewCount: 2114,
    popularityRank: 4,
    isNew: true,
    defaultWood: 'Oak',
    defaultTextile: 'Apricot',
    availableWoods: ['Maple', 'Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Apricot', 'Lightgrey', 'Slate', 'Burgundy'],
    cardImage: IMAGES.broadwayLounge,
    altCardImage: IMAGES.vengDining,
    woodImages: {
      Oak: IMAGES.broadwayLounge,
      Maple: IMAGES.vengDining,
    },
    gallery: [
      {
        id: 'veng-arm-1',
        thumb: IMAGES.broadwayLounge,
        main: IMAGES.broadwayLounge,
        alt: 'Veng arm chair three-quarter view',
        kind: 'photo',
      },
      {
        id: 'veng-arm-2',
        thumb: IMAGES.vengDining,
        main: IMAGES.vengDining,
        alt: 'Veng arm chair companion silhouette',
        kind: 'photo',
      },
      {
        id: 'veng-arm-dims',
        thumb: IMAGES.broadwayLounge,
        main: IMAGES.broadwayLounge,
        alt: 'Veng arm chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'Extending the expressive curves of the Veng dining silhouette with poised, sculptural armrests, the Veng Arm Chair transitions effortlessly from dining head-chair to home study companion.',
      'Each armrest is carved from solid hardwood so the grain flows continuously along the resting edge of the hand.',
    ],
    keyFeatures: [
      { title: 'Carved Timber Arms', text: 'Smoothly chamfered armrests shaped for natural elbow support.' },
      { title: 'Balanced Proportions', text: 'Compact width allows effortless placement around dining or desk surfaces.' },
      { title: 'Enduring Craft', text: 'Constructed in solid Maple, Oak, Cherry, or Walnut.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '58 cm',
      depth: '54 cm',
      height: '80 cm',
      seatHeight: '46 cm',
      weight: '6.9 kg',
    },
    estimatedDelivery: 'Tue, 25 Nov',
    designer: 'Torbjørn Bekken',
    year: '1960',
  },
  {
    id: 'broadway-lounge-chair',
    sku: '4739738',
    name: 'Broadway lounge chair',
    price: 12000,
    category: 'Lounge Chairs',
    rating: 4.7,
    reviewCount: 1638,
    popularityRank: 5,
    defaultWood: 'Oak',
    defaultTextile: 'Apricot',
    availableWoods: ['Maple', 'Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Apricot', 'Burgundy', 'Slate', 'Dark blue'],
    cardImage: IMAGES.broadwayLounge,
    altCardImage: IMAGES.hunterLeather,
    woodImages: {
      Maple: IMAGES.broadwayLounge,
      Oak: IMAGES.broadwayLounge,
      Cherry: IMAGES.broadwayLounge,
      Walnut: IMAGES.hunterLeather,
    },
    gallery: [
      {
        id: 'broadway-1',
        thumb: IMAGES.broadwayLounge,
        main: IMAGES.broadwayLounge,
        alt: 'Broadway lounge chair in natural oak and cognac leather',
        kind: 'photo',
      },
      {
        id: 'broadway-2',
        thumb: IMAGES.hunterLeather,
        main: IMAGES.hunterLeather,
        alt: 'Broadway lounge chair in smoked walnut edition',
        kind: 'photo',
      },
      {
        id: 'broadway-dims',
        thumb: IMAGES.broadwayLounge,
        main: IMAGES.broadwayLounge,
        alt: 'Broadway lounge chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'With poised mid-century lines and a low architectural stance, the Broadway Lounge Chair is crafted to anchor living rooms and quiet studio spaces with understated elegance.',
      'Available in sunlit oak with cognac upholstery or rich walnut with deep espresso tones, its clean joinery highlights the purity of its wooden frame.',
    ],
    keyFeatures: [
      { title: 'Dual Finish Character', text: 'Distinct personalities across light Oak/Maple and deep Walnut.' },
      { title: 'Wrap-Around Comfort', text: 'Generous seat cushion paired with an enveloping angled back.' },
      { title: 'Precision Frame', text: 'Reinforced solid-wood rails designed for decades of everyday use.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '65 cm',
      depth: '68 cm',
      height: '78 cm',
      seatHeight: '42 cm',
      weight: '9.8 kg',
    },
    estimatedDelivery: 'Wed, 26 Nov',
    designer: 'FORMA Studio',
    year: '1966',
  },
  {
    id: 'veng-bar-stool',
    sku: '4739751',
    name: 'Veng bar stool',
    price: 10000,
    category: 'Bar Stools',
    rating: 4.6,
    reviewCount: 984,
    popularityRank: 6,
    isNew: true,
    defaultWood: 'Oak',
    defaultTextile: 'Slate',
    availableWoods: ['Maple', 'Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Apricot', 'Slate', 'Lightgrey', 'Dark blue'],
    cardImage: IMAGES.vengBarStool,
    gallery: [
      {
        id: 'barstool-1',
        thumb: IMAGES.vengBarStool,
        main: IMAGES.vengBarStool,
        alt: 'Veng bar stool in oak with sculpted leather seat',
        kind: 'photo',
      },
      {
        id: 'barstool-2',
        thumb: IMAGES.vengBarStool,
        main: IMAGES.vengBarStool,
        alt: 'Veng bar stool backrest detail',
        kind: 'photo',
        cropClass: 'scale-125 object-top',
      },
      {
        id: 'barstool-dims',
        thumb: IMAGES.vengBarStool,
        main: IMAGES.vengBarStool,
        alt: 'Veng bar stool dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'Elevating the signature curved Veng backrest to counter and bar height, the Veng Bar Stool brings refined dining comfort to kitchen islands and hospitality counters.',
      'Integrated hardwood stretchers provide sturdy footrest support while keeping the silhouette remarkably light and sculptural.',
    ],
    keyFeatures: [
      { title: 'Supportive Backrest', text: 'Signature Veng curved back delivers rare comfort at bar height.' },
      { title: 'Reinforced Footrest', text: 'Flush-joined solid wood stretchers positioned for natural posture.' },
      { title: 'Counter & Bar Presence', text: 'Slender tapered legs preserve openness around kitchen islands.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '46 cm',
      depth: '50 cm',
      height: '98 cm',
      seatHeight: '68 cm',
      weight: '7.4 kg',
    },
    estimatedDelivery: 'Thu, 27 Nov',
    designer: 'Torbjørn Bekken',
    year: '1962',
  },
  {
    id: 'unfluffy-lounge-chair',
    sku: '4739789',
    name: 'UnFluffy lounge chair',
    price: 22000,
    category: 'Lounge Chairs',
    rating: 4.9,
    reviewCount: 876,
    popularityRank: 7,
    isFeatured: true,
    isNew: true,
    defaultWood: 'Maple',
    defaultTextile: 'Slate',
    availableWoods: ['Maple', 'Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Slate', 'Lightgrey', 'Apricot', 'Dark blue'],
    cardImage: IMAGES.unfluffyLounge,
    gallery: [
      {
        id: 'unfluffy-1',
        thumb: IMAGES.unfluffyLounge,
        main: IMAGES.unfluffyLounge,
        alt: 'UnFluffy lounge chair in bouclé weave and natural oak',
        kind: 'photo',
      },
      {
        id: 'unfluffy-dims',
        thumb: IMAGES.unfluffyLounge,
        main: IMAGES.unfluffyLounge,
        alt: 'UnFluffy lounge chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'A tactile study in rounded warmth and tailored upholstery, the UnFluffy Lounge Chair softens architectural spaces with its embracing shell and splayed solid-wood arms.',
      'Woven in heavy textured bouclé over high-resilience natural latex cushioning, it invites slow mornings and unhurried conversation.',
    ],
    keyFeatures: [
      { title: 'Cocooning Shell', text: 'Curved full-height back embraces shoulders and lumbar naturally.' },
      { title: 'Tactile Weave', text: 'Durable textured upholstery crafted for rich visual depth.' },
      { title: 'Solid Hardwood Base', text: 'Gently splayed turned legs give poise and stability.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '74 cm',
      depth: '76 cm',
      height: '82 cm',
      seatHeight: '42 cm',
      weight: '12.6 kg',
    },
    estimatedDelivery: 'Thu, 27 Nov',
    designer: 'FORMA Studio',
    year: '2024',
  },
  {
    id: 'krysset-lounge-chair',
    sku: '4739773',
    name: 'Krysset lounge chair',
    price: 15000,
    category: 'Lounge Chairs',
    rating: 4.8,
    reviewCount: 1205,
    popularityRank: 8,
    defaultWood: 'Walnut',
    defaultTextile: 'Lightgrey',
    availableWoods: ['Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Lightgrey', 'Apricot', 'Slate'],
    cardImage: IMAGES.kryssetLounge,
    gallery: [
      {
        id: 'krysset-1',
        thumb: IMAGES.kryssetLounge,
        main: IMAGES.kryssetLounge,
        alt: 'Krysset lounge chair with crossed walnut frame and sling seat',
        kind: 'photo',
      },
      {
        id: 'krysset-dims',
        thumb: IMAGES.kryssetLounge,
        main: IMAGES.kryssetLounge,
        alt: 'Krysset lounge chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'Named after the Norwegian word for "the cross", Krysset showcases an expressive scissor-like timber frame that suspends a taut saddle-canvas and leather sling.',
      'Engineered to flex subtly with the sitter, it offers extraordinary sculptural presence from every angle in an open-plan room.',
    ],
    keyFeatures: [
      { title: 'Crossed Timber Geometry', text: 'Interlocking hardwood frame engineered without visible hardware.' },
      { title: 'Suspended Sling', text: 'Natural vegetable-tanned leather and woven canvas seat.' },
      { title: '360° Silhouette', text: 'Equally striking viewed from front, profile, or rear.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '66 cm',
      depth: '75 cm',
      height: '76 cm',
      seatHeight: '38 cm',
      weight: '8.9 kg',
    },
    estimatedDelivery: 'Wed, 26 Nov',
    designer: 'Fredrik Kayser',
    year: '1955',
  },
  {
    id: 'fluffy-lounge-chair',
    sku: '4739794',
    name: 'Fluffy lounge chair',
    price: 30000,
    category: 'Lounge Chairs',
    rating: 4.9,
    reviewCount: 642,
    popularityRank: 9,
    isFeatured: true,
    defaultWood: 'Walnut',
    defaultTextile: 'Dark blue',
    availableWoods: ['Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Dark blue', 'Slate', 'Burgundy'],
    cardImage: IMAGES.fluffyLounge,
    gallery: [
      {
        id: 'fluffy-1',
        thumb: IMAGES.fluffyLounge,
        main: IMAGES.fluffyLounge,
        alt: 'Fluffy lounge chair in long-wool black sheepskin and oak',
        kind: 'photo',
      },
      {
        id: 'fluffy-dims',
        thumb: IMAGES.fluffyLounge,
        main: IMAGES.fluffyLounge,
        alt: 'Fluffy lounge chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'An unmistakable statement of Nordic warmth and organic drama, the Fluffy Lounge Chair pairs ethically sourced long-pile Icelandic wool fleece with finely turned solid hardwood legs and armrests.',
      'Beneath its exuberant texture lies the same disciplined, supportive timber architecture found across every FORMA piece.',
    ],
    keyFeatures: [
      { title: 'Long-Pile Natural Fleece', text: 'Deep, lustrous natural wool creates unmatched tactile comfort.' },
      { title: 'Sculpted Timber Accents', text: 'Exposed hand-finished armrests ground the silhouette.' },
      { title: 'Collector Piece', text: 'Made to order in small workshop batches.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '78 cm',
      depth: '79 cm',
      height: '83 cm',
      seatHeight: '42 cm',
      weight: '14.2 kg',
    },
    estimatedDelivery: 'Fri, 28 Nov',
    designer: 'FORMA Studio',
    year: '2025',
  },
  {
    id: 'ry-dining-chair',
    sku: '4739780',
    name: 'Ry dining chair',
    price: 20000,
    category: 'Dining Chairs',
    rating: 4.8,
    reviewCount: 1390,
    popularityRank: 10,
    isFeatured: true,
    defaultWood: 'Oak',
    defaultTextile: 'Slate',
    availableWoods: ['Maple', 'Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Slate', 'Lightgrey', 'Burgundy', 'Dark blue', 'Apricot'],
    cardImage: IMAGES.ryDining,
    gallery: [
      {
        id: 'ry-1',
        thumb: IMAGES.ryDining,
        main: IMAGES.ryDining,
        alt: 'Ry dining chair with fluted forest slate upholstery and oak frame',
        kind: 'photo',
      },
      {
        id: 'ry-dims',
        thumb: IMAGES.ryDining,
        main: IMAGES.ryDining,
        alt: 'Ry dining chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'Distinguished by its architectural vertical channel tufting and crisp cylindrical solid-wood legs, the Ry Dining Chair brings quiet luxury to contemporary dining rooms.',
      'Generously padded yet visually disciplined, it offers armchair-grade comfort across extended dinners without visual bulk.',
    ],
    keyFeatures: [
      { title: 'Channel-Tufted Cushion', text: 'Vertical tailored fluting delivers plush, breathable support.' },
      { title: 'Cylindrical Timber Legs', text: 'Turned solid hardwood posts frame the upholstered shell cleanly.' },
      { title: 'Hospitality Grade', text: 'Engineered for both private residences and architectural dining spaces.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '52 cm',
      depth: '55 cm',
      height: '82 cm',
      seatHeight: '47 cm',
      weight: '7.2 kg',
    },
    estimatedDelivery: 'Tue, 25 Nov',
    designer: 'FORMA Studio',
    year: '2023',
  },
  {
    id: 'hunter-leather-lounge-chair',
    sku: '4739761',
    name: 'Hunter leather lounge chair',
    price: 16000,
    category: 'Lounge Chairs',
    rating: 4.7,
    reviewCount: 1095,
    popularityRank: 11,
    isFeatured: true,
    defaultWood: 'Walnut',
    defaultTextile: 'Dark blue',
    availableWoods: ['Oak', 'Cherry', 'Walnut'],
    availableTextiles: ['Dark blue', 'Apricot', 'Burgundy'],
    cardImage: IMAGES.hunterLeather,
    gallery: [
      {
        id: 'hunter-1',
        thumb: IMAGES.hunterLeather,
        main: IMAGES.hunterLeather,
        alt: 'Hunter leather lounge chair in black saddle leather and dark wood',
        kind: 'photo',
      },
      {
        id: 'hunter-dims',
        thumb: IMAGES.hunterLeather,
        main: IMAGES.hunterLeather,
        alt: 'Hunter leather lounge chair dimensions',
        kind: 'dimensions',
      },
    ],
    shortIntro: DEFAULT_SHORT_INTRO,
    descriptionParagraphs: [
      'Bold, taut, and unapologetically pure, the Hunter Leather Lounge Chair suspends heavyweight full-grain saddle leather across an angular solid hardwood frame.',
      'With every year of use, the saddle leather develops a rich natural patina that tells the story of the space it inhabits.',
    ],
    keyFeatures: [
      { title: 'Full-Grain Saddle Leather', text: 'Thick vegetable-tanned leather tensioned cleanly across the frame.' },
      { title: 'Minimalist Geometry', text: 'Crisp rectilinear hardwood joinery with low lounge proportions.' },
      { title: 'Ages With Grace', text: 'Designed to grow richer in tone and suppleness over decades.' },
    ],
    careGuide: DEFAULT_CARE_GUIDE,
    dimensions: {
      width: '68 cm',
      depth: '72 cm',
      height: '75 cm',
      seatHeight: '39 cm',
      weight: '9.1 kg',
    },
    estimatedDelivery: 'Wed, 26 Nov',
    designer: 'Torbjørn Afdal',
    year: '1962',
  },
];

export const HERO_STRIP_ITEMS = [
  { productId: 'veng-dining-chair', image: IMAGES.vengDining, heightClass: 'h-[200px] sm:h-[235px]', widthClass: 'w-[175px] sm:w-[215px]' },
  { productId: 'veng-bar-stool', image: IMAGES.vengBarStool, heightClass: 'h-[265px] sm:h-[315px]', widthClass: 'w-[195px] sm:w-[238px]' },
  { productId: 'krysset-lounge-chair', image: IMAGES.kryssetLounge, heightClass: 'h-[210px] sm:h-[250px]', widthClass: 'w-[210px] sm:w-[258px]' },
  { productId: 'hertug-dining-chair', image: IMAGES.hertugDining, heightClass: 'h-[195px] sm:h-[232px]', widthClass: 'w-[180px] sm:w-[220px]' },
  { productId: 'broadway-lounge-chair', image: IMAGES.broadwayLounge, heightClass: 'h-[225px] sm:h-[268px]', widthClass: 'w-[200px] sm:w-[244px]' },
  { productId: 'hunter-leather-lounge-chair', image: IMAGES.hunterLeather, heightClass: 'h-[205px] sm:h-[244px]', widthClass: 'w-[195px] sm:w-[235px]' },
];

export const BRAND_PILLARS = [
  {
    title: 'Human',
    description:
      'Great furniture begins with great people. From our designers to skilled craftspeople, every mind, hand and detail plays an important role in bringing each design to life.',
  },
  {
    title: 'Craftsmanship',
    description:
      'We work with four carefully selected woods — Cherry, Oak, Walnut and Maple. Each has its own natural grain, warmth and character, bringing a distinct identity to every chair.',
  },
  {
    title: 'Sustainability',
    description:
      'We believe in creating furniture that stands the test of time. By combining quality materials, thoughtful construction and lasting comfort, we make chairs to be valued for years.',
  },
  {
    title: 'Design',
    description:
      "We don't chase what's popular. We focus on timeless forms, thoughtful proportions and purposeful details to create chairs that feel relevant across generations.",
  },
];

export interface Testimonial {
  id: string;
  image: string;
  imagePositionClass?: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'aarav',
    image: IMAGES.interiorDining,
    imagePositionClass: 'object-center',
    quote:
      '"The walnut finish is absolutely beautiful. The attention to detail and overall quality make this chair feel like a piece we will cherish for years."',
    author: 'Aarav Mehta',
    role: 'Interior Designer - Bengaluru',
    rating: 5,
  },
  {
    id: 'ananya',
    image: IMAGES.fluffyLounge,
    imagePositionClass: 'object-center',
    quote:
      '"We wanted furniture that felt special without being overly decorative. FORMA brought the perfect balance of thoughtful design, comfort and craftsmanship to our space."',
    author: 'Ananya Kapoor',
    role: 'Homeowner - Mumbai',
    rating: 5,
  },
  {
    id: 'rohan',
    image: IMAGES.interiorDining,
    imagePositionClass: 'object-right',
    quote:
      '"The chairs have remarkable presence and character. Every detail from the wood joinery to the seating posture elevates our dining spaces beautifully."',
    author: 'Rohan Malhotra',
    role: 'Hospitality Owner - New Delhi',
    rating: 5,
  },
];

export interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    number: '01',
    question: 'What makes FORMA chairs different?',
    answer:
      'Every FORMA chair is rooted in more than a century of chair-making heritage. Rather than chasing seasonal trends, we pair architectural proportions, solid sustainably sourced hardwoods, and precision hand-finished joinery so every piece stays structurally sound and visually timeless for decades.',
  },
  {
    number: '02',
    question: 'What types of wood can I choose from?',
    answer:
      'We craft our collection in four carefully selected solid hardwoods: pale satin Maple, warm matte-oiled European Oak, rich heartwood Cherry, and expressive dark American Walnut. Each timber is hand-selected for grain continuity and natural character.',
  },
  {
    number: '03',
    question: 'Can I customize the wood of my chosen chair?',
    answer:
      'Yes. Most FORMA chairs can be tailored across your preferred combination of solid wood finish (Maple, Oak, Cherry, or Walnut) and curated upholstery textiles (Apricot, Lightgrey, Burgundy, Slate, and Dark blue) directly on each product page.',
  },
  {
    number: '04',
    question: 'Where are FORMA chairs manufactured?',
    answer:
      'Our chairs are crafted by specialist woodworking artisans combining Scandinavian design heritage with precision workshop joinery, then inspected, hand-oiled, and quality-certified before shipping from our studio to homes across India and worldwide.',
  },
];

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getProductById(id: string): Product {
  return PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
}
