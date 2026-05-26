import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, ShieldCheck, Award } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function Certificates({ certificates, certificateCards }) {
  const { lang } = useI18n();
  const [activeZoomImage, setActiveZoomImage] = useState(null);

  if (!certificateCards || certificateCards.length === 0) return null;

  const currentMiniTitle = getLocalized(certificates, "mini_title", lang) || (lang === 'uz' ? "📜 Davlat litsenziyalari va ruxsatnomalar" : lang === 'en' ? "📜 State Licenses & Certifications" : "📜 Государственные лицензии и допуски");
  const currentTitle = getLocalized(certificates, "title", lang) || (lang === 'uz' ? "Rasmiy guvohnomalar va ISO standartlari" : lang === 'en' ? "Official Credentials & ISO Standards" : "Официальные свидетельства и стандарты ISO");
  const currentDesc = getLocalized(certificates, "desc", lang) || (lang === 'uz' ? "Safetech Engineering o'rnatish-loyiha va sozlash faoliyatini sanoat xavfsizligining barcha tegishli davlat muvofiqlik sertifikatlariga ega holda qonuniy ravishda amalga oshiradi." : lang === 'en' ? "Safetech Engineering conducts installation, engineering, and commissioning activities with full legal compliance, holding all official state safety licenses." : "Safetech Engineering осуществляет монтажно-проектную и наладческую деятельность легитимно, имея все профильные государственные сертификаты соответствия промышленной безопасности.");

  return (
    <section id="certificates" className="py-20 bg-white scroll-mt-16">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            {currentMiniTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            {currentTitle}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-sans font-light">
            {currentDesc}
          </p>
        </div>

        {/* Certificate list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certificateCards.map((cert) => (
            <div 
              key={cert.id || cert.title_ru}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-xl hover:bg-white hover:border-slate-200 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Cover visual representation */}
              <div 
                onClick={() => setActiveZoomImage(cert)}
                className="relative aspect-[3/4] bg-slate-900/10 rounded-xl overflow-hidden cursor-pointer select-none border border-slate-200"
              >
                <img 
                  src={cert.image} 
                  alt={getLocalized(cert, "title", lang)} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
                
                {/* Light reflection filter */}
                <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-slate-900 rounded-full p-3 shadow-lg flex items-center justify-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-semibold text-xs font-sans">
                    <Eye className="w-4.5 h-4.5" />
                    {lang === 'uz' ? "Ko'rish" : lang === 'en' ? "Zoom" : "Рассмотреть"}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 text-left space-y-1.5 flex-1 flex flex-col justify-end">
                <span className="text-[10px] text-primary-600 font-mono block uppercase tracking-wider">
                  {getLocalized(cert, "year", lang)}
                </span>
                <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                  {getLocalized(cert, "title", lang)}
                </h3>
                <p className="text-[11px] text-slate-500 font-sans font-light leading-snug">
                  {lang === 'uz' ? "Berilgan:" : lang === 'en' ? "Issuer:" : "Выдан:"} {getLocalized(cert, "issuer", lang)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Zoom Lightbox */}
        <AnimatePresence>
          {activeZoomImage && (
            <div 
              onClick={() => setActiveZoomImage(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-200 p-6 space-y-4 relative flex flex-col cursor-default"
              >
                <button
                  onClick={() => setActiveZoomImage(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Simulated Document */}
                <div className="aspect-[3/4] rounded-lg bg-orange-50/10 border-2 border-dashed border-primary-100 relative overflow-hidden flex items-center justify-center p-2">
                  <img 
                    src={activeZoomImage.image} 
                    alt={getLocalized(activeZoomImage, "title", lang)} 
                    className="w-full h-full object-cover filter brightness-[0.98] pointer-events-none rounded select-none"
                  />
                  {/* Stamp */}
                  <div className="absolute right-6 bottom-6 w-16 h-16 rounded-full border-4 border-emerald-500/50 flex flex-col items-center justify-center rotate-12 text-center text-emerald-500 select-none">
                    <span className="text-[7px] font-mono tracking-widest leading-none font-bold uppercase">APPROVED</span>
                    <ShieldCheck className="w-4 h-4 mt-0.5 fill-emerald-500/10" />
                  </div>
                </div>

                <div className="text-left space-y-1">
                  <div className="flex items-center gap-1 bg-amber-500/10 rounded px-2 py-0.5 w-fit border border-amber-500/20 text-amber-700 text-[10px] font-mono font-semibold uppercase">
                    <Award className="w-3.5 h-3.5" /> {lang === 'uz' ? "Davlat Reyestri" : lang === 'en' ? "State Registry" : "Гос-Реестр РУз"}
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 pt-1 leading-snug">
                    {getLocalized(activeZoomImage, "title", lang)}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans font-light">
                    {lang === 'uz' ? "Bergan organ:" : lang === 'en' ? "Issuer:" : "Орган выдачи:"} {getLocalized(activeZoomImage, "issuer", lang)} <br />
                    {lang === 'uz' ? "Amal qilish muddati:" : lang === 'en' ? "Validity Period:" : "Период согласования:"} {getLocalized(activeZoomImage, "year", lang)}
                  </p>
                </div>

                <button
                  onClick={() => setActiveZoomImage(null)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-lg text-center cursor-pointer"
                >
                  {lang === 'uz' ? "Hujjatni yopish" : lang === 'en' ? "Close Document" : "Закрыть документ"}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
