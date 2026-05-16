import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n';
import { useInView, useCounter } from '../hooks';
import { FadeUp, SectionLabel, AccentLine, ServiceIcon } from '../components/ui';
import { CTABanner } from '../components/ui';

// ─── Hero ───────────────────────────────────────────────────────────
function Hero() {
  const { t } = useI18n();
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'var(--navy)', position: 'relative', overflow: 'hidden',
      paddingTop: 72,
    }} className="grid-bg">
      {/* Decorative geometry */}
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
            {t.hero.title}
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p style={{ fontSize: 17, color: 'var(--gray2)', maxWidth: 520, marginBottom: 40, lineHeight: 1.7 }}>
            {t.hero.subtitle}
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
            <div key={i} style={{ borderRight: i < t.stats.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
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

import { useState, useEffect } from 'react';
import { endpoints } from '../api';

// ─── Services Preview ────────────────────────────────────────────────
function ServicesPreview() {
  const { t, lang } = useI18n();
  const [services, setServices] = useState([]);

  useEffect(() => {
    endpoints.services().then(res => setServices(res.data)).catch(console.error);
  }, []);

  return (
    <section className="section" style={{ background: 'var(--navy)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <FadeUp><SectionLabel>{t.services.label}</SectionLabel></FadeUp>
            <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>{t.services.title}</h2></FadeUp>
            <FadeUp delay={0.15}><p style={{ color: 'var(--gray)', marginTop: 12, fontSize: 15 }}>{t.services.subtitle}</p></FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link to="/services" className="btn btn-ghost">
              {t.services.all} <ArrowRight size={16} />
            </Link>
          </FadeUp>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)' }}>
          {services.map((s, i) => {
            const title = s[`title_${lang}`] || s.title_ru;
            const desc = s[`desc_${lang}`] || s.desc_ru;
            return (
              <FadeUp key={s.slug || i} delay={i * 0.1}>
                <Link to={`/services/${s.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div style={{
                    background: 'var(--navy2)', padding: 32,
                    borderBottom: '3px solid transparent',
                    transition: 'all 0.25s',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy3)'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy2)'; e.currentTarget.style.borderBottomColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {s.image && (
                      <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', opacity: 0.1, backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
                    )}
                    <div style={{ marginBottom: 20, position: 'relative', zIndex: 1 }}><ServiceIcon slug={s.icon || s.slug} /></div>
                    <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--white)', position: 'relative', zIndex: 1 }}>{title}</h3>
                    {desc && <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{desc}</p>}
                    <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontSize: 13, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                      {lang === 'ru' ? 'Подробнее' : 'Batafsil'} <ArrowRight size={14} />
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
    <section className="section" style={{ background: 'var(--navy2)' }} id="why-us">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <FadeUp><SectionLabel>{t.whyUs.label}</SectionLabel></FadeUp>
          <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{t.whyUs.title}</h2></FadeUp>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {t.whyUs.items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div style={{
                background: 'var(--navy3)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: 28, height: '100%',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(43,143,255,0.3)'; e.currentTarget.style.boxShadow = 'var(--shadow-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{icons[i]}</div>
                <h3 style={{ fontSize: 18, marginBottom: 10, color: 'var(--white)' }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────
export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview />
      <WhyUs />
      <CTABanner title={t.cta.title} subtitle={t.cta.subtitle} btnText={t.cta.btn} onClick={() => window.location.href = '/contact'} />
    </>
  );
}
