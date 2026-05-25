import { Wrench, ShieldCheck, TrendingUp, Layers, Construction, FileCheck, ArrowRight } from "lucide-react";
import { useI18n } from "../i18n";
import { getLocalized } from "../utils/localize";

function getServiceIcon(name) {
  const iconStr = String(name || '').toLowerCase();
  if (iconStr.includes('wrench') || iconStr.includes('lift') || iconStr.includes('montazh')) {
    return <Wrench className="w-6 h-6 text-primary-600" />;
  } else if (iconStr.includes('shield') || iconStr.includes('supervision') || iconStr.includes('maintenance')) {
    return <ShieldCheck className="w-6 h-6 text-primary-600" />;
  } else if (iconStr.includes('trend') || iconStr.includes('modern')) {
    return <TrendingUp className="w-6 h-6 text-primary-600" />;
  } else if (iconStr.includes('layers') || iconStr.includes('escalator')) {
    return <Layers className="w-6 h-6 text-primary-600" />;
  } else if (iconStr.includes('construction') || iconStr.includes('special')) {
    return <Construction className="w-6 h-6 text-primary-600" />;
  } else if (iconStr.includes('file') || iconStr.includes('audit')) {
    return <FileCheck className="w-6 h-6 text-primary-600" />;
  }
  return <Wrench className="w-6 h-6 text-primary-600" />;
}

export default function Services({ onSelectService, serviceSection, serviceCards }) {
  const { lang } = useI18n();

  if (!serviceCards || serviceCards.length === 0) return null;

  const services = serviceCards.map((card) => ({
    id: card.id || card.slug,
    slug: card.slug,
    title: getLocalized(card, "title", lang),
    shortDescription: getLocalized(card, "desc", lang) || getLocalized(card, "description", lang),
    iconName: card.icon || "Wrench",
    image: card.image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
  }));

  const currentMiniTitle = getLocalized(serviceSection, "mini_title", lang) || (lang === 'uz' ? "🛠️ Professional xizmatlarimiz" : lang === 'en' ? "🛠️ Our Professional Services" : "🛠️ Наши профессиональные услуги");
  const currentTitle = getLocalized(serviceSection, "title", lang) || (lang === 'uz' ? "Vertikal transport uchun muhandislik yechimlari" : lang === 'en' ? "Engineering Solutions for Vertical Transport" : "Инженерные решения для вертикального транспорта");
  const currentDesc = getLocalized(serviceSection, "desc", lang) || (lang === 'uz' ? "Safetech Engineering Toshkent shahri bo'ylab liftlar, eskalatorlar va yuk ko'tarish platformalarini o'rnatish, ta'mirlash va texnik nazorat xizmatlarini taqdim etadi." : lang === 'en' ? "Safetech Engineering provides full installation, maintenance, repair, and technical audit services for elevators and escalators across Tashkent." : "Safetech Engineering выполняет полный спектр услуг по установке, диагностике, ремонту и техническому надзору за лифтами, эскалаторами и грузовыми подъемными платформами в Ташкенте.");

  return (
    <section id="services" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
            {currentMiniTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            {currentTitle}
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-sans font-light">
            {currentDesc}
          </p>
        </div>

        {/* Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-primary-100 group transition-all duration-300 transform hover:-translate-y-1.5"
            >
              {/* Photo Area */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="px-2.5 py-1 bg-primary-600/90 text-white text-[10px] uppercase font-mono tracking-wider rounded backdrop-blur-sm">
                    Safetech Quality
                  </span>
                </div>
              </div>

              {/* Text Context Area */}
              <div className="p-6 flex-1 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center border border-primary-100 shrink-0">
                  {getServiceIcon(service.iconName)}
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-primary-600 transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-sans font-light">
                  {service.shortDescription}
                </p>
              </div>

              {/* Action Trigger Area */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-center">
                <button
                  onClick={() => onSelectService(service.slug || service.id)}
                  className="w-full text-center bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                >
                  {lang === 'uz' ? "Spetsifikatsiyani ko'rish" : lang === 'en' ? "View Specifications" : "Подробнее о спецификации"}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
