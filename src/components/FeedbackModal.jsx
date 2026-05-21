import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check, PhoneCall, ShieldAlert } from "lucide-react";
import { useI18n } from "../i18n";
import { endpoints } from "../api";

export default function FeedbackModal({ isOpen, onClose, preselectedService = "", onSuccessSubmit }) {
  const { lang } = useI18n();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [company, setCompany] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setService(preselectedService || "Монтаж лифтового оборудования");
      setSent(false);
      setErrorMsg("");
    }
  }, [isOpen, preselectedService]);

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setErrorMsg(lang === 'uz' ? "Ism va telefon raqami majburiy." : lang === 'en' ? "Name and phone number are required." : "Имя и номер телефона являются обязательными.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const details = `Запрос обратного звонка (Модальное окно). Проект/Компания: ${company || 'физ. лицо'}, Услуга: ${service}`;

    try {
      // POST lead submission
      await endpoints.contact({
        name,
        phone,
        description: details
      });

      if (onSuccessSubmit) {
        onSuccessSubmit(details);
      }
      setSent(true);
      setName("");
      setPhone("");
      setCompany("");
    } catch (err) {
      console.error(err);
      setErrorMsg(lang === 'uz' ? "Xatolik yuz berdi. Keyinroq urinib ko'ring." : lang === 'en' ? "An error occurred. Please try again." : "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setSent(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
          >
            {/* Heading */}
            <div className="bg-gradient-to-r from-primary-950 to-slate-950 p-6 border-b border-slate-800 text-left relative">
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase block mb-1">
                {lang === 'uz' ? "Safetech Aloqa" : lang === 'en' ? "Safetech Contact" : "Обратная связь Safetech"}
              </span>
              <h3 className="text-lg sm:text-xl font-display font-extrabold text-white leading-tight">
                {lang === 'uz' ? "Konsultatsiya va hisoblash uchun ariza" : lang === 'en' ? "Request Engineering Consultation" : "Получить консультацию по подбору лифта"}
              </h3>
            </div>

            {/* Form */}
            <div className="p-6">
              {!sent ? (
                <form onSubmit={handleModalSubmit} className="space-y-4 text-left">
                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/30 p-2.5 rounded-lg text-red-450 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      {lang === 'uz' ? "Ismingiz *" : lang === 'en' ? "Your Name *" : "Ваше имя *"}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'uz' ? "Masalan, Sardor" : lang === 'en' ? "E.g., Michael" : "Например, Сардор"}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      {lang === 'uz' ? "Telefon raqamingiz *" : lang === 'en' ? "Phone Number *" : "Номер телефона *"}
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 (99) 123-45-67"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      {lang === 'uz' ? "Tashkilot yoki bino nomi" : lang === 'en' ? "Company or Building Site" : "Организация или Жилой Комплекс"}
                    </label>
                    <input 
                      type="text" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={lang === 'uz' ? "Masalan, Sergeli turar-joy" : lang === 'en' ? "E.g., Grand Plaza Site" : "Например, Жилой Комплекс"}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      {lang === 'uz' ? "Tanlangan yo'nalish" : lang === 'en' ? "Requested Service Division" : "Выбранное направление"}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-350 focus:outline-none focus:border-primary-500"
                    >
                      <option value="Монтаж лифтового оборудования">
                        {lang === 'uz' ? "Lift uskunalarini montaj qilish" : lang === 'en' ? "Elevator Machinery Installation" : "Монтаж лифтового оборудования"}
                      </option>
                      <option value="Регулярное Техническое обслуживание">
                        {lang === 'uz' ? "Muntazam texnik xizmat ko'rsatish" : lang === 'en' ? "Regular Scheduled Maintenance" : "Регулярное Техническое обслуживание"}
                      </option>
                      <option value="Модернизация кабин и узлов">
                        {lang === 'uz' ? "Kabina va uzellarni modernizatsiya qilish" : lang === 'en' ? "Elevator Cabin Modernization" : "Модернизация кабин и узлов"}
                      </option>
                      <option value="Установка эскалатора / Траволатора">
                        {lang === 'uz' ? "Eskalator / Travolator o'rnatish" : lang === 'en' ? "Escalator / Moving Walk Setup" : "Установка эскалатора / Траволатора"}
                      </option>
                      <option value="Панорамные или Специальные лифты">
                        {lang === 'uz' ? "Panoramali yoki maxsus liftlar" : lang === 'en' ? "Panoramic or Freight Lifts" : "Панорамные или Специальные лифты"}
                      </option>
                      <option value="Технический надзор и экспертиза">
                        {lang === 'uz' ? "Texnik nazorat va ekspertiza" : lang === 'en' ? "Safety Audit & Audit Engineering" : "Технический надзор и экспертиза"}
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs py-3 px-4 rounded-lg transition-transform hover:scale-[1.01] shadow-lg shadow-black/40 mt-2 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                    {loading 
                      ? (lang === 'uz' ? "Ariza yuborilmoqda..." : lang === 'en' ? "Submitting..." : "Отправка запроса...")
                      : (lang === 'uz' ? "Muhandis konsultatsiyasini so'rash" : lang === 'en' ? "Request Engineering Review" : "Запросить консультацию инженера")
                    }
                  </button>
                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                    {lang === 'uz' ? (
                      <>Bizning hududiy sozlovchimiz texnik parametrlarni aniqlash uchun 10-15 daqiqa ichida siz bilan bog'lanadi.</>
                    ) : lang === 'en' ? (
                      <>Our local service engineer will contact you within 10-15 minutes to review your shaft diagrams.</>
                    ) : (
                      <>Наш региональный наладчик свяжется с Вами в течение 10-15 минут для уточнения технических параметров.</>
                    )}
                  </p>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-100 font-display text-sm sm:text-base">
                      {lang === 'uz' ? "So'rov muvaffaqiyatli qabul qilindi!" : lang === 'en' ? "Request Successfully Dispatched!" : "Запрос успешно принят!"}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                      {lang === 'uz' ? (
                        <>Safetech Engineering dispetcherlik xizmati sizning vazifangizni muhandislarga topshirdi. Tez orada siz bilan bog'lanamiz.</>
                      ) : lang === 'en' ? (
                        <>Safetech Engineering dispatch unit has successfully registered your ticket. We will call you shortly.</>
                      ) : (
                        <>Служба диспетчеризации Safetech Engineering уже распределила вашу задачу. Мы свяжемся с Вами в ближайшее время.</>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="w-full bg-slate-850 hover:bg-slate-800 text-slate-350 font-semibold text-xs py-2.5 rounded-lg transition-colors border border-slate-800 mt-2 cursor-pointer"
                  >
                    {lang === 'uz' ? "Oynani yopish" : lang === 'en' ? "Close Window" : "Закрыть окно"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
