import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

const BORDER_COLORS = [
  "border-emerald-500/20",
  "border-primary-500/20",
  "border-cyan-500/20",
  "border-amber-500/20",
];

export default function Stats({ experienceData, experienceCards }) {
  const { lang } = useI18n();

  // Use backend experience_cards if available
  const stats = experienceCards && experienceCards.length > 0
    ? experienceCards.map((card, i) => ({
        value: getLocalized(card, "title", lang) || card.title_ru || "",
        label: getLocalized(card, "desc", lang) || card.desc_ru || "",
        color: BORDER_COLORS[i % BORDER_COLORS.length],
      }))
    : [];

  if (stats.length === 0) return null;

  return (
    <section className="bg-slate-900 border-t border-b border-slate-800 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_100%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-slate-950/40 border ${stat.color} p-6 rounded-2xl md:text-left text-center backdrop-blur-md relative group hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-t from-primary-600 to-amber-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight shrink-0 mb-2 block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <h3 className="font-semibold text-base text-slate-200 tracking-tight leading-snug">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>

        {/* Reliability badge — always shown */}
        <div className="mt-12 p-5 bg-gradient-to-r from-primary-950/50 to-slate-950/50 rounded-xl border border-primary-500/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="inline-block text-[10px] font-mono uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">
              {lang === "uz" ? "Ishonchlilik ko'rsatkichi" : lang === "en" ? "Reliability Metric" : "Показатель надёжности"}
            </span>
            <div className="text-sm text-slate-300 font-sans">
              {lang === "uz" ? (
                <>Texnik xizmat ko'rsatish bo'yicha ishonchlilik rekordimiz: so'nggi ikki yil ichida <strong className="text-white">99.8% uzluksiz ishlash</strong>.</>
              ) : lang === "en" ? (
                <>Our maintenance reliability record: <strong className="text-white">99.8% uptime</strong> over the past two years.</>
              ) : (
                <>Наш рекорд надежности по техническому обслуживанию: <strong className="text-white">99.8% бесперебойной работы</strong> за последние два года.</>
              )}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">
              {lang === "uz" ? "Barqaror va xavfsiz ishlaymiz" : lang === "en" ? "Operating safely and steadily" : "Работаем стабильно и безопасно"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
