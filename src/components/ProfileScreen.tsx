/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, ShieldCheck, HelpCircle, PhoneCall, Gift, BookOpen, Clock, Heart, Award, Truck, MapPin, Map, CheckCircle2, MessageSquare } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProfileScreenProps {
  favoriteProductIds?: string[];
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (p: Product, e: React.MouseEvent | null) => void;
  cartProductIds?: string[];
  onToggleFavorite?: (product: Product, event?: React.MouseEvent) => void;
  compareProductIds?: string[];
  onToggleCompare?: (product: Product, event?: React.MouseEvent) => void;
  onViewDetail?: (product: Product) => void;
}

export default function ProfileScreen({
  favoriteProductIds = [],
  onSelectProduct = () => {},
  onAddToCart = () => {},
  cartProductIds = [],
  onToggleFavorite,
  compareProductIds = [],
  onToggleCompare,
  onViewDetail
}: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'investment' | 'favorites'>('info');

  // Delivery simulator states
  const [deliveryStep, setDeliveryStep] = useState<number>(2); // 0: Confirmed, 1: Prepared, 2: Out with Courier, 3: Delivered
  const [courierPosition, setCourierPosition] = useState<number>(45); // percentage along the road
  const [isSimulatingTracking, setIsSimulatingTracking] = useState<boolean>(true);

  React.useEffect(() => {
    if (!isSimulatingTracking) return;
    const interval = setInterval(() => {
      setCourierPosition(prev => {
        if (prev >= 100) {
          setDeliveryStep(3);
          return 100;
        }
        const next = prev + 5;
        if (next >= 100) {
          setDeliveryStep(3);
          return 100;
        } else if (next >= 40) {
          setDeliveryStep(2);
        } else if (next >= 15) {
          setDeliveryStep(1);
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isSimulatingTracking]);

  const favoriteProducts = PRODUCTS.filter(p => favoriteProductIds.includes(p.id));

  return (
    <div className="space-y-6 pb-20 font-sans" dir="rtl">
      
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-teal-850 to-teal-700 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute left-0 bottom-0 top-0 w-1/3 bg-teal-800/15 rounded-r-3xl blur-md"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/20 flex items-center justify-center text-xl font-bold font-sans">
            م ع
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-md font-black">الحاج محمد عبد العليم</h2>
              <span className="text-[9px] bg-yellow-400 text-teal-950 px-2 py-0.5 rounded-full font-bold">عضو فضي 🥈</span>
            </div>
            <p className="text-teal-100/80 text-[10px] sm:text-xs">عضو مسجل منذ يونيو 2025 • فرع بني مزار الرئيسي</p>
            <p className="text-yellow-300 font-bold text-[10px] mt-0.5">رصيد محفظتك الرقمية: 3,450.00 ج.م</p>
          </div>
        </div>
      </div>

      {/* Sub tabs navigators */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 text-center py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'info' 
              ? 'border-teal-700 text-teal-850' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          ملخص الحساب
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 text-center py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'orders' 
              ? 'border-teal-700 text-teal-850' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          طلبياتي وفواتيري
        </button>
        <button
          onClick={() => setActiveTab('investment')}
          className={`flex-1 text-center py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'investment' 
              ? 'border-teal-705 text-teal-850' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          محفظة تسمين الصعيد 🐂
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 text-center py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'favorites' 
              ? 'border-teal-700 text-teal-850' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          المفضلة ❤️
        </button>
      </div>

      {/* Render Sub Tabs Content */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
              <span className="text-lg font-black text-teal-900 font-sans block">4</span>
              <span className="text-[10px] text-gray-500">فواتير نشطة</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
              <span className="text-lg font-black text-emerald-800 font-sans block">2</span>
              <span className="text-[10px] text-gray-500 font-sans">حصص مواشي</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
              <span className="text-lg font-black text-amber-600 font-sans block">140</span>
              <span className="text-[10px] text-gray-500">نقاط ولائك</span>
            </div>
          </div>

          {/* Core Settings Menu */}
          <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 overflow-hidden shadow-xs text-xs">
            
            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-teal-850" />
                <div>
                  <h4 className="font-bold text-gray-800">دعوة المربين وأهالي بني مزار للحصول على هدايا</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">احصل كود خصم 10% لك ولصديق عند شراء أول عجل بقري بلدي سوبر.</p>
                </div>
              </div>
              <span className="text-gray-400">←</span>
            </div>

          </div>

          {/* Beni Mazar Customer Care / WhatsApp Direct Hotline */}
          <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-4 text-xs space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-600 text-white p-2 rounded-lg flex-shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-950 font-sans">مركز خدمة عملاء بني مزار والمنيا الرقمي 📞</h4>
                <p className="text-gray-600 text-[10px] mt-0.5 leading-relaxed">
                  هل تحتاج مساعدة في الميزان أو ترغب بتعديل موعد تفريغ طلبيتك؟ تواصل فوراً معنا على رقم المستودع المباشر أو عبر تطبيق واتساب لسرعة الرد والاستجابة على مستوى قرى بني مزار.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a 
                href="tel:01023456789"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-center shadow-xs"
              >
                اتصال فوري
              </a>
              <a 
                href="https://wa.me/201023456789"
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold py-2 rounded-lg text-center shadow-xs flex items-center justify-center gap-1"
              >
                وتساب مباشر 💬
              </a>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'orders' && (() => {
        // Map points for local tracking
        const points = [
          { x: 40, y: 120, label: 'مستودع بني مزار 🌾' },
          { x: 140, y: 80, label: 'دوران القيس 📍' },
          { x: 230, y: 110, label: 'أبو جرج 🏡' },
          { x: 330, y: 50, label: 'قرية بني علي 🏠' }
        ];

        // Linear interpolation to find current coordinate
        const getCourierXy = (pct: number) => {
          if (pct <= 0) return { x: points[0].x, y: points[0].y };
          if (pct >= 100) return { x: points[3].x, y: points[3].y };

          const segmentPct = 100 / 3;
          let segmentIdx = Math.floor(pct / segmentPct);
          if (segmentIdx > 2) segmentIdx = 2;
          const segmentRemainder = (pct % segmentPct) / segmentPct;

          const startPt = points[segmentIdx];
          const endPt = points[segmentIdx + 1] || points[3];

          return {
            x: startPt.x + (endPt.x - startPt.x) * segmentRemainder,
            y: startPt.y + (endPt.y - startPt.y) * segmentRemainder
          };
        };

        const courierPos = getCourierXy(courierPosition);

        return (
          <div className="space-y-4 text-xs font-sans">
            
            {/* Direct Tracker Card */}
            <div className="bg-white rounded-2xl border border-teal-100 p-4 space-y-4 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
                    <span className="font-bold text-gray-850 text-xs sm:text-sm">تتبع المندوب المحلي بث حي ريادي 📍</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">خط سير الطلب #SQD-582093 لقرى بني مزار</p>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsSimulatingTracking(!isSimulatingTracking)}
                    className={`px-2 py-1 rounded text-[9px] font-bold border transition-colors ${
                      isSimulatingTracking 
                        ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                        : 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
                    }`}
                  >
                    {isSimulatingTracking ? 'إيقاف المحاكاة ⏸' : 'تشغيل المحاكاة ▶'}
                  </button>
                  <button
                    onClick={() => {
                      setCourierPosition(0);
                      setDeliveryStep(0);
                    }}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[9px] font-bold"
                    title="أعد المحاكاة من مستودعات بني مزار"
                  >
                    إعادة الشحن 🔄
                  </button>
                </div>
              </div>

              {/* Animated Mini Map Visualizer */}
              <div className="relative bg-slate-900 rounded-xl overflow-hidden py-3 border border-slate-800 shadow-inner h-40">
                {/* Visual Grid Backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:16px_16px] opacity-25"></div>
                
                {/* SVG Route Line & Anchors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Base Route Road path background */}
                  <path 
                    d={`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`}
                    fill="none" 
                    stroke="#1f2937" 
                    strokeWidth="10" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  {/* Road centerline glowing dotted */}
                  <path 
                    d={`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`}
                    fill="none" 
                    stroke="#0d9488" 
                    strokeWidth="3" 
                    strokeDasharray="5,4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="animate-pulse"
                  />

                  {/* Nodes Circles */}
                  {points.map((pt, idx) => (
                    <circle 
                      key={idx} 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="5" 
                      fill={idx === 0 ? "#0d9488" : idx === 3 ? "#f43f5e" : "#f59e0b"} 
                      className="transition-all"
                    />
                  ))}
                </svg>

                {/* Road Labels inside map */}
                <div className="absolute inset-0 pointer-events-none text-[8px] sm:text-[9px] font-bold">
                  {points.map((pt, idx) => (
                    <div 
                      key={idx} 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" 
                      style={{ left: pt.x, top: pt.y - 14 }}
                    >
                      <span className="bg-slate-950/95 text-slate-205 border border-slate-700/60 px-1.5 py-0.5 rounded-md shadow-xs text-right whitespace-nowrap">
                        {pt.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Animated Moving Truck Indicator */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-300 ease-out"
                  style={{ left: courierPos.x, top: courierPos.y }}
                >
                  <div className="bg-teal-500 text-white rounded-full p-1.5 shadow-md shadow-teal-500/40 ring-2 ring-white animate-bounce">
                    <Truck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="bg-teal-600 text-white text-[7px] font-black px-1 py-0.2 rounded-full absolute -bottom-5 shadow-xs whitespace-nowrap">
                    أحمد المندوب ({courierPosition}%)
                  </span>
                </div>
              </div>

              {/* Delivery Stepper Tracker Progress States */}
              <div className="grid grid-cols-4 gap-2 border-t border-slate-100 pt-3 relative">
                {/* Horizontal Progress bar fill background */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-100 -z-10"></div>
                <div 
                  className="absolute top-6 right-6 h-0.5 bg-emerald-500 -z-10 transition-all duration-300"
                  style={{ width: `${deliveryStep * 33}%`, left: 'auto' }}
                ></div>

                {/* Step 1: CONFIRMED */}
                <div className="flex flex-col items-center text-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                    deliveryStep >= 0 ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 text-gray-400"
                  }`}>
                    {deliveryStep >= 0 ? "✓" : "1"}
                  </div>
                  <span className={`text-[8px] font-black ${deliveryStep >= 0 ? "text-emerald-700" : "text-gray-400"}`}>
                    تم التأكيد
                  </span>
                </div>

                {/* Step 2: PREPARING */}
                <div className="flex flex-col items-center text-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                    deliveryStep >= 1 ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 text-gray-400"
                  }`}>
                    {deliveryStep >= 1 ? "✓" : "2"}
                  </div>
                  <span className={`text-[8px] font-black ${deliveryStep >= 1 ? "text-emerald-700" : "text-gray-400"}`}>
                    قيد التجهيز
                  </span>
                </div>

                {/* Step 3: WITH COURIER */}
                <div className="flex flex-col items-center text-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                    deliveryStep >= 2 ? "bg-amber-500 text-white shadow-xs ring-2 ring-amber-100 animate-pulse" : "bg-slate-100 text-gray-400"
                  }`}>
                    {deliveryStep >= 2 ? "🚚" : "3"}
                  </div>
                  <span className={`text-[8px] font-black ${deliveryStep >= 2 ? "text-amber-600 animate-pulse" : "text-gray-400"}`}>
                    مع المندوب
                  </span>
                </div>

                {/* Step 4: DELIVERED */}
                <div className="flex flex-col items-center text-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                    deliveryStep >= 3 ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 text-gray-400"
                  }`}>
                    {deliveryStep >= 3 ? "✓" : "4"}
                  </div>
                  <span className={`text-[8px] font-black ${deliveryStep >= 3 ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                    تم التسليم
                  </span>
                </div>
              </div>

              {/* Informative description of delivery status */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 grid grid-cols-12 gap-2 items-center">
                <div className="col-span-8 space-y-1 text-right">
                  <h4 className="font-bold text-slate-850 text-[11px]">مندوب مجلس قرى بني علي:</h4>
                  <p className="text-[10px] text-teal-900 font-bold">الحسين أحمد أبو العربي المنياوي 🧔</p>
                  <p className="text-[9px] text-gray-500 leading-relaxed">
                    "الخروف البلدي مربوط ومعزول جيداً بصندوق الأمان الخلفي لتجنب فزع البهيمة، وميزان قائم الديجيتال جاهز لضمان حقك بأمانة الله."
                  </p>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">🚚 مركبة الصعيد المرنة: تروسيكل وچامبو مغلق</span>
                    <span className="text-[9px] bg-teal-50 text-teal-800 px-1.5 py-0.2 rounded font-sans font-bold">⭐ 4.9 (محبوب)</span>
                  </div>
                </div>

                <div className="col-span-4 flex flex-col gap-1.5 justify-center items-stretch border-r border-slate-200 pr-2 pt-1">
                  <a 
                    href="tel:01034567891"
                    className="bg-teal-700 hover:bg-teal-850 text-white font-bold py-1.5 rounded-lg text-center text-[9px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <PhoneCall className="w-2.5 h-2.5" />
                    <span>اتصال بالمندوب</span>
                  </a>
                  <a 
                    href="https://wa.me/201034567891?text=مرحبا الحسين أبو العربي، بخصوص الشحنة رقم #SQD-582093"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-250 font-bold py-1.5 rounded-lg text-center text-[9px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <MessageSquare className="w-2.5 h-2.5" />
                    <span>مراسلة واتساب</span>
                  </a>
                </div>
              </div>

              {/* Courier Status Detailed Tracking Feed */}
              <div className="space-y-2 pt-2 border-t border-dashed border-slate-100 text-[10px]">
                <h5 className="font-bold text-slate-800">تفاصيل المسير والزمن الفعلي لقسم المواشي:</h5>
                <div className="relative border-r-2 border-slate-100 mr-2 pr-4 space-y-3 pb-1">
                  
                  {deliveryStep >= 2 && (
                    <div className="relative">
                      <span className="absolute -right-[21px] top-0.5 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                      <span className="absolute -right-[21px] top-0.5 w-2 h-2 rounded-full bg-amber-500"></span>
                      <div className="text-right">
                        <span className="font-bold text-amber-600 block">خرج المندوب مع شحنتك الحية • {Math.round(15 - (courierPosition/10))} دقيقة للوصول</span>
                        <p className="text-gray-450 mt-0.5 text-[9px]">تم تحميل الخروف والبيض الملقح في تروسيكل الحسين المتجه لقرية بني علي.</p>
                      </div>
                    </div>
                  )}

                  {deliveryStep >= 1 && (
                    <div className="relative">
                      <span className="absolute -right-[21px] top-0.5 w-2 h-2 rounded-full bg-slate-300"></span>
                      <div className="text-right">
                        <span className="font-bold text-gray-600 block">اكتمال الموازنة وتعبئة السلة بمستودع بني مزار البلد</span>
                        <p className="text-gray-450 mt-0.5 text-[9px]">تم فحص سلامة الخروف الشرعية والبيئية ووضعه بالمركبة.</p>
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <span className="absolute -right-[21px] top-0.5 w-2 h-2 rounded-full bg-slate-300"></span>
                    <div className="text-right">
                      <span className="font-bold text-gray-600 block">تأكيد المزارع وإصدار الفاتورة الميزانية</span>
                      <p className="text-gray-450 mt-0.5 text-[9px]">تنسيق الطلبية الرقمية مع حساب الحاج محمد عبد العليم.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Standard Order Details item for context */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3 shadow-xs">
              <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-2">
                <div>
                  <span className="font-bold text-gray-850">محتويات طلبك الحالي الحقيقي</span>
                  <p className="text-[10px] text-gray-405">رقم تتبع المستودع: #SQD-582093</p>
                </div>
                <span className="bg-teal-55 text-teal-800 text-[9px] font-bold px-2 py-0.5 rounded-full">الدفع كاش عند الموازنة 💵</span>
              </div>
              
              <div className="space-y-1.5 leading-relaxed text-gray-600">
                <p><strong>العناصر الحية الحالية:</strong> خروف عسافي بلدي سوبر (عدد 1)، كرتونة بيض فيومي ملقح للتفريخ (عدد 2).</p>
                <p><strong>موقع الاستلام الموضح:</strong> قرية بني علي - بالقرب من غرف المستودع القديم.</p>
                <p className="text-teal-950 font-black"><strong>السعر والوزن التقريبي:</strong> 12,980 ج.م كاش شامل النقل لباب الحوش.</p>
              </div>
            </div>

            {/* Historic Finished Orders list */}
            <h4 className="font-bold text-gray-800 text-[11px] pt-2">طلبياتك التاريخية السابقة المنتهية:</h4>

            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3 shadow-xs">
              <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-2">
                <div>
                  <span className="font-bold text-gray-850">طلب رقم #SQD-230911</span>
                  <p className="text-[10px] text-gray-400">تاريخ الشراء: 25 أبريل 2026</p>
                </div>
                <span className="bg-emerald-100 text-emerald-850 text-[9px] font-bold px-2 py-0.5 rounded-full">تم التوصيل والاستلام ✓</span>
              </div>

              <div className="space-y-1">
                <p className="text-gray-600"><strong>العناصر:</strong> عجل بقري بلدي سوبر قائم 360 كجم (عدد 1).</p>
                <p className="text-gray-600"><strong>موقع الاستلام:</strong> قرية صندفا - المزارع الشرقية ومظلات التمسين.</p>
                <p className="text-slate-500 line-through"><strong>السعر الميزاني:</strong> 59,400 ج.م تم سداده وسحب الحيازة بنجاح.</p>
              </div>
            </div>

          </div>
        );
      })()}

      {activeTab === 'investment' && (
        <div className="space-y-4 text-xs font-sans">
          
          <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl"></div>
            <h3 className="text-sm font-bold text-yellow-400 flex items-center gap-1">
              🐃 محفظة تسمين الصعيد الرقمية (المجموع الكلي: 2 رأس قائم)
            </h3>
            <p className="text-gray-300 text-[10px] leading-relaxed">
              عبر استخدام نموذج تسمين الصعيد الفلاحي، يمكنك المشاركة في امتيازات تربية وتسمين العجول البقرية والجاموسية من أي مكان مع متابعة وزن وجدول لقاحات بهائمك لحظة بلحظة عبر التطبيق!
            </p>
          </div>

          {/* Core Veterinary Settings Menu - Restricted to Livestock tab */}
          <div className="bg-white rounded-xl border border-teal-100 divide-y divide-teal-100 overflow-hidden shadow-xs text-xs">
            <div className="p-3 bg-teal-50/50 text-teal-900 font-bold font-sans">
              🩺 قسم الفحص الطبي والبيطري والشرعي
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <div>
                  <h4 className="font-bold text-gray-800">سجل المعاينات الشرعية والبيطرية لبلدي الحلال</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">شروط الأضحية والعقيقة ومقاييس فحص السلامة البدني البيطرية.</p>
                </div>
              </div>
              <span className="text-gray-400">←</span>
            </div>

            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <h4 className="font-bold text-gray-800">بيانات التوثيق واللقاحات البيطرية المعتمدة</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">مراجعة دفاتر تطعيمات مواشيك المحجوزة في مزارع أبوجرج وقراها.</p>
                </div>
              </div>
              <span className="text-gray-400">←</span>
            </div>
          </div>

          {/* Investment head 1 */}
          <div className="bg-white rounded-xl border border-teal-100 p-4 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <h4 className="font-bold text-teal-900 leading-tight">عجل بقري هجين (رقم حيازة 4309)</h4>
                <p className="text-[9px] text-gray-400">موقع التربية: عنابر مجلس قروي أبوجرج - حظيرة 2</p>
              </div>
              <span className="bg-teal-700 text-white text-[9px] font-bold px-2 py-0.5 rounded font-sans">جاري التسمين 🌾</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-600">
              <div className="flex justify-between border-b pb-1">
                <span>وزن الدخول (أكتوبر 2025):</span>
                <span className="font-bold text-gray-800">180 كجم قائم</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>الوزن الحالي (مايو 2026):</span>
                <span className="font-bold text-teal-800">385 كجم قائم</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>الزيادة الإجمالية:</span>
                <span className="font-bold text-emerald-700">+205 كجم قائم</span>
              </div>
              <div className="flex justify-between border-b pb-1 animate-pulse">
                <span>موازنة وتفريغ متوقع:</span>
                <span className="font-bold text-rose-500">عيد الأضحى المبارك 🕋</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-205/65 p-3.5 rounded-xl text-center text-[10px] text-gray-500">
            📢 هل ترغب في حجز رأس جديدة في حظائر التسمين دورة ربيع 2026؟ تواصل مع قسم مبيعات الثروة الحيوانية فوراً.
          </div>

        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-3.5 text-right font-sans">
            <h3 className="font-bold text-teal-950 flex items-center gap-1.5 text-xs">
              ❤️ منتجاتي المفضلة المستهدفة بالصعيد ({favoriteProducts.length})
            </h3>
            <p className="text-gray-500 text-[10px] mt-1 leading-relaxed">
              هذه هي قائمة المنتجات والمواشي التي قمت بحفظها للرجوع إليها سريعاً أو متابعة أسعارها في مستودعات ومزارع بني مزار.
            </p>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-gray-400 text-xs font-sans">
              <span className="text-2xl mb-1">❤️</span>
              <p className="font-bold text-slate-700">قائمة المفضلة فارغة حالياً</p>
              <p className="text-[10px] text-gray-400 mt-1 max-w-xs leading-relaxed">اضغط على رمز القلب في أي بطاقة منتج عبر التطبيق لحفظه هنا والوصول إليه لاحقاً.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {favoriteProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={(p, e) => {
                    if (e) e.stopPropagation();
                    onAddToCart(p, null);
                  }}
                  isInCart={cartProductIds.includes(product.id)}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  isComparing={compareProductIds.includes(product.id)}
                  onToggleCompare={onToggleCompare}
                  onViewDetail={onViewDetail}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
