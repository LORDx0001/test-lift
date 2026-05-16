import { useState } from 'react';
import { useI18n } from '../i18n';
import { PageHero, FadeUp, SectionLabel } from '../components/ui';
import { CTABanner } from '../components/ui';

// Sample project data
const sampleProjects = [
  { id: 1, title: 'ЖК «Новый горизонт»', type: 'lift', typeLabel: 'Лифты', city: 'Ташкент', year: 2023, desc: 'Монтаж 4 пассажирских лифтов в 16-этажном ЖК. Оборудование Otis.' },
  { id: 2, title: 'ТРЦ «Mega Planet»', type: 'escalator', typeLabel: 'Эскалаторы', city: 'Ташкент', year: 2023, desc: 'Монтаж 6 эскалаторов и 2 траволаторов. Оборудование Thyssenkrupp.' },
  { id: 3, title: 'Клиника «MedCenter»', type: 'special', typeLabel: 'Спецлифты', city: 'Самарканд', year: 2022, desc: 'Монтаж 2 больничных лифтов с широкими дверями.' },
  { id: 4, title: 'Завод «TextilePro»', type: 'special', typeLabel: 'Спецлифты', city: 'Фергана', year: 2022, desc: 'Взрывозащищённые промышленные лифты для производственного цеха.' },
  { id: 5, title: 'БЦ «Infinity Tower»', type: 'lift', typeLabel: 'Лифты', city: 'Ташкент', year: 2021, desc: 'Монтаж 6 скоростных лифтов в 24-этажном бизнес-центре. KONE.' },
  { id: 6, title: 'Аэропорт Навои', type: 'escalator', typeLabel: 'Эскалаторы', city: 'Навои', year: 2021, desc: 'Монтаж траволаторов и эскалаторов в терминале аэропорта.' },
];

const FILTER_LABELS = { ru: ['Все', 'Лифты', 'Спецлифты', 'Эскалаторы'], uz: ['Barchasi', 'Liftlar', 'Maxsus liftlar', 'Eskalatorlar'] };
const FILTER_TYPES = ['all', 'lift', 'special', 'escalator'];
const TYPE_COLORS = { lift: '#2B8FFF', special: '#7B5EA7', escalator: '#1F8A6A' };

export default function Projects() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);

  const filtered = active === 0 ? sampleProjects : sampleProjects.filter(p => p.type === FILTER_TYPES[active]);

  return (
    <>
      <PageHero label={t.projects.label} title={t.projects.title}
        breadcrumb={[{ label: t.nav.home, href: '/' }, { label: t.nav.projects }]} />

      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
            {FILTER_LABELS[lang].map((label, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                padding: '8px 20px', borderRadius: 4, fontSize: 13, fontWeight: 600, border: '1px solid',
                borderColor: active === i ? 'var(--accent)' : 'var(--border)',
                background: active === i ? 'var(--accent)' : 'transparent',
                color: active === i ? 'white' : 'var(--gray2)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{label}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.07}>
                <div className="card" style={{ overflow: 'hidden', position: 'relative' }}>
                  {/* Placeholder image */}
                  <div style={{
                    height: 200, background: `linear-gradient(135deg, var(--navy2), var(--navy3))`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ fontSize: 48, opacity: 0.3 }}>
                      {p.type === 'lift' ? '🏗' : p.type === 'escalator' ? '↗' : '⚙️'}
                    </div>
                    {/* Type badge */}
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      background: TYPE_COLORS[p.type], color: 'white',
                      padding: '4px 12px', borderRadius: 3, fontSize: 11, fontWeight: 700,
                    }}>{p.typeLabel}</div>
                    {/* Year badge */}
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(0,0,0,0.5)', color: 'var(--gray2)',
                      padding: '4px 10px', borderRadius: 3, fontSize: 11,
                    }}>{p.year}</div>
                  </div>
                  <div style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 18, marginBottom: 8 }}>{p.title}</h3>
                    <div style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 12, fontWeight: 600, letterSpacing: '0.05em' }}>📍 {p.city}</div>
                    <p style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
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
