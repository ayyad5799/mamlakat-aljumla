import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-32 text-center">
        <p className="text-8xl mb-6">🔍</p>
        <h1 className="text-4xl font-black mb-3">٤٠٤</h1>
        <p className="text-xl font-bold mb-2">الصفحة غير موجودة</p>
        <p className="text-ink/40 mb-8">يبدو أن هذه الصفحة لا وجود لها</p>
        <Link href="/" className="btn-primary">العودة للرئيسية</Link>
      </div>
    </>
  );
}
