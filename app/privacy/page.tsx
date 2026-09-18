"use client";
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaArrowRight, FaShieldAlt, FaFileContract, FaApple, FaGooglePlay 
} from 'react-icons/fa';

export default function PrivacyPage() {
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
              <FaShieldAlt size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4 text-black">سياسة الخصوصية</h1>
            <p className="text-gray-500 font-medium">آخر تحديث: {new Date().toLocaleDateString('ar-IQ')}</p>
          </div>

          <div className="space-y-10 text-gray-700 leading-relaxed text-base md:text-lg">
            
            <p className="text-gray-600">
              نحن في تطبيق <span className="font-bold text-black">"مناسبتي"</span> نلتزم بحماية خصوصيتك وضمان سرية بياناتك. توضح هذه السياسة كيفية جمع واستخدام ومشاركة وحماية معلوماتك الشخصية عند استخدامك لتطبيقنا وفقاً لمعايير متاجر التطبيقات (App Store و Google Play).
            </p>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">1. المعلومات التي نجمعها</h2>
              <p className="mb-2 text-gray-600">نقوم بجمع المعلومات الضرورية فقط لتقديم خدمات الحجز، وتشمل:</p>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li><span className="font-bold text-black">معلومات الحساب:</span> الاسم، رقم الهاتف، والبريد الإلكتروني عند التسجيل.</li>
                <li><span className="font-bold text-black">معلومات الحجز:</span> تواريخ المناسبات، القاعات المختارة، والخدمات الإضافية.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">2. كيفية استخدام معلوماتك</h2>
              <p className="mb-2 text-gray-600">نستخدم بياناتك للأغراض التالية حصراً:</p>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>تسهيل وإدارة عمليات حجز القاعات والتواصل بين العميل وإدارة القاعة.</li>
                <li>إرسال إشعارات وتحديثات تتعلق بحجوزاتك وحالة حسابك.</li>
                <li>تقديم الدعم الفني والرد على استفساراتك.</li>
                <li>تحسين تجربة المستخدم داخل التطبيق.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">3. مشاركة البيانات</h2>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>نقوم بمشاركة <span className="font-bold text-black">اسمك ورقم هاتفك وتفاصيل حجزك</span> فقط مع صاحب القاعة التي قمت بحجزها، وذلك لغرض إتمام الخدمة.</li>
                <li>لا نقوم ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أي أطراف ثالثة لأغراض تسويقية.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">4. أمن البيانات</h2>
              <p className="text-gray-600">
                نحن نتخذ تدابير أمنية تقنية وتنظيمية صارمة (مثل التشفير والخوادم الآمنة) لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">5. حقوق المستخدم وحذف الحساب</h2>
              <p className="mb-2 text-gray-600">وفقاً لسياسات متاجر التطبيقات، يمتلك المستخدم الحقوق التالية:</p>
              <ul className="list-disc list-inside space-y-2 pr-4 text-gray-600">
                <li>الوصول إلى بياناته وتعديلها من خلال إعدادات التطبيق.</li>
                <li><span className="font-bold text-black text-red-500">حذف الحساب نهائياً:</span> يمكنك طلب حذف حسابك وكافة بياناتك المرتبطة به في أي وقت من خلال خيار "حذف الحساب" الموجود داخل إعدادات التطبيق، أو عبر التواصل مع الدعم الفني. سيتم مسح بياناتك نهائياً من خوادمنا عند تقديم الطلب.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-sky-600 mb-4 border-r-4 border-sky-500 pr-4">6. التغييرات على سياسة الخصوصية</h2>
              <p className="text-gray-600">
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات جوهرية عبر التطبيق. استمرارك في استخدام التطبيق بعد هذه التغييرات يُعد موافقة منك عليها.
              </p>
            </section>

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
            <Link href="/privacy" className="text-sky-500 flex items-center gap-2">
              <FaShieldAlt /> سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-sky-500 transition flex items-center gap-2">
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