/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS } from '../data';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ArrowLeft, Layers, HeartCrack, ChevronRight } from 'lucide-react';

// Helper function to detect product color in Arabic
function getProductColor(product: Product): string {
  const text = (product.name + ' ' + product.description).toLowerCase();
  if (text.includes('أبيض') || text.includes('بيضاء') || text.includes('white')) return 'أبيض';
  if (text.includes('أحمر') || text.includes('حمراء') || text.includes('red')) return 'أحمر';
  if (text.includes('أسود') || text.includes('سوداء') || text.includes('black')) return 'أسود';
  if (text.includes('أزرق') || text.includes('زرقاء') || text.includes('blue')) return 'أزرق';
  if (text.includes('بني') || text.includes('بنية') || text.includes('brown')) return 'بني';
  if (text.includes('أخضر') || text.includes('خضراء') || text.includes('green')) return 'أخضر';
  if (text.includes('أصفر') || text.includes('صفراء') || text.includes('yellow')) return 'أصفر';
  if (text.includes('وردي') || text.includes('وردية') || text.includes('pink')) return 'وردي';
  if (text.includes('فضي') || text.includes('فضية') || text.includes('silver')) return 'فضي';
  if (text.includes('ذهبي') || text.includes('ذهبية') || text.includes('gold')) return 'ذهبي';
  if (text.includes('رمادي') || text.includes('رمادية') || text.includes('grey') || text.includes('gray')) return 'رمادي';
  return 'ألوان متعددة';
}

interface CategoriesScreenProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent | null) => void;
  cartProductIds: string[];
  initialCategory?: string;
  initialSubCategory?: string;
  searchQuery?: string;
  favoriteProductIds?: string[];
  onToggleFavorite?: (product: Product, event?: React.MouseEvent) => void;
  compareProductIds?: string[];
  onToggleCompare?: (product: Product, event?: React.MouseEvent) => void;
  onViewDetail?: (product: Product) => void;
}

export default function CategoriesScreen({
  onSelectProduct,
  onAddToCart,
  cartProductIds,
  initialCategory = 'halal_market',
  initialSubCategory = '',
  searchQuery = '',
  favoriteProductIds = [],
  onToggleFavorite,
  compareProductIds = [],
  onToggleCompare,
  onViewDetail
}: CategoriesScreenProps) {
  const [selectedMainCat, setSelectedMainCat] = useState<string>(initialCategory);
  const [selectedSubCat, setSelectedSubCat] = useState<string>(initialSubCategory);
  const [sortBy, setSortBy] = useState<string>('default');

  // Find products belonging to the selected category and subcategory (before applying the price slider filter)
  const unfilteredCategoryProducts = PRODUCTS.filter(p => {
    const isCatMatch = p.categoryId === selectedMainCat;
    if (!isCatMatch) return false;
    if (selectedSubCat && p.subcategoryId !== selectedSubCat) return false;
    return true;
  });

  // Calculate min and max price inside the selected category & subcategory
  const maxAvailablePrice = unfilteredCategoryProducts.length > 0
    ? Math.max(...unfilteredCategoryProducts.map(p => p.price))
    : 150000;

  const minAvailablePrice = unfilteredCategoryProducts.length > 0
    ? Math.min(...unfilteredCategoryProducts.map(p => p.price))
    : 0;

  const [priceLimit, setPriceLimit] = useState<number>(200000);

  // Reset/sync the price limit to max whenever the selected category or subcategory changes
  useEffect(() => {
    setPriceLimit(maxAvailablePrice);
    setSortBy('default'); // reset sorting selection when category changes
  }, [selectedMainCat, selectedSubCat, maxAvailablePrice]);

  // Get active category object
  const activeCategory = CATEGORIES.find(c => c.id === selectedMainCat) || CATEGORIES[0];

  // Get products matching active category, subcategory and price range
  const filteredProducts = PRODUCTS.filter(p => {
    const isCatMatch = p.categoryId === selectedMainCat;
    if (!isCatMatch) return false;
    
    // Subcategory check
    if (selectedSubCat && p.subcategoryId !== selectedSubCat) {
      return false;
    }

    // Price query check
    if (p.price > priceLimit) {
      return false;
    }

    // Search query search check
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(query) || 
                            p.description.toLowerCase().includes(query) ||
                            (p.livestockInfo?.breed && p.livestockInfo.breed.toLowerCase().includes(query)) ||
                            (p.livestockInfo?.origin && p.livestockInfo.origin.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    return true;
  });

  // Sort filtered products based on sortBy value
  const displayProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price_desc') {
      return b.price - a.price;
    }
    if (sortBy === 'color') {
      const colorA = getProductColor(a);
      const colorB = getProductColor(b);
      // Grouping "ألوان متعددة" at the bottom if we wish, or just simple localeCompare
      if (colorA === 'ألوان متعددة' && colorB !== 'ألوان متعددة') return 1;
      if (colorB === 'ألوان متعددة' && colorA !== 'ألوان متعددة') return -1;
      return colorA.localeCompare(colorB, 'ar');
    }
    return 0; // default
  });

  return (
    <div className="space-y-6 pb-20 font-sans" dir="rtl">
      
      {/* Search & Breadcrumb Banner */}
      <div className="bg-teal-50 border border-teal-100/80 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-teal-700 text-white rounded-lg">
            <Layers className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-teal-900">أقسام ومجالات سوق الصعيد 🌾</h2>
            <p className="text-[10px] text-teal-700">تصفح سوق الحلال والطيور، والسلع الغذائية ببني مزار</p>
          </div>
        </div>

        {selectedSubCat && (
          <button 
            onClick={() => setSelectedSubCat('')}
            className="text-[10px] bg-teal-100 hover:bg-teal-200 text-teal-800 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold"
          >
            ← عرض كل الفئات الفرعية
          </button>
        )}
      </div>

      {/* Main Categories Tab Layout */}
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Left Sidebar on Desktop / Top Horizontal Tabs on Mobile */}
        <div className="w-full md:w-1/4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide border-b md:border-b-0 md:border-l border-slate-100 pl-0 md:pl-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedMainCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedMainCat(cat.id);
                  setSelectedSubCat(''); // Reset subcategory when switching main categories
                }}
                className={`flex-1 md:flex-initial text-right text-xs py-3.5 px-4 rounded-xl font-bold flex items-center justify-between gap-2 whitespace-nowrap transition-all duration-200 border-r-4 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-teal-700 to-teal-850 text-white shadow-md border-amber-400' 
                    : 'bg-white text-gray-700 border-slate-100 hover:border-teal-200 hover:bg-teal-50/25 border-r-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isSelected ? 'bg-white/15' : 'bg-slate-50'
                  }`}>
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
                  <span className="font-sans leading-none">{cat.name}</span>
                </div>
                {cat.isSpecial && !isSelected && (
                  <span className="text-[8px] bg-teal-50 border border-teal-100 text-teal-800 font-extrabold px-1.5 py-0.5 rounded-sm">
                    مميز
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Sub-Category details and products */}
        <div className="w-full md:w-3/4 space-y-4">
          
          {/* Sub-Category Circles Panel */}
          <div>
            <div className="mb-2">
              <h3 className="text-xs font-black text-teal-950">الأقسام الفرعية لـ {activeCategory.name}</h3>
              {activeCategory.description && (
                <p className="text-[10px] text-gray-500">{activeCategory.description}</p>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-2">
              {activeCategory.subcategories?.map((sub) => {
                const isSelected = selectedSubCat === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubCat(isSelected ? '' : sub.id)}
                    className={`cursor-pointer border p-2 rounded-xl flex flex-col items-center justify-center text-center transition-all min-h-[80px] ${
                      isSelected 
                        ? 'bg-teal-50 border-teal-700 ring-2 ring-teal-700/10' 
                        : 'bg-white border-slate-100 hover:border-teal-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1.5 ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-teal-50 text-teal-800'
                    }`}>
                      {sub.id === 'calves' && '🐮'}
                      {sub.id === 'sheep' && '🐏'}
                      {sub.id === 'goats' && '🐐'}
                      {sub.id === 'rabbits' && '🐇'}
                      {sub.id === 'ducks' && '🦆'}
                      {sub.id === 'baladi_chicken' && '🐓'}
                      {sub.id === 'white_chicken' && '🍗'}
                      {sub.id === 'eggs' && '🍳'}
                      {sub.id === 'pens_pencils' && '✏️'}
                      {sub.id === 'notebooks_binders' && '📓'}
                      {sub.id === 'drawing_engineering' && '📐'}
                      {sub.id === 'school_supplies' && '🎒'}
                      {sub.id === 'arabic_novels' && '📖'}
                      {sub.id === 'religious_books' && '🕌'}
                      {sub.id === 'educational_kids' && '🧸'}
                      {sub.id === 'history_biography' && '⏳'}
                      {sub.id === 'living_rooms' && '🛋️'}
                      {sub.id === 'bedrooms' && '🛏️'}
                      {sub.id === 'tables_chairs' && '🪑'}
                      {sub.id === 'decorations' && '🧶'}
                      {!['calves', 'sheep', 'goats', 'rabbits', 'ducks', 'baladi_chicken', 'white_chicken', 'eggs', 'pens_pencils', 'notebooks_binders', 'drawing_engineering', 'school_supplies', 'arabic_novels', 'religious_books', 'educational_kids', 'history_biography', 'living_rooms', 'bedrooms', 'tables_chairs', 'decorations'].includes(sub.id) && '📦'}
                    </div>
                    <span className="text-[9px] font-bold text-gray-900 leading-tight line-clamp-2">
                      {sub.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sub-Category Product Grid */}
          <div className="border-t border-dashed border-slate-100 pt-4 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-black text-gray-900">
                {selectedSubCat 
                  ? `أحدث عروض قسم: ${activeCategory.subcategories?.find(s => s.id === selectedSubCat)?.name}`
                  : `جميع عروض قسم: ${activeCategory.name}`
                }
              </h4>
              <span className="text-[10px] text-gray-400">({displayProducts.length} منتج متوفر حالياً)</span>
            </div>

            {/* Price Filter Slider & Sorting Panel */}
            {unfilteredCategoryProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Price Filter Slider Panel */}
                {maxAvailablePrice > minAvailablePrice ? (
                  <div className="bg-gradient-to-l from-teal-50/40 to-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold">
                        <span className="text-teal-850">💰</span>
                        <span>حدد السعر الأقصى:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-md font-sans">
                          حتى {priceLimit.toLocaleString('ar-EG')} ج.م
                        </span>
                        {priceLimit < maxAvailablePrice && (
                          <button
                            type="button"
                            onClick={() => setPriceLimit(maxAvailablePrice)}
                            className="text-[10px] text-rose-600 hover:text-rose-800 hover:underline bg-transparent font-black cursor-pointer border-none p-0"
                          >
                            إعادة تعيين 🔄
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 relative">
                      <input
                        type="range"
                        min={minAvailablePrice}
                        max={maxAvailablePrice}
                        step={maxAvailablePrice - minAvailablePrice > 3000 ? 100 : 5}
                        value={priceLimit > maxAvailablePrice ? maxAvailablePrice : priceLimit}
                        onChange={(e) => setPriceLimit(Number(e.target.value))}
                        className="w-full accent-teal-750 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none transition-all"
                      />
                      <div className="flex justify-between text-[9px] text-gray-450 font-sans font-black">
                        <span>{minAvailablePrice.toLocaleString('ar-EG')} ج.م</span>
                        <span>{maxAvailablePrice.toLocaleString('ar-EG')} ج.م</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-4 flex items-center justify-center text-center text-[10px] text-slate-500 font-bold">
                    💡 جميع أسعار المنتجات في هذا القسم متطابقة أو متقاربة جداً.
                  </div>
                )}

                {/* Sorting Panel */}
                <div className="bg-gradient-to-l from-teal-50/40 to-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold">
                      <span className="text-teal-850">🔄</span>
                      <span>ترتيب المنتجات المعروضة:</span>
                    </div>
                    {sortBy !== 'default' && (
                      <button
                        type="button"
                        onClick={() => setSortBy('default')}
                        className="text-[10px] text-rose-600 hover:text-rose-800 hover:underline bg-transparent font-black cursor-pointer border-none p-0"
                      >
                        الافتراضي ↺
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-slate-200 focus:border-teal-700 outline-none rounded-xl px-3 py-2.5 text-[11px] font-bold transition-all appearance-none cursor-pointer pr-3 pl-8 text-right font-sans"
                    >
                      <option value="default">⭐ الترتيب الافتراضي (المقترح)</option>
                      <option value="price_asc">📈 السعر: من الأقل للأعلى</option>
                      <option value="price_desc">📉 السعر: من الأعلى للأقل</option>
                      <option value="color">🎨 ترتيب حسب اللون (أبجديًا)</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-sans text-[9px]">
                      ▼
                    </div>
                  </div>
                </div>
              </div>
            )}

            {displayProducts.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-gray-400 text-xs">
                <span className="text-2xl">🌱</span>
                <p className="font-bold text-slate-700 mt-2">عذراً، هذا القسم الفرعي فارغ مؤقتاً!</p>
                <p className="text-[10px] text-gray-400">نحن بانتظار تجميع السعرات والمواشي من مزارع بني مزار قريباً.</p>
                <button
                  onClick={() => setSelectedSubCat('')}
                  className="mt-2 text-[10px] text-teal-800 hover:underline font-bold"
                >
                  تصفح القسم بالكامل
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayProducts.map(product => {
                  const productWithMaybeColorTag = sortBy === 'color' 
                    ? { ...product, badge: `🎨 ${getProductColor(product)}` } 
                    : product;
                  return (
                    <ProductCard
                      key={product.id}
                      product={productWithMaybeColorTag}
                      onSelect={onSelectProduct}
                      onAddToCart={(p, e) => {
                        if (e) e.stopPropagation();
                        onAddToCart(p, null);
                      }}
                      isInCart={cartProductIds.includes(product.id)}
                      isFavorite={favoriteProductIds.includes(product.id)}
                      onToggleFavorite={onToggleFavorite}
                      isComparing={compareProductIds.includes(product.id)}
                      onToggleCompare={onToggleCompare}
                      onViewDetail={onViewDetail}
                    />
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
