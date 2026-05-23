/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REACT_NATIVE_STRUCTURE_TXT, SQL_MONGODB_FIRESTORE_SCHEMAS_TXT } from '../data';
import { Clipboard, Check, FolderTree, Database, CodeXml, Eye } from 'lucide-react';

export default function ArchitectureViewer() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const categoriesScreenRNCode = `import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import {
  Beef,
  Footprints,
  Sparkles,
  Feather,
  Bird,
  Activity,
  Egg,
  Grid,
  ShoppingCart,
  Tv,
  Shirt,
  ChevronLeft,
} from 'lucide-react-native'; // أيقونات مخصصة لـ React Native

// 1. نظام الألوان الموحد للهوية البصرية (Color Palette StyleSheet)
const COLORS = {
  primary: '#00796B',      // اللون الجنزاري (Dark Teal)
  primaryLight: '#E0F2F1', // جنزاري فاتح للخلفيات والتحديد
  primaryDark: '#004D40',  // جنزاري داكن للنصوص الهامة
  background: '#FFFFFF',   // الأبيض الناصع
  surface: '#F5F5F5',      // رمادي خفيف جداً للفصل والحدود
  textDark: '#212121',     // فحم داكن للعناوين الرئيسية
  textGray: '#757575',     // رمادي متوسط للوصف والشرح
  accent: '#FFB300',       // ذهبي صعيدي مميز للتقييم والتلميحات
  border: '#E0E0E0',       // رمادي خفيف جداً للحدود والظلال
};

// 2. نموذج تصنيفات سوق الصعيد التجاري
const CATEGORIES_DATA = {
  categories: [
    {
      id: 'halal_market',
      title: 'سوق الحلال والطيور',
      description: 'ثروة حيوانية وبلدية مباشرة من المزارع',
      subcategories: [
        { id: 'calves', name: 'العجول (تربية وذبح)', icon: Beef },
        { id: 'sheep', name: 'الخرفان والنعاج', icon: Footprints },
        { id: 'goats', name: 'الماعز والجديان', icon: Sparkles },
        { id: 'rabbits', name: 'الأرانب البلدية', icon: Feather },
        { id: 'ducks', name: 'البط والإوز البلدي', icon: Bird },
        { id: 'baladi_chicken', name: 'الفراخ البلدي (شامورت)', icon: Activity },
        { id: 'white_chicken', name: 'الفراخ البيضاء والمبردة', icon: Egg },
        { id: 'eggs', name: 'البيض بأنواعه (بلدي وتفريخ)', icon: Grid },
      ]
    },
    {
      id: 'supermarket',
      title: 'السوبر ماركت والبقالة',
      description: 'السلع الغذائية والأساسية اليومية لبيتك',
      subcategories: [
        { id: 'oil_grains', name: 'زيوت وسمن وأرز', icon: Egg },
        { id: 'dairy', name: 'ألبان وأجبان الصعيد البيتي', icon: Grid },
      ]
    },
    {
      id: 'electronics',
      title: 'الأجهزة المنزلية والإلكترونيات',
      description: 'أجهزة مطبخ وشاشات بضمانات حقيقية',
      subcategories: [
        { id: 'appliances', name: 'أجهزة المطبخ والغسالات', icon: Tv },
      ]
    },
    {
      id: 'fashion',
      title: 'الملابس والأزياء',
      description: 'جلابيات صعيدي ريفي وملابس كاجوال وأطفال',
      subcategories: [
        { id: 'traditional', name: 'جلابيات صعيدي فاخرة', icon: Shirt },
        { id: 'underwear_lingerie', name: 'ملابس داخلية قطونيل وغيرها', icon: Sparkles },
        { id: 'shoes', name: 'أحذية وصنادل متنوعة', icon: Footprints },
        { id: 'wedding_dresses', name: 'فساتين العرائس والأفراح', icon: Sparkles },
        { id: 'accessories_supplies', name: 'اكسسوارات ومستلزمات الملابس', icon: Gift }
      ]
    }
  ]
};

export default function CategoriesScreen() {
  const [activeTab, setActiveTab] = useState('halal_market');

  const activeCategory = CATEGORIES_DATA.categories.find(c => c.id === activeTab)
    || CATEGORIES_DATA.categories[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* هيدر الشاشة الرئيسي بسوق الصعيد */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>أقسام سوق الصعيد 🌾</Text>
        <Text style={styles.headerSubtitle}>مركز بني مزار ومحافظة المنيا</Text>
      </View>

      <View style={styles.body}>
        {/* التبويب الجانبي للأقسام الكبرى (يسار أو يمين حسب اللغة- هنا لدعم العربي) */}
        <View style={styles.sidebar}>
          {CATEGORIES_DATA.categories.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.sidebarTab,
                  isActive && styles.activeSidebarTab
                ]}
                onPress={() => setActiveTab(item.id)}
              >
                <View style={[styles.activeIndicator, isActive && styles.showIndicator]} />
                <Text style={[
                  styles.sidebarText,
                  isActive && styles.activeSidebarText
                ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* شبكة الأقسام الفرعية التابعة للتبويب النشط */}
        <View style={styles.subCategoryContainer}>
          <View style={styles.subCategoryHeader}>
            <Text style={styles.subCategoryTitle}>{activeCategory.title}</Text>
            <Text style={styles.subCategoryDesc}>{activeCategory.description}</Text>
          </View>

          <FlatList
            data={activeCategory.subcategories}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity style={styles.subCategoryCard}>
                  <View style={styles.iconWrapper}>
                    <IconComponent size={28} color={COLORS.primary} />
                  </View>
                  <Text style={styles.subCategoryCardText} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <ChevronLeft size={16} color={COLORS.textGray} style={styles.arrowIcon} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    color: COLORS.background,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: 'Cairo-Bold',
  },
  headerSubtitle: {
    color: COLORS.primaryLight,
    fontSize: 13,
    textAlign: 'right',
    marginTop: 4,
    fontFamily: 'Cairo-Regular',
  },
  body: {
    flex: 1,
    flexDirection: 'row-reverse', // لتنسيق الواجهة من اليمين لليسار العربي
  },
  sidebar: {
    width: '32%',
    backgroundColor: COLORS.surface,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  sidebarTab: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    position: 'relative',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  activeSidebarTab: {
    backgroundColor: COLORS.background,
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: '60%',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  showIndicator: {
    backgroundColor: COLORS.primary,
  },
  sidebarText: {
    fontSize: 13,
    color: COLORS.textGray,
    textAlign: 'right',
    fontFamily: 'Cairo-Medium',
  },
  activeSidebarText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  subCategoryContainer: {
    flex: 1,
    padding: 12,
  },
  subCategoryHeader: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  subCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    textAlign: 'right',
    fontFamily: 'Cairo-Bold',
  },
  subCategoryDesc: {
    fontSize: 12,
    color: COLORS.textGray,
    textAlign: 'right',
    marginTop: 2,
    fontFamily: 'Cairo-Light',
  },
  listContent: {
    paddingBottom: 20,
  },
  subCategoryCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    margin: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  subCategoryCardText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
    textAlign: 'center',
    fontFamily: 'Cairo-Medium',
  },
  arrowIcon: {
    position: 'absolute',
    left: 8,
    bottom: 8,
  }
});`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-teal-900 font-sans flex items-center gap-2">
            <CodeXml className="w-5 h-5 text-teal-600" />
            الدليل الهندسي للمطور (Developer & Architect Reference Hub)
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            مخططات تفصيلية، هيكل المجلدات، كود React Native الأساسي لجمع أبحاث سوق الصعيد.
          </p>
        </div>
        <div className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 self-start md:self-center">
          <Eye className="w-3.5 h-3.5" />
          Senior Native Architect Mode
        </div>
      </div>

      <div className="space-y-8">
        {/* SECTION 1: Folder Structure */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-teal-600" />
              1. هيكلة مجلدات المشروع (React Native Folder Architecture)
            </h3>
            <button
              onClick={() => handleCopy(REACT_NATIVE_STRUCTURE_TXT, 'structure')}
              className="text-xs text-slate-500 hover:text-teal-600 flex items-center gap-1 bg-slate-50 hover:bg-teal-50 px-2 py-1 rounded transition-colors"
            >
              {copiedSection === 'structure' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Clipboard className="w-3 h-3" />
                  نسخ الهيكل
                </>
              )}
            </button>
          </div>
          <p className="text-gray-600 text-xs mb-3 leading-relaxed">
            تنظيم احترافي يعتمد على <strong>سياقات معيارية (Feature Context Modules)</strong>، لضمان استقلالية طبقات العرض والتحكم وقواعد البيانات وتسهيل التعديل على الكود عبر فِرق البرمجة.
          </p>
          <pre className="text-left font-mono text-[11px] sm:text-xs bg-slate-900 text-slate-200 p-4 rounded-xl overflow-x-auto ltr shadow-md" style={{ direction: 'ltr' }}>
            {REACT_NATIVE_STRUCTURE_TXT}
          </pre>
        </div>

        {/* SECTION 2: UI/UX Concept Description */}
        <div>
          <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            2. فلسفة التصميم وتجربة المستخدم (UI/UX Design Philosophy)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100">
              <h4 className="font-bold text-teal-800 mb-1.5">الهوية البصرية الجنزارية</h4>
              <p className="text-gray-600 leading-relaxed">
                استخدمنا تدرج لون <strong>الجنزاري الأصيل (#00796B)</strong> الذي يعكس هوية ريفية دافئة وتوظيفه كرمز للبركة والنمو، يتبعه اللون <strong>الأبيض الناصع (#FFFFFF)</strong> في مساحات سلبية واسعة تضفي البساطة والأناقة.
              </p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-1.5">أيقونات معيارية وعناصر تباين</h4>
              <p className="text-gray-600 leading-relaxed">
                تم دمج خط <strong>Cairo</strong> لتعزيز القراءة العربية ومحاكاة شارة <strong>"Noon Express"</strong> عبر شارات زرقاء وجنزارية "سوق الصعيد سريع" لضمان ثقة العميل في الجسارة التوصيلية الفورية لجمهورية الصعيد.
              </p>
            </div>
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
              <h4 className="font-bold text-amber-800 mb-1.5">الحلول السلوكية لمدينة بني مزار</h4>
              <p className="text-gray-600 leading-relaxed">
                ميزة اختيار <strong>الوزن والحالة الصحية بدقة</strong> في الثروة الحيوانية والداجنة بدلاً من الصور الرمزية فقط، لمراعاة حساسية الشراء لأهالي قرى أبوجرج وصندفا والقيس وضمان تفاصيل "السن بالشهور والنوع بلدي ملقح".
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: JSON Database Schema */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              3. هيكلة مخطط البيانات لتفصيلات المواشي (Livestock Catalog JSON Schema)
            </h3>
            <button
              onClick={() => handleCopy(SQL_MONGODB_FIRESTORE_SCHEMAS_TXT, 'schema')}
              className="text-xs text-slate-500 hover:text-teal-600 flex items-center gap-1 bg-slate-50 hover:bg-teal-50 px-2 py-1 rounded transition-colors"
            >
              {copiedSection === 'schema' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Clipboard className="w-3 h-3" />
                  نسخ مخطط JSON
                </>
              )}
            </button>
          </div>
          <p className="text-gray-600 text-xs mb-3 leading-relaxed">
            مخطط قاعدة البيانات يدعم الخصائص المتجانسة وغير المتجانسة للمواشي مقارنة بالمنتجات الاستهلاكية، متكامل مع مزارع بني مزار وخصائص مثل (الوزن القائم، السن، اللقاحات، سعر الكيلو القائم، والقرية المصدرية).
          </p>
          <pre className="text-left font-mono text-[11px] sm:text-xs bg-slate-900 text-emerald-300 p-4 rounded-xl overflow-x-auto ltr shadow-md" style={{ direction: 'ltr' }}>
            {SQL_MONGODB_FIRESTORE_SCHEMAS_TXT}
          </pre>
        </div>

        {/* SECTION 4: Categories Screen Component Code */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
              <CodeXml className="w-4 h-4 text-teal-600" />
              4. كود شاشة الأقسام لـ React Native (CategoriesScreen.tsx Source Code)
            </h3>
            <button
              onClick={() => handleCopy(categoriesScreenRNCode, 'rncode')}
              className="text-xs text-slate-500 hover:text-teal-600 flex items-center gap-1 bg-slate-50 hover:bg-teal-50 px-2 py-1 rounded transition-colors"
            >
              {copiedSection === 'rncode' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Clipboard className="w-3 h-3" />
                  نسخ الكود بالكامل
                </>
              )}
            </button>
          </div>
          <p className="text-gray-600 text-xs mb-3 leading-relaxed">
            تمت كتابة هذا الكود الأصلي لـ <strong>React Native</strong> بمستوي خبير ليكون جاهز للإسقاط والعمل مباشرة (TypeSafe مع TypeScript)، ويحاكي بشكل رائع تجربة التبويبات المتشعبة بنقرة سلسة وقدرة تغذية حزمة التصنيفات.
          </p>
          <div className="relative">
            <pre className="text-left font-mono text-[11px] sm:text-xs bg-slate-950 text-slate-100 p-4 rounded-xl overflow-x-auto ltr h-96 shadow-inner ring-1 ring-slate-800/50" style={{ direction: 'ltr' }}>
              {categoriesScreenRNCode}
            </pre>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent rounded-b-xl flex items-end justify-center pb-2 pointer-events-none">
              <span className="text-[10px] text-slate-400 font-sans">
                استخدم زر النسخ في الأعلى لنسخ الكود بالكامل (200+ سطر)
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
