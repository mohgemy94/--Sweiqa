/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Product, BeniMazarDistrict } from './types';

export const BRANDS_AND_SLIDES = {
  slides: [
    {
      id: 'slide1',
      title: 'بني مزار الخير 🌾',
      subtitle: 'أكبر سوق مواشي وطيور بلدية من المزارع مباشرة لبيتكم',
      tag: 'سوق الحلال',
      bgGradient: 'from-teal-800 to-teal-900',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=85&w=600', // Beautiful rural backdrop
    },
    {
      id: 'slide2',
      title: 'عروض السوبر ماركت اليومية 🛒',
      subtitle: 'خصومات تصل إلى 25% على السلع الغذائية والزيوت الأساسية',
      tag: 'بني مزار إكسبريس',
      bgGradient: 'from-emerald-800 to-teal-800',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=85&w=600',
    },
    {
      id: 'slide3',
      title: 'أجهزة منزلية بضمان حقيقي 🔌',
      subtitle: 'توصيل مجاني وتركيب فوري داخل مركز بني مزار وقراها',
      tag: 'أجهزة الصعيد',
      bgGradient: 'from-cyan-800 to-teal-900',
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=85&w=600',
    }
  ]
};

export const BENI_MAZAR_DISTRICTS: BeniMazarDistrict[] = [
  { id: 'central', name: 'وسط البلد وبني مزار القديمة', deliveryFee: 15, estimateMinutes: '15-25 دقيقة' },
  { id: 'corniche', name: 'طريق البحر (الكورنيش) والمنشية', deliveryFee: 15, estimateMinutes: '15-30 دقيقة' },
  { id: 'ashour', name: 'أرض عاشور وحي الجلادين', deliveryFee: 20, estimateMinutes: '20-35 دقيقة' },
  { id: 'abu_gerg', name: 'مجلس قروي أبوجرج', deliveryFee: 30, estimateMinutes: '35-45 دقيقة' },
  { id: 'sandafa', name: 'قرية صندفا الفاروقية', deliveryFee: 35, estimateMinutes: '40-50 دقيقة' },
  { id: 'beni_ali', name: 'قرية بني علي وقراها والجرن', deliveryFee: 35, estimateMinutes: '40-50 دقيقة' },
  { id: 'el_qays', name: 'قرية القيس التاريخية', deliveryFee: 30, estimateMinutes: '35-45 دقيقة' },
  { id: 'safat', name: 'قرية صفط أبوجرج', deliveryFee: 30, estimateMinutes: '35-45 دقيقة' },
  { id: 'east_desert', name: 'بني مزار شرق النيل ومحاجر البستان', deliveryFee: 45, estimateMinutes: '50-60 دقيقة' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'halal_market',
    name: 'سوق الحلال والطيور',
    englishName: 'Halal Livestock & Birds',
    icon: 'Beef',
    isSpecial: true,
    description: 'أجود مواشي التربية والأضحية، طيور بلدية مرباة بأعلاف طبيعية 100% من مزارع بني مزار.',
    subcategories: [
      { id: 'calves', name: 'العجول (تربية وذبح)', englishName: 'Calves & Cattle', icon: 'Beef', parentCategoryId: 'halal_market' },
      { id: 'sheep', name: 'الخرفان والنعاج', englishName: 'Sheep & Lambs', icon: 'Footprints', parentCategoryId: 'halal_market' },
      { id: 'goats', name: 'الماعز والجديان', englishName: 'Goats', icon: 'Sparkles', parentCategoryId: 'halal_market' },
      { id: 'rabbits', name: 'الأرانب البلدية', englishName: 'Rabbits', icon: 'Feather', parentCategoryId: 'halal_market' },
      { id: 'ducks', name: 'البط والإوز البلدي', englishName: 'Ducks & Geese', icon: 'Bird', parentCategoryId: 'halal_market' },
      { id: 'baladi_chicken', name: 'الفراخ البلدي (شامورت وبياض)', englishName: 'Baladi Chicken', icon: 'Activity', parentCategoryId: 'halal_market' },
      { id: 'white_chicken', name: 'الفراخ البيضاء والمبردة', englishName: 'White Chicken', icon: 'Egg', parentCategoryId: 'halal_market' },
      { id: 'eggs', name: 'البيض بأنواعه', englishName: 'Eggs Selector', icon: 'Grid', parentCategoryId: 'halal_market' },
    ]
  },
  {
    id: 'supermarket',
    name: 'السوبر ماركت والبقالة',
    englishName: 'Supermarket',
    icon: 'ShoppingCart',
    subcategories: [
      { id: 'oil_grains', name: 'زيوت وسمن وأرز', englishName: 'Oils & Grains', icon: 'Egg', parentCategoryId: 'supermarket' },
      { id: 'dairy', name: 'ألبان وأجبان الصعيد', englishName: 'Dairy & Cheese', icon: 'Milk', parentCategoryId: 'supermarket' },
      { id: 'canned_food', name: 'معلبات ومحفوظات', englishName: 'Canned Food', icon: 'Archive', parentCategoryId: 'supermarket' },
      { id: 'snacks', name: 'بسكويت وحلويات ومقرمشات', englishName: 'Snacks & Sweets', icon: 'Cookie', parentCategoryId: 'supermarket' },
    ]
  },
  {
    id: 'electronics',
    name: 'الأجهزة المنزلية والإلكترونيات',
    englishName: 'Electronics & Appliances',
    icon: 'Tv',
    subcategories: [
      { id: 'appliances', name: 'أجهزة المطبخ والغسالات', englishName: 'Kitchen Appliances', icon: 'Flame', parentCategoryId: 'electronics' },
      { id: 'mobiles', name: 'الهواتف ومستلزماتها', englishName: 'Mobiles & Accessories', icon: 'Smartphone', parentCategoryId: 'electronics' },
      { id: 'screens', name: 'شاشات ورسيفرات ومسارح منزلية', englishName: 'Screens & Audio', icon: 'Tv', parentCategoryId: 'electronics' },
    ]
  },
  {
    id: 'fashion',
    name: 'الملابس والأزياء',
    englishName: 'Fashion & Wearables',
    icon: 'Shirt',
    subcategories: [
      { id: 'traditional', name: 'جلابيات صعيدي وملابس مناسبات', englishName: 'Traditional Wear', icon: 'Sparkles', parentCategoryId: 'fashion' },
      { id: 'casual', name: 'ملابس كاجوال رجالي وحريمي', englishName: 'Casual Wear', icon: 'Shirt', parentCategoryId: 'fashion' },
      { id: 'children', name: 'ملابس أطفال ومدارس', englishName: 'Children Wear', icon: 'Smile', parentCategoryId: 'fashion' },
      { id: 'underwear_lingerie', name: 'ملابس داخلية حريمي ورجالي', englishName: 'Underwear', icon: 'Heart', parentCategoryId: 'fashion' },
      { id: 'shoes', name: 'أحذية وصنادل متنوعة', englishName: 'Shoes & Sandals', icon: 'Footprints', parentCategoryId: 'fashion' },
      { id: 'wedding_dresses', name: 'فساتين العرائس والأفراح', englishName: 'Wedding Dresses', icon: 'Sparkles', parentCategoryId: 'fashion' },
      { id: 'accessories_supplies', name: 'اكسسوارات ومستلزمات الملابس', englishName: 'Clothing Accessories', icon: 'PartyPopper', parentCategoryId: 'fashion' }
    ]
  },
  {
    id: 'skincare_health',
    name: 'مستلزمات العناية بالبشرة والصحة',
    englishName: 'Skincare & Health',
    icon: 'Heart',
    subcategories: [
      { id: 'skincare', name: 'العناية بالبشرة والوجه', englishName: 'Skin Care', icon: 'Sparkles', parentCategoryId: 'skincare_health' },
      { id: 'hair_body', name: 'العناية بالشعر والجسم', englishName: 'Hair & Body', icon: 'Flame', parentCategoryId: 'skincare_health' },
      { id: 'health_first_aid', name: 'الصحة والإسعافات والتحاليل', englishName: 'Health Supplies', icon: 'Heart', parentCategoryId: 'skincare_health' },
      { id: 'baby_care', name: 'العناية بالطفل والرضع', englishName: 'Baby Care', icon: 'Smile', parentCategoryId: 'skincare_health' }
    ]
  },
  {
    id: 'spices_herbs',
    name: 'العطارة والتوابل',
    englishName: 'Herbs & Spices',
    icon: 'Sprout',
    subcategories: [
      { id: 'basic_spices', name: 'بهارات وتوابل أساسية', englishName: 'Basic Spices', icon: 'Sparkles', parentCategoryId: 'spices_herbs' },
      { id: 'herbal_drinks', name: 'أعشاب طبيعية ومشروبات', englishName: 'Herbal Drinks', icon: 'Activity', parentCategoryId: 'spices_herbs' },
      { id: 'natural_oils', name: 'زيوت ووصفات طبيعية', englishName: 'Natural Oils', icon: 'Flame', parentCategoryId: 'spices_herbs' },
      { id: 'baking_needs', name: 'مستلزمات المخبوزات والحلويات', englishName: 'Baking Needs', icon: 'Grid', parentCategoryId: 'spices_herbs' }
    ]
  },
  {
    id: 'mobiles_electronics',
    name: 'الإلكترونيات والموبايلات',
    englishName: 'Mobiles & Electronics',
    icon: 'Smartphone',
    subcategories: [
      { id: 'smartphones', name: 'هواتف ذكية', englishName: 'Smartphones', icon: 'Smartphone', parentCategoryId: 'mobiles_electronics' },
      { id: 'accessories', name: 'إكسسوارات الهواتف', englishName: 'Phone Accessories', icon: 'Grid', parentCategoryId: 'mobiles_electronics' },
      { id: 'chargers', name: 'شواحن وكابلات', englishName: 'Chargers & Cables', icon: 'Shuffle', parentCategoryId: 'mobiles_electronics' },
      { id: 'headphones', name: 'سماعات وملحقات صوتية', englishName: 'Audio & Speakers', icon: 'Tv', parentCategoryId: 'mobiles_electronics' }
    ]
  },
  {
    id: 'household_cleaning',
    name: 'منظفات منزلية',
    englishName: 'Household Cleaning',
    icon: 'Sparkles',
    subcategories: [
      { id: 'laundry', name: 'منظفات الغسيل والملابس', englishName: 'Laundry Detergents', icon: 'Sparkles', parentCategoryId: 'household_cleaning' },
      { id: 'dishes_kitchen', name: 'منظفات الأطباق والمطبخ', englishName: 'Dishwashing & Kitchen', icon: 'Grid', parentCategoryId: 'household_cleaning' },
      { id: 'home_sanitizers', name: 'مطهرات الأرضيات والمطابخ', englishName: 'Home Sanitizers', icon: 'ShieldAlert', parentCategoryId: 'household_cleaning' },
      { id: 'fresheners', name: 'معطرات جو ومبيدات حشرات', englishName: 'Fresheners & Pest Control', icon: 'Wind', parentCategoryId: 'household_cleaning' }
    ]
  }
];

export const PRODUCTS: Product[] = [
  // 1. Calves (العجول)
  {
    id: 'calf_baladi_1',
    name: 'عجل بقري بلدي سوبر (قائم)',
    arabicName: 'عجل بقري بلدي سوبر (قائم)',
    description: 'تغذية بلدية ممتازة من البرسيم الحجازي والردة الخشنة. لحم عالي الجودة لنسب تصافي ممتازة تصل لـ 60%. خاضع للرقابة البيطرية في مزارع قرية القيس ببني مزار.',
    price: 168, // price per kilo
    originalPrice: 180,
    isExpress: true,
    badge: 'الأكثر مبيعاً',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'calves',
    rating: 4.9,
    reviewsCount: 42,
    stock: 8,
    isAvailable: true,
    livestockInfo: {
      weight: 380,
      age: '15 شهر',
      gender: 'ذكر (عجل)',
      breed: 'بلدي هجين فريزيان',
      healthState: 'ممتازة - خالي من العيوب الشرعية وتطعيمات الحمى القلاعية كاملة',
      priceType: 'per_kilo',
      pricePerKilo: 168,
      feedType: 'علف خشن بلدي (برسيم + ذرة صفراء + ردة)',
      origin: 'قرية القيس الخضراء'
    }
  },
  {
    id: 'calf_sharki_2',
    name: 'عجل جاموسي بلدي للذبح (بالرأس)',
    arabicName: 'عجل جاموسي بلدي للذبح (بالرأس)',
    description: 'عجل جاموسي بلدي مجهز للذبح أو العقيقة. يتميز بنسبة دهون منخفضة ولحم أحمر غني بالطاقة. متربى في بيئة صعيدية نقية.',
    price: 64000, // flat head price
    originalPrice: 68000,
    isExpress: false,
    badge: 'توصيل مجاني 🚚',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'calves',
    rating: 4.8,
    reviewsCount: 19,
    stock: 3,
    isAvailable: true,
    livestockInfo: {
      weight: 420,
      age: '18 شهر',
      gender: 'ذكر (عجل)',
      breed: 'جموس صعيدي بلدي',
      healthState: 'بيطري سليم 100%، نشيط وممتاز للأضحية والعقيقة',
      priceType: 'per_head',
      feedType: 'علف أخضر غني مع تبن ودريس جاف',
      origin: 'مزارع شرق النيل ببني مزار'
    }
  },

  // 2. Sheep (الخرفان)
  {
    id: 'sheep_assaf_1',
    name: 'خروف بلدي عسافي فاخر (قائم)',
    arabicName: 'خروف بلدي عسافي فاخر (قائم)',
    description: 'خروف عسافي بلدي هجين يتميز بإنتاجية عالية من اللحم وليّة متوسطة ومكتنز بالدهون الصحية. أفضل اختيار للمناسبات الفاخرة والأكل البيتي الصعيدي الأصيل.',
    price: 195, // Per Kilo
    originalPrice: 205,
    isExpress: true,
    badge: 'عرقة بلدية',
    image: 'https://images.unsplash.com/photo-1484557985045-eaa2520b9b28?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'sheep',
    rating: 4.7,
    reviewsCount: 31,
    stock: 15,
    isAvailable: true,
    livestockInfo: {
      weight: 65,
      age: '9 شهور',
      gender: 'كير (ذكر)',
      breed: 'عسافي بلدي محسّن',
      healthState: 'تام وصحيح الخلقة، فحص وتحصين دوري',
      priceType: 'per_kilo',
      pricePerKilo: 195,
      feedType: 'ذرة شامية وفول بلدي مكسور',
      origin: 'أبوجرج'
    }
  },
  {
    id: 'sheep_rahmani_2',
    name: 'خروف رحماني صعيدي (بالرأس)',
    arabicName: 'خروف رحماني صعيدي (بالرأس)',
    description: 'خروف سلالة الرحماني الأصيلة، صوف كثيف أحمر مائل للبني، لحم لذيذ بنكهة ممتازة ودهن خفيف. جاهز للتوصيل لباب بيتك بمدينة بني مزار.',
    price: 12500,
    originalPrice: 13500,
    isExpress: false,
    badge: 'توصيل سريع',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'sheep',
    rating: 4.9,
    reviewsCount: 12,
    stock: 6,
    isAvailable: true,
    livestockInfo: {
      weight: 58,
      age: '8 شهور',
      gender: 'ذكر',
      breed: 'رحماني أصيل',
      healthState: 'سليم تماماً من العيوب، تنفس طبيعي ودورة مرعى نقية',
      priceType: 'per_head',
      feedType: 'دراوة ذرة وعلف مركز 16%',
      origin: 'قرية صندفا'
    }
  },

  // 3. Goats (الماعز)
  {
    id: 'goat_shami_1',
    name: 'جدي بلدي شامي لحم مصفى (بالرأس)',
    arabicName: 'جدي بلدي شامي لحم مصفى (بالرأس)',
    description: 'جدي شامي متربي على أعواد البرسيم والدراوة الخضراء، لحمه يتميز بطراوته ومذاقه الشهي الخفيف جداً على المعدة. مثالي لمرضى الكوليسترول وعشاق المندي والكبسة.',
    price: 6800,
    originalPrice: 7500,
    isExpress: true,
    badge: 'عرض حصري 🤩',
    image: 'https://images.unsplash.com/photo-1524413151214-664c9f652367?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'goats',
    rating: 5.0,
    reviewsCount: 18,
    stock: 9,
    isAvailable: true,
    livestockInfo: {
      weight: 35,
      age: '7 شهور',
      gender: 'جدي (ذكر)',
      breed: 'شامي هجين بلدي',
      healthState: 'نشاط وحيوية عالية، مطعم ضد الطاعون والجدري الدواجن',
      priceType: 'per_head',
      feedType: 'حشيش أخضر وعليقة شعير ردة',
      origin: 'قرية بني علي'
    }
  },

  // 4. Rabbits (الأرانب)
  {
    id: 'rabbit_baladi_1',
    name: 'زوج أرانب بلدي نيو زيلاندي هجين',
    arabicName: 'زوج أرانب بلدي نيو زيلاندي هجين',
    description: 'زوج أرانب أوزان كبيرة (نحو 2.2 كيلو للأرنب الواحد صفا)، لحم طري وغني بالفيتامينات. مذبوح ومنظف بماء وملح وليمون وجاهز للطهي تحت إشراف طبي.',
    price: 490,
    originalPrice: 550,
    isExpress: true,
    badge: 'مذبوح ومنظف 🧼',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'rabbits',
    rating: 4.6,
    reviewsCount: 26,
    stock: 20,
    isAvailable: true,
    livestockInfo: {
      weight: 4.4, // Total pair weight
      age: '4 شهور',
      gender: 'ذكر وأنثى متوافقين',
      breed: 'نيوزيلاندي هجين بلدي ذو مناعة عالية',
      healthState: 'صحي تماماً خاضع للكشف الطبي في مجازر بني مزار الحديثة',
      priceType: 'per_head',
      feedType: 'برسيم بلدي مغسول ومكعبات علف أرنب مخصصة',
      origin: 'مزارع الجلادين'
    }
  },

  // 5. Ducks (البط)
  {
    id: 'duck_baladi_1',
    name: 'بط بلدي سوداني أصيل (بالحبة)',
    arabicName: 'بط بلدي سوداني أصيل (بالحبة)',
    description: 'بط سوداني بلدي واكل من البيت والبيت الصعيدي يعرف جودة البط ده في طواجن الأرز المعمر والشوربة السمينة الدسمة. متوفر حي أو مذبوح ومنظف ومغلف.',
    price: 520,
    originalPrice: 600,
    isExpress: true,
    badge: 'بلدي أصيل 🦆',
    image: 'https://images.unsplash.com/photo-1555800544-4361b2f0a625?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'ducks',
    rating: 4.9,
    reviewsCount: 38,
    stock: 25,
    isAvailable: true,
    livestockInfo: {
      weight: 3.8,
      age: '6 شهور',
      gender: 'ذكر (كندوز بط)',
      breed: 'سوداني منزلي التربية',
      healthState: 'شهية ممتازة، ملقح دورياً، تذبح طازجة عند طلبك',
      priceType: 'per_head',
      feedType: 'رغيف مقطع، مصل الذرة، رجع الأرز الخشن',
      origin: 'بيوت صفط أبوجرج'
    }
  },

  // 6. Baladi Chicken (الفراخ البلدي)
  {
    id: 'chicken_baladi_1',
    name: 'فراخ بلدي حشو شامورت (جوز)',
    arabicName: 'فراخ بلدي حشو شامورت (جوز)',
    description: 'زوج من الفراخ البلدي الشامورت الخفيفة المعدة للحشو بالفريك الصعيدي أو الأرز الأبيض. طعم لا يقاوم وجودة تربية ريفية حقيقية.',
    price: 320,
    originalPrice: 350,
    isExpress: true,
    badge: 'طازة اليوم 🐔',
    image: 'https://images.unsplash.com/photo-1548689816-c399f954f3dd?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'baladi_chicken',
    rating: 4.8,
    reviewsCount: 52,
    stock: 40,
    isAvailable: true,
    livestockInfo: {
      weight: 2.2, // Pair weight
      age: '3 شهور',
      gender: 'إناث (شامورت بياض)',
      breed: 'بلدي فيومي حر عالي المناعة',
      healthState: 'نشاط تام وخالية من الفيروسات، تذبح وتنظف مجاناً',
      priceType: 'per_head',
      feedType: 'بقايا حبوب القمح وكسر الأرز الأخضر دقيق الذرة',
      origin: 'مطاهير بني مزار'
    }
  },

  // 7. White Chicken (الفراخ البيضاء)
  {
    id: 'chicken_white_1',
    name: 'فراخ بيضاء تسمين سوبر (بالكيلو مجازر)',
    arabicName: 'فراخ بيضاء تسمين سوبر (بالكيلو مجازر)',
    description: 'فراخ الدجاج الأبيض للتسمين عالية الجودة. مذبوحة طبقاً للشريعة الإسلامية ومبردة سريعاً لحفظ النضارة. خالية من الهرمونات والمسرعات الحيوية.',
    price: 88,
    originalPrice: 95,
    isExpress: true,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'white_chicken',
    rating: 4.5,
    reviewsCount: 89,
    stock: 120,
    isAvailable: true,
    livestockInfo: {
      weight: 2.0, // average individual weight
      age: '40 يوم',
      gender: 'مختلط',
      breed: 'كوب 500 (روس)',
      healthState: 'توصيل مغلق مبرد بسياراتنا الخاصة للحفاظ على سلامة اللحوم',
      priceType: 'per_kilo',
      pricePerKilo: 88,
      feedType: 'علف تسمين بادي نامي ناهي 21%',
      origin: 'عنابر بني مزار المتطورة'
    }
  },

  // 8. Eggs (البيض)
  {
    id: 'eggs_baladi_1',
    name: 'طبق بيض بلدي صعيدي ريفي (30 بيضة)',
    arabicName: 'طبق بيض بلدي صعيدي ريفي (30 بيضة)',
    description: 'كرتونة بيض بلدي مزارع نقي ذو فص صفار داكن وعالي القيمة الغذائية، مجمع طازجاً من مزارع الدواجن الريفية حول بني مزار بصورة يومية.',
    price: 175,
    originalPrice: 190,
    isExpress: true,
    badge: 'طازج يومياً 🍳',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'eggs',
    rating: 4.9,
    reviewsCount: 112,
    stock: 50,
    isAvailable: true,
    livestockInfo: {
      breed: 'بلدي حر بلدي محسّن ذو جودة بيض ممتازة',
      healthState: 'طبيعي 100% مغسول ومعقم ومعبأ في عبوات كرتونية متينة مضادة للكسر',
      priceType: 'per_head',
      origin: 'بيوت وقرى بني مزار'
    }
  },
  {
    id: 'eggs_hatching_1',
    name: 'بيض بلدي ملقح للتفريخ (كرتونة 30 حبة)',
    arabicName: 'بيض بلدي ملقح للتفريخ (كرتونة 30 حبة)',
    description: 'مخصص لأصحاب المعامل والمفرخات والفقاسات المنزلية. بيض ملقح ذو نسبة خصوبة مضمونة تزيد عن 85% مجمع من عنابر أمهات الفيومي والبلدي المحسّن.',
    price: 240,
    originalPrice: 260,
    isExpress: false,
    badge: 'خصوبة مضمونة 🎖️',
    image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&q=80&w=400',
    categoryId: 'halal_market',
    subcategoryId: 'eggs',
    rating: 4.8,
    reviewsCount: 22,
    stock: 12,
    isAvailable: true,
    livestockInfo: {
      breed: 'أمهات فيومي ذهبي + بلدي محسّن نسبة ذكور 1:5',
      healthState: 'سليم، مخزن برفق وتحت درجات حرارة مثالية وتاريخ تجميع لا يتعدى 3 أيام',
      priceType: 'per_head',
      origin: 'عنابر قرية القيس المتخصصة'
    }
  },

  // 9. Supermarket (البقالة)
  {
    id: 'super_oil_1',
    name: 'زيت خليط كريستال متميز 800 مل',
    arabicName: 'زيت خليط كريستال متميز 800 مل',
    description: 'زيت كريستال نقي ومصفى بعناية، مثالي لعمليات القلي والطهي اليومي للبيوت في تلبية احتياجات المطبخ اليومية.',
    price: 78,
    originalPrice: 85,
    isExpress: true,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    categoryId: 'supermarket',
    subcategoryId: 'oil_grains',
    rating: 4.4,
    reviewsCount: 230,
    stock: 500,
    isAvailable: true
  },
  {
    id: 'super_cheese_1',
    name: 'جبنة قريش قروية طازجة (بالكيلو)',
    arabicName: 'جبنة قريش قروية طازجة (بالكيلو)',
    description: 'جبنة قريش صعيدي حقيقية مصنوعة من حليب بقري كامل الدسم مخضوض بالطريقة الصعيدية الفخارة التقليدية. نسبة ملح خفيفة لتناسب الأنظمة الصحية.',
    price: 110,
    originalPrice: 120,
    isExpress: true,
    badge: 'طعم صعيدي 🧀',
    image: 'https://images.unsplash.com/photo-1559561853-08026ff10479?auto=format&fit=crop&q=80&w=400',
    categoryId: 'supermarket',
    subcategoryId: 'dairy',
    rating: 4.9,
    reviewsCount: 74,
    stock: 45,
    isAvailable: true
  },

  // 10. Electronics (الإيجزة المنزلية)
  {
    id: 'elec_screen_1',
    name: 'شاشة تورنيدو 43 بوصة سمارت LED',
    arabicName: 'شاشة تورنيدو 43 بوصة سمارت LED',
    description: 'دقة Full HD مع نظام تشغيل أندرويد ذكي مدمج ووصول مباشر ليوتيوب ونتفلكس. مدخلين HDMI ومدخلي USB للحواسب والأجهزة الطرفية مع ضمان العربي الشامل 3 سنوات.',
    price: 13900,
    originalPrice: 15000,
    isExpress: false,
    badge: 'ضمان 3 سنوات 🎖️',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=400',
    categoryId: 'electronics',
    subcategoryId: 'screens',
    rating: 4.6,
    reviewsCount: 45,
    stock: 12,
    isAvailable: true
  },

  // 11. Traditional Clothing
  {
    id: 'fashion_galabiya_1',
    name: 'جلابية صعيدي فاخرة قطن مصري ممتاز',
    arabicName: 'جلابية صعيدي فاخرة قطن مصري ممتاز',
    description: 'جلابية صعيدي فلاحي بتصميم أصيل، قماش قطن مزدوج ناعم وبارد جداً ليتحمل درجات الحرارة المرتفعة بالصعيد في فصل الصيف، تفصيل احترافي ومقاسات مريحة ومتنوعة.',
    price: 850,
    originalPrice: 1100,
    isExpress: true,
    badge: 'قطن مصري 100% 🇪🇬',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400', // Traditional representation placeholder
    categoryId: 'fashion',
    subcategoryId: 'traditional',
    rating: 4.8,
    reviewsCount: 33,
    stock: 22,
    isAvailable: true
  },
  {
    id: 'skin_moisturizer_1',
    name: 'كريم ترطيب بيوديرما للبشرة الجافة',
    arabicName: 'كريم ترطيب بيوديرما للبشرة الجافة',
    description: 'تركيبة غنية وفعالة لترطيب حاجز البشرة، خالي من العطور ويسهم بفاعلية في تهدئة الجلد والتهابات الوجوه تحت تأثير شمس الصعيد الحادة.',
    price: 320,
    originalPrice: 380,
    isExpress: true,
    badge: 'ترطيب عميق 💧',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400',
    categoryId: 'skincare_health',
    subcategoryId: 'skincare',
    rating: 4.9,
    reviewsCount: 15,
    stock: 25,
    isAvailable: true
  },
  {
    id: 'skin_sunscreen_1',
    name: 'واقي شمس لاروش بوزيه بعامل حماية +50',
    arabicName: 'واقي شمس لاروش بوزيه بعامل حماية +50',
    description: 'حماية فائقة وغير مرئية من الأشعة فوق البنفسجية الطويلة والمتوسطة، مضاد للمياه والتعرق، ممتاز للاستعمال اليومي لعمال مزارع بني مزار وجميع السكان.',
    price: 490,
    originalPrice: 550,
    isExpress: true,
    badge: 'حماية قصوى ☀️',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400',
    categoryId: 'skincare_health',
    subcategoryId: 'skincare',
    rating: 4.8,
    reviewsCount: 30,
    stock: 18,
    isAvailable: true
  },
  {
    id: 'health_sugar_meter_1',
    name: 'جهاز أكيو تشيك لقياس السكر بالدم',
    arabicName: 'جهاز أكيو تشيك لقياس السكر بالدم',
    description: 'جهاز فوري ودقيق وموثوق به دولياً لقياس السكر في المنازل بلمسات سريعة. يشتمل على علبة اختبار بـ 50 شريطاً مجانياً وقلم وخز مبسط.',
    price: 590,
    originalPrice: 650,
    isExpress: true,
    badge: 'طبي معتمد 🩺',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    categoryId: 'skincare_health',
    subcategoryId: 'health_first_aid',
    rating: 4.9,
    reviewsCount: 44,
    stock: 10,
    isAvailable: true
  },
  {
    id: 'baby_diaper_1',
    name: 'حفاضات بامبرز للأطفال جامبو (60 حفاضة)',
    arabicName: 'حفاضات بامبرز للأطفال جامبو (60 حفاضة)',
    description: 'لراحة تامة وحماية طفلك طيلة الليل والنهار بفضل قنوات الامتصاص الفائقة وحواف منع التسريب. تناسب بشرة الأطفال الصغار ولا تسبب تحسساً.',
    price: 295,
    originalPrice: 340,
    isExpress: true,
    badge: 'الأكثر توفيراً 👶',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400',
    categoryId: 'skincare_health',
    subcategoryId: 'baby_care',
    rating: 4.7,
    reviewsCount: 22,
    stock: 40,
    isAvailable: true
  },
  {
    id: 'spices_pepper_1',
    name: 'فلفل أسود صعيدي مطحون نقي (ربع كيلو)',
    arabicName: 'فلفل أسود صعيدي مطحون نقي (ربع كيلو)',
    description: 'فلفل أسود منقى ومفروم بعناية فائقة فائحة النكهة والحرارة، ممتاز لجميع وصفات اللحوم والبلدي والمأكولات الصعيدية.',
    price: 85,
    originalPrice: 100,
    isExpress: true,
    badge: 'بهارات طازجة 🌶️',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=400',
    categoryId: 'spices_herbs',
    subcategoryId: 'basic_spices',
    rating: 4.9,
    reviewsCount: 16,
    stock: 50,
    isAvailable: true
  },
  {
    id: 'spices_hibiscus_1',
    name: 'كركديه أسواني قطفة أولى (نصف كيلو)',
    arabicName: 'كركديه أسواني قطفة أولى (نصف كيلو)',
    description: 'كركديه زهرة كاملة لوز أسواني نقي، مشهور بنكهة قوية ولون قرمزي غامق ساحر، منعش جداً في صيف الصعيد وخافض للضغط الطبيعي.',
    price: 120,
    originalPrice: 140,
    isExpress: true,
    badge: 'أسواني فاخر 🌺',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    categoryId: 'spices_herbs',
    subcategoryId: 'herbal_drinks',
    rating: 4.9,
    reviewsCount: 48,
    stock: 35,
    isAvailable: true
  },
  {
    id: 'spices_cumin_1',
    name: 'كمون بلدي مطحون نقي (ربع كيلو)',
    arabicName: 'كمون بلدي مطحون نقي (ربع كيلو)',
    description: 'كمون صعيدي مطحون فريش بأعلى درجات النقاء، نكهة نفاذة وقيمة علاجية وغذائية طبيعية لا غنى عنه لمحشي وتتبيل الأسماك.',
    price: 90,
    originalPrice: 110,
    isExpress: true,
    badge: 'مطحون فريش 🌾',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=400',
    categoryId: 'spices_herbs',
    subcategoryId: 'basic_spices',
    rating: 4.8,
    reviewsCount: 20,
    stock: 45,
    isAvailable: true
  },
  {
    id: 'spices_olive_1',
    name: 'زيت زيتون بكر ممتاز للطهي والشعر (1 لتر)',
    arabicName: 'زيت زيتون بكر ممتاز للطهي والشعر (1 لتر)',
    description: 'عصرة أولى على البارد بنقاء فائق، مثالي للوجبات الصحية وتحضير أكلات المطبخ، ومفيد جداً لوصفات ترميم ونعومة خصلات الشعر.',
    price: 240,
    originalPrice: 280,
    isExpress: true,
    badge: 'بكر معصور بارد 🫒',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    categoryId: 'spices_herbs',
    subcategoryId: 'natural_oils',
    rating: 4.7,
    reviewsCount: 37,
    stock: 20,
    isAvailable: true
  },
  {
    id: 'elec_phone_1',
    name: 'هاتف شاومي ريدمي 13C سعة 256 جيجا',
    arabicName: 'هاتف شاومي ريدمي 13C سعة 256 جيجا',
    description: 'موبايل جبار وممتاز للعمل المتواصل وشبكات الصعيد القوية، رامات 8 جيجا مع شاشة كبيرة 90Hz مسلية وبطارية ممتدة 5000mAh.',
    price: 6450,
    originalPrice: 6900,
    isExpress: true,
    badge: 'الأكثر طلباً 📱',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400',
    categoryId: 'mobiles_electronics',
    subcategoryId: 'smartphones',
    rating: 4.8,
    reviewsCount: 112,
    stock: 12,
    isAvailable: true
  },
  {
    id: 'elec_charger_1',
    name: 'شاحن توربو سريع بقدرة 67 واط الأصلي',
    arabicName: 'شاحن توربو سريع بقدرة 67 واط الأصلي',
    description: 'رأس شاحن يدعم الشحن السريع الفائق مع كابل Type-C سميك ومقاوم للقطع، ملائم لشحن الهواتف من 0 لـ 100% في أقل من 40 دقيقة.',
    price: 380,
    originalPrice: 450,
    isExpress: true,
    badge: 'شحن فائق ⚡',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=400',
    categoryId: 'mobiles_electronics',
    subcategoryId: 'chargers',
    rating: 4.9,
    reviewsCount: 56,
    stock: 24,
    isAvailable: true
  },
  {
    id: 'elec_headphones_1',
    name: 'سماعة سلكية أصلية AKG مدخل Type-C',
    arabicName: 'سماعة سلكية أصلية AKG مدخل Type-C',
    description: 'سماعة أذن سلكية بنقاء استوديو مذهل وعزل تام للضوضاء الخارجية، تتميز بكابل مغطى بالنسيج المقاوم للالتواء وعمر تشغيل طويل الأمد.',
    price: 250,
    originalPrice: 300,
    isExpress: true,
    badge: 'صوت مذهل 🎧',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400',
    categoryId: 'mobiles_electronics',
    subcategoryId: 'headphones',
    rating: 4.9,
    reviewsCount: 89,
    stock: 15,
    isAvailable: true
  },
  {
    id: 'elec_case_1',
    name: 'جراب ظهر سيليكون عسكري مقاوم للصدمات',
    arabicName: 'جراب ظهر سيليكون عسكري مقاوم للصدمات',
    description: 'كفر سيليكوني متين مع زوايا هوائية متطورة لتلقي الصدمات العنيفة، وحماية البدن الخارجي والعدسات الخلفية لمقاومة بيئة العمل والزراعة الشاقة.',
    price: 110,
    originalPrice: 150,
    isExpress: true,
    badge: 'درع حماية 🛡️',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400',
    categoryId: 'mobiles_electronics',
    subcategoryId: 'accessories',
    rating: 4.7,
    reviewsCount: 41,
    stock: 30,
    isAvailable: true
  },
  {
    id: 'clean_ariel_1',
    name: 'مسحوق غسيل أريال باللافندر أوتوماتيك (5 كيلو)',
    arabicName: 'مسحوق غسيل أريال باللافندر أوتوماتيك (5 كيلو)',
    description: 'أفضل حماية ونظافة مطلقة لأكثر الأقمشة حساسية ورقة، بعبير الخزامى الفرنسي المنعش. تركيبته الخاصة تمنع تكوّن الرواسب على الحلة الداخلية للغسالات الأوتوماتيك.',
    price: 345,
    originalPrice: 390,
    isExpress: true,
    badge: 'الأكثر مبيعاً 🧼',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400',
    categoryId: 'household_cleaning',
    subcategoryId: 'laundry',
    rating: 4.9,
    reviewsCount: 68,
    stock: 25,
    isAvailable: true
  },
  {
    id: 'clean_fairy_1',
    name: 'سائل غسيل أطباق فيري بالليمون (1 لتر)',
    arabicName: 'سائل غسيل أطباق فيري بالليمون (1 لتر)',
    description: 'تركيبة غسيل مركزة لا تضاهى تقضي بفاعلية فائقة على أصعب الدهون المتراكمة في أواني طهي الكنافة والمحاشي الصعيدية، ناعم جداً على بشرة اليدين ورائحة الليمون تدوم طويلاً.',
    price: 75,
    originalPrice: 85,
    isExpress: true,
    badge: 'توفير فائق 🍋',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=400',
    categoryId: 'household_cleaning',
    subcategoryId: 'dishes_kitchen',
    rating: 4.8,
    reviewsCount: 35,
    stock: 45,
    isAvailable: true
  },
  {
    id: 'clean_dettol_1',
    name: 'مطهر ومعقم ومضاد للبكتيريا ديتول سعة 750 مل',
    arabicName: 'مطهر ومعقم ومضاد للبكتيريا ديتول سعة 750 مل',
    description: 'فعالية فائقة بنسبة 99.9% في تعقيم وحماية أرضيات البيوت وأسطح المطابخ من أقسى الجراثيم، يمنح المنزل عبير منعش ونقاوة وحماية طبية معتمدة.',
    price: 185,
    originalPrice: 210,
    isExpress: true,
    badge: 'حماية طبية 🛡️',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    categoryId: 'household_cleaning',
    subcategoryId: 'home_sanitizers',
    rating: 4.9,
    reviewsCount: 52,
    stock: 15,
    isAvailable: true
  },
  {
    id: 'clean_fareeda_1',
    name: 'معطر جو بخاخ فريدة برائحة العود الفخم',
    arabicName: 'معطر جو بخاخ فريدة برائحة العود الفخم',
    description: 'معطر بخاخ غني وعالي الثبات يدوم لساعات طويلة، برائحة دهن العود الشرقي المميز الذي يضفي روحاً دافئة وأنيقة داخل ديوان العائلات والبيوت الصعيدية الأصيلة.',
    price: 55,
    originalPrice: 65,
    isExpress: true,
    badge: 'ثبات ممتاز 💨',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400',
    categoryId: 'household_cleaning',
    subcategoryId: 'fresheners',
    rating: 4.7,
    reviewsCount: 29,
    stock: 30,
    isAvailable: true
  },
  {
    id: 'fashion_underwear_1',
    name: 'طقم ملابس داخلية قطونيل قطن طبيعي دبل (3 قطع)',
    arabicName: 'طقم ملابس داخلية قطونيل قطن طبيعي دبل (3 قطع)',
    description: 'ملابس داخلية قطنية فاخرة من قطونيل الأصلية، ناعمة للغاية ومقاومة للتعرق ومثالية لأجواء الصعيد الدافئة وراحة الحركة طوال اليوم.',
    price: 180,
    originalPrice: 225,
    isExpress: true,
    badge: 'قطن 100% طبيعي 🎽',
    image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=400',
    categoryId: 'fashion',
    subcategoryId: 'underwear_lingerie',
    rating: 4.8,
    reviewsCount: 19,
    stock: 40,
    isAvailable: true
  },
  {
    id: 'fashion_shoes_1',
    name: 'حذاء كاجوال مريح للمشي والعمل والزيارات الشاقة',
    arabicName: 'حذاء كاجوال مريح للمشي والعمل والزيارات الشاقة',
    description: 'حذاء رياضي وعملي مريح للغاية بنعل طبي مرن ومقاوم للانزلاق، مصمم لامتصاص الصدمات وتحمل الحركة المستمرة والعمل الشاق في شوارع الصعيد والمزارع.',
    price: 420,
    originalPrice: 500,
    isExpress: true,
    badge: 'مريح ومقاوم 👟',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
    categoryId: 'fashion',
    subcategoryId: 'shoes',
    rating: 4.9,
    reviewsCount: 25,
    stock: 18,
    isAvailable: true
  },
  {
    id: 'fashion_wedding_1',
    name: 'فستان زفاف ملكي أبيض مطرز دانتيل فاخر',
    arabicName: 'فستان زفاف ملكي أبيض مطرز دانتيل فاخر',
    description: 'فستان زفاف غاية في الروعة والجمال بتطريزات دانتيل يدوية راقية وقصة ملكية تناسب ليلة العمر في قاعات الصعيد الفخمة، متاح مع طرحة زفاف طويلة متناسقة.',
    price: 3500,
    originalPrice: 4800,
    isExpress: false,
    badge: 'فخم ومميز 👰',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=400',
    categoryId: 'fashion',
    subcategoryId: 'wedding_dresses',
    rating: 5.0,
    reviewsCount: 14,
    stock: 5,
    isAvailable: true
  },
  {
    id: 'fashion_acc_1',
    name: 'حقيبة يد حريمي كلاسيكية خروج للحفلات والمناسبات',
    arabicName: 'حقيبة يد حريمي كلاسيكية خروج للحفلات والمناسبات',
    description: 'حقيبة أنيقة وعصرية مزودة بمسكة يد مريحة وحزام كتف معدني ذهبي كلاسيكي، مصنوعة من الجلد الفاخر وتناسب جميع طقم خروجاتكِ وأفراح الصعيد العائلية.',
    price: 290,
    originalPrice: 380,
    isExpress: true,
    badge: 'جلد فاخر 👜',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400',
    categoryId: 'fashion',
    subcategoryId: 'accessories_supplies',
    rating: 4.7,
    reviewsCount: 18,
    stock: 12,
    isAvailable: true
  }
];

// REACT NATIVE PROJECT DIRECTORY TEXT
export const REACT_NATIVE_STRUCTURE_TXT = `
SouqAlSaeed/
├── android/                 # ملفات بيئة عمل الأندرويد الأصلية (Gradle, JVM)
├── ios/                     # ملفات بيئة عمل الـ iOS الأصلية (Xcode, CocoaPods)
├── assets/                  # الملفات المساعدة (الخطوط، الأيقونات، الصور)
│   ├── fonts/               # خط Cairo و Tajawal العربي
│   └── images/              # صور الأقسام والبنرات
├── src/                     # المجلد الرئيسي للأكواد البرمجية (TypeScript)
│   ├── components/          # المكونات الفرعية المشتركة والقابلة لإعادة الاستخدام
│   │   ├── ProductCard.tsx     # كارت لعرض معلومات المنتج (يتحمل المعايير الخاصة بالمواشي)
│   │   ├── ExpressBadge.tsx    # شارة "سوق الصعيد سريع" المماثلة لنون إكسبريس
│   │   ├── SaeediHeader.tsx    # هيدر التطبيق المميز باللون الجنزاري وشريط البحث المتقدم
│   │   └── CategoryItem.tsx    # كارت القسم المزود برسومات ورموز توضيحية
│   ├── constants/           # المتغيرات الثابتة والألوان والهويات البصرية
│   │   └── colors.ts           # ثوابت نظام الألوان (الجنزاري #00796B، الخلفية #FFFFFF، الرماديات)
│   ├── database/            # محاكاة أو ربط الداتا الـ Local وقواعد البيانات
│   │   └── schema.json         # مخطط JSON لربط المنتجات الحيوانية ببياناتها الخاصة
│   ├── navigation/          # طبقة التوجيه والتنقل والتبويبات
│   │   ├── BottomTabNavigator.tsx # التبويبات السفلية (الرئيسية، الأقسام، السلة، حسابي)
│   │   └── MainStackNavigator.tsx # مكدس الشاشات للتفاصيل والدفع وحساب العميل
│   ├── screens/             # الشاشات الرئيسية للتطبيق
│   │   ├── HomeScreen.tsx         # واجهة مستخدم مشابهة جداً لتطبيق Noon بخصائص بني مزار
│   │   ├── CategoriesScreen.tsx   # واجهة تصفح الأقسام الشاملة وتفصيل سوق الحلال والطيور
│   │   ├── CartScreen.tsx         # سلة المشتريات وحساب ثمن النقل لقرى بني مزار المختلفة
│   │   ├── ProductDetailScreen.tsx# صفحة تفاصيل المنتج، بتبويبات الوزن وتحصينات الثروة الحيوانية
│   │   └── ProfileScreen.tsx      # لوحة تحكم المستخدم، الطلبات السابقة وإيصالات الدفع
│   └── services/            # التعامل مع الخدمات الخارجية وقواعد البيانات السحابية
│       ├── api.ts              # محرك الفيتش وجلب المنتجات
│       └── checkoutService.ts  # معالجة الطلبات وإرسال رسائل التوصيل عبر شبكات الصعيد
├── App.tsx                  # جذر شاشات تطبيق React Native ومثبت حالات الـ Redux / Navigation
├── package.json             # ملف التبعيات ومكتبات الأداء للحيازة والملاحة (React Navigation)
└── tsconfig.json            # تهيئة محاذاة لغة تايبر سكريبت لقوة الكود وثبات البناء
`;

// THE DATABASE SCHEMA IN RAW JSON STRING
export const SQL_MONGODB_FIRESTORE_SCHEMAS_TXT = `{
  "database": {
    "engine_recommendation": "PostgreSQL (for strict transactions) or MongoDB (for dynamic livestock attributes)",
    "collections": {
      "categories": [
        {
          "id": "halal_market",
          "name_ar": "سوق الحلال والطيور",
          "name_en": "Halal Livestock & Birds",
          "icon": "Beef",
          "is_special": true,
          "display_order": 1
        }
      ],
      "products": [
        {
          "id": "calf_baladi_1",
          "category_id": "halal_market",
          "subcategory_id": "calves",
          "name_ar": "عجل بقري بلدي سوبر (قائم)",
          "name_en": "Premium Local Beef Calf",
          "description": "تعبئة ممتازة من البرسيم الحجازي والردة... مزارع قرية القيس.",
          "price": 168.0,
          "original_price": 180.0,
          "stock": 8,
          "is_available": true,
          "rating": 4.9,
          "is_express": true,
          "images": [
            "https://cdn.souqalsaeed.com/products/calf_1_1.jpg"
          ],
          "metadata": {
            "type": "livestock",
            "is_live_animal": true,
            "weight_kg": 380,
            "age_months": 15,
            "gender": "ذكر",
            "breed": "بلدي هجين فريزيان",
            "health_status": "سليم بيطرياً تماماً وحاصل على تطعيم السل والحمى القلاعية",
            "pricing_type": "per_kilo_live",
            "feed_used": "أعلاف خضراء طبيعية 100% بدون مكمّلات صناعية",
            "village_location": "قرية القيس - بني مزار",
            "vet_certified_by": "د. أحمد عبد الرحمن (مركز بني مزار البيطري)"
          }
        }
      ],
      "districts": [
        {
          "id": "abu_gerg",
          "name_ar": "مجلس قروي أبوجرج",
          "delivery_fee_egp": 30.0,
          "estimated_time": "35-45 دقيقة"
        }
      ]
    }
  }
}`;
