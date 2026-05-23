/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SubCategory {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  parentCategoryId: string;
}

export interface Category {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  isSpecial?: boolean; // Highlighted livestock/halal category
  description?: string;
  subcategories?: SubCategory[];
}

export interface Product {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  price: number;
  originalPrice?: number; // For discount display like Noon
  isExpress?: boolean; // Noon Express equivalent ('سريع سوق الصعيد')
  badge?: string; // e.g., "عرض خاص", "وصل حديثاً"
  image: string;
  categoryId: string;
  subcategoryId?: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  isAvailable: boolean;
  
  // Livestock (الثروة الحيوانية والداجنة) Specific Fields
  livestockInfo?: {
    weight?: number; // In Kilograms (e.g. 350)
    age?: string;    // In months/years (e.g. "14 شهر")
    gender?: 'male' | 'female' | string; // (ذكر / أنثى)
    breed?: string;  // Breed (e.g. "بلدي محسّن", "عسافي", "شامي")
    healthState?: string; // (ممتازة - خالي من الأمراض - تطعيمات كاملة)
    priceType: 'per_head' | 'per_kilo'; // (بالرأس أو بالكيلو قائم)
    pricePerKilo?: number; // If sold per kilo (e.g. 170 EGP)
    feedType?: string; // Type of feed (e.g. "علف طبيعي 100%")
    origin?: string; // Village origin around Beni Mazar (e.g. "أبوجرج", "صندفا", "بني علي")
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BeniMazarDistrict {
  id: string;
  name: string;
  deliveryFee: number;
  estimateMinutes: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subTotal: number;
  deliveryFee: number;
  discountDiscount?: number;
  total: number;
  customerName: string;
  customerPhone: string;
  district: string;
  streetAddress: string;
  paymentMethod: 'cash_on_delivery' | 'instapay' | 'vodafone_cash';
  status: 'pending' | 'preparing' | 'on_delivery' | 'completed';
  createdAt: string;
}
