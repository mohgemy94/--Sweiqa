/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Info, Check, Heart } from 'lucide-react';

interface ProductCardProps {
  key?: any;
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product, e?: any) => void;
  isInCart: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product, e: React.MouseEvent) => void;
}

export default function ProductCard({ 
  product, 
  onSelect, 
  onAddToCart, 
  isInCart,
  isFavorite = false,
  onToggleFavorite
}: ProductCardProps) {
  const isLivestock = product.categoryId === 'halal_market';

  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-gradient-to-br from-white via-slate-50/30 to-slate-50/85 hover:from-white hover:via-teal-50/10 hover:to-teal-50/30 rounded-xl border border-slate-100 hover:border-teal-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group relative product-card"
    >
      {/* Discount Badge */}
      {product.originalPrice && (
        <span className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 font-sans">
          خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
        </span>
      )}

      {/* Specialty Badge shifted to make room for Heart on the left */}
      {product.badge && (
        <span className="absolute top-2 left-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 font-sans">
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
        className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-90 transition-all z-20 shadow-xs border border-slate-100 flex items-center justify-center cursor-pointer"
        title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
      >
        <Heart 
          className={`w-3.5 h-3.5 transition-colors ${
            isFavorite ? 'fill-rose-500 text-rose-500 animate-pulse' : 'text-slate-400'
          }`} 
        />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {product.isExpress && (
          <div className="absolute bottom-2 right-2 bg-yellow-400 text-teal-950 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
            <span className="w-1 h-1 rounded-full bg-teal-800 animate-pulse"></span>
            سريع الصعيد
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory Name & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-sans">
              {product.subcategoryId === 'calves' && 'عجول ومواشي'}
              {product.subcategoryId === 'sheep' && 'غنم وضأن'}
              {product.subcategoryId === 'goats' && 'ماعز خرافية'}
              {product.subcategoryId === 'rabbits' && 'أرانب بلدية'}
              {product.subcategoryId === 'ducks' && 'بط وإوز'}
              {product.subcategoryId === 'baladi_chicken' && 'طيور بلدية'}
              {product.subcategoryId === 'white_chicken' && 'أبيض تسمين'}
              {product.subcategoryId === 'eggs' && 'بيض ريفي'}
              {!isLivestock && 'بضائع بني مزار'}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3 h-3 fill-amber-500" />
              <span className="text-[10px] font-bold font-sans">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-gray-950 font-sans font-bold text-xs line-clamp-2 leading-snug mb-1.5 group-hover:text-teal-700 transition-colors">
            {product.name}
          </h4>

          {/* Livestock specific inline traits */}
          {isLivestock && product.livestockInfo && (
            <div className="grid grid-cols-2 gap-1 mb-2 text-[9px] text-gray-500 font-sans border-t border-dashed border-gray-100 pt-1.5 bg-slate-50/50 p-1 rounded">
              {product.livestockInfo.weight && (
                <div>⚖️ قائم: <span className="font-bold text-gray-700">{product.livestockInfo.weight} كجم</span></div>
              )}
              {product.livestockInfo.age && (
                <div>⏳ العمر: <span className="font-bold text-gray-700">{product.livestockInfo.age}</span></div>
              )}
              {product.livestockInfo.origin && (
                <div className="col-span-2">📍 المصدر: <span className="font-bold text-teal-800">{product.livestockInfo.origin}</span></div>
              )}
            </div>
          )}
        </div>

        {/* Price and Cart Button */}
        <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between">
          <div className="font-sans">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-extrabold text-teal-900">{product.price.toLocaleString('ar-EG')}</span>
              <span className="text-[9px] text-gray-500">ج.م</span>
            </div>
            {isLivestock && product.livestockInfo?.priceType === 'per_kilo' && (
              <span className="text-[9px] text-teal-800 block -mt-1 bg-teal-50 px-1 rounded">سعر الكيلو قائم</span>
            )}
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through block -mt-0.5">
                {product.originalPrice.toLocaleString('ar-EG')} ج.م
              </span>
            )}
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isInCart 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-teal-700 text-white hover:bg-teal-800 active:scale-95'
            }`}
            title={isInCart ? 'في السلة' : 'إضافة إلى السلة'}
          >
            {isInCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
