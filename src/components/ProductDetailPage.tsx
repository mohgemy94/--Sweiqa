/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';
import { 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Heart, 
  Truck, 
  Check, 
  ShoppingCart, 
  Store, 
  MapPin, 
  Award, 
  PhoneCall, 
  Bookmark,
  Share2,
  Lock,
  ThumbsUp,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, e: React.MouseEvent | null) => void;
  cartProductIds: string[];
  favoriteProductIds: string[];
  onToggleFavorite: (product: Product, event?: React.MouseEvent) => void;
  compareProductIds: string[];
  onToggleCompare: (product: Product, event?: React.MouseEvent) => void;
  onSelectProduct: (p: Product) => void;
  onViewDetail: (p: Product) => void;
}

export default function ProductDetailPage({
  product,
  onBack,
  onAddToCart,
  cartProductIds,
  favoriteProductIds,
  onToggleFavorite,
  compareProductIds,
  onToggleCompare,
  onSelectProduct,
  onViewDetail
}: ProductDetailPageProps) {
  
  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const isLivestock = product.categoryId === 'halal_market';
  const info = product.livestockInfo;
  const isInCart = cartProductIds.includes(product.id);
  const isFavorite = favoriteProductIds.includes(product.id);
  const isComparing = compareProductIds.includes(product.id);

  // Generate customized seller info based on the product category for incredible realism
  const getSellerInfo = (p: Product) => {
    if (p.categoryId === 'halal_market') {
      return {
        name: 'مزارع الحاج فرج الحناوي لتربية وتجارة الماشية والطيور البلدية 🌾',
        location: 'بني مزار - قرية صندفا (مزارع الحناوي الكبرى)',
        rating: 4.9,
        badgeStr: 'بائع مزارع موثق ممتاز',
        phone: '01012345678',
        deliverText: 'تفريغ وتوصيل مباشر بسيارات مهيأة لنقل الحلال خلال 12-24 ساعة',
        guarantee: 'معاينة وفحص بيطري كامل عند الاستلام وقبل الدفع والذبح',
        returnsText: 'إمكانية الرد والاستبدال الفوري في حالة وجود أي ملاحظة صحية بيطرية',
        since: 'منذ عام ١٩٩٦م'
      };
    } else if (p.categoryId === 'furniture') {
      return {
        name: 'معرض أولاد ربيع لتجهيز العرائس والأثاث الدمياطي الرفيع 🛋️',
        location: 'بني مزار - حي المنشية (بجوار محطة القطار القديمة)',
        rating: 4.8,
        badgeStr: 'مرشد ديكور وأثاث مسجل',
        phone: '01123456789',
        deliverText: 'شحن آمن ومغلف ببطانيات واقية ضد الخدش لجميع قرى بني مزار مع النجارين للتركيب',
        guarantee: 'ضمان لمدة ٣ سنوات ضد عيوب التصنيع والرطوبة في أخشاب الزان الطبيعي',
        returnsText: 'استرجاع خلال ٧ أيام إذا وجد اختلاف في جودة دهان الغرف وحشو الإسفنج والكتان',
        since: 'منذ عام ٢٠٠٥م'
      };
    } else if (p.categoryId === 'electronics') {
      return {
        name: 'الشركة العربية المتحدة للتوكيلات التجارية والأجهزة المنزلية 🔌',
        location: 'بني مزار - طريق البحر (أمام فرع بنك مصر الجديد)',
        rating: 4.7,
        badgeStr: 'موزع أجهزة معتمد للصعيد',
        phone: '01534567890',
        deliverText: 'توصيل لباب شقتك في بني مزار وتفعيل فوري للضمان مجاناً',
        guarantee: 'ضمان الوكيل الأصلي المعتمد لمدة عامين إلى ٥ أعوام كاملة على المكونات',
        returnsText: 'ضمان استرجاع ١٤ يوماً للمنتجات غير المغيرة من الكرتونة والعيوب الفنية',
        since: 'منذ عام ٢٠١٢م'
      };
    } else if (p.categoryId === 'fashion') {
      return {
        name: 'بوتيك ومحلات قصر الفيروز الراقي للملابس والعبايات الصعيدية 👗',
        location: 'بني مزار - شارع بورسعيد التجاري (وسط البلد)',
        rating: 4.8,
        badgeStr: 'متجر ملابس محلي موثوق',
        phone: '01245678901',
        deliverText: 'توصيل وتجربة القياس والمقاس على الباب مجاناً قبل السداد بالصعيد إكسبريس',
        guarantee: 'أجود أنواع الأقمشة القطنية المصرية والجلابيات المطرزة يدوياً بالكامل',
        returnsText: 'استبدال وتعديل مقاسات فوري بدون أي مصاريف إضافية عند عدم ملائمة المقاس',
        since: 'منذ عام ٢٠١٠م'
      };
    } else {
      // Supermarket / general
      return {
        name: 'هايبر ماركت البركة وتوفير السلع الغذائية الأساسية 🛒',
        location: 'بني مزار - شارع الجلاء التجاري الفرعي',
        rating: 4.8,
        badgeStr: 'بائع بقالة وسوبرماركت نشط',
        phone: '01098765432',
        deliverText: 'توصيل مبرد وسريع خلال ساعة واحدة أو أقل لأي مكان في بني مزار وقراها المجاورة',
        guarantee: 'تأكيد تاريخ الصلاحية وسعر البيع الرسمي بدون مغالاة',
        returnsText: 'مرونة كاملة في استرجاع كافة المنتجات المغلفة في حال رغبة العميل',
        since: 'منذ عام ٢٠١٥م'
      };
    }
  };

  const seller = getSellerInfo(product);

  // Filter out recommendations from remaining PRODUCTS
  // 1. Identical products (المنتجات المتطابقة): Same subcategory AND same category, excluding self
  const identicalProducts = PRODUCTS.filter(p => 
    p.id !== product.id && 
    p.categoryId === product.categoryId && 
    p.subcategoryId === product.subcategoryId
  ).slice(0, 4);

  // 2. Similar products (المنتجات المتشابهة): Same category, but of different subcategories (or generic category overlap), excluding items in identical and self
  const identicalIds = identicalProducts.map(p => p.id);
  const similarProducts = PRODUCTS.filter(p => 
    p.id !== product.id && 
    p.categoryId === product.categoryId && 
    !identicalIds.includes(p.id)
  ).slice(0, 4);

  return (
    <div className="space-y-8 pb-32 animate-fade-in font-sans selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      
      {/* Navigation and Actions Row */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-slate-100 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black text-emerald-850 hover:text-emerald-900 bg-emerald-50/70 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-all w-fit cursor-pointer self-start"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع للمتجر</span>
        </button>

        <div className="flex items-center gap-2 self-end">
          {/* Compare */}
          {onToggleCompare && (
            <button
              onClick={(e) => onToggleCompare(product, e)}
              className={`text-xs font-bold px-3 py-2.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                isComparing
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span>⚖️</span>
              <span>{isComparing ? 'مضاف للمقارنة ✓' : 'إضافة لجدول المقارنة'}</span>
            </button>
          )}

          {/* Share Product */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("📋 تم نسخ رابط هذا المنتج الصعيدي بنجاح! انسخه وأرسله لأصدقائك.");
              } else {
                alert(`رابط المنتج: ${product.name}`);
              }
            }}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            title="مشاركة المنتج"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>مشاركة الرابط</span>
          </button>
        </div>
      </div>

      {/* Main product presentation panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        
        {/* Right side block (6 cols): Media Image Gallery */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-100/80 bg-slate-50 shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isExpress && (
              <span className="absolute bottom-4 right-4 bg-gradient-to-r from-teal-850 to-emerald-900 text-amber-400 text-xs font-black px-4 py-1.5 rounded-full shadow-lg border border-teal-700/30">
                سريع سوق الصعيد 🚀
              </span>
            )}
            
            {/* Overlay badge with discount logic */}
            {product.originalPrice && (
              <span className="absolute top-4 right-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-md space-x-1">
                <span>خصم خاص</span>
                <span className="font-sans font-black mr-1">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
              </span>
            )}
          </div>
          
          {/* Sub description visual tags */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50/50 border border-slate-100 p-2 text-center rounded-xl">
              <span className="text-[10px] text-gray-400 block mb-0.5">ضمان الدفع</span>
              <span className="text-[10px] text-slate-800 font-extrabold flex items-center justify-center gap-0.5">
                <Lock className="w-3 h-3 text-emerald-600" /> عند الاستلام
              </span>
            </div>
            <div className="bg-slate-50/50 border border-slate-100 p-2 text-center rounded-xl">
              <span className="text-[10px] text-gray-400 block mb-0.5">ترشيح وتقييم</span>
              <span className="text-[10px] text-slate-800 font-extrabold flex items-center justify-center gap-0.5">
                <ThumbsUp className="w-3 h-3 text-amber-500" /> صنف مزارع ممتد
              </span>
            </div>
            <div className="bg-slate-50/50 border border-slate-100 p-2 text-center rounded-xl">
              <span className="text-[10px] text-gray-400 block mb-0.5">بلد النقل والتوزيع</span>
              <span className="text-[10px] text-slate-800 font-extrabold flex items-center justify-center gap-0.5">
                <MapPin className="w-3 h-3 text-teal-600" /> قرى بني مزار
              </span>
            </div>
          </div>
        </div>

        {/* Left side block (6 cols): Product core details, attributes, values */}
        <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Breadcrumb info and review values */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-slate-100 pb-3">
              <span className="text-[10px] text-teal-900 bg-teal-50 px-3 py-1 rounded-full font-black font-sans leading-none">
                {product.categoryId === 'halal_market' ? '🏷️ سوق الحلال والمواشي الريفية' : '📦 سوق بني مزار العام'}
              </span>
              
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="text-xs font-extrabold font-sans leading-none">{product.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal leading-none">({product.reviewsCount} تقييم حقيقي بالمركز)</span>
              </div>
            </div>

            {/* Complete Product Title */}
            <h1 className="text-lg md:text-xl font-black text-slate-900 leading-snug">
              {product.name}
            </h1>

            {/* Active Pricing Card Panel */}
            <div className="bg-gradient-to-l from-emerald-50/30 via-slate-50 to-slate-50 border border-slate-150 rounded-2xl p-4.5 space-y-2.5">
              <div className="text-[10px] text-gray-400 font-extrabold">السعر النهائي المعروض للمشتري:</div>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-black text-teal-900 font-sans tracking-tight">
                  {product.price.toLocaleString('ar-EG')}
                </span>
                <span className="text-xs font-black text-slate-500">جنية مصري</span>
                
                {isLivestock && info?.priceType === 'per_kilo' && (
                  <span className="text-xs font-black text-teal-800 bg-teal-100/60 shadow-2xs px-3 py-1 rounded-lg">
                    قائم للكيلو جرام ⚖️
                  </span>
                )}
              </div>

              {product.originalPrice && (
                <div className="flex items-center gap-3 font-sans text-xs font-bold pt-1">
                  <span className="text-gray-400 line-through">
                    سعر السوق الأصلي: {product.originalPrice.toLocaleString('ar-EG')} ج.م
                  </span>
                  <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md text-[10px] font-black">
                    بخصم حقيقي {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Short / Detailed Description text */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-black text-slate-800 flex items-center gap-1">
                <span>📝</span>
                <span>تفاصيل وتوضيح الصنف:</span>
              </h3>
              <p className="text-slate-650 text-xs leading-relaxed text-justify whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Livestock Specific Specs Table Area */}
            {isLivestock && info && (
              <div className="bg-gradient-to-br from-emerald-50/35 to-slate-50/70 border border-emerald-100/50 rounded-2xl p-4.5 space-y-3">
                <h3 className="text-[11px] font-black text-teal-900 flex items-center gap-1.5 border-b border-emerald-100/40 pb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>الوثيقة البيطرية والمواصفات من المزارع:</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-sans">
                  {info.weight && (
                    <div className="flex justify-between border-b border-dashed border-slate-100 py-1">
                      <span className="text-gray-450">الوزن التقريبي القائم:</span>
                      <span className="font-black text-slate-800">{info.weight} كجم غامر</span>
                    </div>
                  )}
                  {info.age && (
                    <div className="flex justify-between border-b border-dashed border-slate-100 py-1">
                      <span className="text-gray-450">السن التقديري:</span>
                      <span className="font-black text-slate-800">{info.age}</span>
                    </div>
                  )}
                  {info.breed && (
                    <div className="flex justify-between border-b border-dashed border-slate-100 py-1">
                      <span className="text-gray-450">السلالة التفصيلية:</span>
                      <span className="font-black text-slate-800">{info.breed}</span>
                    </div>
                  )}
                  {info.origin && (
                    <div className="flex justify-between border-b border-dashed border-slate-100 py-1">
                      <span className="text-gray-450">قرية منشأ التربية:</span>
                      <span className="font-black text-emerald-800">📍 قرية {info.origin}</span>
                    </div>
                  )}
                  {info.feedType && (
                    <div className="sm:col-span-2 flex justify-between border-b border-dashed border-slate-100 py-1">
                      <span className="text-gray-450">طبيعة العلف والتغذية:</span>
                      <span className="font-black text-slate-700">{info.feedType}</span>
                    </div>
                  )}
                  {info.healthState && (
                    <div className="sm:col-span-2 flex flex-col space-y-1 pt-1.5">
                      <span className="text-gray-450 text-[10px]">التقرير الصحي والبيطري الحكومي:</span>
                      <span className="bg-emerald-100/50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-150 text-[11px] font-extrabold leading-snug">
                        🏥 {info.healthState}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stock Availability indicator */}
            <div className="flex items-center gap-1.5 text-xs font-bold pt-1 text-slate-700">
              <span className={`w-2.5 h-2.5 rounded-full ${product.isAvailable ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`}></span>
              <span>
                حالة التوافر بالمعرض: 
                <span className={`mr-1 font-black ${product.isAvailable ? 'text-emerald-700' : 'text-red-600'}`}>
                  {product.isAvailable ? `متاح للطلب فوراً (المخزون: ${product.stock || 1} متوفر)` : 'المخزون غير متوفر حالياً'}
                </span>
              </span>
            </div>
          </div>

          {/* Quick Primary Add to Cart Action Drawer Block */}
          <div className="border-t border-slate-100 pt-5 mt-4 space-y-3.5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => onAddToCart(product, e)}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-xs text-center transition-all shadow-md hover:shadow-lg active:scale-97 flex items-center justify-center gap-2 cursor-pointer ${
                  isInCart
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-250/30'
                    : 'bg-emerald-850 hover:bg-emerald-900 text-white shadow-emerald-950/20'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4.5 h-4.5 stroke-[3]" />
                    <span>تم حجز وإضافة هذا الصنف في سلة التسوق ✅</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4.5 h-4.5" />
                    <span>إضافة الصنف لباب بيتك بقرى بني مزار 🛒</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={(e) => onToggleFavorite(product, e)}
                className={`p-3.5 border rounded-2xl transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-50 border-rose-200 text-rose-600 font-bold scale-103'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-400 hover:text-slate-600'
                }`}
                title={isFavorite ? 'حذف من المفضلة' : 'إضافة للمفضلة'}
              >
                <Heart className={`w-5.5 h-5.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* High level Delivery Estimate and district parameters */}
            <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-start gap-3">
              <Truck className="w-5 h-5 text-teal-850 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-black text-slate-900 block">شحن مباشر مخصص لبني مزار وقراها خلال ساعات:</span>
                <span className="text-slate-500">
                  توصيل آمن لجميع المجالس القروية: صندفا الفاروقية، وأبوجرج، والقيس، وبني علي الشامية، وصفط الشرقية والغربية. السيارات مفرشة وتوزع حتى باب بيوت المشترين تفادياً للإجهاد البدني للماشية والطيور.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Seller and Merchant details Segment ("والبائع وكل شيء") */}
      <div className="bg-gradient-to-l from-teal-950 to-emerald-950 border border-teal-900 rounded-3xl p-6 text-white space-y-5 shadow-xl relative overflow-hidden">
        
        {/* Subtle decorative background watermarks */}
        <div className="absolute left-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-teal-800/20 to-transparent pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-teal-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-800/70 border border-teal-700 flex items-center justify-center rounded-2xl text-xl">
              🕋
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded text-amber-300">
                {seller.badgeStr}
              </span>
              <h4 className="text-sm font-black text-white mt-1">
                {seller.name}
              </h4>
              <p className="text-[10px] text-teal-200 flex items-center gap-1.5 mt-0.5 font-sans">
                <span>📍 {seller.location}</span>
                <span>•</span>
                <span>تاريخ التأسيس: {seller.since}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-teal-900/60 border border-teal-800/80 rounded-xl px-3 py-1.5 text-center font-sans">
              <div className="text-[9px] text-teal-300">رقم السجل:</div>
              <div className="text-[10px] font-black text-teal-100">سجل تجاري ٣١٥٨ المنيا</div>
            </div>
            <div className="bg-teal-900/60 border border-teal-800/80 rounded-xl px-3 py-1.5 text-center font-sans">
              <div className="text-[9px] text-emerald-300">سرعة الشحن:</div>
              <div className="text-[10px] font-black text-emerald-250">١٠٠٪ مضمون اليوم</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Contact Seller */}
          <div className="bg-teal-900/30 hover:bg-teal-900/40 border border-teal-800/40 p-4 rounded-2xl space-y-2 transition-all">
            <div className="text-[11px] font-black text-amber-300 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>اتصال مباشر واستفسارات:</span>
            </div>
            <p className="text-[10px] text-teal-200 leading-relaxed font-sans">
              يمكنك التواصل والاستفسار المباشر بخصوص هذا الصنف أو وزن محدد مع مسؤول البيع بالمزرعة/المعرض:
            </p>
            <div className="font-sans font-black text-xs text-white bg-teal-900/80 py-1.5 max-w-fit px-3 rounded-lg border border-teal-800/60 mt-1">
              📞 {seller.phone}
            </div>
          </div>

          {/* Column 2: Return Guarantee */}
          <div className="bg-teal-900/30 hover:bg-teal-900/40 border border-teal-800/40 p-4 rounded-2xl space-y-2 transition-all">
            <div className="text-[11px] font-black text-amber-300 flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ضمانات الارجاع والتبديل:</span>
            </div>
            <p className="text-[10px] text-teal-100 leading-relaxed">
              {seller.returnsText}
            </p>
          </div>

          {/* Column 3: Quality assurance */}
          <div className="bg-teal-900/30 hover:bg-teal-900/40 border border-teal-800/40 p-4 rounded-2xl space-y-2 transition-all">
            <div className="text-[11px] font-black text-amber-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>فحص عيني ورعاية تامة:</span>
            </div>
            <p className="text-[10px] text-teal-100 leading-relaxed">
              {seller.guarantee}
            </p>
          </div>
        </div>

        <div className="bg-teal-900/40 border border-teal-800/40 p-3 rounded-xl flex items-center gap-2 text-[10px] text-teal-150 justify-center">
          <span>⚖️</span>
          <span>هل ترغب بالمقارنة؟ يمكنك إضافة هذا المنتج وصنف آخر لمقارنة كاملة بمواصفاتهما من خلال الضغط على زر المقارنة.</span>
        </div>

      </div>

      {/* Recommended Identical Products (المنتجات المتطابقة للمنتج) */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm md:text-base font-black text-slate-900">
              🤝 المنتجات المتطابقة تماماً للمنتج
            </h2>
            <p className="text-[10px] text-gray-405 font-bold">بدائل مطابقة من نفس فصيلة السلالة أو الفئات المتوفرة بالمعارض والمزارع ببني مزار</p>
          </div>
          <span className="text-[10px] bg-slate-100 border border-slate-150 text-slate-650 px-2.5 py-1 rounded-xl">
            {identicalProducts.length} منتجات مماثلة
          </span>
        </div>

        {identicalProducts.length === 0 ? (
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl text-center text-xs text-gray-400">
            🔍 لا توجد منتجات مطابقة تماماً حالياً، مزارعنا تقوم بإضافة سلالات إضافية باستمرار.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {identicalProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                isInCart={cartProductIds.includes(p.id)}
                isFavorite={favoriteProductIds.includes(p.id)}
                onToggleFavorite={onToggleFavorite}
                isComparing={compareProductIds.includes(p.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Similar Products (المنتجات المتشابهة) */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm md:text-base font-black text-slate-900">
              🌟 المنتجات والبدائل المتشابهة والمقترحة
            </h2>
            <p className="text-[10px] text-gray-405 font-bold">منتجات ذات شعبية عالية من نفس القسم قد تثير اهتمامك ويسهل شحنها سوياً</p>
          </div>
          <span className="text-[10px] bg-slate-100 border border-slate-150 text-slate-650 px-2.5 py-1 rounded-xl">
            {similarProducts.length} خيارات إضافية
          </span>
        </div>

        {similarProducts.length === 0 ? (
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl text-center text-xs text-gray-400">
            🔍 لا تتوفر بدائل مشابهة أخرى في هذا القسم بالوقت الراهن.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                isInCart={cartProductIds.includes(p.id)}
                isFavorite={favoriteProductIds.includes(p.id)}
                onToggleFavorite={onToggleFavorite}
                isComparing={compareProductIds.includes(p.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
