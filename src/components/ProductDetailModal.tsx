/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Heart, Truck, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  isInCart: boolean;
}

export default function ProductDetailModal({ product, onClose, onAddToCart, isInCart }: ProductDetailModalProps) {
  if (!product) return null;

  const isLivestock = product.categoryId === 'halal_market';
  const info = product.livestockInfo;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-opacity animate-fade-in" dir="rtl">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100 animate-slide-up flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 hover:bg-slate-100 text-gray-800 p-2 rounded-full z-10 shadow-md border border-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image of the Product */}
        <div className="w-full md:w-1/2 bg-slate-50 relative aspect-square md:aspect-auto md:min-h-[400px]">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {product.isExpress && (
            <span className="absolute bottom-4 left-4 bg-yellow-400 text-teal-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              ★ سريع سوق الصعيد
            </span>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            {/* Badges / Rating */}
            <div className="flex items-center justify-between mb-3 border-b border-dashed border-slate-100 pb-3 mt-4 md:mt-0">
              <span className="text-xs text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full font-bold">
                {isLivestock ? 'سوق الحلال والطيور' : 'متجر بني مزار العام'}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-400 text-xs font-normal">({product.reviewsCount} تقييم)</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 font-sans leading-snug mb-2">
              {product.name}
            </h3>

            {/* Prices */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-black text-teal-900">{product.price.toLocaleString('ar-EG')}</span>
              <span className="text-xs text-slate-500 font-sans">جنية مصري</span>
              {isLivestock && info?.priceType === 'per_kilo' && (
                <span className="text-xs text-teal-800 bg-teal-50 px-2 py-0.5 rounded-sm">سعر الكيلو قائم</span>
              )}

              {product.originalPrice && (
                <div className="flex items-center gap-2 mr-3 font-sans">
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice.toLocaleString('ar-EG')} ج.م
                  </span>
                  <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    وفر {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs leading-relaxed mb-4 ">
              {product.description}
            </p>

            {/* Livestock Specific Specs Sheet */}
            {isLivestock && info && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-5">
                <h4 className="text-xs font-bold text-teal-900 mb-2 border-b border-dashed border-slate-200 pb-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  المواصفات البيطرية والإنتاجية (مزارعنا)
                </h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                  {info.weight && (
                    <div className="flex justify-between py-1 border-b border-slate-150/40">
                      <span className="text-gray-500">الوزن التقديري:</span>
                      <span className="font-bold text-slate-800">{info.weight} كجم قائم</span>
                    </div>
                  )}
                  {info.age && (
                    <div className="flex justify-between py-1 border-b border-slate-150/40">
                      <span className="text-gray-500">السن التقريبي:</span>
                      <span className="font-bold text-slate-800">{info.age}</span>
                    </div>
                  )}
                  {info.breed && (
                    <div className="flex justify-between py-1 border-b border-slate-150/40">
                      <span className="text-gray-500">السلالة / النوع:</span>
                      <span className="font-bold text-slate-800">{info.breed}</span>
                    </div>
                  )}
                  {info.origin && (
                    <div className="flex justify-between py-1 border-b border-slate-150/40">
                      <span className="text-gray-500">منشأ ومزرعة:</span>
                      <span className="font-bold text-teal-800 font-sans">{info.origin}</span>
                    </div>
                  )}
                  {info.feedType && (
                    <div className="col-span-2 flex justify-between py-1 border-b border-slate-150/40">
                      <span className="text-gray-500">نوع التغذية:</span>
                      <span className="font-bold text-slate-700">{info.feedType}</span>
                    </div>
                  )}
                  {info.healthState && (
                    <div className="col-span-2 flex flex-col pt-1">
                      <span className="text-gray-500 mb-0.5">الوضعية الصحية والشهادات:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-[11px] leading-snug">
                        ✓ {info.healthState}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Standard Delivery Guarantee */}
            <div className="flex items-center gap-3 p-3 bg-teal-50/50 rounded-lg border border-teal-100/50 text-xs text-teal-900 mb-5">
              <Truck className="w-5 h-5 text-teal-700 flex-shrink-0" />
              <div>
                <p className="font-bold">توصيل مخصص وآمن لبني مزار وقراها</p>
                <p className="text-teal-700/80 text-[10px] mt-0.5">سيارات نقل مجهزة مخصصة للثروة الحيوانية والطيور الحية لضمان سلامة وصولها.</p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-auto">
            <button
              onClick={() => onAddToCart(product)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold font-sans text-xs text-center transition-all shadow-md flex items-center justify-center gap-2 ${
                isInCart 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-705' 
                  : 'bg-teal-700 text-white hover:bg-teal-850 active:scale-98'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4" />
                  تمت الإضافة للسلة بنجاح
                </>
              ) : (
                'إضافة المنتج لسلة المشتريات'
              )}
            </button>
            <button className="p-3 border border-slate-200 hover:border-rose-200 rounded-xl hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
