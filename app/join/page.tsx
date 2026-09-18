"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { 
  FaBuilding, FaUser, FaPhoneAlt, FaMapMarkerAlt, 
  FaPaperPlane, FaArrowRight, FaRegEdit, 
  FaShieldAlt, FaFileContract, FaApple, FaGooglePlay, FaHandshake
} from 'react-icons/fa';

export default function JoinPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    hallName: '',
    governorate: 'بغداد',
    phoneNumber: '',
    notes: ''
  });

  const governorates = [
    "بغداد", "البصرة", "نينوى", "أربيل", "النجف", "كربلاء", "كركوك", 
    "الأنبار", "ذي قار", "بابل", "واسط", "ميسان", "السليمانية", 
    "دهوك", "صلاح الدين", "المثنى", "الديوانية", "ديالى"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = formData.fullName.trim();
    const hallName = formData.hallName.trim();
    const phoneNumber = formData.phoneNumber.trim();
    const notes = formData.notes.trim();

    if (!fullName || !hallName || !phoneNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'تنبيه',
        text: 'يرجى ملء جميع الحقول المطلوبة.',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }

    if (fullName.length > 100 || hallName.length > 120 || notes.length > 1000) {
      Swal.fire({
        icon: 'warning',
        title: 'تنبيه',
        text: 'البيانات المدخلة طويلة أكثر من المسموح.',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }

    if (!/^[0-9+\-()\s]{7,25}$/.test(phoneNumber)) {
      Swal.fire({
        icon: 'warning',
        title: 'تنبيه',
        text: 'يرجى إدخال رقم هاتف صحيح.',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('owner_applications').insert([
        {
          full_name: fullName,
          hall_name: hallName,
          governorate: formData.governorate,
          phone_number: phoneNumber,
          notes,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      Swal.fire({
        icon: 'success',
        title: 'تم إرسال طلبك بنجاح!',
        text: 'سيقوم فريقنا بمراجعة طلبك والتواصل معك قريباً.',
        confirmButtonColor: '#0ea5e9'
      }).then(() => {
        setFormData({ fullName: '', hallName: '', governorate: 'بغداد', phoneNumber: '', notes: '' });
      });

    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ',
        text: 'تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى لاحقاً.',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
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

      {/* منطقة الاستمارة */}
      <main className="flex-grow flex items-center justify-center py-16 px-4 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-50 rounded-full blur-[100px] opacity-80 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border border-gray-100 w-full max-w-2xl p-8 md:p-12 rounded-[40px] shadow-[0_15px_50px_rgba(0,0,0,0.06)] relative z-10"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl mb-6 shadow-sm border border-sky-100">
              <FaHandshake size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3 text-black">طلب انضمام كشريك</h1>
            <p className="text-gray-500 font-medium text-sm md:text-base">
              أدخل بياناتك وسيتم التواصل معك لإنشاء حسابك وإضافة قاعتك للتطبيق.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FaUser className="text-sky-500" /> الاسم الكامل (لصاحب القاعة أو المدير)
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="مثال: أحمد محمد"
                className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaBuilding className="text-sky-500" /> اسم القاعة
                </label>
                <input 
                  type="text" 
                  name="hallName"
                  value={formData.hallName}
                  onChange={handleChange}
                  placeholder="مثال: قاعة الملوك"
                  className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="text-sky-500" /> المحافظة
                </label>
                <select 
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition outline-none cursor-pointer"
                >
                  {governorates.map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FaPhoneAlt className="text-sky-500" /> رقم الهاتف (واتساب)
              </label>
              <input 
                type="tel" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="07XX XXX XXXX"
                dir="ltr"
                className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition text-left"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FaRegEdit className="text-sky-500" /> ملاحظات إضافية (اختياري)
              </label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="أي تفاصيل أخرى تود إضافتها..."
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 text-black rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-sky-500 text-white font-black text-lg py-4 rounded-xl hover:bg-sky-600 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'جاري الإرسال...' : <><FaPaperPlane /> إرسال الطلب</>}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 font-bold">
              بالضغط على "إرسال الطلب"، أنت توافق على شروط الاستخدام وسياسة الخصوصية.
            </p>
          </form>
        </motion.div>
      </main>

      {/* 🔴 الفوتر المصغر (الروابط والأزرار فقط) */}
      <footer className="bg-white border-t border-gray-200 py-10 relative z-10 w-full mt-auto">
        <div className="container mx-auto px-6 flex flex-col items-center gap-8">
          
          {/* أزرار تحميل التطبيق */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-3.5 rounded-xl hover:bg-sky-600 transition-all font-bold shadow-md w-full sm:w-auto">
              <FaApple size={24} /> App Store
            </button>
            <button className="flex items-center justify-center gap-3 bg-white text-black border-2 border-sky-100 px-8 py-3.5 rounded-xl hover:border-sky-500 hover:text-sky-500 transition-all font-bold shadow-sm w-full sm:w-auto">
              <FaGooglePlay size={22} /> Google Play
            </button>
          </div>

          {/* روابط القوانين والخصوصية */}
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-500">
            <Link href="/privacy" className="hover:text-sky-500 transition flex items-center gap-2">
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