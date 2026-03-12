import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'نَقاء | ملابس ومفروشات فاخرة',
  description: 'متجر نقاء للملابس والمفروشات الفاخرة — توصيل سريع لجميع مناطق المملكة العربية السعودية',
  keywords: 'عباءات، مفروشات، ملابس نسائية، ملابس رجالية، سجاد، تسوق أونلاين السعودية',
  openGraph: {
    title: 'نَقاء | ملابس ومفروشات فاخرة',
    description: 'تسوق أحدث التشكيلات من الملابس والمفروشات',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-tajawal bg-cream text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
