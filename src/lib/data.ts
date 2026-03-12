// ===== TYPES =====
export interface Product {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  emoji: string;
  colors: string[];
  sizes?: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  description: string;
  isNew?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  count: number;
  bgColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  paymentMethod: string;
}

// ===== MOCK DATA =====
export const CATEGORIES: Category[] = [
  { id: '1', name: 'عباءات وملابس نسائية', slug: 'womens', emoji: '🧕', count: 480, bgColor: '#1A1208' },
  { id: '2', name: 'ملابس رجالية', slug: 'mens', emoji: '👔', count: 190, bgColor: '#2C3E50' },
  { id: '3', name: 'ملابس أطفال', slug: 'kids', emoji: '👧', count: 230, bgColor: '#F5EFE6' },
  { id: '4', name: 'مفروشات وديكور', slug: 'home', emoji: '🛋', count: 360, bgColor: '#4A5E3A' },
  { id: '5', name: 'سجاد وموكيت', slug: 'rugs', emoji: '🪑', count: 145, bgColor: '#7A3B2A' },
  { id: '6', name: 'ستائر وبياضات', slug: 'curtains', emoji: '🪟', count: 98, bgColor: '#5D4037' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Classic Embroidered Abaya', nameAr: 'عباءة كلاسيك مطرزة',
    slug: 'classic-embroidered-abaya', price: 249, originalPrice: 359,
    category: 'womens', images: [], emoji: '🧕',
    colors: ['أسود', 'كحلي', 'رمادي'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true, stockCount: 45, rating: 4.8, reviewCount: 124,
    description: 'عباءة كلاسيكية مصنوعة من أجود أنواع الكريب المزدوج، مزيّنة بتطريز يدوي دقيق على الأكمام والياقة.',
    isFeatured: true, tags: ['عباءة', 'نسائي', 'أنيق'],
  },
  {
    id: '2', name: 'Chiffon Maxi Dress', nameAr: 'فستان ماكسي شيفون',
    slug: 'chiffon-maxi-dress', price: 189, originalPrice: 239,
    category: 'womens', images: [], emoji: '👗',
    colors: ['وردي', 'أوف وايت', 'سيلفر'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true, stockCount: 30, rating: 4.6, reviewCount: 87,
    description: 'فستان ماكسي راقٍ من قماش الشيفون الخفيف، مثالي للمناسبات والأفراح.',
    isFeatured: true, isNew: true, tags: ['فستان', 'نسائي', 'مناسبات'],
  },
  {
    id: '3', name: 'Classic Sofa Set 6pcs', nameAr: 'طقم كنبة كلاسيك ٦ قطع',
    slug: 'classic-sofa-set', price: 3890,
    category: 'home', images: [], emoji: '🛋',
    colors: ['بيج', 'رمادي', 'أخضر زيتوني'], sizes: undefined,
    inStock: true, stockCount: 12, rating: 4.9, reviewCount: 56,
    description: 'طقم كنبة فاخر ٦ قطع بإطار خشب زان متين ومسند قطيفة عالي الجودة، يناسب غرف المعيشة الكبيرة.',
    isFeatured: true, isNew: true, tags: ['مفروشات', 'كنبة', 'غرفة معيشة'],
  },
  {
    id: '4', name: 'Turkish Handmade Rug', nameAr: 'سجادة تركية يدوية',
    slug: 'turkish-rug', price: 1250,
    category: 'rugs', images: [], emoji: '🪄',
    colors: ['أحمر خمري', 'بيج', 'أزرق'], sizes: ['2×3م', '3×4م', '4×6م'],
    inStock: true, stockCount: 20, rating: 4.7, reviewCount: 43,
    description: 'سجادة تركية مصنوعة يدوياً من الصوف الطبيعي عالي الجودة، بنقوشات أصيلة.',
    isFeatured: true, tags: ['سجادة', 'تركية', 'يدوية'],
  },
  {
    id: '5', name: 'Men\'s Thobe Premium', nameAr: 'ثوب رجالي بريميوم',
    slug: 'mens-thobe-premium', price: 320,
    category: 'mens', images: [], emoji: '👘',
    colors: ['أبيض', 'بيج', 'رمادي فاتح'], sizes: ['52', '54', '56', '58', '60'],
    inStock: true, stockCount: 60, rating: 4.9, reviewCount: 201,
    description: 'ثوب رجالي بريميوم مصنوع من قماش الجاكار السعودي الفاخر، بخياطة إيطالية.',
    isFeatured: true, tags: ['ثوب', 'رجالي', 'سعودي'],
  },
  {
    id: '6', name: 'Kids Jalabiya Set', nameAr: 'طقم جلابية أطفال',
    slug: 'kids-jalabiya', price: 89, originalPrice: 120,
    category: 'kids', images: [], emoji: '👧',
    colors: ['وردي', 'أصفر', 'أزرق'], sizes: ['2', '4', '6', '8', '10'],
    inStock: true, stockCount: 80, rating: 4.5, reviewCount: 65,
    description: 'طقم جلابية للأطفال من القطن المصري الناعم، مريح ومناسب للمناسبات.',
    isNew: true, tags: ['أطفال', 'جلابية', 'قطن'],
  },
  {
    id: '7', name: 'Velvet Curtains Set', nameAr: 'طقم ستائر مخمل',
    slug: 'velvet-curtains', price: 650, originalPrice: 850,
    category: 'curtains', images: [], emoji: '🪟',
    colors: ['أزرق داكن', 'بردقاني', 'رمادي'], sizes: ['200×250', '200×300'],
    inStock: true, stockCount: 25, rating: 4.6, reviewCount: 38,
    description: 'ستائر مخمل فاخرة بطبطاب محكم، تمنح خصوصية تامة وتضيف لمسة أناقة.',
    tags: ['ستائر', 'مخمل', 'ديكور'],
  },
  {
    id: '8', name: 'Embroidered Abaya Open', nameAr: 'عباءة مفتوحة مطرزة',
    slug: 'embroidered-abaya-open', price: 399,
    category: 'womens', images: [], emoji: '🧣',
    colors: ['أسود', 'عباءة بيج'], sizes: ['S', 'M', 'L', 'XL'],
    inStock: true, stockCount: 35, rating: 4.7, reviewCount: 93,
    description: 'عباءة مفتوحة بتطريز ذهبي على الجيب والأكمام، تجمع الأصالة والعصرية.',
    isNew: true, tags: ['عباءة', 'مفتوحة', 'ذهبي'],
  },
];

export const CITIES = [
  'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام',
  'الخبر', 'الطائف', 'أبها', 'تبوك', 'القصيم', 'حائل', 'جازان',
  'نجران', 'الباحة', 'سكاكا', 'عرعر', 'القريات', 'ينبع',
];

export const SHIPPING_COST = 25; // ريال
export const FREE_SHIPPING_THRESHOLD = 200; // ريال

export function formatPrice(price: number): string {
  return `${price.toLocaleString('ar-SA')} ر.س`;
}

export function calcDiscount(price: number, original: number): number {
  return Math.round(((original - price) / original) * 100);
}
