"use client";
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaArrowRight, FaFileContract, FaShieldAlt, FaApple, FaGooglePlay 
} from 'react-icons/fa';

export default function TermsPage() {
  // تم حل الخطأ بإضافة النوع Variants
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans flex flex-col" dir="rtl">
      
      {/* الهيدر */}
      <nav className="w-full h-[90px] bg-white shadow-sm border-b border-gray-100 flex items-center z-50 relative">
        <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center w-full">
          <Link href="/" className="relative w-32 h-16 md:w-40 md:h-16">
            <Image src="/logo.png" alt="Munasabati Logo" fill className="object-contain" />
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-sky-500 font-bold transition">
            <FaArrowRight /> العودة للرئيسية
          </Link>
        </div>
      </nav>

      {/* المحتوى */}
      <main className="flex-grow py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="container mx-auto max-w-4xl bg-white border border-gray-100 p-8 md:p-16 rounded-[40px] shadow-[0_15px_50px_rgba(0,0,0,0.04)] relative z-10"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl mb-6 shadow-sm border border-sky-100">
              <FaFileContract size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4 text-black">الشروط والأحكام</h1>
            <p className="text-gray-500 font-medium">آخر تحديث: {new Date().toLocaleDateString('ar-IQ')}</p>
          </div>

          <div className="space-y-10 text-gray-700 leading-relaxed text-base md:text-lg">
            
            <p className="font-bold text-black text-xl">
              باستخدامك لتطبيق “مناسبتي” وإتمام عملية الحجز، فإنك توافق على الشروط التالية:
            </p>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">أولاً: شروط الحجز</h2>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>يعتبر الحجز مؤكداً بعد دفع مبلغ العربون أو المبلغ المتفق عليه.</li>
                <li>لا يحق تثبيت الموعد بدون تأكيد الحجز وفق سياسة القاعة.</li>
                <li>يلتزم صاحب الحجز بإدخال جميع البيانات بشكل صحيح.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">ثانياً: الدفعات</h2>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>يتم دفع المبلغ المتبقي في الموعد المتفق عليه مع إدارة القاعة.</li>
                <li>أي رسوم إضافية ناتجة عن خدمات يطلبها العميل بعد الحجز تكون على حسابه.</li>
                <li>جميع الدفعات المثبتة في التطبيق تعتبر مرجعاً للطرفين.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">ثالثاً: الإلغاء أو تغيير الموعد</h2>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>يخضع إلغاء الحجز أو تغيير الموعد لسياسة كل قاعة.</li>
                <li>قد يكون العربون غير قابل للاسترداد في حال الإلغاء، حسب شروط القاعة.</li>
                <li>في حال موافقة القاعة على تغيير الموعد، يتم ذلك حسب توفر المواعيد.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">رابعاً: التزامات صاحب القاعة</h2>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>الالتزام بتوفير القاعة والخدمات المتفق عليها في موعد المناسبة.</li>
                <li>المحافظة على جودة الخدمة المتفق عليها.</li>
                <li>إبلاغ العميل بأي ظرف طارئ قد يؤثر على إقامة المناسبة بأسرع وقت ممكن.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">خامساً: التزامات العميل</h2>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>الالتزام بالموعد المحدد للحفل.</li>
                <li>المحافظة على ممتلكات القاعة، ويتحمل العميل مسؤولية أي أضرار ناتجة عن المدعوين.</li>
                <li>الالتزام بالطاقة الاستيعابية والقوانين والتعليمات الخاصة بالقاعة.</li>
                <li>عدم إدخال أي خدمات خارجية (مثل الطعام أو الديكور أو التصوير) إلا بموافقة إدارة القاعة إذا كانت القاعة تشترط ذلك.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">سادساً: مسؤولية التطبيق</h2>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>يعمل تطبيق “مناسبتي” كوسيط لتسهيل عملية الحجز بين العميل وصاحب القاعة.</li>
                <li>التطبيق غير مسؤول عن أي خلاف ينشأ بسبب عدم التزام أحد الطرفين ببنود الاتفاق.</li>
                <li>يتحمل كل طرف مسؤولية تنفيذ التزاماته وفق ما تم الاتفاق عليه.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">سابعاً: أحكام عامة</h2>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>يحق لإدارة التطبيق تعديل هذه الشروط عند الحاجة، ويتم نشر النسخة المحدثة داخل التطبيق.</li>
                <li>استخدام التطبيق يعني الموافقة على جميع الشروط والأحكام المذكورة أعلاه.</li>
                <li>في حال وجود أي نزاع، تتم محاولة حله ودياً بين الطرفين أولاً، وفي حال تعذر ذلك يكون الاختصاص للمحاكم العراقية وفق القوانين النافذة.</li>
              </ul>
            </section>

            <div className="mt-8 p-6 bg-sky-50 rounded-2xl border border-sky-100 text-center text-lg font-bold">
              في حال استخدام التطبيق يعني الموافقة على شروط الاستخدام و {' '}
              <Link href="/privacy" className="text-sky-600 underline hover:text-sky-800 transition-colors">
                سياسة الخصوصية
              </Link>.
            </div>

            {/* 🔴 الأزرار الإضافية للعودة للرئيسية والتحميل */}
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-gray-100 pt-8">
              <Link href="/" className="flex items-center justify-center gap-2 bg-gray-100 text-black px-6 py-3.5 rounded-xl hover:bg-gray-200 transition-all font-bold w-full sm:w-auto">
                <FaArrowRight /> العودة للرئيسية
              </Link>
              <button className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:bg-sky-600 transition-all font-bold w-full sm:w-auto shadow-md">
                <FaApple size={22} /> App Store
              </button>
              <button className="flex items-center justify-center gap-3 bg-white text-black border-2 border-sky-100 px-6 py-3.5 rounded-xl hover:border-sky-500 hover:text-sky-500 transition-all font-bold w-full sm:w-auto shadow-sm">
                <FaGooglePlay size={20} /> Google Play
              </button>
            </div>

          </div>
        </motion.div>
      </main>

      {/* الفوتر المصغر */}
      <footer className="bg-white border-t border-gray-200 py-10 relative z-10 w-full mt-auto">
        <div className="container mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-500">
            <Link href="/privacy" className="hover:text-sky-500 transition flex items-center gap-2">
              <FaShieldAlt /> سياسة الخصوصية
            </Link>
            <Link href="/terms" className="text-sky-500 flex items-center gap-2">
              <FaFileContract /> الشروط والأحكام
            </Link>
          </div>
          <div className="text-gray-400 text-xs font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} MUNASABATI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}