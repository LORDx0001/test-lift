import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useI18n } from "../i18n";

export default function FAQ() {
  const { lang } = useI18n();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: lang === 'uz' ? "Kompaniyangiz qanday ishlab chiqaruvchilar bilan ishlaydi?" : lang === 'en' ? "What brands of elevators do you install?" : "С какими производителями лифтов работает ваша компания?",
      answer: lang === 'uz' ? "Biz Wittur, Kleemann, Otis, Sigma, Fuji Lift, Monarch va Orona kabi jahon miqyosidagi sertifikatlangan brendlar bilan bevosita ishlaymiz. Bu esa original butlovchi qismlarni va maqbul narxlarni kafolatlaydi." : lang === 'en' ? "We directly partner with official distributors of world-class certified brands including Wittur, Kleemann, Otis, Sigma, Fuji, Monarch, and Orona. This guarantees authentic machinery and budget optimization." : "Мы работаем напрямую с официальными дистрибьюторами сертифицированных мировых брендов, включая Wittur, Kleemann, Otis, Sigma, Fuji Lift, Monarch и Orona. Это гарантирует оригинальность оборудования и минимальные наценки."
    },
    {
      question: lang === 'uz' ? "Liftni montaj qilish va ishga tushirish qancha vaqt oladi?" : lang === 'en' ? "What is the typical timeframe for installation?" : "Каковы сроки монтажа и сдачи лифта под ключ?",
      answer: lang === 'uz' ? "Muddati loyiha murakkabligiga va qavatlar soniga bog'liq. Standart 9 qavatli turar-joy binosi uchun montaj, sozlash va davlat inspeksiyasidan o'tkazish odatda 15 dan 25 kalendar kunigacha vaqtni oladi." : lang === 'en' ? "Timeframes depend on the complexity of the shaft and the number of stops. For a standard 9-story residential elevator, complete installation, electronics debugging, and state safety inspection hand-over takes between 15 and 25 calendar days." : "Сроки зависят от сложности шахты и количества остановок. Для стандартного 9-этажного жилого дома полный цикл монтажа, программирования электроники и сдачи инспекторам промбезопасности занимает от 15 до 25 календарных дней."
    },
    {
      question: lang === 'uz' ? "Favqulodda vaziyatda brigadaning yetib borish vaqti qancha?" : lang === 'en' ? "What is your emergency dispatch arrival speed?" : "Какова скорость реагирования аварийной службы?",
      answer: lang === 'uz' ? "Bizning mobil brigadalarimiz Toshkent shahrining barcha tumanlarida tunu-kun navbatchilik qilishadi. Favqulodda liftda qolib ketish chaqiruvi bo'yicha yetib borish vaqti 25 daqiqadan oshmaydi." : lang === 'en' ? "Our mobile rapid response teams patrol every district of Tashkent 24 hours a day, 365 days a year. The average arrival time to rescue passengers trapped in cabins is under 25 minutes." : "Наши дежурные мобильные экипажи курсируют во всех районах Ташкента круглосуточно. Среднее время прибытия для деблокирования пассажиров при аварийной остановке не превышает 25 минут."
    },
    {
      question: lang === 'uz' ? "Liftlarga xizmat ko'rsatishga kafolat bormi?" : lang === 'en' ? "Do you provide warranties on works and components?" : "Предоставляется ли гарантия на работы и оборудование?",
      answer: lang === 'uz' ? "Ha, biz barcha montaj ishlarimizga 2 yildan boshlab rasmiy kafolat beramiz. Uskunalarga esa ishlab chiqaruvchining zavod kafolati (odatda 5 yilgacha) amal qiladi. Texnik xizmat ko'rsatish davomida barcha original ehtiyot qismlarni tezkorlik bilan almashtiramiz." : lang === 'en' ? "Yes, we provide an official warranty of 2 to 5 years on all engineering and installation works. Elevators carry factory warranties directly from developers (up to 5 years). We also carry out active parts replacement during regular maintenance." : "Да, мы предоставляем официальную гарантию на монтажные и пусконаладочные работы от 2 лет. На само оборудование действует заводская гарантия изготовителей (до 5 лет). В рамках регулярного сервиса мы обеспечиваем оперативную замену любых расходников."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            💬 {lang === 'uz' ? "Ko'p beriladigan savollar" : lang === 'en' ? "Answers to Common Questions" : "Ответы на частые вопросы"}
          </span>
          <h2 className="text-3xl md:text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === 'uz' ? "Liftlar va davlat standartlari haqida foydali" : lang === 'en' ? "Important Information About Safety & Standards" : "Полезно знать о лифтах и стандартах"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans font-light text-center">
            {lang === 'uz' ? (
              <>Biz Toshkent shahri quruvchilari, bosh pudratchilar hamda shirkat raislaridan eng ko'p beriladigan savollarni to'pladik.</>
            ) : lang === 'en' ? (
              <>We compiled the most frequent questions from developers, general construction contractors, and residential block chairpersons in Tashkent.</>
            ) : (
              <>Мы собрали самые популярные вопросы от наших заказчиков, председателей ТСЧЖ и главных строительных застройщиков Ташкента.</>
            )}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left py-4.5 px-6 flex justify-between items-center gap-4 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className="font-display font-bold text-slate-900 text-sm sm:text-base flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary-500 shrink-0" />
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed font-sans font-light text-left">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Micro Advisory Telegram CTA */}
        <div className="mt-12 text-center text-xs text-slate-500">
          {lang === 'uz' ? "Qo'shimcha texnik savollaringiz bormi?" : lang === 'en' ? "Have additional technical questions?" : "Остались дополнительные технические вопросы?"}
          <a href="https://t.me/bexruz_toj" target="_blank" rel="noopener noreferrer" className="text-primary-600 font-semibold hover:underline ml-1">
             Telegram-чат
          </a>{" "}
          {lang === 'uz' ? "orqali muhandisimizga yozing." : lang === 'en' ? "to ask our design engineers directly." : "для моментальной обратной связи."}
        </div>

      </div>
    </section>
  );
}
