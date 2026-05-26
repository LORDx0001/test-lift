import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function FAQ({ faqs, faqItems, general }) {
  const { lang } = useI18n();
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqItems || faqItems.length === 0) return null;

  const telegramUrl = general?.telegram_url || "#";

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const currentMiniTitle = getLocalized(faqs, "mini_title", lang) || (lang === 'uz' ? "💬 Ko'p beriladigan savollar" : lang === 'en' ? "💬 Answers to Common Questions" : "💬 Ответы на частые вопросы");
  const currentTitle = getLocalized(faqs, "title", lang) || (lang === 'uz' ? "Liftlar va davlat standartlari haqida foydali" : lang === 'en' ? "Important Information About Safety & Standards" : "Полезно знать о лифтах и стандартах");
  const currentDesc = getLocalized(faqs, "desc", lang) || (lang === 'uz' ? "Biz Toshkent shahri quruvchilari, bosh pudratchilar hamda shirkat raislaridan eng ko'p beriladigan savollarni to'pladik." : lang === 'en' ? "We compiled the most frequent questions from developers, general construction contractors, and residential block chairpersons in Tashkent." : "Мы собрали самые популярные вопросы от наших заказчиков, председателей ТСЧЖ и главных строительных застройщиков Ташкента.");

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            {currentMiniTitle}
          </span>
          <h2 className="text-3xl md:text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            {currentTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans font-light text-center">
            {currentDesc}
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
                    {getLocalized(item, "question", lang)}
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
                        {getLocalized(item, "answer", lang)}
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
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-semibold hover:underline ml-1">
             Telegram-чат
          </a>{" "}
          {lang === 'uz' ? "orqali muhandisimizga yozing." : lang === 'en' ? "to ask our design engineers directly." : "для моментальной обратной связи."}
        </div>

      </div>
    </section>
  );
}
