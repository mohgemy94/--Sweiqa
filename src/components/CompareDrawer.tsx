/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { X, ShoppingCart, Check, Star, Trash2 } from 'lucide-react';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onAddToCart: (product: Product, e?: any) => void;
  cartProductIds: string[];
}

export default function CompareDrawer({
  isOpen,
  onClose,
  products,
  onRemoveFromCompare,
  onAddToCart,
  cartProductIds,
}: CompareDrawerProps) {
  if (!isOpen) return null;

  // Detect Arabic colors if needed or other attributes
  const getProductColorStr = (product: Product): string => {
    const text = (product.name + ' ' + product.description).toLowerCase();
    if (text.includes('أبيض') || text.includes('بيضاء') || text.includes('white')) return 'أبيض';
    if (text.includes('أحمر') || text.includes('حمراء') || text.includes('red')) return 'أحمر';
    if (text.includes('أسود') || text.includes('سوداء') || text.includes('black')) return 'أسود';
    if (text.includes('أزرق') || text.includes('زرقاء') || text.includes('blue')) return 'أزرق';
    if (text.includes('بني') || text.includes('بنية') || text.includes('brown')) return 'بني';
    if (text.includes('أخضر') || text.includes('خضراء') || text.includes('green')) return 'أخضر';
    if (text.includes('أصفر') || text.includes('صفراء') || text.includes('yellow')) return 'أصفر';
    if (text.includes('ذهبي') || text.includes('ذهبية') || text.includes('gold')) return 'ذهبي';
    return 'ألوان متنوعة';
  };

  return (
    <div className="fixed inset-0 z-55 flex justify-end" dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in animate-duration-3"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚖️</span>
            <div>
              <h3 className="text-sm font-black text-slate-900">جدول مقارنة المنتجات السريع</h3>
              <p className="text-[10px] text-gray-400">قارن بين المواصفات والأسعار والمصادر لتسهيل الشراء</p>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 text-gray-500 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {products.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center justify-center space-y-3">
              <span className="text-4xl animate-bounce">⚖️</span>
              <p className="text-xs text-slate-500 font-bold">لم تختر منتجات للمقارنة بعد.</p>
              <p className="text-[10px] text-gray-400 max-w-xs leading-relaxed">
                اضغط على زر <span className="text-teal-700 font-black">⚖️ مقارنة</span> الموجود على بطاقات المنتجات لإضافتها هنا والمقارنة بين تفاصيلها الصعيدية والبلدية.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 text-[11px] bg-teal-850 hover:bg-teal-900 text-white font-bold px-6 py-2 rounded-xl transition-all shadow-xs"
              >
                تصفح المنتجات الآن
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Info banner if single item is added */}
              {products.length === 1 && (
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-[11px] text-amber-800 font-bold leading-relaxed">
                  💡 أضفت منتجاً واحداً فقط. يرجى إضافة منتج ثانٍ من المتجر للمقارنة التفصيلية جنباً إلى جنب.
                </div>
              )}

              {/* Side by side columns */}
              <div className="grid grid-cols-2 gap-4 divide-x divide-slate-150 divide-dashed">
                {products.map((product, idx) => {
                  const isLivestock = product.categoryId === 'halal_market';
                  const info = product.livestockInfo;
                  const isInCart = cartProductIds.includes(product.id);

                  return (
                    <div key={product.id} className="space-y-5 px-1 flex flex-col md:first:border-l md:first:border-slate-100 first:border-none">
                      {/* Image Block & Delete */}
                      <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group shadow-2xs">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={() => onRemoveFromCompare(product.id)}
                          className="absolute top-2.5 right-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg transition-all shadow-md cursor-pointer border border-rose-100 flex items-center gap-1 text-[9px] font-bold z-10"
                          title="حذف من المقارنة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>إزالة ✖</span>
                        </button>
                      </div>

                      {/* Name & Badge */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-black font-sans">
                          {isLivestock ? '🐓 قسم الحلال' : '📦 منتج عام'}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 line-clamp-3 leading-relaxed h-12">
                          {product.name}
                        </h4>
                      </div>

                      {/* Pricing Block */}
                      <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-1">
                        <div className="text-[10px] text-gray-400">السعر الإجمالي:</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-black text-teal-900 font-sans">
                            {product.price.toLocaleString('ar-EG')}
                          </span>
                          <span className="text-[9px] font-bold text-slate-500">ج.م</span>
                        </div>
                        {isLivestock && info?.priceType === 'per_kilo' && (
                          <span className="text-[9px] text-teal-800 font-bold block bg-teal-100/30 px-1 py-0.5 rounded">
                            سعر قائم للكيلو
                          </span>
                        )}
                        {product.originalPrice && (
                          <div className="text-[10px] text-slate-400 line-through font-sans">
                            {product.originalPrice.toLocaleString('ar-EG')} ج.م
                          </div>
                        )}
                      </div>

                      {/* Standard Specs Table (Universal) */}
                      <div className="space-y-2.5 border-t border-slate-100 pt-3">
                        <h5 className="text-[10px] font-black text-slate-500 border-b border-slate-50 pb-1">📊 البيانات الأسياسية:</h5>
                        
                        <div className="flex flex-col gap-1 text-[11px]">
                          <span className="text-gray-450 text-[10px]">التقييم:</span>
                          <div className="flex items-center gap-1 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span className="font-sans text-slate-800">{product.rating}</span>
                            <span className="text-gray-400 text-[10px]">({product.reviewsCount} تقييم)</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 text-[11px]">
                          <span className="text-gray-450 text-[10px]">الشحن السريع:</span>
                          <span className={`font-bold ${product.isExpress ? 'text-amber-600' : 'text-slate-400'}`}>
                            {product.isExpress ? '⚡ سريع الصعيد مفعّل' : '🐢 شحن عادي خلال يومين'}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 text-[11px]">
                          <span className="text-gray-450 text-[10px]">اللون الطاغي:</span>
                          <span className="font-bold text-slate-700">🎨 {getProductColorStr(product)}</span>
                        </div>

                        <div className="flex flex-col gap-1 text-[11px]">
                          <span className="text-gray-450 text-[10px]">حالة المخزون:</span>
                          <span className={`font-bold ${product.isAvailable ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {product.isAvailable ? '✓ متوفر للتوصيل الفوري' : '✖ غير متوفر حالياً'}
                          </span>
                        </div>
                      </div>

                      {/* Livestock/Halal Specific Specs */}
                      {isLivestock && info ? (
                        <div className="space-y-2.5 bg-emerald-50/30 p-3 rounded-2xl border border-emerald-100/40 space-y-2 mt-2">
                          <h5 className="text-[9px] font-black text-emerald-800 border-b border-emerald-100/30 pb-1">🌾 مواصفات مزارع الحناوي:</h5>
                          
                          <div className="grid grid-cols-1 gap-2 text-[10px]">
                            {info.weight && (
                              <div>
                                <span className="text-slate-400 block text-[9px]">الوزن القائم التقديري:</span>
                                <span className="font-bold text-slate-800 font-sans">{info.weight} كجم</span>
                              </div>
                            )}

                            {info.age && (
                              <div>
                                <span className="text-slate-400 block text-[9px]">العمر التقريبي:</span>
                                <span className="font-bold text-slate-800">{info.age}</span>
                              </div>
                            )}

                            {info.breed && (
                              <div>
                                <span className="text-slate-400 block text-[9px]">السلالة والنوع:</span>
                                <span className="font-bold text-slate-800">{info.breed}</span>
                              </div>
                            )}

                            {info.origin && (
                              <div>
                                <span className="text-slate-400 block text-[9px]">بلد المنشأ (قرى بني مزار):</span>
                                <span className="font-bold text-emerald-800">📍 قرية {info.origin}</span>
                              </div>
                            )}

                            {info.feedType && (
                              <div>
                                <span className="text-slate-400 block text-[9px]">طبيعة التغذية:</span>
                                <span className="font-bold text-slate-700">{info.feedType}</span>
                              </div>
                            )}

                            {info.healthState && (
                              <div>
                                <span className="text-slate-400 block text-[9px]">الحالة البيطرية والصحية:</span>
                                <span className="font-bold text-emerald-700 leading-snug">{info.healthState}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] text-gray-400 text-center flex-1 flex items-center justify-center">
                          ⚙️ منتج عام - لا يتوفر مواصفات بيطرية أو سلالات في هذا القسم.
                        </div>
                      )}

                      {/* Add to Cart button */}
                      <div className="pt-2 mt-auto">
                        <button
                          type="button"
                          onClick={(e) => onAddToCart(product, e)}
                          className={`w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-97 cursor-pointer ${
                            isInCart
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-emerald-850 text-white hover:bg-emerald-900'
                          }`}
                        >
                          {isInCart ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>موجود في السلة ✅</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>إضافة للسلة 🛒</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer info in Compare Drawer */}
        {products.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-[10px] text-slate-500 font-bold">
            💡 سوق الصعيد يقوم بتوصيل ومتابعة الشحن والتسليم حتى بيت المشتري في بني مزار وقراها.
          </div>
        )}
      </div>
    </div>
  );
}
