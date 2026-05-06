import React, { useState, useEffect } from 'react';
import {
  Shield,
  Settings,
  Wrench,
  CheckCircle,
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Monitor,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './i18n';

/* ─── Loading Screen ─────────────────────────────────────────────── */
const LoadingScreen = ({ brandName }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
  >
    <div className="flex flex-col items-center">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black tracking-[0.3em] text-graphite uppercase mb-6"
      >
        {brandName || 'Lift Test'}
      </motion.span>
      <div className="w-32 h-[1px] bg-graphite/10 relative overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-graphite w-1/2"
        />
      </div>
    </div>
  </motion.div>
);

/* ─── Language Switcher ──────────────────────────────────────────── */
const LANGS = ['uz', 'en', 'ru'];

const LanguageSwitcher = ({ lang, setLang, isDark, scrolled }) => (
  <div className={`flex items-center ${isDark ? 'space-x-4' : 'space-x-1'}`}>
    {LANGS.map((l) => (
      <button
        key={l}
        onClick={() => setLang(l)}
        className={`font-bold uppercase tracking-widest transition-all ${
          isDark ? 'text-lg px-4 py-2' : 'text-[10px] px-2 py-1'
        } ${
          lang === l
            ? 'bg-safety-orange text-white'
            : isDark || !scrolled ? 'text-white/60 hover:text-white' : 'text-graphite/40 hover:text-graphite'
        }`}
      >
        {l}
      </button>
    ))}
  </div>
);

/* ─── Navbar ─────────────────────────────────────────────────────── */
const Navbar = ({ lang, setLang, general, phones }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const links = [
    { label: t.home, id: 'home' },
    { label: t.experience, id: 'experience' },
    { label: t.services, id: 'services' },
    { label: t.gallery, id: 'gallery' },
    { label: t.contact, id: 'contact' },
  ];

  const logo = general?.navbar_logo;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          scrolled 
            ? 'py-4 bg-white/90 backdrop-blur-xl shadow-xl border-b border-black/5' 
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3 group">
            {logo ? (
              <img src={logo} alt="Logo" className="h-16 object-contain" />
            ) : (
              <span className={`text-3xl font-black tracking-tighter uppercase transition-colors duration-500 ${scrolled ? 'text-graphite' : 'text-white'}`}>
                {general?.brand_name || 'Lift test'}
              </span>
            )}
          </a>

          <div className="hidden lg:flex items-center space-x-10">
            {links.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  scrolled ? 'text-graphite/60 hover:text-steel-blue' : 'text-white/80 hover:text-safety-orange'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className={`h-4 w-[1px] mx-2 transition-colors ${scrolled ? 'bg-black/10' : 'bg-white/20'}`} />
            <LanguageSwitcher lang={lang} setLang={setLang} scrolled={scrolled} />
            {(phones?.[0]?.number) && (
              <a 
                href={`tel:${(phones?.[0]?.number)?.replace(/[^0-9+]/g, '')}`} 
                className="bg-graphite text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-steel-blue transition-all"
              >
                {phones?.[0]?.number}
              </a>
            )}
          </div>

          <button 
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-graphite' : 'text-white'}`}
            onClick={() => setIsOpen(true)}
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-graphite z-[2000] lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              {logo ? (
                <img src={logo} alt="Logo" className="h-10 object-contain brightness-0 invert" />
              ) : (
                <span className="text-2xl font-black tracking-tighter text-white uppercase">
                  {general?.brand_name || 'Lift test'}
                </span>
              )}
              <button className="text-white hover:text-safety-orange transition-colors" onClick={() => setIsOpen(false)}>
                <X size={44} />
              </button>
            </div>

            <div className="flex flex-col space-y-10">
              {links.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-5xl font-black text-white uppercase tracking-tighter hover:text-safety-orange transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-16 flex flex-col space-y-8">
              <LanguageSwitcher lang={lang} setLang={setLang} isDark={true} />
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
                  {lang === 'ru' ? 'Прямая линия' : lang === 'en' ? 'Direct Line' : 'Bevosita aloqa'}
                </div>
                {(phones?.[0]?.number) && (
                  <a href={`tel:${(phones?.[0]?.number)?.replace(/[^0-9+]/g, '')}`} className="text-3xl font-bold text-safety-orange">
                    {phones?.[0]?.number}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Hero ───────────────────────────────────────────────────────── */
const Hero = ({ lang, hero, phones, emails }) => {
  const t = translations[lang].hero;
  
  const miniTitle = hero?.[`mini_title_${lang}`];
  const title = hero?.[`title_${lang}`];
  const desc = hero?.[`desc_${lang}`];

  if (!title) return null;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={hero?.hero_bg ? `${import.meta.env.VITE_API_BASE_URL}${hero.hero_bg}` : "/hero.png"}
          alt="Engineering"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="flex items-center space-x-4 mb-6 md:mb-10">
            <span className="w-8 md:w-12 h-[2px] bg-safety-orange" />
            <span className="font-mono text-white/80 text-[clamp(0.6rem,1.5vw,0.75rem)] uppercase tracking-[0.4em] md:tracking-[0.6em]">
              {miniTitle}
            </span>
            <span className="w-8 md:w-12 h-[2px] bg-safety-orange" />
          </div>
          <h1 className="text-[clamp(2.2rem,8vw,5.5rem)] mb-6 md:mb-10 leading-[0.95] font-black text-white tracking-tighter uppercase whitespace-pre-line">
            {title}
          </h1>
          <p className="text-white/80 text-[clamp(1rem,2vw,1.4rem)] max-w-2xl mb-10 md:mb-16 font-medium leading-relaxed px-4 md:px-0">
            {desc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-12">
            <a
              href="#services"
              className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-safety-orange text-white font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-graphite transition-all shadow-2xl"
            >
              {t.cta}
            </a>
            <div className="flex flex-col items-center sm:items-start space-y-2">
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">
                {t.contactLabel}
              </span>
              <div className="flex flex-col items-center sm:items-start">
                {(phones?.[0]?.number) && (
                  <a
                    href={`tel:${(phones?.[0]?.number)?.replace(/[^0-9+]/g, '')}`}
                    className="text-xl md:text-2xl font-bold text-white hover:text-safety-orange transition-colors underline decoration-safety-orange decoration-2 underline-offset-4"
                  >
                    {phones?.[0]?.number}
                  </a>
                )}
                {(emails?.[0]?.email) && (
                  <a
                    href={`mailto:${emails?.[0]?.email}`}
                    className="text-sm md:text-base font-bold text-white/60 hover:text-safety-orange transition-colors"
                  >
                    {emails?.[0]?.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-6 hidden lg:flex items-center space-x-6 opacity-20">
        <div className="font-mono text-[10px] text-graphite uppercase tracking-widest rotate-90 origin-left">
          EST_2009
        </div>
        <div className="w-[1px] h-20 bg-graphite" />
      </div>
    </section>
  );
};

/* ─── Experience ─────────────────────────────────────────────────── */
const Experience = ({ lang, experience, cards }) => {
  const t = translations[lang].experience;
  
  const miniTitle = experience?.[`mini_title_${lang}`];
  const title = experience?.[`title_${lang}`];
  const desc = experience?.[`desc_${lang}`];

  if (!cards || cards.length === 0) return null;

  const itemsToRender = cards.map(c => ({
    value: c[`title_${lang}`],
    label: c[`desc_${lang}`]
  }));

  return (
    <section id="experience" className="py-32 bg-white border-y border-black/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-16 md:mb-24">
          <h2 className="text-safety-orange font-bold text-[10px] tracking-[0.4em] mb-4 uppercase">
            {miniTitle}
          </h2>
          <h3 className="text-[clamp(2rem,6vw,5rem)] font-black text-graphite tracking-tighter uppercase mb-6 md:mb-8 leading-[1] whitespace-pre-line">
            {title}
          </h3>
          <p className="text-graphite/50 text-[clamp(1rem,1.5vw,1.25rem)] font-medium max-w-2xl leading-relaxed">
            {desc}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {itemsToRender.map((stat, i) => (
            <div key={i} className="group">
              <div className="text-6xl font-black text-graphite mb-2 group-hover:text-steel-blue transition-colors">
                {stat.value}
              </div>
              <div className="w-12 h-[3px] bg-safety-orange mb-4" />
              <div className="font-bold text-[10px] uppercase tracking-widest text-graphite/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Services ───────────────────────────────────────────────────── */
const serviceIcons = [<Shield />, <Settings />, <Wrench />, <CheckCircle />];
const serviceColors = [
  'border-l-steel-blue',
  'border-l-safety-orange',
  'border-l-graphite',
  'border-l-steel-blue',
];

const Services = ({ lang, service, cards }) => {
  const t = translations[lang].services;
  
  const miniTitle = service?.[`mini_title_${lang}`];
  const title = service?.[`title_${lang}`];
  const desc = service?.[`desc_${lang}`];

  if (!cards || cards.length === 0) return null;

  const itemsToRender = cards.map(c => ({
    icon: c.icon,
    title: c[`title_${lang}`],
    desc: c[`desc_${lang}`]
  }));

  return (
    <section id="services" className="py-32 bg-[#fcfcfc]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 mb-24 items-end">
          <div>
            <h2 className="text-safety-orange font-bold text-[10px] tracking-[0.4em] mb-4 uppercase">
              {miniTitle}
            </h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-graphite tracking-tighter uppercase leading-[1.1] whitespace-pre-line">
              {title}
            </h3>
          </div>
          <p className="text-graphite/50 text-lg font-medium max-w-md">{desc}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
          {itemsToRender.map((s, i) => (
            <div
              key={i}
              className={`p-12 bg-white border border-black/5 ${serviceColors[i % serviceColors.length]} border-l-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group`}
            >
              <div className="text-graphite mb-10 w-12 h-12 flex items-center justify-center bg-gray-50 group-hover:bg-steel-blue group-hover:text-white transition-colors">
                {s.icon ? (
                  <img src={s.icon} alt={s.title} className="w-8 h-8 object-contain" />
                ) : (
                  serviceIcons[i % serviceIcons.length]
                )}
              </div>
              <h4 className="text-xl font-black mb-4 text-graphite uppercase">
                {s.title}
              </h4>
              <p className="text-graphite/50 text-sm font-medium leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Gallery ────────────────────────────────────────────────────── */
const Gallery = ({ lang, gallery, imgs }) => {
  const t = translations[lang].gallery;
  
  const miniTitle = gallery?.[`mini_title_${lang}`];
  const title = gallery?.[`title_${lang}`];

  if (!imgs || imgs.length === 0) return null;

  const itemsToRender = imgs.map(c => ({
    image: c.image,
    title: c[`title_${lang}`],
    reference: c[`desc_${lang}`]
  }));

  return (
    <section id="gallery" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl">
          <h2 className="text-steel-blue font-bold text-[10px] tracking-[0.4em] mb-4 uppercase">
            {miniTitle}
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-graphite mb-8 uppercase tracking-tighter leading-[1.1] whitespace-pre-line">
            {title}
          </h3>
        </div>
      </div>

      <div className="gallery-grid">
        {itemsToRender.map((item, i) => (
          <div 
            key={i} 
            className="gallery-item cursor-default"
          >
            <img src={item.image} alt={item.title} />
            <div className="gallery-overlay">
              <h4>{item.title}</h4>
              <p>{item.reference}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── Contact ────────────────────────────────────────────────────── */
const Contact = ({ lang, contact, phones, emails }) => {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({ name: '', phone: '', details: '' });
  const [status, setStatus] = useState(null);

  const miniTitle = contact?.[`mini_title_${lang}`];
  const title = contact?.[`title_${lang}`];
  const desc = contact?.[`desc_${lang}`];

  const itemsToRender = [
    { icon: <Phone />, label: t.phone.label, val: phones?.[0]?.number, type: 'phone' },
    { icon: <Mail />, label: t.email.label, val: emails?.[0]?.email, type: 'email' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic phone validation
    const phoneRegex = /^\+?[\d\s\-()]{7,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus('error-phone');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', details: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-safety-orange font-bold text-[10px] tracking-[0.4em] mb-4 uppercase">
              {miniTitle}
            </h2>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 tracking-tighter uppercase leading-[0.9] whitespace-pre-line">
              {title}
            </h3>
            <p className="text-white/40 text-lg mb-16 max-w-md font-medium">
              {desc}
            </p>
            <div className="grid gap-8">
              {itemsToRender.map((item, idx) => {
                const isPhone = item.type === 'phone' || (typeof item.val === 'string' && item.val.includes('+'));
                const isEmail = item.type === 'email' || (typeof item.val === 'string' && item.val.includes('@'));
                const href = isPhone ? `tel:${item.val?.replace(/[^0-9+]/g, '')}` : isEmail ? `mailto:${item.val}` : null;

                return (
                  <div key={idx} className="flex items-center space-x-6">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-safety-orange">
                      {item.icon && typeof item.icon === 'string' ? (
                        <img src={item.icon} alt={item.label} className="w-6 h-6 object-contain" />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        {item.label}
                      </div>
                      {href ? (
                        <a href={href} className="text-lg font-bold whitespace-pre-line hover:text-safety-orange transition-colors">
                          {item.val}
                        </a>
                      ) : (
                        <div className="text-lg font-bold whitespace-pre-line">{item.val}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-safety-orange/40" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-safety-orange/40" />
            
            <div className="bg-[#242424] border border-white/5 p-10 lg:p-14 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[1px] h-0 bg-safety-orange group-hover:h-full transition-all duration-700" />
              
              <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center space-x-2">
                    <span className="w-1 h-1 bg-safety-orange rounded-full" />
                    <span>{t.formName}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="..."
                    className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-safety-orange/30 text-white font-medium transition-all placeholder:text-white/5"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center space-x-2">
                    <span className="w-1 h-1 bg-safety-orange rounded-full" />
                    <span>{t.formPhone}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="..."
                    className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-safety-orange/30 text-white font-medium transition-all placeholder:text-white/5"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center space-x-2">
                    <span className="w-1 h-1 bg-safety-orange rounded-full" />
                    <span>{t.formDetails}</span>
                  </label>
                  <textarea
                    rows="4"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="..."
                    className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-safety-orange/30 text-white font-medium transition-all resize-none placeholder:text-white/5"
                  />
                </div>

                {status === 'success' && <p className="text-green-500 text-sm font-bold">Successfully sent!</p>}
                {status === 'error' && <p className="text-red-500 text-sm font-bold">Error sending form. Try again.</p>}
                {status === 'error-phone' && <p className="text-red-500 text-sm font-bold">Invalid phone format. Please check.</p>}

                <button type="submit" className="group relative w-full py-6 bg-safety-orange text-white font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all">
                  <span className="relative z-10 group-hover:text-graphite transition-colors duration-300">{t.formBtn}</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Footer ─────────────────────────────────────────────────────── */
const Footer = ({ lang, setLang, general, phones, emails }) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;
  const logo = general?.footer_logo;
  const phone = phones?.[0]?.number;
  const email = emails?.[0]?.email;

  return (
    <footer className="py-16 bg-[#0a0a0a] text-white border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 items-start">
          <div className="space-y-6">
            {logo ? (
              <img src={logo} alt="Footer Logo" className="h-16 object-contain" />
            ) : (
              <span className="text-3xl font-black tracking-tighter uppercase">
                {general?.brand_name || 'Lift test'}
              </span>
            )}
            <p className="text-white/30 text-xs font-medium leading-relaxed max-w-xs">
              {lang === 'ru' ? 'Ведущий эксперт в области вертикального транспорта и промышленной безопасности в Узбекистане.' : lang === 'en' ? 'Leading expert in vertical transport and industrial safety in Uzbekistan.' : 'O\'zbekistondagi vertikal transport va sanoat xavfsizligi sohasidagi yetakchi ekspert.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{lang === 'ru' ? 'Меню' : lang === 'en' ? 'Menu' : 'Menyu'}</h4>
              <nav className="flex flex-col space-y-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <a href="#home" className="hover:text-safety-orange transition-colors">{nav.home}</a>
                <a href="#experience" className="hover:text-safety-orange transition-colors">{nav.experience}</a>
                <a href="#services" className="hover:text-safety-orange transition-colors">{nav.services}</a>
                <a href="#gallery" className="hover:text-safety-orange transition-colors">{nav.gallery}</a>
                <a href="#contact" className="hover:text-safety-orange transition-colors">{nav.contact}</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{lang === 'ru' ? 'Контакты' : lang === 'en' ? 'Contact' : 'Aloqa'}</h4>
              <div className="flex flex-col space-y-3">
                {phone && (
                  <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-bold hover:text-safety-orange transition-colors">
                    {phone}
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="text-xs font-bold text-white/40 hover:text-steel-blue transition-colors">
                    {email}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:text-right space-y-6">
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{lang === 'ru' ? 'Юридическая инфо' : lang === 'en' ? 'Legal' : 'Yuridik ma\'lumot'}</h4>
            <div className="flex flex-col lg:items-end space-y-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
              <a href="#" className="hover:text-safety-orange transition-colors">{t.privacy}</a>
              <a href="#" className="hover:text-safety-orange transition-colors">{t.terms}</a>
              <a href="#" className="hover:text-safety-orange transition-colors">{t.compliance}</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em]">
            {t.copy}
          </span>
          <LanguageSwitcher lang={lang} setLang={setLang} isDark={true} />
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-safety-orange rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">System Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─── App ────────────────────────────────────────────────────────── */
function App() {
  const [lang, setLang] = useState('uz');
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/page-data/`)
      .then(res => res.json())
      .then(data => {
        setPageData(data);
        setTimeout(() => setLoading(false), 800);
      })
      .catch(err => {
        console.error("Error fetching page data", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" brandName={pageData?.general?.brand_name} />}
      </AnimatePresence>

      <Navbar lang={lang} setLang={setLang} general={pageData?.general} phones={pageData?.phones} />
      <main>
        <Hero lang={lang} hero={pageData?.hero} phones={pageData?.phones} emails={pageData?.emails} />
        <Experience lang={lang} experience={pageData?.experience} cards={pageData?.experience_cards} />
        <Services lang={lang} service={pageData?.service} cards={pageData?.service_cards} />
        <Gallery lang={lang} gallery={pageData?.gallery} imgs={pageData?.gallery_images} />
        <Contact lang={lang} contact={pageData?.contact} phones={pageData?.phones} emails={pageData?.emails} />
      </main>
      <Footer lang={lang} setLang={setLang} general={pageData?.general} phones={pageData?.phones} emails={pageData?.emails} />
    </div>
  );
}

export default App;
