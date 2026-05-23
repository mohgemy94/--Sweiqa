import React, { useState } from 'react';
import { 
  X, 
  ChevronDown, 
  ChevronLeft, 
  Shirt, 
  Tv, 
  Utensils, 
  ShoppingCart, 
  Beef, 
  Grid, 
  Layers,
  Sparkles,
  Heart,
  Sprout,
  Smartphone,
  Headphones
} from 'lucide-react';

interface SubSubCategory {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
  subSubCategories?: SubSubCategory[];
}

interface DrawerCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
  color: string;
  targetCatId?: string; // mapping to real products mapping id
}

interface CategoriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string, subCategoryName?: string, subSubCategoryName?: string, targetCatId?: string) => void;
}

const DRAWER_CATEGORIES: DrawerCategory[] = [
  {
    id: 'fashion',
    name: 'الملابس',
    icon: 'Shirt',
    color: 'from-amber-500 to-rose-500',
    targetCatId: 'fashion',
    subcategories: [
      {
        id: 'women',
        name: 'ملابس حريمي',
        subSubCategories: [
          { id: 'w_abayas', name: 'عبايات استقبال صعيدية' },
          { id: 'w_home', name: 'ملابس بيتي قطنية' },
          { id: 'w_out', name: 'ملابس خروج كاجوال حريمي' },
          { id: 'w_underwear', name: 'ملابس داخلية' }
        ]
      },
      {
        id: 'men',
        name: 'ملابس رجالي',
        subSubCategories: [
          { id: 'm_galabiya', name: 'جلابيات صعيدية ريفية' },
          { id: 'm_casual', name: 'قمصان وتيشرتات رجالي' },
          { id: 'm_pants', name: 'بناطيل وترينجات ملائمة للعمل' }
        ]
      },
      {
        id: 'kids',
        name: 'ملابس أطفال',
        subSubCategories: [
          { id: 'k_newborn', name: 'ملابس أطفال حديثي الولادة' },
          { id: 'k_home', name: 'بيجامات أطفال مريحة' },
          { id: 'k_out', name: 'أطقم خروج أولاد وبنات' },
          { id: 'k_school', name: 'زي مدرسي موحد لبني مزار' }
        ]
      },
      {
        id: 'shoes',
        name: 'الأحذية',
        subSubCategories: [
          { id: 'sh_men', name: 'أحذية رجالية كاجوال ورياضية' },
          { id: 'sh_women', name: 'أحذية حريمي وصنادل خروج' },
          { id: 'sh_kids', name: 'أحذية أطفال للمدارس والنوادي' }
        ]
      },
      {
        id: 'wedding_dresses',
        name: 'فساتين العرائس',
        subSubCategories: [
          { id: 'wd_white', name: 'فساتين زفاف بيضاء فاخرة' },
          { id: 'wd_soiree', name: 'فساتين سواريه وسهرة' },
          { id: 'wd_accessories', name: 'طرح وتيجان وإكسسوارات الزفاف' }
        ]
      },
      {
        id: 'accessories_supplies',
        name: 'اكسسوارات ومستلزمات الملابس',
        subSubCategories: [
          { id: 'acc_bags', name: 'حقائب وشنط خروج متميزة' },
          { id: 'acc_socks', name: 'جوارب وأحزمة جلدية راقية' },
          { id: 'acc_caps', name: 'كابات وقبعات للحماية من الشمس' }
        ]
      }
    ]
  },
  {
    id: 'appliances',
    name: 'الأجهزة الكهربائية',
    icon: 'Tv',
    color: 'from-blue-500 to-indigo-600',
    targetCatId: 'electronics',
    subcategories: [
      { id: 'screens', name: 'شاشات ورسيفرات تلفزيونية' },
      { id: 'fridges', name: 'ثلاجات وديب فريزر' },
      { id: 'washers', name: 'غسالات ملابس وأطباق' },
      { id: 'kitchen_appliances', name: 'خلاطات ومحاضرات طعام' },
      { id: 'fans', name: 'مراوح وتكييفات لمكافحة الحر' }
    ]
  },
  {
    id: 'utensils',
    name: 'أدوات المطبخ',
    icon: 'Utensils',
    color: 'from-emerald-500 to-teal-600',
    subcategories: [
      { id: 'clay_pots', name: 'طواجن فخار وحلل صندفا ريفية' },
      { id: 'cutlery', name: 'أطقم معالق وسكاكين مائدة' },
      { id: 'blenders', name: 'خلاطات وأدوات عصر يدوية' },
      { id: 'cups', name: 'أكواب زجاجية وكاسات تقديم' },
      { id: 'baking_pans', name: 'صواني فرن وقوالب حلوى' }
    ]
  },
  {
    id: 'supermarket',
    name: 'السوبر ماركت',
    icon: 'ShoppingCart',
    color: 'from-teal-600 to-emerald-700',
    targetCatId: 'supermarket',
    subcategories: [
      { id: 'oils', name: 'زيوت طعام وسمن بلدي طبيعي' },
      { id: 'rice_pasta', name: 'أرز ريفي ومكرونة ومأكولات أساسية' },
      { id: 'canned', name: 'معلبات وتونة وحلاوة طحينية' },
      { id: 'bakery', name: 'مخبوزات وبسكويت مدارس وبقسماط' },
      { id: 'dairy_cheese', name: 'ألبان طازجة وأجبان قريش صعيدية' }
    ]
  },
  {
    id: 'livestock',
    name: 'العجول والأغنام ومنتجاتها',
    icon: 'Beef',
    color: 'from-red-500 to-rose-700',
    targetCatId: 'halal_market',
    subcategories: [
      { id: 'calves_breed', name: 'عجول بقري وجاموسي للتربية' },
      { id: 'calves_slaughter', name: 'عجول ذبح وتسمين (أضاحي وعقيقة)' },
      { id: 'sheep_baladi', name: 'خرفان بلدي ونعاج صعيدية' },
      { id: 'goats_shami', name: 'ماعز وجديان بلدي نشط' },
      { id: 'fresh_meat', name: 'لحوم بلدية طازجة مذبوحة اليوم بالمنيا' },
      { id: 'live_birds', name: 'طيور ريفية حية (بط بلدي، فراخ، أرانب)' },
      { id: 'eggs_baladi', name: 'بيض بلدي طازج وبيض ملقح للتفريخ' }
    ]
  },
  {
    id: 'skincare_health',
    name: 'مستلزمات العناية بالبشرة والصحة',
    icon: 'Heart',
    color: 'from-pink-500 to-rose-600',
    targetCatId: 'skincare_health',
    subcategories: [
      {
        id: 'skincare',
        name: 'العناية بالبشرة والوجه',
        subSubCategories: [
          { id: 'moisturizers', name: 'كريمات مرطبة ومغذية للبشرة' },
          { id: 'sunscreen', name: 'واقي شمس لحماية البشرة من حر الصعيد' },
          { id: 'cleansers', name: 'غسول مطهر ومنظف عميق للمسام' }
        ]
      },
      {
        id: 'hair_body',
        name: 'العناية بالشعر والجسم',
        subSubCategories: [
          { id: 'hair_oils', name: 'زيوت شعر طبيعية وحمام كريم ملطف' },
          { id: 'soaps', name: 'صابون طبي وصابون غار للشعر والجسم' },
          { id: 'shampoo', name: 'شامبوهات وبلسم معالج للتساقط والجفاف' }
        ]
      },
      {
        id: 'health_first_aid',
        name: 'الصحة والإسعافات الأولية',
        subSubCategories: [
          { id: 'checkers', name: 'أجهزة قياس السكر والضغط والحرارة للبيوت' },
          { id: 'antiseptics', name: 'مطهرات جروح وشاش وقطن طبي معقم' },
          { id: 'vitamins', name: 'مكملات غذائية وفيتامينات مقوية للمناعة' }
        ]
      },
      {
        id: 'baby_care',
        name: 'العناية بالطفل وحديثي الولادة',
        subSubCategories: [
          { id: 'baby_diapers', name: 'حفاضات أطفال شديدة الامتصاص وناعمة' },
          { id: 'baby_creams', name: 'زيوت ترطيب وبودرة تالك لطيفة لبشرة الرضيع' }
        ]
      }
    ]
  },
  {
    id: 'spices_herbs',
    name: 'العطارة والتوابل',
    icon: 'Sprout',
    color: 'from-amber-600 to-amber-900',
    targetCatId: 'spices_herbs',
    subcategories: [
      {
        id: 'basic_spices',
        name: 'بهارات وتوابل أساسية',
        subSubCategories: [
          { id: 'black_pepper', name: 'فلفل أسود حصى ومطحون ممتاز' },
          { id: 'cumin', name: 'كمون صعيدي مطحون نقي' },
          { id: 'coriander', name: 'كزبرة جافة بلدية من مزارع ملوي' },
          { id: 'meat_spices', name: 'بهارات لحمة طازجة مشكلة' }
        ]
      },
      {
        id: 'herbal_drinks',
        name: 'أعشاب طبيعية ومشروبات',
        subSubCategories: [
          { id: 'hibiscus', name: 'كركديه أسواني لوز درجة أولى' },
          { id: 'anise', name: 'ينسون بلدي مهدئ للأعصاب' },
          { id: 'chamomile', name: 'بابونج وزهور بابونج نقية' },
          { id: 'mint', name: 'نعناع بري مجفف طبيعي' }
        ]
      },
      {
        id: 'natural_oils',
        name: 'زيوت ووصفات طبيعية',
        subSubCategories: [
          { id: 'nigella_oil', name: 'زيت حبة البركة معصور على البارد' },
          { id: 'sesame_oil', name: 'زيت سمسم طبيعي للتنعيم' },
          { id: 'olive_oil', name: 'زيت زيتون بكر ممتاز نقي' }
        ]
      },
      {
        id: 'baking_needs',
        name: 'مستلزمات المخبوزات والحلويات',
        subSubCategories: [
          { id: 'yeast', name: 'خميرة بيرة طبيعية مجففة' },
          { id: 'baking_powder', name: 'بكينج بودر وفانيللا أكياس توفير' }
        ]
      }
    ]
  },
  {
    id: 'mobiles_electronics',
    name: 'الإلكترونيات والموبايلات',
    icon: 'Smartphone',
    color: 'from-slate-700 to-indigo-800',
    targetCatId: 'mobiles_electronics',
    subcategories: [
      {
        id: 'smartphones',
        name: 'هواتف ذكية',
        subSubCategories: [
          { id: 'xiaomi', name: 'هواتف شاومي الاقتصادية' },
          { id: 'samsung_a', name: 'عروض سامسونج فئة A العملية' },
          { id: 'screens_sub', name: 'شاشات بديلة لهواتف ذكية' }
        ]
      },
      {
        id: 'accessories',
        name: 'إكسسوارات الهواتف',
        subSubCategories: [
          { id: 'cases', name: 'جرابات جلدية لحماية ظهر الموبايل' },
          { id: 'screens_protectors', name: 'شاشات حماية من الزجاج المقوى (سكرينة)' }
        ]
      },
      {
        id: 'chargers',
        name: 'شواحن وكابلات',
        subSubCategories: [
          { id: 'power_heads', name: 'رؤوس شواحن سريعة Type-C' },
          { id: 'charging_cables', name: 'كابلات شحن معدنية ضد القطع' },
          { id: 'power_banks', name: 'باور بانك سعة ٢٠,٠٠٠ مللي أمبير' }
        ]
      },
      {
        id: 'headphones',
        name: 'سماعات وملحقات صوتية',
        subSubCategories: [
          { id: 'wired_earphones', name: 'سماعات سلكية بصوت نقي متين' },
          { id: 'bluetooth_buds', name: 'سماعات بلوتوث رياضية وعملية' }
        ]
      }
    ]
  },
  {
    id: 'household_cleaning',
    name: 'منظفات منزلية',
    icon: 'Sparkles',
    color: 'from-blue-500 to-sky-600',
    targetCatId: 'household_cleaning',
    subcategories: [
      {
        id: 'laundry',
        name: 'منظفات الغسيل والملابس',
        subSubCategories: [
          { id: 'powder_detergents', name: 'مساحيق غسيل أوتوماتيك وعادي' },
          { id: 'gel_detergents', name: 'جل غسيل مركز للغسالات' },
          { id: 'fabric_softeners', name: 'منعم ومعطر ملابس داوني وفرش' }
        ]
      },
      {
        id: 'dishes_kitchen',
        name: 'منظفات الأطباق والمطبخ',
        subSubCategories: [
          { id: 'dishwash_liquids', name: 'سائل غسيل أطباق وفيري وبريل' },
          { id: 'degreasers', name: 'مذيب دهون المطبخ والبوتاجازات' }
        ]
      },
      {
        id: 'home_sanitizers',
        name: 'مطهرات ومعقمات الأرضيات',
        subSubCategories: [
          { id: 'floor_cleaners', name: 'منظف ومطهر أرضيات ديتول وجنرال' },
          { id: 'clorox', name: 'كلور أبيض وكلور ألوان للملابس والمنزل' }
        ]
      },
      {
        id: 'fresheners',
        name: 'معطرات جو ومبيدات حشرية',
        subSubCategories: [
          { id: 'air_fresheners', name: 'بخاخات معطر جو فريدة ورائعة' },
          { id: 'insecticides', name: 'مبيدات حشرية وريد وبيروكسول' }
        ]
      }
    ]
  }
];

export default function CategoriesDrawer({ isOpen, onClose, onSelectCategory }: CategoriesDrawerProps) {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [expandedSubCat, setExpandedSubCat] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCat = (catId: string) => {
    if (expandedCat === catId) {
      setExpandedCat(null);
    } else {
      setExpandedCat(catId);
    }
    setExpandedSubCat(null);
  };

  const toggleSubCat = (subCatId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (expandedSubCat === subCatId) {
      setExpandedSubCat(null);
    } else {
      setExpandedSubCat(subCatId);
    }
  };

  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Shirt': return <Shirt className={className} />;
      case 'Tv': return <Tv className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'ShoppingCart': return <ShoppingCart className={className} />;
      case 'Beef': return <Beef className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Sprout': return <Sprout className={className} />;
      case 'Smartphone': return <Smartphone className={className} />;
      case 'Headphones': return <Headphones className={className} />;
      default: return <Grid className={className} />;
    }
  };

  return (
    <div className="absolute inset-0 z-50 overflow-hidden flex" dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer content layout */}
      <div className="absolute right-0 top-0 bottom-0 w-[85%] bg-white shadow-2xl flex flex-col z-10 transition-transform duration-300 animate-slide-in-right h-full">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 bg-teal-800 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-white/10 rounded-lg">
              <Layers className="w-4 h-4 text-emerald-300 animate-pulse" />
            </span>
            <div>
              <h3 className="text-sm font-black font-sans">تصفح أقسام الصعيد 🎋</h3>
              <p className="text-[10px] text-teal-100 font-sans">توزيع معتمد لجميع قرى ومراكز المنيا</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Dynamic Category List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {DRAWER_CATEGORIES.map((cat) => {
            const isCatExpanded = expandedCat === cat.id;

            return (
              <div 
                key={cat.id} 
                className="border border-slate-100 rounded-2xl overflow-hidden transition-all bg-slate-50/30"
              >
                {/* Main Category Row */}
                <button
                  onClick={() => toggleCat(cat.id)}
                  className={`w-full text-right p-3.5 flex items-center justify-between font-sans transition-all duration-200 ${
                    isCatExpanded 
                      ? 'bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-900 border-b border-teal-100/50' 
                      : 'bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs bg-gradient-to-br ${cat.color} text-white`}>
                      {renderIcon(cat.icon, 'w-4 h-4')}
                    </div>
                    <span className="text-xs font-black">{cat.name}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isCatExpanded ? 'rotate-180 text-teal-700' : ''}`} />
                </button>

                {/* Subcategories (Expanded Content) */}
                {isCatExpanded && (
                  <div className="bg-white/80 p-2 space-y-1.5 border-t border-slate-50">
                    {cat.subcategories.map((sub) => {
                      const hasSubSub = sub.subSubCategories !== undefined && sub.subSubCategories.length > 0;
                      const isSubExpanded = expandedSubCat === sub.id;

                      return (
                        <div key={sub.id} className="border border-slate-50/50 rounded-xl overflow-hidden">
                          {/* Sub Category Title Button */}
                          <div
                            onClick={() => {
                              if (!hasSubSub) {
                                onSelectCategory(cat.name, sub.name, undefined, cat.targetCatId);
                                onClose();
                              }
                            }}
                            className={`w-full text-right p-2.5 rounded-lg text-xs font-bold font-sans flex items-center justify-between select-none cursor-pointer hover:bg-teal-50/20 transition-all ${
                              hasSubSub ? 'text-slate-800' : 'text-teal-900 bg-teal-50/10 hover:bg-teal-50/30'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                              <span>{sub.name}</span>
                            </div>
                            
                            {hasSubSub ? (
                              <button
                                onClick={(e) => toggleSubCat(sub.id, e)}
                                className="p-1 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-0.5 text-[10px] text-teal-700"
                              >
                                <span className="font-medium text-[9px]">{isSubExpanded ? 'إخفاء' : 'عرض التفاصيل'}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSubExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            ) : (
                              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </div>

                          {/* Sub-Sub Categories */}
                          {hasSubSub && isSubExpanded && (
                            <div className="bg-slate-50 p-2.5 space-y-1 border-t border-slate-100/60 rounded-b-xl">
                              {sub.subSubCategories?.map((subSub) => (
                                <button
                                  key={subSub.id}
                                  onClick={() => {
                                    onSelectCategory(cat.name, sub.name, subSub.name, cat.targetCatId);
                                    onClose();
                                  }}
                                  className="w-full text-right py-2 px-3 hover:bg-teal-50/30 hover:text-teal-850 text-[10px] font-medium text-slate-600 font-sans flex items-center gap-2 rounded-lg transition-all"
                                >
                                  <span className="text-teal-500">•</span>
                                  <span>{subSub.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Quick View Category Link */}
                    <button
                      onClick={() => {
                        onSelectCategory(cat.name, undefined, undefined, cat.targetCatId);
                        onClose();
                      }}
                      className="w-full text-center py-2 text-[10px] font-bold text-teal-700 hover:text-teal-900 border-t border-dashed border-slate-100 mt-2 font-sans"
                    >
                      عرض قسم {cat.name} بالكامل ⟵
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-wrap">
          <div className="flex items-start gap-1.5 text-amber-800 bg-amber-50 rounded-xl p-2.5 border border-amber-100 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 mt-0.5 text-amber-600 flex-shrink-0" />
            <p className="text-[9px] font-sans leading-relaxed">
              تسليم فوري ومباشر إلى 9 مجالس قروية في مركز بني مزار بمركبات الصعيد السريعة في أية ساعة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
