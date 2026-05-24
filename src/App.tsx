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
import CompareDrawer from './components/CompareDrawer';
import ProductDetailPage from './components/ProductDetailPage';
import { PRODUCTS } from './data';

// Lucide Icons
import { 
  Home, 
  Layers, 
  ShoppingCart, 
  User, 
  Menu,
  Search,
  Mic,
  History,
  X
} from 'lucide-react';

export default function App() {
  // Mobile Frame States
  const [activeTab, setActiveTab] = useState<'home' | 'categories' | 'cart' | 'profile'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailedProduct, setDetailedProduct] = useState<Product | null>(null);

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

  // Search history state and visibility
  const [isHistoryDropdownVisible, setIsHistoryDropdownVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('search_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleAddHistoryItem = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchHistory(prev => {
      const next = [trimmed, ...prev.filter(q => q !== trimmed)].slice(0, 10);
      try {
        localStorage.setItem('search_history', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleDeleteHistoryItem = (query: string) => {
    setSearchHistory(prev => {
      const next = prev.filter(q => q !== query);
      try {
        localStorage.setItem('search_history', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem('search_history');
    } catch (e) {
      console.error(e);
    }
  };

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
      handleAddHistoryItem(speechToText);
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

  // Comparison State
  const [compareProductIds, setCompareProductIds] = useState<string[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  const handleToggleCompare = (product: Product, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setCompareProductIds(prev => {
      const isExist = prev.includes(product.id);
      if (isExist) {
        return prev.filter(id => id !== product.id);
      } else {
        if (prev.length >= 2) {
          setCompareError("⚠️ الحد الأقصى للمقارنة هو منتجين فقط. يرجى إزالة أحد المنتجات للمقارنة أولاً.");
          setTimeout(() => setCompareError(null), 4500);
          return prev;
        }
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareProductIds(prev => prev.filter(id => id !== productId));
  };

  const compareProducts = PRODUCTS.filter(p => compareProductIds.includes(p.id));

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
    setDetailedProduct(null);
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

    setDetailedProduct(null);
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
            <div className="flex items-center justify-between w-full sm:w-auto relative py-1.5 md:gap-4">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="p-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl transition-all border border-teal-100 flex items-center justify-center cursor-pointer z-10"
                title="قائمة الأقسام الكاملة"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div 
                onClick={() => { setActiveTab('home'); setSearchQuery(''); }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform"
              >
                <span className="text-base sm:text-lg font-black text-teal-900 tracking-wider font-sans whitespace-nowrap">
                  سوق الصعيد 🌾
                </span>
              </div>

              {/* Empty placeholder on the left to balance the header visually on mobile */}
              <div className="w-10 h-10 sm:hidden"></div>
            </div>
          </div>

          {/* Search bar - centered and clean */}
          <div className="flex-grow w-full max-w-xl relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsHistoryDropdownVisible(true)}
                onBlur={() => {
                  setTimeout(() => setIsHistoryDropdownVisible(false), 250);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddHistoryItem(searchQuery);
                    setIsHistoryDropdownVisible(false);
                  }
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDetailedProduct(null);
                }}
                placeholder="ابحث عن: عجل بلدي، غسالات، عبايات، زيت طعام..."
                className="w-full bg-slate-50 text-slate-800 placeholder:text-slate-400 text-xs py-3 pr-11 pl-16 rounded-xl border border-slate-200 focus:border-teal-700 focus:bg-white outline-none transition-all font-sans text-right"
              />
              <button
                type="button"
                onClick={() => {
                  handleAddHistoryItem(searchQuery);
                  setIsHistoryDropdownVisible(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-teal-850 hover:text-teal-950 hover:bg-teal-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                title="بحث"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
              
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

            {/* Search History Dropdown */}
            {isHistoryDropdownVisible && searchHistory.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white border border-slate-200 shadow-2xl rounded-xl z-55 overflow-hidden text-right select-none animate-slide-entrance">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border-b border-slate-100/80 text-[11px] font-black text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-teal-800" />
                    عمليات البحث الأخيرة
                  </span>
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevents input blur
                      handleClearHistory();
                    }}
                    className="text-rose-600 hover:text-rose-800 text-[10px] font-black cursor-pointer bg-transparent border-none p-0"
                  >
                    مسح السجل بالكامل
                  </button>
                </div>
                <div className="max-h-56 overflow-y-auto divide-y divide-slate-50">
                  {searchHistory.map((term, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3.5 py-2.5 hover:bg-teal-50/40 cursor-pointer text-xs group transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevents input blur
                        setSearchQuery(term);
                        setIsHistoryDropdownVisible(false);
                      }}
                    >
                      <span className="text-slate-800 font-bold font-sans flex items-center gap-2">
                        <Search className="w-3 h-3 text-slate-400" />
                        {term}
                      </span>
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevents input blur
                          e.stopPropagation();
                          handleDeleteHistoryItem(term);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded-md hover:bg-slate-100 opacity-60 hover:opacity-100 transition-all cursor-pointer"
                        title="حذف"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
        {detailedProduct ? (
          <ProductDetailPage 
            product={detailedProduct}
            onBack={() => setDetailedProduct(null)}
            onAddToCart={handleAddToCart}
            cartProductIds={cartItems.map(item => item.product.id)}
            favoriteProductIds={favoriteProductIds}
            onToggleFavorite={handleToggleFavorite}
            compareProductIds={compareProductIds}
            onToggleCompare={handleToggleCompare}
            onSelectProduct={handleSelectProduct}
            onViewDetail={(p) => setDetailedProduct(p)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeScreen 
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                cartProductIds={cartItems.map(item => item.product.id)}
                onChangeTab={(tabId) => { setDetailedProduct(null); setActiveTab(tabId); }}
                onSelectCategoryFilter={handleSelectCategoryFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                favoriteProductIds={favoriteProductIds}
                onToggleFavorite={handleToggleFavorite}
                searchHistory={searchHistory}
                onAddHistoryItem={handleAddHistoryItem}
                onDeleteHistoryItem={handleDeleteHistoryItem}
                onClearHistory={handleClearHistory}
                compareProductIds={compareProductIds}
                onToggleCompare={handleToggleCompare}
                onViewDetail={(p) => setDetailedProduct(p)}
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
                compareProductIds={compareProductIds}
                onToggleCompare={handleToggleCompare}
                onViewDetail={(p) => setDetailedProduct(p)}
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
                compareProductIds={compareProductIds}
                onToggleCompare={handleToggleCompare}
                onViewDetail={(p) => setDetailedProduct(p)}
              />
            )}
          </>
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
          onClick={() => { setDetailedProduct(null); setActiveTab('home'); }}
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
            setDetailedProduct(null);
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
          onClick={() => { setDetailedProduct(null); setActiveTab('cart'); }}
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
          onClick={() => { setDetailedProduct(null); setActiveTab('profile'); }}
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

      {/* Compare products side drawer table panel */}
      <CompareDrawer 
        isOpen={isCompareDrawerOpen}
        onClose={() => setIsCompareDrawerOpen(false)}
        products={compareProducts}
        onRemoveFromCompare={handleRemoveFromCompare}
        onAddToCart={(p) => handleAddToCart(p, null)}
        cartProductIds={cartItems.map(item => item.product.id)}
      />

      {/* Floating compare tracker widget pill */}
      {compareProductIds.length > 0 && (
        <div className="fixed bottom-24 left-4 z-40 transition-all duration-300 transform scale-100 hover:scale-103">
          <button
            onClick={() => setIsCompareDrawerOpen(true)}
            className="bg-gradient-to-r from-teal-850 to-emerald-900 border border-teal-700/60 text-white shadow-2xl hover:scale-103 active:scale-95 transition-all text-[11px] font-black px-4.5 py-3 rounded-2xl flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>⚖️ مقارنة المنتجات ({compareProductIds.length}/٢)</span>
            
            {compareProductIds.length === 2 && (
              <span className="bg-rose-500 text-[8px] font-sans font-black text-white px-1.5 py-0.5 rounded-md leading-none animate-pulse">
                جاهز!
              </span>
            )}
          </button>
        </div>
      )}

      {/* Toast Notification for Compare Limit Error */}
      {compareError && (
        <div className="fixed top-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md z-55 bg-rose-600 border border-rose-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between font-sans text-xs font-bold leading-normal animate-bounce">
          <span>{compareError}</span>
          <button onClick={() => setCompareError(null)} className="text-white hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
