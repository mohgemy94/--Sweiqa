/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Check, Heart } from 'lucide-react';

interface ProductCardProps {
  key?: any;
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product, e?: any) => void;
  isInCart: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product, e: React.MouseEvent) => void;
  isComparing?: boolean;
  onToggleCompare?: (product: Product, e: React.MouseEvent) => void;
  onViewDetail?: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  onSelect, 
  onAddToCart, 
  isInCart,
  isFavorite = false,
  onToggleFavorite,
  isComparing = false,
  onToggleCompare,
  onViewDetail
}: ProductCardProps) {
  const isLivestock = product.categoryId === 'halal_market';

  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-gradient-to-br from-white to-slate-50/25 hover:from-white hover:to-emerald-50/5 rounded-2xl border border-slate-100 hover:border-emerald-500/30 premium-glow transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group relative animate-slide-entrance"
    >
      {/* Discount Badge */}
      {product.originalPrice && (
        <span className="absolute top-2.5 right-2/5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[9px] font-black tracking-tight px-2.5 py-1 rounded-lg z-10 font-sans shadow-xs animate-pulse">
          خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
        </span>
      )}

      {/* Specialty Badge */}
      {product.badge && (
        <span className="absolute top-2.5 right-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] font-extrabold tracking-tight px-2.5 py-1 rounded-lg z-10 font-sans shadow-xs">
          {product.badge}
        </span>
      )}

      {/* Heart Icon Button for Favorites */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onToggleFavorite) {
            onToggleFavorite(product, e);
          }
        }}
        className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all z-20 shadow-xs border border-slate-100 flex items-center justify-center cursor-pointer"
        title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
      >
        <Heart 
          className={`w-4 h-4 transition-colors duration-300 ${
            isFavorite ? 'fill-rose-500 text-rose-500 scale-105' : 'text-slate-400'
          }`} 
        />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Soft elegant gradient shadow overlay on image */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>

        {product.isExpress && (
          <div className="absolute bottom-2.5 right-2.5 bg-emerald-950/90 backdrop-blur-md text-amber-400 text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-xs border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            سريع الصعيد ⚡
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory Name & Rating */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[9px] font-black text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded-lg border border-emerald-100/60 font-sans">
              {product.subcategoryId === 'calves' && 'عجول ومواشي'}
              {product.subcategoryId === 'sheep' && 'غنم وضأن'}
              {product.subcategoryId === 'goats' && 'ماعز ريفي'}
              {product.subcategoryId === 'rabbits' && 'أرانب بلدية'}
              {product.subcategoryId === 'ducks' && 'بط وإوز'}
              {product.subcategoryId === 'baladi_chicken' && 'طيور بلدية'}
              {product.subcategoryId === 'white_chicken' && 'أبيض تسمين'}
              {product.subcategoryId === 'eggs' && 'بيض ريفي'}
              {product.subcategoryId === 'living_rooms' && 'صالونات ومجالس'}
              {product.subcategoryId === 'bedrooms' && 'غرف نوم'}
              {product.subcategoryId === 'tables_chairs' && 'طاولات ومكاتب'}
              {product.subcategoryId === 'decorations' && 'سجاد وديكور'}
              {!product.subcategoryId && 'مضمون %100'}
              {product.subcategoryId && !['calves', 'sheep', 'goats', 'rabbits', 'ducks', 'baladi_chicken', 'white_chicken', 'eggs', 'living_rooms', 'bedrooms', 'tables_chairs', 'decorations'].includes(product.subcategoryId) && 'عروض مميزة'}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 bg-amber-50/60 px-1.5 py-0.5 rounded-lg border border-amber-100/30">
              <Star className="w-3 h-3 fill-amber-500" />
              <span className="text-[10px] font-black font-sans">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h4 
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetail) {
                onViewDetail(product);
              } else {
                onSelect(product);
              }
            }}
            className="text-slate-900 font-sans font-bold text-xs sm:text-[13px] line-clamp-2 leading-relaxed mb-2.5 hover:text-emerald-700 hover:underline hover:underline-offset-2 transition-colors cursor-pointer"
          >
            {product.name}
          </h4>

          {/* Livestock specific inline traits */}
          {isLivestock && product.livestockInfo && (
            <div className="grid grid-cols-2 gap-1 mb-2 text-[9px] text-slate-500 font-sans border-t border-dashed border-slate-100 pt-2 bg-slate-50/60 p-1.5 rounded-lg">
              {product.livestockInfo.weight && (
                <div>⚖️ قائم: <span className="font-extrabold text-slate-800">{product.livestockInfo.weight} كجم</span></div>
              )}
              {product.livestockInfo.age && (
                <div>⏳ العمر: <span className="font-extrabold text-slate-800">{product.livestockInfo.age}</span></div>
              )}
              {product.livestockInfo.origin && (
                <div className="col-span-2">📍 المصدر: <span className="font-extrabold text-emerald-800">{product.livestockInfo.origin}</span></div>
              )}
            </div>
          )}
        </div>

        {/* Price and Cart Button */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-100/70 flex flex-col gap-2">
          {/* Price Line - Full Width */}
          <div className="font-sans flex items-center justify-between gap-1 flex-wrap">
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">{product.price.toLocaleString('ar-EG')}</span>
              <span className="text-[9px] font-extrabold text-slate-500 mr-0.5">ج.م</span>
            </div>
            
            {product.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                {product.originalPrice.toLocaleString('ar-EG')} ج.م
              </span>
            )}
          </div>

          {/* Type Tag & Actions Line */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              {isLivestock && product.livestockInfo?.priceType === 'per_kilo' ? (
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md inline-block max-w-full truncate">
                  سعر الكيلو قائم
                </span>
              ) : (
                <span className="text-[9px] text-slate-400 block truncate">
                  متاح للتسليم
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {onToggleCompare && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompare(product, e);
                  }}
                  className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    isComparing 
                      ? 'bg-teal-600/90 text-white font-extrabold shadow-2xs shadow-teal-150' 
                      : 'bg-slate-150/70 hover:bg-slate-200 text-slate-500 hover:text-slate-700'
                  }`}
                  title={isComparing ? 'إزالة من المقارنة' : 'مقارنة المنتجات'}
                >
                  <span className="text-xs">⚖️</span>
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product, e);
                }}
                className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  isInCart 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs shadow-emerald-250' 
                    : 'bg-teal-700 text-white hover:bg-teal-800 shadow-2xs shadow-teal-100 active:scale-95'
                }`}
                title={isInCart ? 'في السلة' : 'إضافة إلى السلة'}
              >
                {isInCart ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <ShoppingCart className="w-3.5 h-3.5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
