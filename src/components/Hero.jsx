import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Clock, Award, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

// Icon map for the 3 bottom badges
const BADGE_ICONS = [Shield, Clock, Award];

export default function Hero({ onOpenCallback, heroData, heroSlides, general }) {
  const { lang } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Build slides purely from backend — fallback to a default slide if nothing seeded yet
  const slides = (heroSlides && heroSlides.length > 0)
    ? heroSlides.map((s) => ({
        tag:        getLocalized(s, "mini_title", lang) || "",
        title:      getLocalized(s, "title", lang)      || "",
        subtitle:   getLocalized(s, "subtitle", lang)   || "",
        desc:       getLocalized(s, "desc", lang)        || "",
        buttonText: getLocalized(s, "button_text", lang) || "",
        bgImage:    s.hero_bg || "",
      }))
    : [
        {
          tag: "SAFETECH ENGINEERING",
          title: lang === "uz" ? "MUKAMMAL LIFTLAR" : lang === "en" ? "PREMIUM ELEVATORS" : "СОВЕРШЕННЫЕ ЛИФТЫ",
          desc: lang === "uz" ? "Ma'lumotlar bazasi bo'sh. Iltimos, admin panel orqali slayd qo'shing yoki seed qiling." : "База данных пуста. Пожалуйста, добавьте слайды через админ-панель или запустите seed.",
          buttonText: "Admin",
          bgImage: "https://images.unsplash.com/photo-1574627042598-cbce682c9fcd?q=80&w=1920&auto=format&fit=crop"
        }
      ];

  // Bottom badges — from general settings
  const badges = general
    ? [
        {
          icon: BADGE_ICONS[0],
          value: general[`badge1_value_${lang}`] || general.badge1_value_ru || "",
          label: general[`badge1_label_${lang}`] || general.badge1_label_ru || "",
        },
        {
          icon: BADGE_ICONS[1],
          value: general[`badge2_value_${lang}`] || general.badge2_value_ru || "",
          label: general[`badge2_label_${lang}`] || general.badge2_label_ru || "",
        },
        {
          icon: BADGE_ICONS[2],
          value: general[`badge3_value_${lang}`] || general.badge3_value_ru || "",
          label: general[`badge3_label_${lang}`] || general.badge3_label_ru || "",
        },
      ].filter((b) => b.value)
    : [];

  const telegramUrl = general?.telegram_url || "";

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length, lang]);

  // Reset on language change
  useEffect(() => {
    setCurrentSlide(0);
  }, [lang]);

  // Nothing to show if no slides
  if (slides.length === 0) return null;

  const slide = slides[currentSlide] || slides[0];

  return (
    <div className="relative bg-slate-950 min-h-[95vh] flex items-center pt-24 md:pt-[120px] overflow-hidden">

      {/* ── Background crossfade ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: slide.bgImage ? `url(${slide.bgImage})` : undefined }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 z-0" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full py-12 md:py-20">
        <div className="lg:col-span-12">

          {/* ── Animated slide content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide}-${lang}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6 max-w-3xl"
            >
              {/* Tag badge */}
              {slide.tag && (
                <div className="inline-flex items-center gap-2 bg-primary-950/70 border border-primary-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary-300 backdrop-blur-md uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {slide.tag}
                </div>
              )}

              {/* Title */}
              {slide.title && (
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.12] whitespace-pre-line">
                  {slide.title}
                </h1>
              )}

              {/* Subtitle */}
              {slide.subtitle && (
                <div className="text-xl md:text-2xl font-semibold text-amber-500 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-amber-500 inline-block" />
                  {slide.subtitle}
                </div>
              )}

              {/* Description */}
              {slide.desc && (
                <p className="text-sm md:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans font-light">
                  {slide.desc}
                </p>
              )}

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                {slide.buttonText && (
                  <button
                    onClick={onOpenCallback}
                    className="bg-primary-600 hover:bg-primary-500 text-white font-semibold text-base py-4 px-8 rounded-lg transition-all duration-300 shadow-xl shadow-primary-950 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    {slide.buttonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                )}

                {telegramUrl && (
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white font-semibold text-base py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    {lang === "uz" ? "Telegramda yozish" : lang === "en" ? "Write in Telegram" : "Написать в Telegram"}
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom badges from GeneralSetting ── */}
          {badges.length > 0 && (
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-4 pt-12 md:pt-16 border-t border-slate-800 mt-12 max-w-3xl">
              {badges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className={`flex items-center gap-3 text-slate-300 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                    <div className="w-10 h-10 rounded-lg bg-primary-900/40 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-sm text-white">{badge.value}</span>
                      <span className="text-xs text-slate-400">{badge.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Progress dots ── */}
          {slides.length > 1 && (
            <div className="flex items-center gap-2 pt-6">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    currentSlide === idx ? "bg-amber-500 w-8" : "bg-slate-700 w-3"
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
