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
          <button
            onClick={handleScrollTop}
            className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-800 cursor-pointer flex items-center gap-1 text-xs"
            title="Наверх"
          >
            {lang === 'uz' ? "Tepaga" : lang === 'en' ? "Back to Top" : "Наверх"}
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
