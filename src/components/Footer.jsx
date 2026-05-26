import { ShieldCheck, ArrowUp } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function Footer({ onOpenCallback, general, phones, emails }) {
  const { lang, t } = useI18n();
  
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addressToShow = getLocalized(general, "address", lang) || "Ташкент, Яккасарайский район, Шота Руставели 45";
  const emailToShow = emails?.[0]?.email || "info@safetech-engineering.uz";
  const phoneToShow = phones?.[0]?.number || "+998 (71) 200-00-00";

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 font-sans relative">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1 - Brand Info */}
          <div className="md:col-span-4 text-left space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-black text-lg tracking-tight text-white block">
                  {general?.brand_name?.toUpperCase() || "SAFETECH"}
                </span>
                <span className="text-[9px] text-slate-500 block tracking-widest uppercase">
                  ENGINEERING
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              {lang === 'uz' ? (
                <>O'zbekistonda liftlar, eskalatorlar, travolatorlar va boshqa yuk ko'tarish platformalarini montaj qilish, xizmat ko'rsatish, ta'mirlash va kompleks modernizatsiya qilish. Har bir qavatda xavfsizlik kafolatlangan litsenziyalangan muhandislik.</>
              ) : lang === 'en' ? (
                <>Installation, maintenance, repair, and complete modernization of elevators, escalators, moving walks, and other lifting platforms in Uzbekistan. Licensed engineering with safety guaranteed on every floor.</>
              ) : (
                <>Монтаж, обслуживание, ремонт и комплексная модернизация лифтов, эскалаторов, траволаторов и прочих подъемных платформ в Узбекистане. Лицензированный инжиниринг с гарантией безопасности на каждом этаже.</>
              )}
            </p>
            <div className="text-[11px] text-slate-650">
              © {general?.brand_name || "Safetech"} Engineering, Tashkent 2026. <br className="hidden sm:block" /> {lang === 'uz' ? "Barcha huquqlar himoyalangan." : lang === 'en' ? "All rights reserved." : "Все права защищены."}
            </div>
          </div>

          {/* Column 2 - Activities */}
          <div className="md:col-span-3 text-left space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono">
              {lang === 'uz' ? "Faoliyat yo'nalishlari" : lang === 'en' ? "Core Offerings" : "Направления деятельности"}
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="#services" className="hover:text-white transition-colors">{lang === 'uz' ? "Yo'lovchi liftlarini montaj qilish" : lang === 'en' ? "Passenger Elevator Installation" : "Монтаж пассажирских лифтов"}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">{lang === 'uz' ? "Liftlarga tunu-kun xizmat ko'rsatish" : lang === 'en' ? "24/7 Elevator Maintenance" : "Обслуживание лифтов 24/7"}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">{lang === 'uz' ? "Kabinalarni modernizatsiya qilish" : lang === 'en' ? "Cabin & Traction Modernization" : "Модернизация кабин и КВШ"}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">{lang === 'uz' ? "Eskalatorlar va travolatorlar" : lang === 'en' ? "Escalators & Moving Walks" : "Эскалаторы и траволаторы"}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">{lang === 'uz' ? "Klinika va shifoxona liftlari" : lang === 'en' ? "Hospital & Accessibility Lifts" : "Больничные и инвалидные лифты"}</a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Nav */}
          <div className="md:col-span-2 text-left space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono">
              {lang === 'uz' ? "Sayt navigatsiyasi" : lang === 'en' ? "Navigation" : "Навигация сайта"}
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-white transition-colors">{t.nav.whyUs || "Преимущества"}</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">{t.nav.projects}</a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-white transition-colors">{lang === 'uz' ? "Litsenziyalar" : lang === 'en' ? "Clearances" : "Лицензии РУз"}</a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contacts */}
          <div className="md:col-span-3 text-left space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono">
              {lang === 'uz' ? "Toshkentdagi kontaktlar" : lang === 'en' ? "Tashkent Contacts" : "Контакты в Ташкенте"}
            </h4>
            <div className="text-xs font-light space-y-2.5">
              <p>
                <strong>{lang === 'uz' ? "Ofis:" : lang === 'en' ? "Office:" : "Офис:"}</strong> {addressToShow}
              </p>
              <p>
                <strong>{lang === 'uz' ? "Email:" : "Email:"}</strong> <a href={`mailto:${emailToShow}`} className="hover:text-white transition-colors">{emailToShow}</a>
              </p>
              <p>
                <strong>{lang === 'uz' ? "Telefon:" : lang === 'en' ? "Phone:" : "Телефон:"}</strong> <a href={`tel:${phoneToShow.replace(/[^\d+]/g, '')}`} className="hover:text-white text-slate-300 font-semibold transition-colors">{phoneToShow}</a>
              </p>
              <div>
                <button
                  type="button"
                  onClick={onOpenCallback}
                  className="bg-primary-950 hover:bg-primary-900 hover:text-white border border-primary-800/40 text-slate-300 font-semibold text-[10px] uppercase tracking-widest px-4 py-2 rounded transition-all cursor-pointer block"
                >
                  {lang === 'uz' ? "Smeta so'rash" : lang === 'en' ? "Request Estimate" : "Заказать расчет КП"}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[11px] text-slate-600 text-center sm:text-left">
            {lang === 'uz' ? (
              <>Liftlarni loyihalash va qo'llab-quvvatlash EN81, ASME A17.1 hamda GOST normalariga muvofiq amalga oshiriladi.</>
            ) : lang === 'en' ? (
              <>Elevator design, engineering, and maintenance are carried out in full compliance with EN81, ASME A17.1, and GOST regulations.</>
            ) : (
              <>Проектирование и сопровождение лифтов в соответствии со стандартами EN81, ASME A17.1, ГОСТ Р 53780-2010. Лифты сертифицированы по ТР ТС.</>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mr-2 sm:mr-6">
              {general?.telegram_url && (
                <a href={general.telegram_url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-500 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.98 1.26-5.59 3.7-.53.36-1.01.54-1.44.53-.48-.01-1.38-.27-2.06-.49-.83-.27-1.49-.41-1.43-.87.03-.24.36-.49 1-.76 3.91-1.7 6.51-2.82 7.82-3.36 3.72-1.54 4.49-1.81 5-1.82.11 0 .35.03.48.14.11.09.14.22.14.33-.01.12-.01.27-.03.45z"/>
                  </svg>
                </a>
              )}
              {general?.instagram_url && (
                <a href={general.instagram_url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-500 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {general?.facebook_url && (
                <a href={general.facebook_url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              )}
            </div>
            <button
              onClick={handleScrollTop}
              className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-800 cursor-pointer flex items-center gap-1 text-xs"
              title="Наверх"
            >
              <span className="hidden sm:inline">{lang === 'uz' ? "Tepaga" : lang === 'en' ? "Back to Top" : "Наверх"}</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
