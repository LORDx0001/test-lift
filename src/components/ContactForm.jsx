import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageSquare, Check, PhoneCall, ShieldAlert } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";
import { endpoints } from "../api";

export default function ContactForm({ initialService = "", onSuccessSubmit, general, contact, phones, emails }) {
  const { lang, t } = useI18n();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    serviceType: initialService || "",
    message: ""
  });

  const [formSent, setFormSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg(lang === "uz" ? "Ism va telefon raqami majburiy." : lang === "en" ? "Name and phone number are required." : "Имя и номер телефона являются обязательными.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    const details = `Услуга: ${formData.serviceType || "—"}, Организация: ${formData.company || "физ. лицо"}, Комментарий: ${formData.message || "нет"}`;
    try {
      await endpoints.contact({ name: formData.name, phone: formData.phone, description: details });
      if (onSuccessSubmit) onSuccessSubmit(details);
      setFormSent(true);
      setFormData({ name: "", phone: "", company: "", serviceType: initialService || "", message: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg(lang === "uz" ? "So'rov yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring." : lang === "en" ? "An error occurred while sending your request. Please try again later." : "Произошла ошибка при отправке запроса. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  // --- Dynamic values from backend (no hardcoded fallbacks) ---
  const miniTitle  = getLocalized(contact, "mini_title", lang);
  const title      = getLocalized(contact, "title", lang);
  const desc       = getLocalized(contact, "desc", lang);
  const address    = getLocalized(general, "address", lang);
  const telegramUrl = general?.telegram_url || "";

  // Show all phones and emails from backend
  const phoneList = phones && phones.length > 0 ? phones : [];
  const emailList = emails && emails.length > 0 ? emails : [];

  return (
    <section id="contacts" className="py-20 bg-slate-900 text-white scroll-mt-16 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/40 to-transparent" />
      <div className="absolute -right-32 -top-32 w-96 h-96 bg-primary-950/45 rounded-full filter blur-3xl opacity-60" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left info column ── */}
          <div className="lg:col-span-5 flex flex-col space-y-8 text-left">

            {/* Title block */}
            <div className="space-y-4">
              {miniTitle && (
                <span className="inline-flex items-center gap-2 bg-primary-950 text-primary-300 border border-primary-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  {miniTitle}
                </span>
              )}
              {title && (
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-tight whitespace-pre-line">
                  {title}
                </h2>
              )}
              {desc && (
                <p className="text-sm md:text-base text-slate-400 font-sans font-light leading-relaxed">
                  {desc}
                </p>
              )}
            </div>

            {/* Contact items */}
            <div className="space-y-4">
              {/* Address — only if backend has it */}
              {address && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-900/60 border border-primary-500/20 flex items-center justify-center shrink-0 shadow-lg">
                    <MapPin className="w-5 h-5 text-amber-500 fill-amber-500/10" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                      {lang === "uz" ? "Bosh ofis" : lang === "en" ? "Headquarters" : "Головной офис"}
                    </span>
                    <p className="text-sm font-semibold text-slate-100">{address}</p>
                  </div>
                </div>
              )}

              {/* All phone numbers */}
              {phoneList.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-900/60 border border-primary-500/20 flex items-center justify-center shrink-0 shadow-lg">
                    <Phone className="w-5 h-5 text-sky-500 fill-sky-500/10" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                      {p.label || (lang === "uz" ? "Qabulxona / Aloqa" : lang === "en" ? "Reception / Hotline" : "Приемная / Авария")}
                    </span>
                    <a href={`tel:${p.number.replace(/[^\d+]/g, "")}`} className="text-sm font-bold text-slate-100 hover:text-amber-500 transition-colors">
                      {p.number}
                    </a>
                  </div>
                </div>
              ))}

              {/* All email addresses */}
              {emailList.map((e, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-900/60 border border-primary-500/20 flex items-center justify-center shrink-0 shadow-lg">
                    <Mail className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                      {lang === "uz" ? "Elektron pochta" : lang === "en" ? "Email Address" : "Электронная почта"}
                    </span>
                    <a href={`mailto:${e.email}`} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                      {e.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right form column ── */}
          <div className="lg:col-span-7 bg-slate-950/75 p-6 md:p-8 rounded-2xl border border-slate-800/90 shadow-2xl backdrop-blur-md text-left">
            <h3 className="font-display font-bold text-xl text-slate-100 border-b border-slate-800 pb-4 mb-6 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-primary-500 animate-pulse-subtle" />
              {lang === "uz" ? "Muhandis chaqirish uchun ariza qoldiring" : lang === "en" ? "Submit Engineer Dispatch Request" : "Оформить заявку на вызов инженера"}
            </h3>

            <AnimatePresence mode="wait">
              {!formSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-red-400 text-xs font-semibold flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                        {lang === "uz" ? "Ismingiz *" : lang === "en" ? "Your Name *" : "Ваше имя *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === "uz" ? "Masalan, Sardor" : lang === "en" ? "E.g., Michael" : "Например, Сардор"}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                        {lang === "uz" ? "Telefon raqamingiz *" : lang === "en" ? "Phone Number *" : "Номер телефона *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+998 (90) 123-45-67"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                        {lang === "uz" ? "Tashkilot / Kompaniya" : lang === "en" ? "Organization / Company" : "Организация / Компания"}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={lang === "uz" ? "Masalan, Turar-joy majmuasi" : lang === "en" ? "E.g., Residential Complex" : "Например, Жилой комплекс"}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                        {lang === "uz" ? "Kerakli xizmat turi" : lang === "en" ? "Requested Service" : "Требуемая услуга"}
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-primary-500"
                      >
                        <option value="Монтаж лифтов под ключ">{lang === "uz" ? "Liftlarni to'liq montaj qilish" : lang === "en" ? "Turnkey Elevator Installation" : "Монтаж лифтов под ключ"}</option>
                        <option value="Техническое обслуживание (ТО)">{lang === "uz" ? "Texnik xizmat ko'rsatish (TO)" : lang === "en" ? "Regular Maintenance (TO)" : "Техническое обслуживание (ТО)"}</option>
                        <option value="Модернизация лифта">{lang === "uz" ? "Liftlarni modernizatsiya qilish" : lang === "en" ? "Elevator Modernization" : "Модернизация лифта"}</option>
                        <option value="Установка эскалаторов">{lang === "uz" ? "Eskalatorlarni o'rnatish" : lang === "en" ? "Escalator Installation" : "Установка эскалаторов"}</option>
                        <option value="Специальные лифты">{lang === "uz" ? "Maxsus liftlar" : lang === "en" ? "Custom & Special Lifts" : "Специальные лифты"}</option>
                        <option value="Экспертиза и диагностика">{lang === "uz" ? "Ekspertiza va diagnostika" : lang === "en" ? "Audit & Diagnostic Safety" : "Экспертиза и диагностика"}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                      {lang === "uz" ? "Vazifa tarifi / Sharh" : lang === "en" ? "Task details / Comments" : "Описание задачи / Комментарий"}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === "uz" ? "Bino qavatlari soni, liftlar soni yoki nosozliklar haqida ma'lumot kiriting..." : lang === "en" ? "Specify building height, number of shafts, desired capacity or load parameters..." : "Укажите этажность здания, количество лифтов или описание дефектов, если требуется ремонт..."}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 resize-none font-sans font-light"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2 items-center justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs py-3 px-6 rounded-lg w-full sm:w-auto hover:shadow-lg hover:shadow-primary-500/20 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (lang === "uz" ? "Yuborilmoqda..." : lang === "en" ? "Sending..." : "Отправка...") : (lang === "uz" ? "Rasmiy so'rov yuborish" : lang === "en" ? "Submit Estimate Request" : "Отправить официальный запрос")}
                      <Send className="w-4 h-4" />
                    </button>

                    {telegramUrl && (
                      <a
                        href={telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-500/10 border border-sky-500/25 hover:bg-sky-500/20 text-sky-400 text-xs py-3 px-4 rounded-lg text-center font-semibold flex items-center justify-center gap-1.5 w-full sm:w-auto"
                      >
                        <MessageSquare className="w-4 h-4 fill-sky-400/10" />
                        {lang === "uz" ? "Telegramda yozish" : lang === "en" ? "Chat in Telegram" : "Чат в Telegram"}
                      </a>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-500 text-center sm:text-left leading-relaxed">
                    {lang === "uz" ? (
                      <>Tugmani bosish orqali ma'lumotlaringizni Safetech Engineering mutaxassislari qayta ishlashiga rozilik berasiz. Smeta tuzish muddati 12 ish soatigacha.</>
                    ) : lang === "en" ? (
                      <>By clicking the button, you consent to processing your contact details by Safetech Engineering specialists. Turnaround for structural estimates is up to 12 working hours.</>
                    ) : (
                      <>Нажимая кнопку, Вы даете согласие на обработку Ваших сведений специалистами Safetech Engineering. Срок составления сметы составляет до 12 рабочих часов.</>
                    )}
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h4 className="font-bold text-slate-100 font-display text-lg">
                      {lang === "uz" ? "So'rov muvaffaqiyatli qabul qilindi!" : lang === "en" ? "Request Successfully Submitted!" : "Заявка успешно зарегистрирована!"}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                      {lang === "uz" ? (
                        <>Murojaatingiz uchun rahmat. Bizning navbatchi muhandis-konstruktorimiz tez orada chizmalar va texnik shartlarni kelishib olish uchun ko'rsatilgan raqam orqali siz bilan bog'lanadi.</>
                      ) : lang === "en" ? (
                        <>Thank you. Our design and estimate engineer will contact you shortly at the specified phone number to review specifications and drawings.</>
                      ) : (
                        <>Спасибо за обращение. Наш дежурный инженер-конструктор свяжется с Вами по указанному номеру телефона для уточнения чертежей и составления ТЗ в кратчайшие сроки.</>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormSent(false)}
                    className="text-xs text-primary-400 hover:text-primary-300 font-bold underline mt-2 cursor-pointer bg-transparent border-0 outline-none"
                  >
                    {lang === "uz" ? "Yana bir so'rov yuborish" : lang === "en" ? "Submit another request" : "Отправить другой запрос"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
