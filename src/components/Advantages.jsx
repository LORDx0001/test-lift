import { ShieldAlert, Settings, FileSpreadsheet, Clock, Award, Compass, ShieldCheck } from "lucide-react";
import { useI18n } from "../i18n";

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

export default function Advantages() {
  const { lang, t } = useI18n();

  const advantagesList = [
    {
      id: "safety",
      title: lang === 'uz' ? "Birinchi navbatda xavfsizlik" : lang === 'en' ? "Safety Above All" : "Безопасность превыше всего",
      description: lang === 'uz' ? "Ko'p bosqichli sifat tizimi: sertifikatlangan tezlik cheklovchilari, silliq tormozlash moslamalari, to'liq bo'yli eshik foto-pardalari." : lang === 'en' ? "Multi-level quality system: certified speed governors, progressive safety gears, full-height light curtains." : "Многоуровневая система качества: сертифицированные ограничители скорости, ловители мгновенного и плавного торможения, фотозавесы дверей по всей высоте.",
      iconName: "ShieldAlert"
    },
    {
      id: "parts",
      title: lang === 'uz' ? "Original ehtiyot qismlar" : lang === 'en' ? "Original Spare Parts" : "Оригинальные запчасти",
      description: lang === 'uz' ? "Wittur, Kleemann, Otis distribyutorlari bilan to'g'ridan-to'g'ri shartnomalar. Toshkentdagi omborimizdan vositachilarsiz yetkazib berish." : lang === 'en' ? "Direct partnerships with distributors of Wittur, Kleemann, Otis. Supplied directly from our Tashkent warehouse with no markups." : "Прямые партнерские контракты с дистрибьюторами Wittur, Kleemann, Otis. Поставка напрямую со склада в Ташкенте без наценок посредников.",
      iconName: "Settings"
    },
    {
      id: "gost",
      title: lang === 'uz' ? "Qat'iy ravishda GOST va me'yorlar asosida" : lang === 'en' ? "Strictly by GOST & Uz Standard" : "Строго по ГОСТ и нормам РУз",
      description: lang === 'uz' ? "Barcha ishlar O'zbekiston Respublikasining ShNK, KMK va EN-81 xalqaro texnik ko'rsatmalari talablariga muvofiq amalga oshiriladi." : lang === 'en' ? "All engineering operations strictly adhere to ShNK, KMK of Uzbekistan and international technical regulations EN-81." : "Все работы осуществляются в жестком соответствии с ШНК, КМК Республики Узбекистан и международными техническими инструкциями EN-81.",
      iconName: "FileSpreadsheet"
    },
    {
      id: "emergency",
      title: lang === 'uz' ? "Favqulodda xizmat 24/7" : lang === 'en' ? "24/7 Emergency Service" : "Аварийная служба 24/7",
      description: lang === 'uz' ? "Toshkentning barcha tumanlarida tunu-kun navbatchilik brigadalari. Yo'lovchini qutqarish uchun yetib borish vaqti — 25 daqiqagacha." : lang === 'en' ? "Mobile engineering dispatch units on standby in Tashkent 24/7. Average rescue arrival response is within 25 minutes." : "Мобильные инженерные бригады дежурят круглосуточно во всех районах Ташкента. Среднее время прибытия для деблокирования — 25 минут.",
      iconName: "Clock"
    },
    {
      id: "engineers",
      title: lang === 'uz' ? "Sertifikatlangan muhandislar" : lang === 'en' ? "Certified Engineers" : "Сертифицированные инженеры",
      description: lang === 'uz' ? "Bizning barcha sozlovchilarimiz sanoat xavfsizligi assotsiatsiyalarida har yili attestatsiyadan o'tib, zavodlarda stajirovka o'taydilar." : lang === 'en' ? "All our installation and debugging engineers undergo annual safety recertifications and training at manufacturers." : "Все наши наладчики и конструкторы проходят ежегодную аттестацию в ассоциациях промышленной безопасности и стажировки у производителей.",
      iconName: "Award"
    },
    {
      id: "flexibility",
      title: lang === 'uz' ? "Individual muhandislik" : lang === 'en' ? "Custom Tailored Engineering" : "Индивидуальный инжиниринг",
      description: lang === 'uz' ? "Nostandart kabinalarni loyihalashtiramiz, tarixiy va rekonstruksiya qilinadigan ob'yektlarning murakkab o'lchamlariga moslashtiramiz." : lang === 'en' ? "We design custom cabins, adaptation for highly tight non-standard shafts in historical buildings or renovated commercial spots." : "Проектируем нестандартные кабины, подстраиваемся под сложные габариты существующих шахт исторических зданий и реконструируемых объектов.",
      iconName: "Compass"
    }
  ];

  return (
    <section id="advantages" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-950 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            🛡️ {lang === 'uz' ? "Nima uchun biz" : lang === 'en' ? "Why Us" : "Почему выбирают нас"}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === 'uz' ? "Vaqt sinovidan o'tgan ishonchlilik standartlari" : lang === 'en' ? "Time-tested Standards of Safety & Reliability" : "Стандарты надежности, проверенные временем"}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-sans font-light">
            {lang === 'uz' ? (
              <>Safetech Engineering o'z obro'sini o'rnatilgan har bir rels va dasturlashtirilgan har bir kontroller sifatiga asoslaydi.</>
            ) : lang === 'en' ? (
              <>Safetech Engineering builds its corporate reputation on uncompromising quality of every rail installed and every controller programmed.</>
            ) : (
              <>Safetech Engineering строит свою репутацию на бескомпромиссном качестве каждой смонтированной рельсы и каждого запрограммированного контроллера.</>
            )}
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantagesList.map((adv) => (
            <div 
              key={adv.id}
              className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-2xl flex flex-col items-start gap-4 hover:shadow-lg hover:bg-white hover:border-slate-200/80 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center shrink-0">
                {getAdvantageIcon(adv.iconName)}
              </div>
              <div className="space-y-2 text-left">
                <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                  {adv.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-light">
                  {adv.description}
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
