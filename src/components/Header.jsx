import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageSquare, ShieldCheck, Globe, ChevronDown } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function Header({ onOpenCallback, onHomeReset, forceSolidBg = false, general, phones }) {
  const { lang, setLang, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.whyUs || "Преимущества", href: "#advantages" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.about.certs.title || "Сертификаты", href: "#certificates" },
    { name: t.nav.contact, href: "#contacts" }
  ];

  const handleLinkClick = (href) => {
    setIsOpen(false);
    if (onHomeReset) {
      onHomeReset();
    }
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  const currentBrandName = general?.brand_name || "SAFETECH";
  const navbarLogoUrl = general?.navbar_logo;

  const phoneToShow = phones?.[0]?.number || "+998 (71) 200-00-00";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          forceSolidBg || scrolled 
            ? "bg-slate-900/98 backdrop-blur-md shadow-lg py-3 border-b border-primary-800"
            : "bg-slate-950/80 backdrop-blur-sm md:bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              if (onHomeReset) {
                e.preventDefault();
                onHomeReset();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          >
            <div className="bg-primary-600 group-hover:bg-primary-500 text-white p-1.5 sm:p-2 rounded-lg transition-colors duration-300 relative shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              <div className="absolute inset-0 rounded-lg border border-white/20 scale-110 group-hover:scale-125 transition-transform duration-300"></div>
            </div>
            
            <div className="text-left flex flex-col justify-center min-w-0">
              <span className="font-display font-extrabold text-sm sm:text-lg lg:text-xl tracking-tight text-white block leading-tight truncate">
                {currentBrandName.toUpperCase().endsWith("ENGINEERING") || currentBrandName.toUpperCase().endsWith("ENGINEERING ") ? (
                  <>
                    {currentBrandName.toUpperCase().replace("ENGINEERING", "").trim()}
                    <span className="text-amber-500 font-semibold text-[9px] sm:text-[11px] lg:text-sm ml-1 tracking-wider uppercase">ENGINEERING</span>
                  </>
                ) : (
                  <>
                    <span className="truncate">{currentBrandName.toUpperCase()}</span>
                    <span className="text-amber-500 font-semibold text-[9px] sm:text-[11px] lg:text-sm ml-1 tracking-wider uppercase hidden sm:inline">ENGINEERING</span>
                  </>
                )}
              </span>
              <span className="text-[7px] sm:text-[9px] text-slate-400 block tracking-wider font-mono uppercase leading-tight mt-0.5 truncate">
                {lang === 'uz' ? 'Toshkentda liftlar & eskalatorlar' : lang === 'en' ? 'Elevators & escalators in Tashkent' : 'Лифты & Эскалаторы в Ташкенте'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-slate-300 hover:text-white font-sans text-[13px] xl:text-sm font-medium px-2.5 py-1.5 rounded-md hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Direct CTA contacts + Language Picker */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700/50 text-xs font-bold px-3 py-2 rounded-lg transition-all duration-200 select-none cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-primary-400" />
                <span className="uppercase">{lang}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-24 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50"
                  >
                    {["ru", "uz", "en"].map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-800 transition-colors uppercase ${
                          lang === l ? "text-amber-500" : "text-slate-300"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="https://t.me/bexruz_toj"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full transition-transform duration-200 hover:scale-105 shadow-md flex items-center justify-center cursor-pointer"
              title="Написать в Telegram"
            >
              <MessageSquare className="w-4.5 h-4.5" />
            </a>
            
            <button
              onClick={onOpenCallback}
              className="bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold px-4 py-2.5 rounded-md transition-all duration-300 shadow-lg shadow-primary-900/40 hover:-translate-y-0.5 border border-primary-500/20 cursor-pointer"
            >
              {lang === 'uz' ? 'Muhandis chaqirish' : lang === 'en' ? 'Call Engineer' : 'Вызвать инженера'}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 focus:outline-none cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating mobile navigation overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[60px] bg-slate-950/98 backdrop-blur-xl z-30 md:hidden flex flex-col justify-between p-6 border-b border-primary-900 overflow-y-auto"
          >
            {/* Nav links list */}
            <div className="flex flex-col gap-3 mt-2">
              {navLinks.map((link, idx) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left font-display font-semibold text-base text-slate-200 hover:text-amber-500 py-2 border-b border-white/5 cursor-pointer"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            {/* Language & Telegram controls */}
            <div className="flex flex-col gap-4 my-6">
              {/* Language Switcher */}
              <div className="flex flex-col gap-1.5 text-left">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-semibold">
                  {lang === 'uz' ? "Tilni tanlang" : lang === 'en' ? "Select Language" : "Выбор языка"}
                </span>
                <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
                  {["ru", "uz", "en"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg uppercase transition-all duration-200 ${
                        lang === l ? "bg-primary-600 text-white shadow-lg shadow-primary-900/10" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social CTA */}
              <div className="flex items-center gap-3">
                <a
                  href="https://t.me/bexruz_toj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-sky-650 hover:bg-sky-600 text-white py-3 rounded-xl transition-all duration-200 text-xs font-bold flex items-center justify-center gap-2 border border-sky-500/20"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  {lang === 'uz' ? "Telegramda bog'lanish" : lang === 'en' ? "Write in Telegram" : "Связаться в Telegram"}
                </a>
              </div>
            </div>

            {/* Call / Dispatch CTA */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="bg-slate-900 p-4.5 rounded-xl border border-primary-900/50 text-left">
                <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-mono mb-1">
                  {lang === 'uz' ? 'Favqulodda qo\'ng\'iroq 24/7' : lang === 'en' ? 'Emergency Call 24/7' : 'Аварийный вызов 24/7'}
                </span>
                <a href={`tel:${phoneToShow.replace(/[^\d+]/g, '')}`} className="text-white hover:text-amber-400 transition-colors text-lg font-bold font-sans flex items-center gap-2">
                  <Phone className="w-4.5 h-4.5 text-amber-500 fill-amber-500/10" />
                  {phoneToShow}
                </a>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenCallback();
                }}
                className="w-full bg-primary-600 hover:bg-primary-500 text-white text-center font-semibold text-xs py-3.5 rounded-xl transition-colors shadow-lg shadow-black/40 cursor-pointer"
              >
                {lang === 'uz' ? 'Hisoblash uchun ariza qoldirish' : lang === 'en' ? 'Submit Estimate Request' : 'Оставить заявку на расчет'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
