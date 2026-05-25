import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Clock, Award, Sparkles, MessageSquare, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function Hero({ onOpenCallback, heroData }) {
  const { lang, t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic slides based strictly on backend data
  const getSlides = () => {
    if (!heroData) return [];
    
    return [{
      tag: getLocalized(heroData, 'mini_title', lang) || "Safetech Engineering — Ташкент",
      title: getLocalized(heroData, 'title', lang) || "Профессиональный монтаж лифтов и эскалаторов под ключ",
      subtitle: lang === 'uz' ? "Har bir qavatda xavfsizlik" : lang === 'en' ? "Safety on every floor" : "Безопасность на каждом этаже",
      desc: getLocalized(heroData, 'desc', lang) || "Поставка, проектирование, установка и государственная аттестация лифтового оборудования любого типа.",
      buttonText: lang === 'uz' ? "Narxni hisoblash" : lang === 'en' ? "Calculate Cost" : "Рассчитать стоимость",
      bgImage: heroData.hero_bg || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop"
    }];
  };

  const slides = getSlides();

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-slate-950 min-h-[95vh] flex items-center pt-24 md:pt-[120px] overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 z-0"></div>
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-primary-950/70 border border-primary-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary-300 backdrop-blur-md uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {slides[currentSlide].tag}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.12]">
                  {slides[currentSlide].title}
                </h1>

                <div className="text-xl md:text-2xl font-semibold text-amber-500 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-amber-500 inline-block"></span>
                  {slides[currentSlide].subtitle}
                </div>

                <p className="text-sm md:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans font-light">
                  {slides[currentSlide].desc}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <button
                    onClick={onOpenCallback}
                    className="bg-primary-600 hover:bg-primary-500 hover:shadow-primary-500/20 text-white font-semibold text-base py-4 px-8 rounded-lg transition-all duration-300 shadow-xl shadow-primary-950 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    {slides[currentSlide].buttonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </button>

                  <a
                    href="https://t.me/bexruz_toj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white font-semibold text-base py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    {lang === 'uz' ? "Telegramda yozish" : lang === 'en' ? "Write in Telegram" : "Написать в Telegram"}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick specifications line */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-12 md:pt-16 border-t border-slate-850 mt-12">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-primary-900/40 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-white">
                    {lang === 'uz' ? 'GOST va KMK' : lang === 'en' ? 'GOST & KMK' : 'ГОСТ и КМК'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === 'uz' ? 'Normalarga to\'liq moslik' : lang === 'en' ? 'Full regulatory compliance' : 'Полное соответствие нормам'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-primary-900/40 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-white">
                    {lang === 'uz' ? '25 daq. yetib borish' : lang === 'en' ? '25 Min Response' : 'Выезд за 25 мин'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === 'uz' ? 'Tezkor 24/7 aloqa' : lang === 'en' ? 'Quick 24/7 dispatch' : 'Быстрое реагирование 24/7'}
                  </span>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-primary-900/40 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-white">
                    {lang === 'uz' ? '11+ yillik tajriba' : lang === 'en' ? '11+ Years Experience' : '11+ лет опыта'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === 'uz' ? 'Vaqt sinovidan o\'tgan' : lang === 'en' ? 'Time-tested quality' : 'Надежность проверена временем'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Presenter slide controllers */}
          {slides.length > 1 && (
            <div className="hidden lg:col-span-4 lg:flex justify-end items-center self-center pr-4">
              <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 flex flex-col gap-3 shadow-2xl">
                <span className="text-[10px] text-slate-400 font-mono text-center block uppercase tracking-wider border-b border-slate-800 pb-2">
                  {lang === 'uz' ? 'Taqdimot slayderi' : lang === 'en' ? 'Presentation Slider' : 'Слайдер презентации'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-center gap-1.5 pt-1">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === idx ? "bg-amber-500 w-5" : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
