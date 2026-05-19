import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useI18n } from '../i18n';
import { useInView, useCounter } from '../hooks';
import { FadeUp, SectionLabel, AccentLine, ServiceIcon } from '../components/ui';
import { endpoints } from '../api';
import { CTABanner } from '../components/ui';

// ─── Hero ───────────────────────────────────────────────────────────
function Hero() {
  const { t, lang } = useI18n();
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    endpoints.pageData().then(res => setHeroData(res.data?.hero)).catch(console.error);
  }, []);

  const dynamicBg = heroData?.hero_bg;
  const title = heroData ? (heroData[`title_${lang}`] || heroData.title_ru || t.hero.title) : t.hero.title;
  const desc = heroData ? (heroData[`desc_${lang}`] || heroData.desc_ru || t.hero.subtitle) : t.hero.subtitle;

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: dynamicBg ? `linear-gradient(rgba(14, 38, 64, 0.85), rgba(14, 38, 64, 0.95)), url(${dynamicBg}) center/cover no-repeat` : 'var(--navy)',
      position: 'relative', overflow: 'hidden',
      paddingTop: 72,
    }} className={!dynamicBg ? 'grid-bg' : ''}>
      
      {/* Decorative geometry - only show if no bg image, or make it subtle */}
      {!dynamicBg && (
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', overflow: 'hidden', opacity: 0.06, pointerEvents: 'none' }}>
          <svg viewBox="0 0 500 700" fill="none" style={{ width: '100%', height: '100%' }}>
            <rect x="40" y="40" width="420" height="620" rx="2" stroke="var(--accent)" strokeWidth="1"/>
            <rect x="80" y="80" width="340" height="540" rx="2" stroke="var(--accent)" strokeWidth="0.5"/>
            <line x1="40" y1="340" x2="460" y2="340" stroke="var(--accent)" strokeWidth="0.5"/>
            <line x1="250" y1="40" x2="250" y2="660" stroke="var(--accent)" strokeWidth="0.5"/>
            {[...Array(8)].map((_, i) => (
              <rect key={i} x={160} y={80 + i * 67} width={180} height={55} rx="1" stroke="var(--accent)" strokeWidth="0.5"/>
            ))}
          </svg>
        </div>
      )}

      {/* Accent glow */}
      <div style={{ position: 'absolute', top: '40%', right: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(43,143,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
        <FadeUp delay={0}>
          <SectionLabel>{t.hero.label}</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 24,
            whiteSpace: 'pre-line',
            maxWidth: 700,
          }}>
            {title}
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p style={{ fontSize: 17, color: 'var(--gray2)', maxWidth: 520, marginBottom: 40, lineHeight: 1.7 }}>
            {desc}
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-primary btn-lg">
              {t.hero.cta} <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────
function StatItem({ value, label }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '24px 16px' }}>
      <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--accent)', lineHeight: 1 }}>
        {count}
      </div>
      <div className="divider" style={{ width: 32, margin: '12px auto' }} />
      <div style={{ fontSize: 13, color: 'var(--gray2)', fontWeight: 500, letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
}

function Stats() {
  const { t } = useI18n();
  const { ref, inView } = useInView();
  return (
    <section style={{ background: 'var(--navy2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 0 }}>
          {t.stats.items.map((s, i) => (
            <div key={i} style={{ borderRight: i < t.stats.items.length - 1 ? '1px solid var(--border)' : 'none', padding: '40px 0' }}>
              {inView && <StatItem value={s.value} label={s.label} />}
              {!inView && (
                <div style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '3rem', color: 'var(--accent)', lineHeight: 1 }}>—</div>
                  <div style={{ fontSize: 13, color: 'var(--gray2)', marginTop: 8 }}>{s.label}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── Services Preview ────────────────────────────────────────────────
function ServicesPreview() {
  const { t, lang } = useI18n();
  const [services, setServices] = useState([]);

  useEffect(() => {
    endpoints.services().then(res => setServices(res.data)).catch(console.error);
  }, []);

  return (
    <section className="section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <FadeUp><SectionLabel>{t.services.label}</SectionLabel></FadeUp>
            <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0, color: 'var(--text-dark)' }}>{t.services.title}</h2></FadeUp>
            <FadeUp delay={0.15}><p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: 15 }}>{t.services.subtitle}</p></FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link to="/services" className="btn btn-ghost">
              {t.services.all} <ArrowRight size={16} />
            </Link>
          </FadeUp>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {services.map((s, i) => {
            const title = s[`title_${lang}`] || s.title_ru;
            const desc = s[`desc_${lang}`] || s.desc_ru;
            return (
              <FadeUp key={s.slug || i} delay={i * 0.1}>
                <Link to={`/services/${s.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div style={{
                    background: 'var(--light)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '12px',
                    transition: 'all 0.3s',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)'; }}
                  >
                    {s.image ? (
                      <div style={{ width: '100%', height: 180, overflow: 'hidden' }}>
                        <img src={s.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ padding: '32px 32px 0' }}>
                        <ServiceIcon slug={s.icon || s.slug} />
                      </div>
                    )}
                    
                    <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--text-dark)', position: 'relative', zIndex: 1 }}>{title}</h3>
                      {desc && <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, position: 'relative', zIndex: 1, flex: 1 }}>{desc}</p>}
                      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontSize: 13, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                        {lang === 'ru' ? 'Подробнее' : (lang === 'uz' ? 'Batafsil' : 'Detail')} <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why Us ──────────────────────────────────────────────────────────
function WhyUs() {
  const { t } = useI18n();
  const icons = ['🏛️','🛡️','📅','👷','⏱️','🔧'];
  return (
    <section className="section" style={{ background: 'var(--navy)' }} id="why-us">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <FadeUp><SectionLabel>{t.whyUs.label}</SectionLabel></FadeUp>
          <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)' }}>{t.whyUs.title}</h2></FadeUp>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {t.whyUs.items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div style={{
                background: 'var(--navy2)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: 32, height: '100%',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 20 }}>{icons[i]}</div>
                <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--white)' }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--gray2)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── Contact Section ────────────────────────────────────────────────
function ContactSection() {
  const { t, lang } = useI18n();
  const [data, setData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    setStatus('loading');
    try {
      await endpoints.contact({ 
        name: data.name, 
        phone: data.phone, 
        details: data.message || 'Заявка с главной страницы' 
      });
      setStatus('success');
      setData({ name: '', phone: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section className="section" style={{ 
      background: 'var(--white)', 
      borderTop: '1px solid var(--border-light)',
      padding: '140px 0'
    }} id="contact">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '80px', 
          alignItems: 'start',
          maxWidth: '1100px',
          margin: '0 auto'
        }} className="contact-grid">
          
          <div style={{ position: 'sticky', top: 120 }}>
            <FadeUp>
              <SectionLabel>{t.contact.label}</SectionLabel>
              {/* Removed CTA title and subtitle as requested */}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, marginTop: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'var(--light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 2 }}>Email</div>
                    <div style={{ fontSize: 18, color: 'var(--text-dark)', fontWeight: 500 }}>info@safetech.uz</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'var(--light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 2 }}>Телефон</div>
                    <div style={{ fontSize: 18, color: 'var(--text-dark)', fontWeight: 500 }}>+998 71 000-00-00</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <div style={{ 
              background: 'var(--light)', 
              padding: '48px', 
              borderRadius: '24px', 
              border: '1px solid var(--border-light)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
            }}>
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 8 }}>{t.contact.form.name}</label>
                  <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    className="form-input" 
                    value={data.name}
                    onChange={e => setData(d => ({ ...d, name: e.target.value }))}
                    required
                    style={{ background: 'var(--white)', border: '1px solid var(--border-light)', color: 'var(--text-dark)', padding: '16px 20px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 8 }}>{t.contact.form.phone}</label>
                  <input 
                    type="tel" 
                    placeholder="+998 90..." 
                    className="form-input" 
                    value={data.phone}
                    onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
                    required
                    style={{ background: 'var(--white)', border: '1px solid var(--border-light)', color: 'var(--text-dark)', padding: '16px 20px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 8 }}>
                    {t.contact.form.message}
                  </label>
                  <textarea 
                    placeholder={lang === 'ru' ? 'Расскажите кратко о вашей задаче...' : (lang === 'uz' ? 'Vazifangiz haqida qisqacha gapiring...' : 'Tell us briefly about your task...')} 
                    className="form-input" 
                    rows={5}
                    value={data.message}
                    onChange={e => setData(d => ({ ...d, message: e.target.value }))}
                    style={{ background: 'var(--white)', border: '1px solid var(--border-light)', color: 'var(--text-dark)', padding: '16px 20px', resize: 'none' }}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ height: 60, marginTop: 10, fontSize: 16, width: '100%', justifyContent: 'center', borderRadius: '12px' }} disabled={status === 'loading'}>
                  {status === 'loading' ? '...' : t.contact.form.btn}
                </button>

                {status === 'success' && (
                  <div style={{ marginTop: 10, color: '#059669', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, background: '#ECFDF5', padding: '12px', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                    <CheckCircle size={18} /> {t.contact.form.success}
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ marginTop: 10, color: '#DC2626', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, background: '#FEF2F2', padding: '12px', borderRadius: '10px', border: '1px solid #FECACA' }}>
                    <AlertCircle size={18} /> {t.contact.form.error}
                  </div>
                )}
              </form>
            </div>
          </FadeUp>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview />
      <WhyUs />
      <ContactSection />
    </>
  );
}
