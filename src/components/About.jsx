import { CheckCircle2 } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

export default function About({ experience, experienceCards }) {
  const { lang } = useI18n();

  const highlights = experienceCards && experienceCards.length > 0
    ? experienceCards.map((card) => ({
        title: getLocalized(card, "title", lang),
        desc: getLocalized(card, "desc", lang),
      }))
    : [];

  const miniTitle = getLocalized(experience, "mini_title", lang);
  const title = getLocalized(experience, "title", lang);
  const desc = getLocalized(experience, "desc", lang);

  // If no backend data at all, render nothing
  if (!experience && highlights.length === 0) return null;

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {miniTitle && (
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                {miniTitle}
              </div>
            )}

            {title && (
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight whitespace-pre-line">
                {title}
              </h2>
            )}

            {desc && (
              <div className="text-base text-slate-600 leading-relaxed font-sans font-light">
                <p>{desc}</p>
              </div>
            )}

            {/* Highlights from experience_cards */}
            {highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100/80 hover:border-primary-100 transition-colors duration-200">
                    <div className="text-primary-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 leading-snug">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right decorative column — only shown when there's content */}
          {experience && (
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-primary-950 select-none min-h-[320px] flex flex-col justify-end shadow-2xl border border-slate-800">
                {/* Decorative grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />

                {/* Stats badges grid */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8 w-full">
                    {highlights.slice(0, 4).map((item, i) => (
                      <div key={i} className="bg-slate-800/80 backdrop-blur rounded-xl p-4 border border-slate-700/50 text-center">
                        <span className="block font-display font-black text-2xl text-white">{item.title}</span>
                        <span className="block text-[10px] text-slate-400 mt-1 leading-tight">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom overlay bar */}
                <div className="relative z-10 bg-slate-900/95 backdrop-blur-md p-5 border-t border-white/10 text-white">
                  <span className="text-[10px] text-amber-500 font-mono block uppercase tracking-wider mb-1">
                    {lang === "uz" ? "Xavfsizlik Kafolati" : lang === "en" ? "Safety Guarantee" : "Гарантия Безопасности"}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                    {lang === "uz"
                      ? "Montajning har bir bosqichi elektron sifat pasportida qayd etiladi va O'zbekiston Respublikasi sanoat xavfsizligi inspektorlariga topshiriladi."
                      : lang === "en"
                      ? "Every installation stage is logged in the quality passport and certified by the State Industrial Safety Inspectors of Uzbekistan."
                      : "Каждый этап монтажа фиксируется в электронном паспорте качества и сдается инспекторам промышленной безопасности Республики Узбекистан."}
                  </p>
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10 animate-float" style={{ animationDelay: "2s" }} />

              {/* 100% badge */}
              <div className="absolute -top-6 -left-6 bg-primary-600 text-white p-4 rounded-xl shadow-xl hidden sm:block border border-primary-500 select-none">
                <span className="block text-3xl font-display font-extrabold">100%</span>
                <span className="block text-[10px] uppercase font-mono tracking-wider opacity-80">
                  {lang === "uz" ? "Sifat nazorati" : lang === "en" ? "Quality Control" : "Контроль качества"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
