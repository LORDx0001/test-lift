import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Clock, Award, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

const FALLBACK_SLIDES = [
  {
    tag: "Safetech Engineering — ТАШКЕНТ",
    title: "СОВЕРШЕННЫЕ\nЛИФТЫ ДЛЯ\nВАШЕГО ЗДАНИЯ",
    title_uz: "BINOINGIZ UCHUN\nMUKAMMAL\nLIFTLAR",
    title_en: "PERFECT\nELEVATORS FOR\nYOUR BUILDING",
    subtitle: "Безопасность на каждом этаже",
    subtitle_uz: "Har bir qavatda xavfsizlik",
    subtitle_en: "Safety on every floor",
    desc: "Мы занимаемся установкой, модернизацией и обслуживанием самых надежных и современных лифтов и эскалаторов в Узбекистане.",
    desc_uz: "Biz O'zbekistonda eng ishonchli va zamonaviy liftlarni o'rnatish, modernizatsiya qilish va xizmat ko'rsatish bilan shug'ullanamiz.",
    desc_en: "We specialize in the installation, modernization, and maintenance of the most reliable elevators and escalators in Uzbekistan.",
    buttonText: "Рассчитать стоимость",
    buttonText_uz: "Narxni hisoblash",
    buttonText_en: "Calculate Cost",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
  },
  {
    tag: "Монтаж — 15+ ЛЕТ ОПЫТА",
    title: "ПРОФЕССИОНАЛЬНЫЙ\nМОНТАЖ\nЛЮБОЙ СЛОЖНОСТИ",
    title_uz: "HAR QANDAY\nMURAKKABLIKDA\nPROFESSIONAL MONTAJ",
    title_en: "PROFESSIONAL\nINSTALLATION OF\nANY COMPLEXITY",
    subtitle: "Гарантия 3 года на все работы",
    subtitle_uz: "3 yillik kafolat barcha ishlarga",
    subtitle_en: "3-year warranty on all works",
    desc: "Собственные аттестованные монтажные бригады выполняют полный цикл: от проектирования шахты до сдачи Госпромнадзору.",
    desc_uz: "O'z attestatsiyalangan montaj brigadalarimiz to'liq siklni bajaradi: shaxtadan to nazorat topshirishgacha.",
    desc_en: "Our certified crews handle the complete cycle: from shaft engineering to official state inspection handover.",
    buttonText: "Получить консультацию",
    buttonText_uz: "Maslahat olish",
    buttonText_en: "Get a Consultation",
    bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop",
  },
  {
    tag: "Аварийная Служба 24/7",
    title: "КРУГЛОСУТОЧНЫЙ\nАВАРИЙНЫЙ\nВЫЕЗД ЗА 25 МИН",
    title_uz: "TUNU-KUN\n25 DAQIQADA\nAVARIYA XIZMATI",
    title_en: "24/7 EMERGENCY\nDISPATCH IN\nUNDER 25 MINUTES",
    subtitle: "Плановое ТО и срочный ремонт",
    subtitle_uz: "Rejalashtirilgan TO va shoshilinch ta'mir",
    subtitle_en: "Scheduled maintenance & urgent repairs",
    desc: "Аварийная служба патрулирует все районы Ташкента. Среднее время прибытия — 25 минут. Плановое ТО предотвращает до 92% поломок.",
    desc_uz: "Avariya xizmatimiz Toshkentning barcha tumanlarini qoplaydi. O'rtacha yetib borish — 25 daqiqa. TO buzilishlarning 92% oldini oladi.",
    desc_en: "Our emergency crews cover all Tashkent districts. Average arrival time 25 minutes. Preventive maintenance prevents 92% of failures.",
    buttonText: "Вызвать специалиста",
    buttonText_uz: "Mutaxassis chaqirish",
    buttonText_en: "Call a Specialist",
    bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function Hero({ onOpenCallback, heroData, heroSlides }) {
  const { lang } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Build slides from backend data or fall back gracefully
  const slides = (() => {
    // Use backend hero_slides if available and non-empty
    if (heroSlides && heroSlides.length > 0) {
      return heroSlides.map((s) => ({
        tag: getLocalized(s, "mini_title", lang) || "Safetech Engineering",
        title: getLocalized(s, "title", lang) || "",
        subtitle: getLocalized(s, "subtitle", lang) || "",
        desc: getLocalized(s, "desc", lang) || "",
        buttonText: getLocalized(s, "button_text", lang) || (lang === "uz" ? "Narxni hisoblash" : lang === "en" ? "Calculate Cost" : "Рассчитать стоимость"),
        bgImage: s.hero_bg || FALLBACK_SLIDES[0].bgImage,
      }));
    }
    // Fallback to static slides
    return FALLBACK_SLIDES.map((s) => ({
      tag: lang === "uz" ? s.tag : lang === "en" ? s.tag : s.tag,
      title: lang === "uz" ? s.title_uz : lang === "en" ? s.title_en : s.title,
      subtitle: lang === "uz" ? s.subtitle_uz : lang === "en" ? s.subtitle_en : s.subtitle,
      desc: lang === "uz" ? s.desc_uz : lang === "en" ? s.desc_en : s.desc,
      buttonText: lang === "uz" ? s.buttonText_uz : lang === "en" ? s.buttonText_en : s.buttonText,
      bgImage: s.bgImage,
    }));
  })();

  // Auto-advance timer
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length, lang]);

  // Reset to first slide when language changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [lang]);

  const slide = slides[currentSlide] || slides[0];

  return (
    <div className="relative bg-slate-950 min-h-[95vh] flex items-center pt-24 md:pt-[120px] overflow-hidden">
      
      {/* ── Background Image with smooth crossfade ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 z-0" />
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Main content that animates per slide ── */}
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSlide}-${lang}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Tag badge */}
                <div className="inline-flex items-center gap-2 bg-primary-950/70 border border-primary-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary-300 backdrop-blur-md uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {slide.tag}
                </div>

                {/* Main title — preserves \n newlines as whitespace */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.12] whitespace-pre-line">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <div className="text-xl md:text-2xl font-semibold text-amber-500 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-amber-500 inline-block" />
                  {slide.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm md:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans font-light">
                  {slide.desc}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <button
                    onClick={onOpenCallback}
                    className="bg-primary-600 hover:bg-primary-500 hover:shadow-primary-500/20 text-white font-semibold text-base py-4 px-8 rounded-lg transition-all duration-300 shadow-xl shadow-primary-950 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    {slide.buttonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </button>

                  <a
                    href="https://t.me/bexruz_toj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white font-semibold text-base py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    {lang === "uz" ? "Telegramda yozish" : lang === "en" ? "Write in Telegram" : "Написать в Telegram"}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom spec badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-12 md:pt-16 border-t border-slate-850 mt-12">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-primary-900/40 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-white">
                    {lang === "uz" ? "GOST va KMK" : lang === "en" ? "GOST & KMK" : "ГОСТ и КМК"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === "uz" ? "Normalarga to'liq moslik" : lang === "en" ? "Full regulatory compliance" : "Полное соответствие нормам"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-primary-900/40 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-white">
                    {lang === "uz" ? "25 daq. yetib borish" : lang === "en" ? "25 Min Response" : "Выезд за 25 мин"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === "uz" ? "Tezkor 24/7 aloqa" : lang === "en" ? "Quick 24/7 dispatch" : "Быстрое реагирование 24/7"}
                  </span>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-primary-900/40 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-white">
                    {lang === "uz" ? "15+ yillik tajriba" : lang === "en" ? "15+ Years Experience" : "15+ лет опыта"}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lang === "uz" ? "Vaqt sinovidan o'tgan" : lang === "en" ? "Time-tested quality" : "Надежность проверена временем"}
                  </span>
                </div>
              </div>
            </div>
            {/* ── Auto-play progress dots (read-only, no buttons) ── */}
            {slides.length > 1 && (
              <div className="flex items-center gap-2 pt-4">
                {slides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      currentSlide === idx
                        ? "bg-amber-500 w-8"
                        : "bg-slate-700 w-3"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
