import { ShieldAlert, Settings, FileSpreadsheet, Clock, Award, Compass, ShieldCheck } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

function getAdvantageIcon(name) {
  switch (name) {
    case "ShieldAlert":
      return <ShieldAlert className="w-6 h-6 text-amber-500" />;
    case "Settings":
      return <Settings className="w-6 h-6 text-primary-500" />;
    case "FileSpreadsheet":
      return <FileSpreadsheet className="w-6 h-6 text-emerald-500" />;
    case "Clock":
      return <Clock className="w-6 h-6 text-sky-500 animate-pulse-subtle" />;
    case "Award":
      return <Award className="w-6 h-6 text-purple-500" />;
    case "Compass":
      return <Compass className="w-6 h-6 text-cyan-500" />;
    default:
      return <ShieldCheck className="w-6 h-6 text-amber-500" />;
  }
}

export default function Advantages({ advantages, advantageCards }) {
  const { lang } = useI18n();

  if (!advantageCards || advantageCards.length === 0) return null;

  const currentMiniTitle = getLocalized(advantages, "mini_title", lang) || (lang === 'uz' ? "🛡️ Nima uchun biz" : lang === 'en' ? "🛡️ Why Us" : "🛡️ Почему выбирают нас");
  const currentTitle = getLocalized(advantages, "title", lang) || (lang === 'uz' ? "Vaqt sinovidan o'tgan ishonchlilik standartlari" : lang === 'en' ? "Time-tested Standards of Safety & Reliability" : "Стандарты надежности, проверенные временем");
  const currentDesc = getLocalized(advantages, "desc", lang) || (lang === 'uz' ? "Safetech Engineering o'z obro'sini o'rnatilgan har bir rels va dasturlashtirilgan har bir kontroller sifatiga asoslaydi." : lang === 'en' ? "Safetech Engineering builds its corporate reputation on uncompromising quality of every rail installed and every controller programmed." : "Safetech Engineering строит свою репутацию на бескомпромиссном качестве каждой смонтированной рельсы и каждого запрограммированного контроллера.");

  return (
    <section id="advantages" className="py-20 bg-white scroll-mt-16">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-950 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            {currentMiniTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            {currentTitle}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-sans font-light">
            {currentDesc}
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantageCards.map((adv) => (
            <div 
              key={adv.id}
              className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-2xl flex flex-col items-start gap-4 hover:shadow-lg hover:bg-white hover:border-slate-200/80 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center shrink-0">
                {getAdvantageIcon(adv.icon)}
              </div>
              <div className="space-y-2 text-left">
                <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                  {getLocalized(adv, "title", lang)}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-light">
                  {getLocalized(adv, "desc", lang)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Security Section */}
        <div className="mt-16 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative border border-primary-900 select-none">
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-primary-950/80 to-transparent"></div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 text-primary-900/10 -z-0">
            <ShieldCheck className="w-full h-full stroke-[0.3]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
            <div className="lg:col-span-8 text-left space-y-4">
              <span className="text-xs text-amber-500 uppercase font-mono tracking-widest font-semibold">
                {lang === 'uz' ? "Davlat nazorati standartlari" : lang === 'en' ? "State Safety Control Standards" : "Стандарты государственного контроля"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                {lang === 'uz' ? "Xavfsizlik davlat organlari tomonidan tasdiqlangan" : lang === 'en' ? "Safety Certified by State Authorities" : "Безопасность подтверждена Узгостехнадзором"}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-sans font-light">
                {lang === 'uz' ? (
                  <>Biz o'rnatayotgan barcha liftlar majburiy ravishda Davlat sanoat nazorati organi tomonidan sinovdan o'tkaziladi. Har qanday xavfni bartaraf etish hamda buyurtmachiga foydalanish uchun rasmiy ruxsatnomani topshirish maqsadida hujjatlar to'plamini to'liq o'zimiz tayyorlaymiz, yuklar bilan dinamik va statik sinovlarni amalga oshiramiz.</>
                ) : lang === 'en' ? (
                  <>All elevators installed by our teams undergo mandatory state industrial safety inspections. We prepare the complete documentation, perform dynamic/static load tests with physical weights to fully mitigate risk and grant legal operations clearance to developer clients.</>
                ) : (
                  <>Все устанавливаемые нами лифты проходят обязательную проверку в Республиканском органе промышленного надзора. Мы самостоятельно готовим полный комплект документации, проводим статические и динамические испытания лифтов с грузами, чтобы исключить любые риски и выдать застройщику легитимное разрешение на эксплуатацию.</>
                )}
              </p>
            </div>
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl w-full max-w-xs">
                <span className="block text-amber-500 font-display font-extrabold text-4xl mb-1">
                  0%
                </span>
                <span className="block text-white text-xs font-semibold uppercase tracking-wider">
                  {lang === 'uz' ? "Favqulodda hodisalar" : lang === 'en' ? "Emergency Accidents" : "Аварийных инцидентов"}
                </span>
                <p className="text-[10px] text-slate-400 mt-2 font-sans font-light">
                  {lang === 'uz' ? (
                    <>O'zbekiston Respublikasida lift va ko'tarish uskunalarini o'rnatish hamda ta'mirlash bo'yicha 11 yillik faoliyatimiz davomida.</>
                  ) : lang === 'en' ? (
                    <>Across 11 years of installing, debugging, and servicing vertical mobility machinery in the Republic of Uzbekistan.</>
                  ) : (
                    <>За 11 лет монтажа и ремонта подъемного оборудования в Республике Узбекистан.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
