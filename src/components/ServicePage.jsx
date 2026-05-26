import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Wrench, 
  TrendingUp, 
  Layers, 
  Construction, 
  FileCheck, 
  Clock 
} from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";
import { endpoints } from "../api";

function getServiceIcon(name) {
  const iconStr = String(name || '').toLowerCase();
  if (iconStr.includes('wrench') || iconStr.includes('lift') || iconStr.includes('montazh')) {
    return <Wrench className="w-8 h-8 text-primary-600" />;
  } else if (iconStr.includes('shield') || iconStr.includes('supervision') || iconStr.includes('maintenance')) {
    return <ShieldCheck className="w-8 h-8 text-primary-600" />;
  } else if (iconStr.includes('trend') || iconStr.includes('modern')) {
    return <TrendingUp className="w-8 h-8 text-primary-600" />;
  } else if (iconStr.includes('layers') || iconStr.includes('escalator')) {
    return <Layers className="w-8 h-8 text-primary-600" />;
  } else if (iconStr.includes('construction') || iconStr.includes('special')) {
    return <Construction className="w-8 h-8 text-primary-600" />;
  } else if (iconStr.includes('file') || iconStr.includes('audit')) {
    return <FileCheck className="w-8 h-8 text-primary-600" />;
  }
  return <Wrench className="w-8 h-8 text-primary-600" />;
}

export default function ServicePage({ service, onBack, onSuccessSubmit, phones }) {
  const { lang } = useI18n();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImgIndex(0);
    setIsSubmitted(false);
  }, [service]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const details = `Заявка на услугу "${service.title}". Комментарий: ${comment || "Нет"}`;

    try {
      await endpoints.contact({
        name,
        phone,
        description: details
      });

      if (onSuccessSubmit) {
        onSuccessSubmit(details);
      }
      setIsSubmitted(true);
      setName("");
      setPhone("");
      setComment("");
    } catch (err) {
      console.error(err);
      alert(lang === 'uz' ? "Ariza yuborishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring." : lang === 'en' ? "An error occurred. Please try again later." : "Произошла ошибка при отправке запроса.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerBrands = [
    { name: "Wittur", origin: lang === 'uz' ? "Germaniya" : lang === 'en' ? "Germany" : "Германия" },
    { name: "Kleemann", origin: lang === 'uz' ? "Gretsiya" : lang === 'en' ? "Greece" : "Греция" },
    { name: "Otis", origin: lang === 'uz' ? "AQSh" : lang === 'en' ? "USA" : "США" },
    { name: "Sigma", origin: lang === 'uz' ? "Koreya" : lang === 'en' ? "Korea" : "Корея" },
    { name: "Monarch", origin: lang === 'uz' ? "Xitoy" : lang === 'en' ? "China" : "Китай" },
    { name: "Orona", origin: lang === 'uz' ? "Ispaniya" : lang === 'en' ? "Spain" : "Испания" }
  ];

  const currentFeatures = service.features || [
    lang === 'uz' ? "Shaxta va parametrlarning dastlabki muhandislik tahlili" : lang === 'en' ? "Initial engineering analysis of shafts and measurements" : "Первичный инженерный анализ шахты и параметров",
    lang === 'uz' ? "O'zbekiston ShNK me'yorlari bo'yicha chizmalarni loyihalash" : lang === 'en' ? "Design drawings in accordance with state regulations" : "Проектирование чертежей согласно нормам ШНК Республики Узбекистан",
    lang === 'uz' ? "Yetkazib berish va mexanik qismlarni nozik montaj qilish" : lang === 'en' ? "Supply and precision mechanical installation of components" : "Поставка и тонкий монтаж механических узлов лифта",
    lang === 'uz' ? "Elektronika va mikroprotsessor sozlash ishlarini tugatish" : lang === 'en' ? "Electronics setup and controller commissioning" : "Наладка электроники и микропроцессорного пульта"
  ];

  const currentSpecs = service.specs || [
    lang === 'uz' ? "Xalqaro standartlar: EN81-20/50 muvofiqligi" : lang === 'en' ? "International standards: EN81-20/50 compliance" : "Международные стандарты: Полное соответствие EN81-20/50",
    lang === 'uz' ? "Litsenziya: Davlat qurilish reyestri sertifikati" : lang === 'en' ? "License: State construction registry certificate" : "Лицензия: Сертификат государственного строительного ведомства",
    lang === 'uz' ? "Kafolat muddati: 2 yildan 5 yilgacha rasmiy kafolat" : lang === 'en' ? "Warranty period: 2 to 5 years official coverage" : "Срок гарантии: От 2 до 5 лет официального покрытия"
  ];

  const phoneToShow = phones?.[0]?.number || "+998 (71) 200-00-00";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-slate-50 pt-32 pb-24"
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-medium text-xs rounded-xl border border-slate-200 shadow-sm transition-all duration-200 cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'uz' ? "Bosh sahifaga qaytish" : lang === 'en' ? "Back to Homepage" : "Назад на главную"}
        </button>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Context Left (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Banner Header */}
            <div className="space-y-4">
              <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-left space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                    Safetech Engineering
                  </span>
                  <h1 className="text-xl md:text-3xl font-display font-extrabold text-white leading-tight">
                    {service.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Core Description */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm space-y-6 text-left">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                  {getServiceIcon(service.iconName)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    {lang === 'uz' ? "Safetech Engineering ustunligi" : lang === 'en' ? "Safetech Engineering Advantage" : "Safetech Engineering Преимущество"}
                  </h2>
                  <p className="text-slate-500 text-xs">
                    {lang === 'uz' ? "O'zbekistonda texnik ishonchlilikning litsenziyalangan standartlari." : lang === 'en' ? "Licensed state-level standards of safety and engineering in Uzbekistan." : "Лицензированные ведомственные стандарты технической надежности в Узбекистане."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">
                  {lang === 'uz' ? "Xizmat haqida batafsil ma'lumot" : lang === 'en' ? "Detailed Service Specifications" : "Детальное описание услуги"}
                </h3>
                <p className="text-slate-650 text-sm md:text-base leading-relaxed font-sans font-light">
                  {service.description || service.shortDescription}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed italic">
                  {lang === 'uz' ? (
                    <>*Muhandislikning har bir bosqichi O'zbekiston Respublikasi sanoat xavfsizligi standartlariga muvofiqligi sertifikatlangan nazoratchilar tomonidan diqqat bilan nazorat qilinadi. Barcha haydovchi va tormoz agregatlarining ishlashiga kafolat beramiz.</>
                  ) : lang === 'en' ? (
                    <>*Every stage of engineering is carefully supervised by certified inspectors for compliance with industrial safety codes of the Republic of Uzbekistan. We guarantee the emergency-free performance of all drive elements.</>
                  ) : (
                    <>*Каждый этап инжиниринга тщательно мониторится сертифицированным надзором на соответствие стандартам промышленной безопасности Республики Узбекистан. Мы гарантируем безаварийную работу всех приводных и тормозных агрегатов.</>
                  )}
                </p>
              </div>
            </div>

            {/* Visual Steps */}
            <div className="space-y-4 text-left">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {lang === 'uz' ? "Xizmat reglamentiga nimalar kiradi" : lang === 'en' ? "What is Included in Service Scope" : "Что входит в регламент услуги"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFeatures.map((feat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-xs flex items-start gap-3.5 hover:border-primary-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                        {lang === 'uz' ? "Bosqich" : lang === 'en' ? "Stage" : "Этап"} 0{idx + 1}
                      </span>
                      <p className="text-slate-750 text-xs leading-normal font-sans font-medium">{feat}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatible High-Fidelity Brands Section */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6 text-left">
              <div>
                <h3 className="text-lg font-bold font-display text-white">
                  {lang === 'uz' ? "Mos keladigan sertifikatlangan uskunalar" : lang === 'en' ? "Compatible Certified Equipment Systems" : "Совместимое сертифицированное оборудование"}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'uz' ? "Biz faqatgina dunyoning quyidagi brendlari dilerlari bilan hamkorlik qilamiz" : lang === 'en' ? "We operate exclusively in close coordination with authorized suppliers of the following global brands" : "Мы работаем исключительно в прямом содействии с авторизованными запасными деталями следующих мировых брендов"}
                </p>
              </div>

              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-4">
                {partnerBrands.map((brand) => (
                  <div key={brand.name} className="p-4 bg-slate-950/60 rounded-xl border border-white/5 text-center flex flex-col justify-center items-center">
                    <span className="text-amber-500 text-sm font-bold font-display block">{brand.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">{brand.origin}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar specs details & Contact leads form (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            
            {/* Technical Specs */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-display text-slate-900">
                {lang === 'uz' ? "Texnik reglamentlar" : lang === 'en' ? "Technical Regulations" : "Технические регламенты"}
              </h3>
              
              <div className="space-y-3">
                {currentSpecs.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="text-xs font-semibold text-primary-600 font-mono mt-0.5">•</span>
                    <p className="text-slate-650 text-[11px] leading-relaxed font-sans">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Hotline */}
            <div className="bg-gradient-to-tr from-primary-900 to-primary-950 text-white rounded-3xl p-6 shadow-md shadow-primary-950/20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2"></div>
              <Clock className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h4 className="font-display font-extrabold text-base mb-1">
                {lang === 'uz' ? "Toshkentda tezkor javob berish" : lang === 'en' ? "Hotline Dispatch in Tashkent" : "Реагирование в Ташкенте"}
              </h4>
              <p className="text-slate-350 text-[11px] leading-normal font-sans font-light max-w-xs mx-auto mb-4">
                {lang === 'uz' ? (
                  <>Tunu-kun ishlaydigan dispetcherlik xizmati. Muhandisimiz uskunani ko'zdan kechirish uchun 25 daqiqa ichida yetib boradi.</>
                ) : lang === 'en' ? (
                  <>24/7 technical hotline coverage. Dispatch engineers will arrive within 25 minutes to inspect elevator shafts.</>
                ) : (
                  <>Круглосуточный диспетчерский пункт. Наш выездной инженер прибудет в течение 25 минут для осмотра оборудования.</>
                )}
              </p>
              <a 
                href={`tel:${phoneToShow.replace(/[^\d+]/g, '')}`}
                className="inline-block w-full bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200"
              >
                {phoneToShow}
              </a>
            </div>

            {/* Lead Form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold font-display text-slate-900">
                  {lang === 'uz' ? "Maslahat olish uchun ariza" : lang === 'en' ? "Request Estimate Consultation" : "Вызов инженера для консультации"}
                </h3>
                <p className="text-slate-400 text-[11px] font-sans">
                  {lang === 'uz' ? "Kontaktlaringizni qoldiring va biz rasmiy tijorat taklifini tayyorlaymiz." : lang === 'en' ? "Provide your contacts and our design department will prepare the quotation blueprint." : "Оставьте контакты и мы сформируем официальный коммерческий расчет по услуге."}
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3">
                  <span className="inline-flex w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 justify-center items-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-emerald-950 font-bold text-xs font-display">
                      {lang === 'uz' ? "Ariza muvaffaqiyatli yuborildi!" : lang === 'en' ? "Dispatched successfully!" : "Заявка отправлена!"}
                    </p>
                    <p className="text-emerald-850 text-[11px] leading-relaxed">
                      {lang === 'uz' ? "Muhandis tafsilotlarni aniqlashtirish uchun 10 daqiqa ichida bog'lanadi." : lang === 'en' ? "An estimate technician will call you back within 10 minutes." : "Инженер свяжется с вами в течение 10 минут для согласования деталей."}</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-600 hover:text-primary-700 text-[11px] font-semibold underline cursor-pointer bg-transparent border-0 outline-none"
                  >
                    {lang === 'uz' ? "Yangi ariza yuborish" : lang === 'en' ? "Send new request" : "Отправить новую заявку"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-mono uppercase font-bold block">
                      {lang === 'uz' ? "Ismingiz *" : lang === 'en' ? "Your Name *" : "Ваше имя *"}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === 'uz' ? "Masalan: Sardor" : lang === 'en' ? "E.g., Michael" : "Например: Фарход"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all font-sans font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-mono uppercase font-bold block">
                      {lang === 'uz' ? "Telefon raqamingiz *" : lang === 'en' ? "Phone Number *" : "Номер телефона *"}
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+998 (90) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all font-sans font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-mono uppercase font-bold block">
                      {lang === 'uz' ? "Izoh (ixtiyoriy)" : lang === 'en' ? "Comments (optional)" : "Комментарий к заявке (необязательно)"}
                    </label>
                    <textarea 
                      placeholder={
                        lang === 'uz' 
                          ? "Qavatlar, liftlar soni yoki istalgan brendni kiriting" 
                          : lang === 'en' 
                          ? "Specify stops, dimensions or specific elevator machinery brand preferences" 
                          : "Укажите этажность здания, количество лифтов или желаемый бренд"
                      }
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all font-sans resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs py-3 rounded-xl transition-all duration-300 shadow-md shadow-primary-950/20 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 rounded-full border border-white/40 border-t-white animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        {lang === 'uz' ? "Maslahat olish" : lang === 'en' ? "Submit Clearance" : "Получить консультацию"}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
