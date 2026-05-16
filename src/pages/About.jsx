import { useI18n } from '../i18n';
import { PageHero, FadeUp, SectionLabel } from '../components/ui';
import { CTABanner } from '../components/ui';
import { useInView, useCounter } from '../hooks';

function StatItem({ value, label }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: 24 }}>
      <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '3rem', color: 'var(--accent)', lineHeight: 1 }}>{count}</div>
      <div style={{ fontSize: 13, color: 'var(--gray2)', marginTop: 8 }}>{label}</div>
    </div>
  );
}

export default function About() {
  const { t, lang } = useI18n();
  const { ref, inView } = useInView();

  return (
    <>
      <PageHero label={t.about.label} title={t.about.title} subtitle={t.about.subtitle}
        breadcrumb={[{ label: t.nav.home, href: '/' }, { label: t.nav.about }]} />

      {/* Story */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <FadeUp>
              <SectionLabel>{lang === 'ru' ? 'Наша история' : 'Bizning tarix'}</SectionLabel>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 24 }}>
                {lang === 'ru' ? '12 лет надёжной работы' : '12 yillik ishonchli faoliyat'}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--gray2)', lineHeight: 1.8, marginBottom: 20 }}>{t.about.story}</p>
              <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.8, fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: 16 }}>{t.about.mission}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 8, padding: 40 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 6, overflow: 'hidden' }} ref={ref}>
                  {t.stats.items.map((s, i) => (
                    <div key={i} style={{ borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                      {inView ? <StatItem value={s.value} label={s.label} /> : (
                        <div style={{ textAlign: 'center', padding: 24 }}>
                          <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '3rem', color: 'var(--accent)' }}>—</div>
                          <div style={{ fontSize: 13, color: 'var(--gray2)', marginTop: 8 }}>{s.label}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--navy2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <FadeUp><SectionLabel>{t.about.values.label}</SectionLabel></FadeUp>
            <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>{lang === 'ru' ? 'Наши принципы' : 'Bizning tamoyillar'}</h2></FadeUp>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {t.about.values.items.map((v, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="card" style={{ padding: 32 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(43,143,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <span style={{ fontSize: 22 }}>{['🛡️','⚙️','🏆'][i]}</span>
                  </div>
                  <h3 style={{ fontSize: 20, marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <FadeUp><SectionLabel>{t.about.team.label}</SectionLabel></FadeUp>
            <FadeUp delay={0.1}><h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>{t.about.team.title}</h2></FadeUp>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
            {t.about.team.items.map((member, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
                    background: `linear-gradient(135deg, var(--navy3), var(--blue))`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, border: '2px solid var(--border)',
                  }}>👷</div>
                  <h3 style={{ fontSize: 17, marginBottom: 6 }}>{member.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 8, fontWeight: 500 }}>{member.role}</p>
                  <span className="tag">{member.exp}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title={t.cta.title} subtitle={t.cta.subtitle} btnText={t.cta.btn} onClick={() => window.location.href = '/contact'} />
    </>
  );
}
