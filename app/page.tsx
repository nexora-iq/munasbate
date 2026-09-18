"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { 
  FaApple, FaGooglePlay, FaBuilding, FaInfoCircle, 
  FaCheckCircle, FaHandshake, FaShieldAlt, FaFileContract,
  FaDownload, FaQuestionCircle, FaStar
} from 'react-icons/fa';

// ==========================================
// 1. شاشة الدخول (لوغو + MUNASABATI بالانجليزي)
// ==========================================
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState(0); 
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showSkipPrompt, setShowSkipPrompt] = useState(false);
  const [shifted, setShifted] = useState(false); 

  const phrases = [
    { ar: "نركز على أدق التفاصيل..." },
    { ar: "...لنجعل مناسباتك لا تُنسى" },
    { ar: "لأن فرحتك تهمنا." }
  ];

  useEffect(() => {
    if (isVisible) document.body.style.overflow = "hidden";
    else { document.body.style.overflow = "unset"; onComplete(); }
    return () => { document.body.style.overflow = "unset"; };
  }, [isVisible, onComplete]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === 0) {
      if (currentPhrase >= 2) setShowSkipPrompt(true);
      timer = setTimeout(() => {
        if (currentPhrase < phrases.length - 1) setCurrentPhrase(p => p + 1);
        else setStage(1);
      }, 2500); 
    } else if (stage === 1) {
      setShowSkipPrompt(true); 
      const shiftTimer = setTimeout(() => setShifted(true), 1200); 
      const autoClose = setTimeout(() => setIsVisible(false), 5000);
      return () => { clearTimeout(shiftTimer); clearTimeout(autoClose); };
    }
    return () => clearTimeout(timer);
  }, [currentPhrase, stage, phrases.length]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={() => setIsVisible(false)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden cursor-pointer"
        >
          <div className="absolute w-[70vw] h-[70vw] max-w-4xl max-h-4xl bg-sky-100/50 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center">
            <AnimatePresence mode="wait">
              {stage === 0 ? (
                <motion.div
                  key={`phrase-${currentPhrase}`}
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }} 
                  className="max-w-4xl w-full mx-auto px-2 sm:px-0"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-sky-600 leading-relaxed drop-shadow-sm" dir="rtl">
                    {phrases[currentPhrase].ar}
                  </h2>
                </motion.div>
              ) : (
                <motion.div key="logo-stage" layout className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 px-3">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(15px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, type: "spring", bounce: 0.4, ease: "easeOut" }}
                    className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 z-10"
                  >
                    <Image src="/logo.png" alt="Munasabati Logo" fill priority className="object-contain drop-shadow-2xl" />
                  </motion.div>

                  <AnimatePresence>
                    {shifted && (
                     <motion.div
                        layout
                        dir="ltr" 
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.10 } } }}
                        className="flex mt-1 md:mt-0"
                      >
                        {"MUNASABATI".split("").map((char, index) => (
                          <motion.span
                            key={index}
                            variants={{
                              hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
                              show: { opacity: 1, x: 0, filter: "blur(0px)" }
                            }}
                            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-black tracking-[0.25em] sm:tracking-widest"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showSkipPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center z-20 px-4"
              >
                <span className="text-gray-400 font-bold text-xs sm:text-sm md:text-base animate-pulse">
                  اضغط في أي مكان للمتابعة
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// 2. الموقع الرئيسي
// ==========================================
export default function LandingPage() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContent, setShowContent] = useState(false); 

  useEffect(() => {
    const fetchMedia = async () => {
      const cachedMedia = localStorage.getItem('website_media_cache');
      if (cachedMedia) setMediaItems(JSON.parse(cachedMedia));
      else setMediaItems([{ media_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop', media_type: 'image' }]);

      const { data } = await supabase
        .from('website_media')
        .select('media_url,media_type,created_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setMediaItems(data);
        localStorage.setItem('website_media_cache', JSON.stringify(data));
      }
    };
    fetchMedia();
  }, []);

  useEffect(() => {
    if (mediaItems.length <= 1) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % mediaItems.length), 6000);
    return () => clearInterval(interval);
  }, [mediaItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // إضافة النوع Variants لحل المشكلة
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <Preloader onComplete={() => setShowContent(true)} />

      <div className={`min-h-screen flex flex-col bg-white text-black font-sans overflow-x-hidden ${!showContent ? 'hidden' : ''}`} dir="rtl">
        
        <style>{`
          @keyframes shine {
            0% { left: -100%; }
            20% { left: 100%; }
            100% { left: 100%; }
          }
          .btn-shine {
            position: relative;
            overflow: hidden;
          }
          .btn-shine::after {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
            transform: skewX(-20deg);
            animation: shine 3s infinite;
          }
          .mobile-card-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .mobile-card-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* الهيدر */}
        <nav className="fixed top-0 w-full h-[72px] sm:h-[80px] md:h-[90px] z-50 bg-white/95 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.05)] border-b border-sky-100 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center w-full gap-3">
            
            <div className="relative w-24 h-12 sm:w-32 sm:h-16 md:w-48 md:h-20 cursor-pointer shrink-0" onClick={() => scrollToSection('hero')}>
              <Image src="/logo.png" alt="Munasabati Logo" fill className="object-contain" />
            </div>
            
            <div className="hidden lg:flex gap-8 font-bold text-gray-800 text-base">
              <button onClick={() => scrollToSection('downloads')} className="hover:text-sky-500 transition flex items-center gap-1"><FaDownload/> حمل التطبيق الآن</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-sky-500 transition flex items-center gap-1"><FaQuestionCircle/> ما هو مناسبتي؟</button>
              <button onClick={() => scrollToSection('join-us')} className="hover:text-sky-500 transition flex items-center gap-1"><FaBuilding/> انضم كشريك</button>
            </div>

            <Link href="/join" className="btn-shine flex items-center justify-center gap-1.5 sm:gap-2 bg-sky-500 text-white border border-sky-600 px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-full whitespace-nowrap hover:bg-sky-600 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all font-bold text-sm shadow-md">
              <FaBuilding size={14} className="sm:hidden" /> <FaBuilding size={16} className="hidden sm:block" /> سجل قاعتك الآن
            </Link>
          </div>
        </nav>

        {/* השاشة الإعلانية (Hero) */}
        <section id="hero" className="relative mt-[72px] sm:mt-[80px] md:mt-[90px] h-[62vh] min-h-[420px] sm:h-[70vh] md:h-[calc(100vh-90px)] md:min-h-0 flex bg-black overflow-hidden pointer-events-none">
          {mediaItems.map((media, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}>
              {media.media_type === 'video' ? (
                <video autoPlay loop muted playsInline className="object-cover w-full h-full">
                  <source src={media.media_url} type="video/mp4" />
                </video>
              ) : (
                <img src={media.media_url} alt="Munasabati" className="object-cover w-full h-full" />
              )}
            </div>
          ))}
        </section>

        {/* قسم: تحميل التطبيق والنصوص الأساسية */}
        <section id="downloads" className="py-14 sm:py-20 lg:py-24 bg-sky-50 border-b border-sky-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full text-center lg:text-right"
            >
              <div className="inline-flex items-center justify-center gap-2 bg-white px-5 py-2 rounded-full text-sm font-bold text-sky-600 mb-6 border border-sky-200 shadow-sm mx-auto lg:mx-0">
                <FaStar className="text-yellow-400" /> دليلك الأول في العراق
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 sm:mb-6 text-black leading-tight drop-shadow-sm">
                احجز قاعة أحلامك <br /> <span className="text-sky-500">بضغطة زر.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-4">
                تصفح، قارن، واحجز قاعة مناسبتك القادمة بكل سهولة. أكبر تشكيلة من القاعات بين يديك بتجربة مستخدم لا مثيل لها.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full grid grid-cols-2 sm:flex sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-6"
            >
              <button className="flex items-center justify-center gap-2 sm:gap-4 bg-black text-white w-full sm:w-64 py-3 sm:py-4 rounded-2xl hover:bg-sky-600 hover:-translate-y-1 transition-all shadow-xl">
                <FaApple size={28} className="sm:w-9 sm:h-9" />
                <div className="text-right">
                  <div className="text-xs text-gray-300 font-bold uppercase tracking-wider">حمله من</div>
                  <div className="text-base sm:text-xl font-black">App Store</div>
                </div>
              </button>

              <button className="flex items-center justify-center gap-2 sm:gap-4 bg-white text-black border-2 border-sky-200 w-full sm:w-64 py-3 sm:py-4 rounded-2xl hover:border-sky-500 hover:-translate-y-1 transition-all shadow-md">
                <FaGooglePlay size={26} className="text-sky-500 sm:w-8 sm:h-8" />
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">احصل عليه من</div>
                  <div className="text-base sm:text-xl font-black">Google Play</div>
                </div>
              </button>
            </motion.div>

          </div>
        </section>

        {/* قسم: ما هو تطبيق مناسبتي؟ */}
        <section id="about" className="py-14 sm:py-20 lg:py-24 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 sm:mb-6 text-black">ما هو تطبيق <span className="text-sky-500">مناسبتي</span>؟</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                منصة متكاملة تجمع لك أفضل القاعات للمناسبات، الأعراس، والمؤتمرات في مكان واحد لتسهيل عملية الاختيار والحجز.
              </p>
            </motion.div>
            
            <div className="md:grid md:grid-cols-3 md:gap-8 flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory mobile-card-scroll">
              {[
                { icon: <FaCheckCircle size={32} />, title: "خيارات واسعة", desc: "تصفح مئات القاعات، شاهد الصور والفيديوهات، وتعرف على الأسعار والخدمات بشفافية تامة." },
                { icon: <FaShieldAlt size={32} />, title: "حجز آمن وموثوق", desc: "نضمن لك حجوزات مؤكدة وتواصل مباشر مع إدارة القاعة لضمان نجاح مناسبتك." },
                { icon: <FaInfoCircle size={32} />, title: "تفاصيل دقيقة", desc: "اعرف سعة القاعة، موقعها على الخريطة، الخدمات الإضافية، وتقييمات الزبائن السابقين." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                  className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border-2 border-black/5 shrink-0 w-[82vw] sm:w-[70vw] md:w-auto snap-start hover:border-sky-500 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="bg-sky-50 text-sky-500 border border-sky-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم: الانضمام كشريك */}
        <section id="join-us" className="py-14 sm:py-20 lg:py-24 bg-sky-50 border-t border-sky-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-1/2 w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 sm:mb-6 text-black leading-tight">
                هل تملك قاعة؟ <br/> كن <span className="text-sky-500">شريكاً للنجاح.</span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-lg">
                ضاعف حجوزاتك، اعرض قاعتك لآلاف المستخدمين، وأدر أعمالك من لوحة تحكم احترافية.
              </p>
              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 text-gray-800 font-bold text-base sm:text-lg">
                <li className="flex items-start gap-2.5 sm:gap-3"><div className="text-sky-500 shrink-0 mt-0.5"><FaCheckCircle size={20} className="sm:w-6 sm:h-6" /></div> عرض احترافي لصور وفيديوهات قاعتك.</li>
                <li className="flex items-start gap-2.5 sm:gap-3"><div className="text-sky-500 shrink-0 mt-0.5"><FaCheckCircle size={20} className="sm:w-6 sm:h-6" /></div> لوحة تحكم خاصة لإدارة الحجوزات.</li>
                <li className="flex items-start gap-2.5 sm:gap-3"><div className="text-sky-500 shrink-0 mt-0.5"><FaCheckCircle size={20} className="sm:w-6 sm:h-6" /></div> دعم فني متواصل وحملات تسويقية.</li>
              </ul>
              <Link href="/join" className="btn-shine w-full sm:w-auto justify-center inline-flex items-center gap-2 sm:gap-3 bg-black text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg hover:bg-gray-900 shadow-2xl">
                <FaHandshake size={28} className="text-sky-500" /> أضف قاعتك في تطبيقنا الآن
              </Link>
            </motion.div>

            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-1/2 w-full">
              <div className="bg-white border-2 border-sky-100 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl w-full">
                <div className="space-y-6 sm:space-y-8">
                  {[
                    { num: "1", title: "املأ الاستمارة", desc: "أدخل بياناتك الأساسية واسم قاعتك." },
                    { num: "2", title: "التواصل والتحقق", desc: "سيقوم فريقنا بالتواصل معك لتأكيد البيانات." },
                    { num: "3", title: "استقبل الحجوزات", desc: "سيتم نشر قاعتك واستلام لوحة التحكم." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 sm:gap-6 items-start">
                      <div className="bg-sky-500 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black shrink-0 text-xl sm:text-2xl shadow-md">{step.num}</div>
                      <div>
                        <h4 className="font-bold text-lg sm:text-xl mb-1 text-black">{step.title}</h4>
                        <p className="text-gray-500 text-sm sm:text-base">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

       {/* הפوتر (أسود ضبابي عميق وفخم جداً) */}
        <footer className="bg-black/90 backdrop-blur-2xl py-10 sm:py-14 lg:py-16 border-t-4 border-sky-500 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-10 text-right mb-8 sm:mb-12 border-b border-white/10 pb-8 sm:pb-12">
              
              <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start gap-3 sm:gap-4 text-center lg:text-right">
                <div className="relative w-36 h-16 sm:w-48 sm:h-20">
                   <Image src="/logo.png" alt="Munasabati Logo" fill className="object-contain" />
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  المنصة الأولى والوحيدة في العراق المتخصصة في حجز وإدارة القاعات بأحدث التقنيات.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-white font-black text-base sm:text-xl mb-1 sm:mb-2 text-sky-500">روابط سريعة</h3>
                <button onClick={() => scrollToSection('downloads')} className="text-gray-300 hover:text-sky-400 transition text-right font-bold flex items-start gap-2 text-xs sm:text-base leading-relaxed"><FaDownload/> حمل التطبيق الآن</button>
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-sky-400 transition text-right font-bold flex items-start gap-2 text-xs sm:text-base leading-relaxed"><FaQuestionCircle/> ما هو تطبيق مناسبتي</button>
                <Link href="/join" className="text-gray-300 hover:text-sky-400 transition text-right font-bold flex items-start gap-2 text-xs sm:text-base leading-relaxed"><FaBuilding/> أضف قاعتك في تطبيقنا</Link>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-white font-black text-base sm:text-xl mb-1 sm:mb-2 text-sky-500">القوانين والخصوصية</h3>
                <Link href="/privacy" className="text-gray-300 hover:text-sky-400 transition font-bold flex items-start gap-2 text-xs sm:text-base leading-relaxed"><FaShieldAlt/> سياسة الخصوصية</Link>
                <Link href="/terms" className="text-gray-300 hover:text-sky-400 transition font-bold flex items-start gap-2 text-xs sm:text-base leading-relaxed"><FaFileContract/> الشروط والأحكام</Link>
              </div>

              <div className="col-span-2 lg:col-span-1 flex flex-col gap-3 sm:gap-4">
                <h3 className="text-white font-black text-base sm:text-xl mb-1 sm:mb-2 text-sky-500">حمل التطبيق</h3>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-4">
                  <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-base hover:bg-sky-600 hover:border-sky-500 transition-all">
                    <FaApple size={20} className="sm:w-6 sm:h-6" /> App Store
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-base hover:bg-sky-600 hover:border-sky-500 transition-all">
                    <FaGooglePlay size={19} className="sm:w-[22px] sm:h-[22px]" /> Google Play
                  </button>
                </div>
              </div>

            </div>
            
            <div className="text-center text-gray-400 text-[11px] sm:text-sm font-bold tracking-normal sm:tracking-widest uppercase">
              © {new Date().getFullYear()} MUNASABATI. ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}