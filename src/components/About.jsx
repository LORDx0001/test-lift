import { CheckCircle2 } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function About({ experience, experienceCards }) {
  const { lang } = useI18n();

  const highlights = experienceCards && experienceCards.length > 0
    ? experienceCards.map((card) => ({
        title: getLocalized(card, "title", lang),
        desc: getLocalized(card, "desc", lang)
      }))
    : [];

  const currentMiniTitle = getLocalized(experience, "mini_title", lang) || (lang === 'uz' ? "👷 Biz haqimizda" : lang === 'en' ? "👷 About Us" : "👷 О компании");
  const currentTitle = getLocalized(experience, "title", lang) || "Safetech Engineering — Высокие стандарты лифтовой индустрии";
  const currentDesc = getLocalized(experience, "desc", lang) || (lang === 'uz' ? "Biz loyihalash, o'rnatish, modernizatsiya qilish va liftlar va eskalatorlar uskunalarini kompleks xizmat ko'rsatish bo'yicha ixtisoslashgan injiiring kompaniyamiz." : lang === 'en' ? "We are a specialized engineering company focused on design, installation, modernization, and maintenance of elevator and escalator equipment." : "Мы являемся специализированной инжиниринговой компанией, специализирующейся на проектировании, монтаже, модернизации и комплексном сервисном обслуживании лифтового и эскалаторного оборудования.");

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              {currentMiniTitle}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              Safetech Engineering <br className="hidden sm:block" />
              <span className="text-primary-600">
                {lang === 'uz' ? "— Lift sanoatining yuksak standartlari" : lang === 'en' ? "— High Standards of the Elevator Industry" : "— Высокие стандарты лифтовой индустрии"}
              </span>
            </h2>

            <div className="text-base text-slate-600 leading-relaxed font-sans font-light space-y-4">
              <p>{currentDesc}</p>
              <p>
                {lang === 'uz' ? (
                  <>Bizning ustuvor vazifamiz har doim <strong>yo'lovchilar xavfsizligi</strong> hisoblanadi. Shuning uchun biz faqat original butlovchi qismlardan foydalanamiz, ishlab chiqaruvchilar reglamentlariga hamda O'zbekiston Respublikasining ShNK va KMK talablariga qat'iy rioya qilamiz.</>
                ) : lang === 'en' ? (
                  <>Our primary priority is always <strong>passenger safety</strong>. Therefore, we use only original spare parts and strictly follow the manuals of manufacturers, ShNK (Construction Norms), and KMK regulations of the Republic of Uzbekistan.</>
                ) : (
                  <>Основным приоритетом нашей работы всегда является <strong>безопасность пассажиров</strong>. Поэтому мы используем только оригинальные запасные части, жестко соблюдаем регламенты заводов-производителей, положения ШНК (Строительные Нормы и Правила) и КМК Республики Узбекистан.</>
                )}
              </p>
            </div>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100/80 hover:border-primary-100 transition-colors duration-200">
                  <div className="text-primary-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 leading-snug">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Presentation Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 select-none">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" 
                alt="Engineers working" 
                className="w-full h-[320px] sm:h-[400px] object-cover hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-md p-5 rounded-xl border border-white/10 text-white">
                <span className="text-[10px] text-amber-500 font-mono block uppercase tracking-wider mb-1">
                  {lang === 'uz' ? "Xavfsizlik Kafolati" : lang === 'en' ? "Safety Guarantee" : "Гарантия Безопасности"}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                  {lang === 'uz' ? (
                    <>Montajning har bir bosqichi elektron sifat pasportida qayd etiladi va O'zbekiston Respublikasi sanoat xavfsizligi inspektorlariga topshiriladi.</>
                  ) : lang === 'en' ? (
                    <>Every installation stage is logged in the quality passport and certified by the State Industrial Safety Inspectors of Uzbekistan.</>
                  ) : (
                    <>Каждый этап монтажа фиксируется в электронном паспорте качества и сдается инспекторам промышленной безопасности Республики Узбекистан.</>
                  )}
                </p>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10 animate-float" style={{ animationDelay: "2s" }}></div>
            
            <div className="absolute -top-6 -left-6 bg-primary-600 text-white p-4.5 rounded-xl shadow-xl hidden sm:block border border-primary-500 select-none">
              <span className="block text-3xl font-display font-extrabold">100%</span>
              <span className="block text-[10px] uppercase font-mono tracking-wider opacity-80">
                {lang === 'uz' ? "Sifat nazorati" : lang === 'en' ? "Quality Control" : "Контроль качества"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
