/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem, BeniMazarDistrict } from '../types';
import { BENI_MAZAR_DISTRICTS } from '../data';
import { ShoppingBag, MapPin, Truck, Trash2, ShieldCheck, CheckCircle2, Phone, User, ExternalLink } from 'lucide-react';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, q: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartScreen({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartScreenProps) {
  // Client state
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(BENI_MAZAR_DISTRICTS[0].id);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'instapay' | 'vodafone_cash'>('cash_on_delivery');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [submittedOrderInfo, setSubmittedOrderInfo] = useState<any | null>(null);

  // Math references
  const mainDistrict = BENI_MAZAR_DISTRICTS.find(d => d.id === selectedDistrictId) || BENI_MAZAR_DISTRICTS[0];
  const itemsSubTotal = cartItems.reduce((acc, current) => acc + (current.product.price * current.quantity), 0);
  const deliveryCost = itemsSubTotal > 0 ? mainDistrict.deliveryFee : 0;
  const discountRate = isPromoApplied ? 0.10 : 0; // 10% discount promo
  const discountAmount = itemsSubTotal * discountRate;
  const netTotal = itemsSubTotal + deliveryCost - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SAEED10') {
      setIsPromoApplied(true);
    } else {
      alert('كود ترويجي غير صالح! جرب الكود الترويجي الافتراضي: SAEED10 للحصول على خصم 10%');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName || !customerPhone || !streetAddress) {
      alert('يرجى ملء جميع بيانات التوصيل لمركز بني مزار لإتمام المعاملة بنجاح!');
      return;
    }

    // Capture Order receipts
    const orderDetails = {
      orderId: 'SQD-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cartItems],
      subTotal: itemsSubTotal,
      deliveryFee: deliveryCost,
      discount: discountAmount,
      total: netTotal,
      district: mainDistrict.name,
      estimate: mainDistrict.estimateMinutes,
      customerName,
      customerPhone,
      streetAddress,
      paymentMethod,
      createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setSubmittedOrderInfo(orderDetails);
    setIsOrderSubmitted(true);
    onClearCart();
  };

  if (isOrderSubmitted && submittedOrderInfo) {
    return (
      <div className="bg-white rounded-2xl border border-slate-150 p-6 text-center space-y-6 font-sans" dir="rtl">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-black text-emerald-900">تم تسجيل طلبكم بنجاح في مزارع بني مزار! 🎉</h2>
          <p className="text-gray-500 text-xs">رقم تتبع الطلب الصعيدي: <span className="font-bold text-slate-850 font-mono text-sm">{submittedOrderInfo.orderId}</span></p>
          <p className="text-teal-700 font-bold text-xs">⚡ التوصيل المتوقع خلال: {submittedOrderInfo.estimate} إلى {submittedOrderInfo.district}</p>
        </div>

        {/* Custom Order invoice design */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-right text-xs text-slate-700 space-y-3">
          <h3 className="font-bold border-b border-dashed border-slate-300 pb-2 text-slate-800 flex justify-between">
            <span>تفاصيل فاتورة الاستلام</span>
            <span className="text-gray-400 font-normal">{submittedOrderInfo.createdAt}</span>
          </h3>

          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {submittedOrderInfo.items.map((item: CartItem) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} (عدد {item.quantity})</span>
                <span className="font-bold">{(item.product.price * item.quantity).toLocaleString('ar-EG')} ج.م</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-slate-300 pt-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">مجموع المنتجات:</span>
              <span className="font-bold">{submittedOrderInfo.subTotal.toLocaleString('ar-EG')} ج.م</span>
            </div>
            {submittedOrderInfo.discount > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>خصم الكوبون (10%):</span>
                <span>-{submittedOrderInfo.discount.toLocaleString('ar-EG')} ج.م</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">نقل مخصص ومباشر لـ {submittedOrderInfo.district}:</span>
              <span className="font-bold">{submittedOrderInfo.deliveryFee} ج.م</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-teal-900 border-t border-slate-300 pt-1.5">
              <span>الإجمالي المطلوب دفعه:</span>
              <span>{submittedOrderInfo.total.toLocaleString('ar-EG')} ج.م</span>
            </div>
          </div>

          <div className="bg-white/80 border border-slate-100 rounded p-2.5 mt-2 text-[11px] leading-relaxed">
            <p>📌 <strong>بيانات المستلم:</strong> {submittedOrderInfo.customerName} - {submittedOrderInfo.customerPhone}</p>
            <p>🏠 <strong>العنوان:</strong> {submittedOrderInfo.streetAddress}</p>
            <p>💳 <strong>طريقة الدفع:</strong> {
              submittedOrderInfo.paymentMethod === 'cash_on_delivery' ? 'كاش نقداً عند الاستلام' : 
              submittedOrderInfo.paymentMethod === 'instapay' ? 'انستاباي مسبقاً' : 'فودافون كاش مسبقاً'
            }</p>
          </div>
        </div>

        {submittedOrderInfo.items.some((item: any) => item.product.categoryId === 'halal_market') && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 text-[10px] leading-relaxed text-right flex gap-2">
            <span>💡</span>
            <p>
              <strong>ملاحظة هامة للمواشي والطيور الحية:</strong> يرجى إبقاء هاتفك المسجل نشطاً ومتاحاً لاستقبال مكالمة سائق النقل والمندوب البيطري لتأكيد موعد التفريغ والموازنة على ميزان البسكول في القرية إذا كان البيع قائماً بالكيلو.
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setIsOrderSubmitted(false);
            setSubmittedOrderInfo(null);
          }}
          className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs"
        >
          متابعة تسوق منتجات أخرى في بني مزار
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 font-sans" dir="rtl">
      
      {/* Header Info */}
      <h2 className="text-sm font-black text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-3">
        <ShoppingBag className="w-5 h-5 text-teal-800" />
        عربة التسوق والطلبيات النشطة
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-gray-400">
          <span className="text-5xl mb-3 animate-pulse">🐑</span>
          <h3 className="text-sm font-bold text-slate-700">سلتك خالية من السلع والمواشي حالياً!</h3>
          <p className="text-[10px] text-gray-500 mt-1 max-w-xs leading-relaxed">
            تصفح أقسام السوبر ماركت، الأجهزة المنزلية بضمان العربي، وسوق الحلال والمواشي الريفية لملء سلتك بأفخر عروض الصعيد.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Basket List - 7 Columns */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex justify-between items-center bg-teal-50/50 p-2 px-3 rounded-lg border border-teal-100/50 text-[10px] text-teal-900 font-bold">
              <span>مراجعة العناصر ({cartItems.length} صنف)</span>
              <button onClick={onClearCart} className="text-rose-600 hover:underline">تفريغ السلة</button>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-white rounded-xl border border-slate-100 p-3 hover:border-teal-100 transition-colors flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 space-y-1 min-w-0">
                    <h4 className="font-bold text-gray-950 text-xs truncate leading-snug">
                      {item.product.name}
                    </h4>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-teal-900">
                        {item.product.price.toLocaleString('ar-EG')} ج.م
                      </span>
                      {item.product.livestockInfo?.priceType === 'per_kilo' && (
                        <span className="text-[8px] bg-teal-50 text-teal-800 px-1 rounded">قائم بالكيلو</span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action controls */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-slate-100/60 p-1 rounded-lg">
                      <button 
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 bg-white text-gray-800 rounded-sm font-bold flex items-center justify-center hover:bg-slate-205 text-xs transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-xs px-1 font-sans min-w-4 text-center">{item.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 bg-white text-gray-800 rounded-sm font-bold flex items-center justify-center hover:bg-slate-205 text-xs transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-800">هل لديك كود خصم لسوق الصعيد؟</h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="أدخل الكود (مثال: SAEED10)"
                  className="flex-1 border border-slate-200 outline-none rounded-lg px-3 text-xs focus:border-teal-500 font-sans"
                />
                <button 
                  onClick={handleApplyPromo}
                  className="bg-teal-700 hover:bg-teal-850 text-white font-bold text-xs px-4 py-2 rounded-lg"
                >
                  تطبيق
                </button>
              </div>
              {isPromoApplied && (
                <p className="text-xs text-emerald-700 font-bold">✓ تم تفعيل خصم الكود الترويجي 10% بنجاح!</p>
              )}
            </div>
          </div>

          {/* District Selector & Checkout details - 5 Columns */}
          <form onSubmit={handleCheckout} className="lg:col-span-5 space-y-4">
            
            {/* Shipping details */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3 shadow-xs">
              <h3 className="text-xs font-black text-teal-950 flex items-center gap-1.5 border-b border-slate-50 pb-2">
                <MapPin className="w-4 h-4 text-teal-800" />
                بيانات التوصيل في مركز بني مزار
              </h3>

              <div className="space-y-3 text-xs">
                {/* District Select box */}
                <div>
                  <label className="block text-gray-500 mb-1">المنطقة أو القرية لسرعة الشحن:</label>
                  <select
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg outline-none focus:border-teal-700 text-xs font-bold"
                  >
                    {BENI_MAZAR_DISTRICTS.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name} (شحن: {dist.deliveryFee} ج.م)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estimate details banner */}
                <div className="bg-teal-50/50 p-2.5 rounded-lg border border-teal-150/40 text-[10px] text-teal-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-700 flex-shrink-0" />
                  <span>
                    زمن الشحن التقديري للموقع المختار: <strong>{mainDistrict.estimateMinutes}</strong>
                  </span>
                </div>

                {/* Client Name */}
                <div>
                  <label className="block text-gray-500 mb-1">اسم العميل المستلم (ثلاثي):</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="اكتب اسمك بالكامل هنا"
                      className="w-full bg-slate-50 border border-slate-200 outline-none focus:border-teal-500 p-2 rounded-lg text-xs font-bold pr-8"
                    />
                    <User className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-450 w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-gray-500 mb-1">رقم هاتف المحمول التواصلي:</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="امتداد: 010 / 011 / 012 / 015"
                      className="w-full bg-slate-50 border border-slate-200 outline-none focus:border-teal-500 p-2 rounded-lg text-xs font-bold pr-8 font-sans text-left"
                      style={{ direction: 'ltr' }}
                    />
                    <Phone className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-450 w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Street Details */}
                <div>
                  <label className="block text-gray-500 mb-1">تفاصيل الشارع والمعالم البارزة (اللوكيشن):</label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="رقم المنزل، اسم الشارع، بجوار مسجد أو صيدلية كذا"
                    className="w-full bg-slate-50 border border-slate-200 outline-none focus:border-teal-500 p-2 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3">
              <h3 className="text-xs font-black text-slate-900 border-b border-slate-50 pb-2">
                طريقة الدفع المفضلة بالمنيا
              </h3>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="accent-teal-700 w-4 h-4" 
                  />
                  <div>
                    <span className="font-bold">الدفع كاش نقداً عند الاستلام</span>
                    <p className="text-[10px] text-gray-500 mt-0.5">ادفع فقط بعد المعاينة والموازنة من السائق والمجازر.</p>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'instapay'}
                    onChange={() => setPaymentMethod('instapay')}
                    className="accent-teal-700 w-4 h-4" 
                  />
                  <div>
                    <span className="font-bold">عبر شبكة InstaPay الوطنية 📱</span>
                    <p className="text-[10px] text-gray-500 mt-0.5">تحويل مباشر فوري إلى الحساب البنكي للتطبيق مسبقاً.</p>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'vodafone_cash'}
                    onChange={() => setPaymentMethod('vodafone_cash')}
                    className="accent-teal-700 w-4 h-4" 
                  />
                  <div>
                    <span className="font-bold">محفظة فودافون كاش (Vodafone Cash)</span>
                    <p className="text-[10px] text-gray-500 mt-0.5">تحويل فوري إلى رقم الكاش الخاص بفرع بني مزار.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Receipt Summary Grid */}
            <div className="bg-teal-950 text-white rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold border-b border-teal-800 pb-2 flex justify-between">
                <span>ملخص الحساب النهائي</span>
                <span className="text-[10px] bg-yellow-400 text-teal-950 px-1.5 py-0.5 rounded">أسعار مخفضة</span>
              </h3>

              <div className="space-y-2 text-xs text-teal-100">
                <div className="flex justify-between">
                  <span>فرعي المنتجات:</span>
                  <span className="font-bold">{itemsSubTotal.toLocaleString('ar-EG')} ج.م</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between text-yellow-300">
                    <span>خصم الكوبون النشط:</span>
                    <span>-{discountAmount.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>الشحن المباشر لـ ({mainDistrict.name}):</span>
                  <span>{deliveryCost} ج.م</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white border-t border-teal-850 pt-2 text-[13px]">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-yellow-400 text-sm font-black">{netTotal.toLocaleString('ar-EG')} ج.م</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-teal-950 font-black py-3 rounded-xl transition-all shadow-md text-xs mt-2"
              >
                تأكيد وتسجيل الطلبية لشعب بني مزار ✓
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  );
}
