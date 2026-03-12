# نَقاء — متجر الكتروني للملابس والمفروشات

## التقنيات المستخدمة
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (إدارة الحالة — السلة والمفضلة)
- **Google Fonts (Tajawal)** للخط العربي

## الصفحات الموجودة

### المتجر (Store)
| الصفحة | المسار |
|--------|--------|
| الرئيسية | `/` |
| تصنيف | `/category/[slug]` |
| تفاصيل منتج | `/product/[slug]` |
| السلة | `/cart` |
| إتمام الطلب | `/checkout` |
| المفضلة | `/wishlist` |
| البحث | `/search?q=...` |

### لوحة الإدارة (Admin)
| الصفحة | المسار |
|--------|--------|
| لوحة التحكم | `/admin` |
| المنتجات | `/admin/products` |
| الطلبات | `/admin/orders` |

## كيفية الرفع على Vercel

1. **ارفع الملفات على GitHub:**
```bash
git init
git add .
git commit -m "نَقاء متجر إلكتروني"
git branch -M main
git remote add origin https://github.com/USERNAME/naqaa-store.git
git push -u origin main
```

2. **اربط Vercel:**
   - اذهب لـ [vercel.com](https://vercel.com)
   - New Project → Import from GitHub
   - اختر الـ repo
   - اضغط Deploy ✓

## تشغيل محلياً
```bash
npm install
npm run dev
```
افتح [http://localhost:3000](http://localhost:3000)

## إضافة منتجات حقيقية
عدّل الملف: `src/lib/data.ts`
- أضف منتجاتك في مصفوفة `PRODUCTS`
- أضف تصنيفاتك في مصفوفة `CATEGORIES`

## وسائل الدفع المدعومة (للتكامل الكامل)
- **مدى** — Moyasar أو HyperPay
- **Apple Pay** — Moyasar
- **تابي** — api.tabby.ai
- **تمارا** — api.tamara.co
- **Visa/Mastercard** — HyperPay أو Moyasar

## المدن السعودية
مدرجة كاملاً في `src/lib/data.ts` — `CITIES[]`
