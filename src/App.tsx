/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Product, CartItem } from './types';
import HomeScreen from './components/HomeScreen';
import CategoriesScreen from './components/CategoriesScreen';
import CartScreen from './components/CartScreen';
import ProfileScreen from './components/ProfileScreen';
import ProductDetailModal from './components/ProductDetailModal';
import CategoriesDrawer from './components/CategoriesDrawer';

// Lucide Icons
import { 
  Home, 
  Layers, 
  ShoppingCart, 
  User, 
  Menu,
  Search,
  Mic
} from 'lucide-react';

export default function App() {
  // Mobile Frame States
  const [activeTab, setActiveTab] = useState<'home' | 'categories' | 'cart' | 'profile'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Favorite product list persistent state
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('favorite_product_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleFavorite = (product: Product, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setFavoriteProductIds(prev => {
      const next = prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id];
      try {
        localStorage.setItem('favorite_product_ids', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };
  
  // Global search input
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const scrollTimeoutRef = useRef<any>(null);

  // Speech recognition states
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [recognitionText, setRecognitionText] = useState<string>('');

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError('البحث الصوتي غير مدعوم في متصفحك الحالي');
      setTimeout(() => setVoiceError(null), 3000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-EG'; // Set to Arabic (Egypt) for Saeedi locale
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceError(null);
      setRecognitionText('جاري الاستماع... تحدث الآن 🎙️');
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setRecognitionText(speechToText);
      setSearchQuery(speechToText);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech error', event);
      if (event.error === 'not-allowed') {
        setVoiceError('يرجى السماح بصلاحية المايكروفون للبحث');
      } else {
        setVoiceError('لم أسمعك جيداً، يرجى المحاولة مجدداً');
      }
      setIsListening(false);
      setTimeout(() => setVoiceError(null), 3500);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Drawer status
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Navigation filters mapping
  const [filterCatId, setFilterCatId] = useState<string>('halal_market');
  const [filterSubId, setFilterSubId] = useState<string>('');

  // Shopping Cart calculations
  const totalCartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (product: Product, event: React.MouseEvent | null) => {
    if (event) event.stopPropagation();
    
    setCartItems(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        // Already exists, just toast or keep same
        return prev;
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });

    // Auto open modal on success or give brief feedback
    setSelectedProduct(null); // Close detail modal if open
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSelectCategoryFilter = (catId: string, subId?: string) => {
    setFilterCatId(catId);
    setFilterSubId(subId || '');
    setActiveTab('categories');
  };

  const handleSelectDrawerCategory = (categoryName: string, subCategoryName?: string, subSubCategoryName?: string, targetCatId?: string) => {
    if (targetCatId) {
      setFilterCatId(targetCatId);
      
      let subId = '';
      if (subCategoryName) {
        if (targetCatId === 'library_tools') {
          if (subCategoryName.includes('أقلام') || subCategoryName.includes('كتابة')) {
            subId = 'pens_pencils';
          } else if (subCategoryName.includes('كشاكيل') || subCategoryName.includes('دفاتر') || subCategoryName.includes('مذكرات')) {
            subId = 'notebooks_binders';
          } else if (subCategoryName.includes('الرسم') || subCategoryName.includes('الهندسة')) {
            subId = 'drawing_engineering';
          } else if (subCategoryName.includes('حقائب') || subCategoryName.includes('مدرسية')) {
            subId = 'school_supplies';
          }
        } else if (targetCatId === 'books_novels') {
          if (subCategoryName.includes('روايات') || subCategoryName.includes('مترجمة')) {
            subId = 'arabic_novels';
          } else if (subCategoryName.includes('الدينية') || subCategoryName.includes('الإسلامية')) {
            subId = 'religious_books';
          } else if (subCategoryName.includes('قصص') || subCategoryName.includes('أطفال')) {
            subId = 'educational_kids';
          } else if (subCategoryName.includes('تاريخ') || subCategoryName.includes('سير') || subCategoryName.includes('كتابات')) {
            subId = 'history_biography';
          }
        } else if (targetCatId === 'furniture') {
          if (subCategoryName.includes('صالون') || subCategoryName.includes('معيشة') || subCategoryName.includes('مجالس')) {
            subId = 'living_rooms';
          } else if (subCategoryName.includes('نوم') || subCategoryName.includes('أسرّة') || subCategoryName.includes('دواليب')) {
            subId = 'bedrooms';
          } else if (subCategoryName.includes('طاولة') || subCategoryName.includes('طاولات') || subCategoryName.includes('كراسي') || subCategoryName.includes('مكاتب') || subCategoryName.includes('سفرة')) {
            subId = 'tables_chairs';
          } else if (subCategoryName.includes('سجاد') || subCategoryName.includes('ديكور') || subCategoryName.includes('إضاءة') || subCategoryName.includes('مستلزمات')) {
            subId = 'decorations';
          }
        } else {
          if (subCategoryName.includes('عجول') || subCategoryName.includes('تربية')) {
            subId = 'calves';
          } else if (subCategoryName.includes('خرفان') || subCategoryName.includes('أغنام')) {
            subId = 'sheep';
          } else if (subCategoryName.includes('ماعز') || subCategoryName.includes('جديان')) {
            subId = 'goats';
          } else if (subCategoryName.includes('طيور') || subCategoryName.includes('أرانب') || subCategoryName.includes('بط')) {
            subId = 'rabbits';
          } else if (subCategoryName.includes('بيض')) {
            subId = 'eggs';
          } else if (subCategoryName.includes('سمن') || subCategoryName.includes('زيوت')) {
            subId = 'oil_grains';
          } else if (subCategoryName.includes('ألبان') || subCategoryName.includes('جبن')) {
            subId = 'dairy';
          } else if (subCategoryName.includes('شاشات')) {
            subId = 'screens';
          } else if (subCategoryName.includes('جلابيات')) {
            subId = 'traditional';
          } else if (subCategoryName.includes('رجالي')) {
            subId = 'casual';
          } else if (subCategoryName.includes('أطفال')) {
            subId = 'children';
          } else if (subCategoryName.includes('داخلية')) {
            subId = 'underwear_lingerie';
          } else if (subCategoryName.includes('أحذية') || subCategoryName.includes('الأحذية')) {
            subId = 'shoes';
          } else if (subCategoryName.includes('فساتين') || subCategoryName.includes('العرائس')) {
            subId = 'wedding_dresses';
          } else if (subCategoryName.includes('مستلزمات الملابس') || subCategoryName.includes('اكسسوارات ومستلزمات')) {
            subId = 'accessories_supplies';
          } else if (subCategoryName.includes('البشرة') || subCategoryName.includes('الوجه')) {
            subId = 'skincare';
          } else if (subCategoryName.includes('الشعر') || subCategoryName.includes('الجسم')) {
            subId = 'hair_body';
          } else if (subCategoryName.includes('الصحة') || subCategoryName.includes('الإسعافات')) {
            subId = 'health_first_aid';
          } else if (subCategoryName.includes('الطفل') || subCategoryName.includes('الرضع')) {
            subId = 'baby_care';
          } else if (subCategoryName.includes('بهارات') || subCategoryName.includes('توابل')) {
            subId = 'basic_spices';
          } else if (subCategoryName.includes('أعشاب') || subCategoryName.includes('مشروبات')) {
            subId = 'herbal_drinks';
          } else if (subCategoryName.includes('وصفات') || subCategoryName.includes('طبيعية')) {
            subId = 'natural_oils';
          } else if (subCategoryName.includes('مخبوزات') || subCategoryName.includes('حلويات')) {
            subId = 'baking_needs';
          } else if (subCategoryName.includes('هواتف') || subCategoryName.includes('ذكية')) {
            subId = 'smartphones';
          } else if (subCategoryName.includes('إكسسوارات') || subCategoryName.includes('اكسسوارات')) {
            subId = 'accessories';
          } else if (subCategoryName.includes('شواحن') || subCategoryName.includes('كابلات')) {
            subId = 'chargers';
          } else if (subCategoryName.includes('سماعات') || subCategoryName.includes('صوتية')) {
            subId = 'headphones';
          } else if (subCategoryName.includes('الغسيل') || subCategoryName.includes('الملابس')) {
            subId = 'laundry';
          } else if (subCategoryName.includes('الأطباق') || subCategoryName.includes('المطبخ')) {
            subId = 'dishes_kitchen';
          } else if (subCategoryName.includes('مطهرات') || subCategoryName.includes('الأرضيات')) {
            subId = 'home_sanitizers';
          } else if (subCategoryName.includes('معطرات') || subCategoryName.includes('مبيدات')) {
            subId = 'fresheners';
          }
        }
      }
      setFilterSubId(subId);
    } else {
      // Default to categories page
      setFilterCatId('halal_market');
      setFilterSubId('');
    }

    if (subSubCategoryName) {
      setSearchQuery(subSubCategoryName);
    } else if (subCategoryName) {
      setSearchQuery(subCategoryName);
    } else {
      setSearchQuery('');
    }

    setActiveTab('categories');
  };

  const handleMobileScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // Hide search bar when actively scrolling
    setIsSearchVisible(false);

    // Clear timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Show search bar again 450ms after scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      setIsSearchVisible(true);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-24 md:pb-12" dir="rtl">
      
      {/* Dynamic Top App Header with Drawer Triggers & Search bar */}
      <header className="bg-white border-b border-slate-100/80 px-4 md:px-6 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div className="flex items-center justify-between w-full sm:w-auto">
            {/* Logo and Menu Panel trigger */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="p-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl transition-all border border-teal-100 flex items-center justify-center cursor-pointer"
                title="قائمة الأقسام الكاملة"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div 
                onClick={() => { setActiveTab('home'); setSearchQuery(''); }}
                className="flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform"
              >
                <span className="text-base sm:text-lg font-black text-teal-900 tracking-wider font-sans">
                  سوق الصعيد 🌾
                </span>
              </div>
            </div>

            {/* Quick sections shortcuts overlay badge */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-black cursor-pointer hover:bg-teal-50 hover:border-teal-200 transition-all font-sans"
            >
              كل الأقسام 📋
            </button>
          </div>

          {/* Search bar - centered and clean */}
          <div className="flex-grow w-full max-w-xl relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن: عجل بلدي، غسالات، عبايات، زيت طعام..."
                className="w-full bg-slate-50 text-slate-800 placeholder:text-slate-400 text-xs py-3 pr-9 pl-16 rounded-xl border border-slate-200 focus:border-teal-700 focus:bg-white outline-none transition-all font-sans text-right"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-800 w-4 h-4" />
              
              {/* Voice Search Mic Button */}
              <button
                onClick={handleVoiceSearch}
                className={`absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-pulse shadow-xs shadow-rose-200' 
                    : 'text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100'
                }`}
                title="البحث الصوتي"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>

              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-10 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 font-sans px-1"
                >
                  إلغاء
                </button>
              )}
            </div>

            {/* Speech Recognition Overlay Feedback */}
            {isListening && (
              <div className="absolute left-0 right-0 top-13 bg-teal-950/95 backdrop-blur-md text-white p-4 rounded-xl z-50 flex flex-col items-center justify-center space-y-3 font-sans shadow-lg border border-teal-800 animate-fade-in">
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] font-bold text-teal-200">صوت غامر نشط • جاري الاستماع في بني مزار</span>
                </div>
                <p className="text-xs font-black text-center text-white px-2 animate-pulse leading-normal">
                  {recognitionText || "تحدث الآن للبحث..."}
                </p>
                <div className="flex justify-center items-end gap-1 h-5 my-1">
                  <span className="w-1 bg-teal-400 rounded-full animate-bounce animate-duration-1" style={{ height: '70%' }}></span>
                  <span className="w-1 bg-teal-300 rounded-full animate-bounce animate-duration-3" style={{ height: '95%' }}></span>
                  <span className="w-1 bg-teal-500 rounded-full animate-bounce" style={{ height: '40%' }}></span>
                  <span className="w-1 bg-teal-400 rounded-full animate-bounce animate-duration-4" style={{ height: '80%' }}></span>
                  <span className="w-1 bg-rose-400 rounded-full animate-bounce" style={{ height: '60%' }}></span>
                </div>
                <button 
                  onClick={() => setIsListening(false)}
                  className="text-[10px] bg-white/10 hover:bg-white/25 border border-white/20 text-white font-bold px-4 py-1.5 rounded-full"
                >
                  إلغاء الاستماع ✖
                </button>
              </div>
            )}

            {voiceError && (
              <div className="absolute left-2 right-2 top-13 bg-rose-50 border border-rose-200 text-rose-800 p-2.5 rounded-xl text-center text-[10px] font-bold z-50 shadow-md font-sans flex items-center justify-center gap-1.5 animate-bounce">
                <span>⚠️</span>
                <span>{voiceError}</span>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Interactive Content View Area */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-6 md:py-8">
        {activeTab === 'home' && (
          <HomeScreen 
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            cartProductIds={cartItems.map(item => item.product.id)}
            onChangeTab={setActiveTab}
            onSelectCategoryFilter={handleSelectCategoryFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            favoriteProductIds={favoriteProductIds}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {activeTab === 'categories' && (
          <CategoriesScreen 
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            cartProductIds={cartItems.map(item => item.product.id)}
            initialCategory={filterCatId}
            initialSubCategory={filterSubId}
            searchQuery={searchQuery}
            favoriteProductIds={favoriteProductIds}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {activeTab === 'cart' && (
          <CartScreen 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileScreen 
            favoriteProductIds={favoriteProductIds}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            cartProductIds={cartItems.map(item => item.product.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* Categories Navigation Slide-out Drawer Panel overlay */}
      <CategoriesDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSelectCategory={handleSelectDrawerCategory} 
      />

      {/* Dynamic Bottom Navigation Tab Bar (Floating Premium Navigation Island on Desktop, Fixed Solid on Mobile) */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/50 px-4 py-2.5 flex justify-around items-center fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:bottom-5 md:max-w-md w-full z-40 shadow-2xl md:rounded-2xl select-none">
        
        {/* Home tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1.5 py-1 px-4 rounded-xl transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-teal-700 bg-teal-50' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
          <span className="text-[10px] font-black">الرئيسية</span>
        </button>

        {/* Categories Tab */}
        <button
          onClick={() => {
            setFilterCatId('halal_market');
            setFilterSubId('');
            setActiveTab('categories');
          }}
          className={`flex flex-col items-center gap-1.5 py-1 px-4 rounded-xl transition-all cursor-pointer ${
            activeTab === 'categories' ? 'text-teal-700 bg-teal-50' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Layers className={`w-5 h-5 ${activeTab === 'categories' ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
          <span className="text-[10px] font-black">الأقسام</span>
        </button>

        {/* Shopping Cart Tab */}
        <button
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center gap-1.5 py-1 px-4 rounded-xl relative transition-all cursor-pointer ${
            activeTab === 'cart' ? 'text-teal-700 bg-teal-50' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ShoppingCart className={`w-5 h-5 ${activeTab === 'cart' ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
          <span className="text-[10px] font-black">السلة</span>
          
          {totalCartItemsCount > 0 && (
            <span className="absolute -top-1 -right-0.5 bg-rose-500 text-white font-sans font-bold text-[8px] h-4 min-w-4 px-1 rounded-full flex items-center justify-center border border-white">
              {totalCartItemsCount}
            </span>
          )}
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1.5 py-1 px-4 rounded-xl transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-teal-700 bg-teal-50' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
          <span className="text-[10px] font-black">حسابي</span>
        </button>

      </div>

      {/* Product Information Overlay Modal popup sheet */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => handleAddToCart(p, null)}
        isInCart={cartItems.some(item => item.product.id === (selectedProduct?.id || ''))}
      />

      {/* Footer system status */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-6 px-4 text-center border-t border-slate-900 mt-12">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="font-sans leading-relaxed text-slate-300">
            سوق الصعيد التجاري • بني مزار • لخدمة مجالس قرى صندفا، أبوجرج، القيس، بني علي، وصفط 🌾
          </p>
          <p className="text-[10px] text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
            جميع المنتجات والأسعار مستوحاة من البيئة التجارية لمركز بني مزار وقرى صندفا، أبوجرج، القيس، بني علي، وصفط.
          </p>
        </div>
      </footer>

    </div>
  );
}
