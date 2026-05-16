import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useI18n } from '../i18n';
import { PageHero, FadeUp, ServiceIcon } from '../components/ui';
import { CTABanner } from '../components/ui';
import { endpoints } from '../api';

// ─── Services List Page ───────────────────────────────────────────────
export function ServicesPage() {
  const { t, lang } = useI18n();
  const [services, setServices] = useState([]);

  useEffect(() => {
    endpoints.services().then(res => setServices(res.data)).catch(console.error);
  }, []);

  return (
    <>
      <PageHero label={t.services.label} title={t.services.title} subtitle={t.services.subtitle}
        breadcrumb={[{ label: t.nav.home, href: '/' }, { label: t.nav.services }]} />
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {services.map((s, i) => {
              const title = s[`title_${lang}`] || s.title_ru;
              const desc = s[`desc_${lang}`] || s.desc_ru;
              const features = (s[`features_${lang}`] || s.features_ru || '').split('\n').filter(f => f.trim());
              return (
                <FadeUp key={s.slug || i} delay={i * 0.1}>
                  <Link to={`/services/${s.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div className="card" style={{ padding: 32, height: '100%', position: 'relative', overflow: 'hidden' }}>
                      {s.image && (
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', opacity: 0.1, backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
                      )}
                      <div style={{ marginBottom: 20, position: 'relative', zIndex: 1 }}><ServiceIcon slug={s.icon || s.slug} /></div>
                      <h3 style={{ fontSize: 22, marginBottom: 12, position: 'relative', zIndex: 1 }}>{title}</h3>
                      {desc && <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.65, marginBottom: 20, position: 'relative', zIndex: 1 }}>{desc}</p>}
                      {features.slice(0,3).map((f, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--gray2)', marginBottom: 6, position: 'relative', zIndex: 1 }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />{f}
                        </div>
                      ))}
                      <div style={{ marginTop: 24, color: 'var(--accent)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 1 }}>
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
      <CTABanner title={t.cta.title} subtitle={t.cta.subtitle} btnText={t.cta.btn} onClick={() => window.location.href = '/contact'} />
    </>
  );
}

// ─── Service Detail Page ──────────────────────────────────────────────
export function ServiceDetail({ slug }) {
  const { t, lang } = useI18n();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    endpoints.service(slug)
      .then(res => setService(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{ padding: 120, textAlign: 'center', color: 'var(--gray)' }}>Loading...</div>;
  if (!service) return <div style={{ padding: 120, textAlign: 'center', color: 'var(--gray)' }}>Not found</div>;

  const title = service[`title_${lang}`] || service.title_ru;
  const subtitle = service[`desc_${lang}`] || service.desc_ru;
  const fullDesc = service[`full_desc_${lang}`] || service.full_desc_ru;
  const features = (service[`features_${lang}`] || service.features_ru || '').split('\n').filter(f => f.trim());
  const steps = (service[`steps_${lang}`] || service.steps_ru || '').split('\n').filter(f => f.trim());

  return (
    <>
      <PageHero label={t.services.label} title={title} subtitle={subtitle}
        breadcrumb={[{ label: t.nav.home, href: '/' }, { label: t.nav.services, href: '/services' }, { label: title }]} />
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              {service.image && (
                <FadeUp>
                  <img src={service.image} alt={title} style={{ width: '100%', borderRadius: 8, marginBottom: 40, border: '1px solid var(--border)' }} />
                </FadeUp>
              )}
              {fullDesc && (
                <FadeUp delay={0.1}>
                  <p style={{ fontSize: 16, color: 'var(--gray2)', lineHeight: 1.8, marginBottom: 40, whiteSpace: 'pre-wrap' }}>{fullDesc}</p>
                </FadeUp>
              )}
              {features.length > 0 && (
                <FadeUp delay={0.2}>
                  <h3 style={{ fontSize: 20, marginBottom: 20 }}>{lang === 'ru' ? 'Виды работ' : 'Ish turlari'}</h3>
                  {features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                      <ChevronRight size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span style={{ fontSize: 15, color: 'var(--gray2)' }}>{f}</span>
                    </div>
                  ))}
                </FadeUp>
              )}
            </div>
            {steps.length > 0 && (
              <FadeUp delay={0.3}>
                <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 8, padding: 32 }}>
                  <h3 style={{ fontSize: 20, marginBottom: 28 }}>{lang === 'ru' ? 'Этапы работ' : 'Ish bosqichlari'}</h3>
                  {steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div style={{ paddingTop: 6, fontSize: 14, color: 'var(--gray2)', lineHeight: 1.6 }}>{step}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </section>
      <CTABanner title={t.cta.title} subtitle={t.cta.subtitle} btnText={t.cta.btn} onClick={() => window.location.href = '/contact'} />
    </>
  );
}
