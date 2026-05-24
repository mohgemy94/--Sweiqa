/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BRANDS_AND_SLIDES, CATEGORIES, PRODUCTS } from '../data';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Search, MapPin, Sparkles, Filter, ShieldCheck, ChevronRight, ChevronLeft, Award } from 'lucide-react';

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent | null) => void;
  cartProductIds: string[];
  onChangeTab: (tabId: string) => void;
  onSelectCategoryFilter: (catId: string, subId?: string) => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  favoriteProductIds?: string[];
  onToggleFavorite?: (product: Product, event?: React.MouseEvent) => void;
}

// Helper to get custom premium visual colors for each category section
const getCategoryBadgeStyle = (id: string) => {
  switch (id) {
    case 'halal_market':
      return {
        gradient: 'bg-gradient-to-tr from-amber-500 to-red-650 text-white shadow-xs shadow-amber-100',
        bgLight: 'bg-amber-50/40 border-amber-100 hover:border-amber-300 hover:bg-amber-50',
        text: 'text-amber-900 group-hover:text-amber-700'
      };
    case 'supermarket':
      return {
        gradient: 'bg-gradient-to-tr from-emerald-500 to-teal-700 text-white shadow-xs shadow-emerald-100',
        bgLight: 'bg-emerald-50/40 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50',
        text: 'text-emerald-900 group-hover:text-emerald-700'
      };
    case 'electronics':
      return {
        gradient: 'bg-gradient-to-tr from-blue-500 to-indigo-700 text-white shadow-xs shadow-blue-100',
        bgLight: 'bg-blue-50/40 border-blue-100 hover:border-blue-300 hover:bg-blue-50',
        text: 'text-blue-900 group-hover:text-blue-700'
      };
    case 'fashion':
      return {
        gradient: 'bg-gradient-to-tr from-rose-400 to-pink-650 text-white shadow-xs shadow-pink-100',
        bgLight: 'bg-rose-50/40 border-rose-100 hover:border-rose-300 hover:bg-rose-50',
        text: 'text-rose-900 group-hover:text-rose-700'
      };
    case 'skincare_health':
      return {
        gradient: 'bg-gradient-to-tr from-pink-400 to-rose-500 text-white shadow-xs shadow-rose-100',
        bgLight: 'bg-pink-50/40 border-pink-100 hover:border-pink-300 hover:bg-pink-50',
        text: 'text-pink-900 group-hover:text-pink-700'
      };
    case 'spices_herbs':
      return {
        gradient: 'bg-gradient-to-tr from-teal-500 to-green-650 text-white shadow-xs shadow-green-100',
        bgLight: 'bg-teal-50/40 border-teal-100 hover:border-teal-300 hover:bg-teal-50',
        text: 'text-teal-900 group-hover:text-teal-700'
      };
    case 'mobiles_electronics':
      return {
        gradient: 'bg-gradient-to-tr from-violet-500 to-indigo-700 text-white shadow-xs shadow-indigo-100',
        bgLight: 'bg-indigo-50/40 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50',
        text: 'text-indigo-900 group-hover:text-indigo-700'
      };
    case 'household_cleaning':
      return {
        gradient: 'bg-gradient-to-tr from-cyan-550 to-blue-650 text-white shadow-xs shadow-cyan-100',
        bgLight: 'bg-cyan-50/40 border-cyan-100 hover:border-cyan-300 hover:bg-cyan-50',
        text: 'text-cyan-900 group-hover:text-cyan-700'
      };
    case 'library_tools':
      return {
        gradient: 'bg-gradient-to-tr from-amber-400 to-yellow-600 text-white shadow-xs shadow-yellow-100',
        bgLight: 'bg-yellow-50/40 border-yellow-100 hover:border-yellow-300 hover:bg-yellow-50',
        text: 'text-amber-900 group-hover:text-amber-700'
      };
    case 'books_novels':
      return {
        gradient: 'bg-gradient-to-tr from-gray-500 to-slate-700 text-white shadow-xs shadow-slate-100',
        bgLight: 'bg-slate-50/40 border-slate-100 hover:border-slate-300 hover:bg-slate-50',
        text: 'text-slate-900 group-hover:text-slate-700 font-sans'
      };
    case 'furniture':
      return {
        gradient: 'bg-gradient-to-tr from-yellow-700 to-amber-900 text-white shadow-xs shadow-amber-150',
        bgLight: 'bg-amber-50/30 border-amber-100/80 hover:border-amber-305 hover:bg-amber-50/70',
        text: 'text-amber-950 group-hover:text-amber-800'
      };
    default:
      return {
        gradient: 'bg-gradient-to-tr from-teal-600 to-teal-850 text-white shadow-xs shadow-teal-100',
        bgLight: 'bg-teal-50/40 border-teal-100 hover:border-teal-300 hover:bg-teal-50',
        text: 'text-teal-900 group-hover:text-teal-700'
      };
  }
};

export default function HomeScreen({ 
  onSelectProduct, 
  onAddToCart, 
  cartProductIds, 
  onChangeTab,
  onSelectCategoryFilter,
  searchQuery = '',
  onSearchChange = () => {},
  favoriteProductIds = [],
  onToggleFavorite
}: HomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMainCat, setSelectedMainCat] = useState<string>('all');

  // Auto slide Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BRANDS_AND_SLIDES.slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BRANDS_AND_SLIDES.slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BRANDS_AND_SLIDES.slides.length) % BRANDS_AND_SLIDES.slides.length);
  };

  // Filter products based on search query and category tab
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.livestockInfo?.breed && product.livestockInfo.breed.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (product.livestockInfo?.origin && product.livestockInfo.origin.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedMainCat === 'all') {
      return matchesSearch;
    } else if (selectedMainCat === 'halal_special') {
      return product.categoryId === 'halal_market' && matchesSearch;
    } else {
      return product.categoryId === selectedMainCat && matchesSearch;
    }
  });

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      
      {/* Top Welcome & Search Header */}
      <div className="bg-gradient-to-l from-teal-800 to-teal-950 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
        {/* Decorative background vectors */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-teal-700/20 rounded-full blur-2xl"></div>
        <div className="absolute left-10 bottom-0 w-24 h-24 bg-teal-600/10 rounded-full blur-xl"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 relative">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-teal-200">
              <MapPin className="w-3.5 h-3.5" />
              <span>حي وسط - طريق الكورنيش، بني مزار</span>
            </div>
            <h2 className="text-xl font-black mt-1 font-sans tracking-wide">
              سوق الصعيد التجاري 🌾
            </h2>
            <p className="text-teal-100/80 text-[10px] sm:text-xs">
              الأسعار الأوفر والمنتجات الحية الضامنة والتسليم الدقيق لجميع قرى المنيا.
            </p>
          </div>

          {selectedMainCat === 'halal_market' ? (
            <div className="bg-teal-900/50 border border-teal-700/60 px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 self-start md:self-auto text-xs font-sans">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>نظام رقابة صحي وبيطري معتمد 🩺</span>
            </div>
          ) : (
            <div className="bg-teal-900/50 border border-teal-700/60 px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 self-start md:self-auto text-xs font-sans">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>منتجات صعيدية مضمونة 100% 🏅</span>
            </div>
          )}
        </div>

        {/* Global Instant Search Input */}
        <div className="mt-4 relative z-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث عن: عجل بقري، دجاج ريفي، زيت خليط، جلابيات صعيدي..."
            className="w-full bg-white text-gray-900 placeholder:text-gray-400 text-xs py-3.5 max-h-12 pr-11 pl-4 rounded-xl border-none outline-none ring-2 ring-transparent focus:ring-yellow-400 transition-all font-sans shadow-md"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Slide Carousel - Noon Style Banners */}
      <div className="relative rounded-2xl overflow-hidden shadow-md h-44 sm:h-52 bg-teal-950">
        <div className="absolute inset-0 transition-all duration-75">
          {BRANDS_AND_SLIDES.slides.map((slide, index) => {
            if (index !== currentSlide) return null;
            return (
              <div 
                key={slide.id} 
                className={`w-full h-full bg-gradient-to-br ${slide.bgGradient} flex items-center justify-between p-6 sm:p-10 relative text-white`}
              >
                {/* Background image fade */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                  <img src={slide.image} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="z-10 max-w-[65%] text-right space-y-2">
                  <span className="bg-yellow-400 text-teal-950 text-[10px] font-black px-2.5 py-0.5 rounded-full font-sans uppercase">
                    {slide.tag}
                  </span>
                  <h3 className="text-sm sm:text-lg font-extrabold tracking-tight font-sans leading-tight">
                    {slide.title}
                  </h3>
                  <p className="text-white/80 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="z-10 w-24 sm:w-36 h-28 sm:h-36 overflow-hidden rounded-xl border border-white/10 shadow-lg">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel buttons */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-xs hover:bg-white/50 text-white rounded-full p-2 z-25 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-xs hover:bg-white/50 text-white rounded-full p-2 z-25 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-25">
          {BRANDS_AND_SLIDES.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-yellow-400 w-4' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Category Icons Strip */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-xs font-black text-gray-900 font-sans flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            الأقسام التجارية الأكثر طلباً
          </h3>
          <button 
            onClick={() => onChangeTab('categories')}
            className="text-[10px] text-teal-700 font-bold font-sans hover:underline flex items-center gap-0.5"
          >
            تصفح كل التبويبات والمخططات ⟵
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSpecial = cat.isSpecial;
            const style = getCategoryBadgeStyle(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategoryFilter(cat.id);
                  onChangeTab('categories');
                }}
                className={`cursor-pointer group flex flex-col items-center p-3 rounded-xl border transition-all duration-300 ${
                  isSpecial
                    ? 'bg-gradient-to-b from-teal-50/40 via-white to-teal-50/10 border-teal-200/80 shadow-xs hover:border-teal-400 hover:shadow-xs'
                    : 'bg-white border-slate-100/90 shadow-2xs hover:border-teal-200 hover:shadow-xs'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-1.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs ${style.gradient}`}>
                  <span className="text-lg">
                    {cat.id === 'halal_market' && '🐄'}
                    {cat.id === 'supermarket' && '🛒'}
                    {cat.id === 'electronics' && '📺'}
                    {cat.id === 'fashion' && '🧥'}
                    {cat.id === 'skincare_health' && '🧴'}
                    {cat.id === 'spices_herbs' && '🌿'}
                    {cat.id === 'mobiles_electronics' && '📱'}
                    {cat.id === 'household_cleaning' && '🧼'}
                    {cat.id === 'library_tools' && '✏️'}
                    {cat.id === 'books_novels' && '📚'}
                    {cat.id === 'furniture' && '🛋️'}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold text-slate-800 text-center font-sans tracking-tight line-clamp-1 group-hover:text-teal-800 transition-colors">
                  {cat.name}
                </span>
                {isSpecial && (
                  <span className="text-[8px] font-black text-rose-600 bg-rose-50 px-1 border border-rose-100 rounded-sm mt-1 scale-90">مميز</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Animals Vet Standards Alert Column */}
      {selectedMainCat === 'halal_market' && (
        <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 text-teal-850 p-2.5 rounded-lg flex-shrink-0">
              👨‍⚕️
            </div>
            <div>
              <h4 className="font-bold text-teal-950 font-sans">معايير الذبح والتربية لـ سوق الحلال ⚖️</h4>
              <p className="text-gray-500 text-[10px] leading-relaxed">
                جميع العجول والنعاج والماعز والطيور تخضع للكشف البيطري وتلقى رعاية صحية في حظائر صندفا وأبوجرج بإشراف مديرية الطب البيطري ببني مزار.
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              onSelectCategoryFilter('halal_market');
              setSelectedMainCat('halal_market');
            }}
            className="text-[10px] whitespace-nowrap bg-teal-800 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-teal-900"
          >
            اذهب لسوق الحلال ⟵
          </button>
        </div>
      )}

      {/* Main E-commerce Filter Container with hot products */}
      <div>
        {/* Filter Headers Tabs */}
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-teal-800" />
            <span className="text-[11px] font-extrabold text-teal-900 ml-2">الفلتر السريع:</span>

            <button
              onClick={() => setSelectedMainCat('all')}
              className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                selectedMainCat === 'all'
                  ? 'border-teal-700 text-teal-850 bg-teal-50'
                  : 'border-slate-100 text-gray-600 hover:border-teal-200'
              }`}
            >
              الكل ({PRODUCTS.length})
            </button>

            <button
              onClick={() => setSelectedMainCat('halal_market')}
              className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                selectedMainCat === 'halal_market'
                  ? 'border-teal-700 text-teal-850 bg-teal-50'
                  : 'border-slate-100 text-gray-600 hover:border-teal-200'
              }`}
            >
              🐐 سوق الحلال والطيور
            </button>

            <button
              onClick={() => setSelectedMainCat('supermarket')}
              className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                selectedMainCat === 'supermarket'
                  ? 'border-teal-700 text-teal-850 bg-teal-50'
                  : 'border-slate-100 text-gray-600 hover:border-teal-200'
              }`}
            >
              🥫 البقالة
            </button>

            <button
              onClick={() => setSelectedMainCat('electronics')}
              className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                selectedMainCat === 'electronics'
                  ? 'border-teal-700 text-teal-850 bg-teal-50'
                  : 'border-slate-100 text-gray-600 hover:border-teal-200'
              }`}
            >
              📺 الأجهزة والكهربائيات
            </button>

            <button
               onClick={() => setSelectedMainCat('fashion')}
               className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                 selectedMainCat === 'fashion'
                   ? 'border-teal-700 text-teal-850 bg-teal-50'
                   : 'border-slate-100 text-gray-600 hover:border-teal-200'
               }`}
             >
               👔 جلابيات وملابس
             </button>

             <button
               onClick={() => setSelectedMainCat('skincare_health')}
               className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                 selectedMainCat === 'skincare_health'
                   ? 'border-teal-700 text-teal-850 bg-teal-50'
                   : 'border-slate-100 text-gray-600 hover:border-teal-200'
               }`}
             >
               🧴 العناية والصحة
             </button>

             <button
               onClick={() => setSelectedMainCat('spices_herbs')}
               className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                 selectedMainCat === 'spices_herbs'
                   ? 'border-teal-700 text-teal-850 bg-teal-50'
                   : 'border-slate-100 text-gray-600 hover:border-teal-200'
               }`}
             >
               🌿 العطارة والتوابل
             </button>

             <button
               onClick={() => setSelectedMainCat('mobiles_electronics')}
               className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                 selectedMainCat === 'mobiles_electronics'
                   ? 'border-teal-700 text-teal-850 bg-teal-50'
                   : 'border-slate-100 text-gray-600 hover:border-teal-200'
               }`}
             >
               📱 الإلكترونيات والموبايلات
             </button>

             <button
               onClick={() => setSelectedMainCat('household_cleaning')}
               className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                 selectedMainCat === 'household_cleaning'
                   ? 'border-teal-700 text-teal-850 bg-teal-50'
                   : 'border-slate-100 text-gray-600 hover:border-teal-200'
               }`}
             >
               🧼 منظفات منزلية
              </button>

              <button
                onClick={() => setSelectedMainCat('library_tools')}
                className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                  selectedMainCat === 'library_tools'
                    ? 'border-teal-700 text-teal-850 bg-teal-50'
                    : 'border-slate-100 text-gray-600 hover:border-teal-200'
                }`}
              >
                ✏️ أدوات المكتبة والقرطاسية
              </button>

              <button
                onClick={() => setSelectedMainCat('books_novels')}
                className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                  selectedMainCat === 'books_novels'
                    ? 'border-teal-700 text-teal-850 bg-teal-50'
                    : 'border-slate-100 text-gray-600 hover:border-teal-200'
                }`}
              >
                📚 الكتب والروايات
             </button>

              <button
                onClick={() => setSelectedMainCat('furniture')}
                className={`px-3 py-1 bg-white text-xs font-bold rounded-lg border transition-all ${
                  selectedMainCat === 'furniture'
                    ? 'border-teal-700 text-teal-850 bg-teal-50'
                    : 'border-slate-100 text-gray-600 hover:border-teal-200'
                }`}
              >
                🛋️ الأثاث والمنزل
              </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-gray-400">
            <span>🔍</span>
            <p className="font-bold text-xs mt-2 text-slate-700">عذراً، لم نجد أي تطابق لعملية بحثك في بني مزار الآن!</p>
            <button 
              onClick={() => { onSearchChange(''); setSelectedMainCat('all'); }} 
              className="text-xs text-teal-700 hover:underline mt-1 font-bold"
            >
              مسح جميع الفلاتر لإظهار الكل
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={(p, e) => {
                  if (e) e.stopPropagation();
                  onAddToCart(p, null);
                }}
                isInCart={cartProductIds.includes(product.id)}
                isFavorite={favoriteProductIds.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
