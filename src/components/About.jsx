import { motion } from "framer-motion";
import { CheckCircle2, Award, Briefcase, Ruler } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function About({ experience }) {
  const { lang, t } = useI18n();

  const miniTitle = getLocalized(experience, "mini_title", lang) || (lang === "uz" ? "TAJRIBAMIZ" : lang === "en" ? "OUR EXPERIENCE" : "НАШ ОПЫТ");
  const title = getLocalized(experience, "title", lang) || (lang === "uz" ? "15 YILLIK\nBEMINNAT TAJRIBA" : lang === "en" ? "15 YEARS OF\nFLAWLESS EXPERIENCE" : "15 ЛЕТ\nБЕЗУПРЕЧНОГО ОПЫТА");
  const desc = getLocalized(experience, "desc", lang) || (lang === "uz" ? "Biz O'zbekistonda liftlar va eskalatorlarni o'rnatish, modernizatsiya qilish hamda ularga texnik xizmat ko'rsatish sohasida yetakchi kompaniyalardan birimiz." : lang === "en" ? "We are one of the leading companies in Uzbekistan specializing in the installation, modernization, and maintenance of elevators and escalators." : "Благодаря многолетнему опыту, строжайшим стандартам и высококлассной команде инженеров мы обеспечиваем безупречную безопасность движения.");

  const features = lang === 'uz' ? [
    { icon: Award, text: "Jahon standartlariga to'liq javob beradigan sifat" },
    { icon: Briefcase, text: "Litsenziyaga ega professional muhandislar jamoasi" },
    { icon: Ruler, text: "Har bir bino uchun individual muhandislik yechimi" }
  ] : lang === 'en' ? [
    { icon: Award, text: "Quality fully compliant with world safety standards" },
    { icon: Briefcase, text: "Team of licensed professional engineers" },
    { icon: Ruler, text: "Custom engineering solutions for every building" }
  ] : [
    { icon: Award, text: "Качество, полностью отвечающее мировым стандартам безопасности" },
    { icon: Briefcase, text: "Команда лицензированных профессиональных инженеров" },
    { icon: Ruler, text: "Индивидуальные инженерные решения для каждого здания" }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden scroll-mt-16">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 origin-top transform translate-x-20 z-0"></div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6">
              {miniTitle && (
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider border border-primary-100">
                  {miniTitle}
                </div>
              )}

              {title && (
                <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight whitespace-pre-line">
                  {title}
                </h2>
              )}

              {desc && (
                <div className="text-base text-slate-600 leading-relaxed font-sans font-light">
                  <p>{desc}</p>
                </div>
              )}

              <div className="space-y-4 pt-6 border-t border-slate-100">
                {features.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed pt-2.5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Premium Image Layout */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1545459720-aac273a27791?q=80&w=1000&auto=format&fit=crop" 
                alt="SafeTech Engineering" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 text-white">
                  <h4 className="font-display font-bold text-lg mb-1">
                    {lang === "uz" ? "Premium Sifat" : lang === "en" ? "Premium Quality" : "Премиальное Качество"}
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    {lang === "uz" ? "Har bir detal va mexanizm qat'iy nazoratdan o'tadi." : lang === "en" ? "Every component and mechanism undergoes strict quality control." : "Каждая деталь и механизм проходят строгий контроль качества."}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10 animate-float" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10 animate-float" style={{ animationDelay: "2s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
