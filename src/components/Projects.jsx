import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function Projects({ gallerySection, galleryImages }) {
  const { lang } = useI18n();
  // No static filters needed, showing fully dynamic projects.

  const getProjectsData = () => {
    if (galleryImages && galleryImages.length > 0) {
      return galleryImages.map((img, idx) => ({
        id: `db_proj_${img.id || idx}`,
        title: getLocalized(img, "title", lang),
        location: lang === 'uz' ? "Toshkent shahri" : lang === 'en' ? "Tashkent City" : "г. Ташкент",
        image: img.image,
        description: getLocalized(img, "desc", lang) || getLocalized(img, "description", lang),
        specs: [
          { label: lang === 'uz' ? "Holati" : "Статус", value: lang === 'uz' ? "Muvaffaqiyatli topshirildi" : "Успешно сдан в эксплуатацию" },
          { label: lang === 'uz' ? "Muhandislik" : "Инжиниринг", value: "Safetech Premium Quality" }
        ]
      }));
    }
    return [];
  };

  const projects = getProjectsData();

  if (!projects || projects.length === 0) return null;

  const filteredProjects = projects;

  const currentMiniTitle = getLocalized(gallerySection, "mini_title", lang) || (lang === 'uz' ? "🏢 Safetech loyihalari" : lang === 'en' ? "🏢 Completed Safetech Projects" : "🏢 Реализованные объекты Safetech");
  const currentTitle = getLocalized(gallerySection, "title", lang) || (lang === 'uz' ? "Bizga O'zbekistonning nufuzli binolarini ishonib topshirishadi" : lang === 'en' ? "Trusted by Iconic Buildings in Uzbekistan" : "Нам доверяют знаковые здания Узбекистана");

  return (
    <section id="projects" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            {currentMiniTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            {currentTitle}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-sans font-light">
            {lang === 'uz' ? (
              <>Toshkentda hamda Respublikaning boshqa tarixiy shaharlarida muhandislarimiz tomonidan o'rnatilgan va ishga tushirilgan lift tizimlari va eskalatorlarining fotosuratlari va texnik xususiyatlari bilan tanishing.</>
            ) : lang === 'en' ? (
              <>Explore photos and specifications of elevator and escalator systems installed and commissioned by our specialists in Tashkent and other ancient cities of Uzbekistan.</>
            ) : (
              <>Посмотрите фотографии и спецификации лифтовых систем, смонтированных и запущенных нашими инженерами в Ташкенте и других древних городах Республики.</>
            )}
          </p>
        </div>

        {/* Filter controls (Only for fallbacks that actually have distinct categories) */}
        {!galleryImages || galleryImages.length === 0 ? (
          <div className="flex flex-wrap justify-center gap-2.5 mb-12 border-b border-slate-200 pb-6 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === cat.key
                    ? "bg-primary-600 text-white shadow-md shadow-primary-900/10"
                    : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/65 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        ) : null}

        {/* Project showcase grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.90 }}
                transition={{ duration: 0.35 }}
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 flex flex-col justify-between hover:shadow-xl hover:border-primary-100/50 group transition-all duration-300"
              >
                {/* Image & location info */}
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 select-none">
                    <span className="flex items-center gap-1 text-[11px] text-amber-400 font-mono font-medium uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 shrink-0" />
                      {project.location}
                    </span>
                    <h3 className="font-display font-extrabold text-lg text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Specs */}
                <div className="p-6 space-y-4 flex-1">
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-light text-left">
                    {project.description}
                  </p>
                  
                  <div className="border-t border-slate-100 pt-4 space-y-2 text-left">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block font-medium">
                      {lang === 'uz' ? "Muhandislik ta'minoti:" : lang === 'en' ? "Engineering Package:" : "Инженерная комплектация:"}
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {project.specs.map((spec, sidx) => (
                        <div key={sidx} className="flex justify-between text-xs font-sans">
                          <span className="text-slate-400 font-light">{spec.label}</span>
                          <span className="text-slate-700 font-semibold text-right max-w-[200px] leading-snug">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Highlight status */}
                <div className="p-5 pt-0 border-t border-slate-50">
                  <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg flex items-center gap-2 text-emerald-800 text-[11px] font-sans">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">
                      {lang === 'uz' ? "Ob'yekt topshirilgan" : lang === 'en' ? "Fully Operational & Certified" : "Объект сдан в эксплуатацию"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic call to action */}
        <div className="mt-16 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-6.5 border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left select-none">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-lg text-white">
              {lang === 'uz' ? "Arxitektura chizmalari bo'yicha shaxsiy hisob-kitob kerakmi?" : lang === 'en' ? "Need Custom Estimate for Architectural Drawings?" : "Индивидуальный расчет под ваш архитектурный чертеж?"}
            </h4>
            <p className="text-xs text-slate-400 font-sans font-light max-w-xl leading-relaxed">
              {lang === 'uz' ? (
                <>Bizga loyiha fayllari va TZsini yuboring. Muhandislarimiz sizning budjetingiz doirasida GOST kafolati bilan sertifikatlangan liftlarni taklif qilishadi.</>
              ) : lang === 'en' ? (
                <>Upload elevator shaft drawings and specifications. Our technicians will outline fully compliant premium solutions designed to match your budget with strict standards.</>
              ) : (
                <>Отправьте нам проектные файлы шахт и конструкторские ТЗ. Наши инженеры предложат аналогичные сертифицированные лифты в рамках вашего бюджета с гарантией ГОСТ.</>
              )}
            </p>
          </div>
          <a
            href="#contacts"
            className="bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs px-6 py-3.5 rounded-lg text-center shadow-lg hover:shadow-primary-500/10 shrink-0 transition-transform hover:scale-[1.01]"
          >
            {lang === 'uz' ? "Muhandis-konstruktor bilan bog'lanish" : lang === 'en' ? "Connect with Design Engineer" : "Связаться с инженером-конструктором"}
          </a>
        </div>

      </div>
    </section>
  );
}
