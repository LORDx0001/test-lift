// Shared reusable UI components
import { useInView } from '../hooks';

// Animated section wrapper
export function FadeUp({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Section label (small caps above title)
export function SectionLabel({ children }) {
  return <span className="section-label">{children}</span>;
}

// Accent line
export function AccentLine({ className = '' }) {
  return <div className={`accent-line ${className}`} />;
}

// Button variants
export function Button({ variant = 'primary', size = '', children, className = '', ...props }) {
  return (
    <button className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`} {...props}>
      {children}
    </button>
  );
}

// Service icon SVG set
const icons = {
  lift: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="4" width="24" height="32" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="13" y="4" width="1.5" height="32" fill="currentColor" opacity="0.3"/>
      <rect x="25.5" y="4" width="1.5" height="32" fill="currentColor" opacity="0.3"/>
      <path d="M17 16l3-4 3 4M17 24l3 4 3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  special: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="6" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M14 30h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 18v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 10v20M35 10v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
    </svg>
  ),
  escalator: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 34L34 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 34H6v-4M34 10V6h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="22" r="2.5" fill="currentColor"/>
      <circle cx="26" cy="14" r="2.5" fill="currentColor"/>
    </svg>
  ),
  supervision: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 12v8l5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 8l4 4M32 8l-4 4M8 32l4-4M32 32l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

export const ServiceIcon = ({ slug }) => {
  const map = {
    'montazh-liftov': icons.lift,
    'spetsialnye-lifty': icons.special,
    'eskalatoru': icons.escalator,
    'tekhnadzor': icons.supervision,
  };
  return (
    <div style={{ width: 40, height: 40, color: 'var(--accent)' }}>
      {map[slug] || icons.lift}
    </div>
  );
};

// Logo component
export function Logo({ size = 'md' }) {
  const sz = size === 'sm' ? 20 : 28;
  const textSz = size === 'sm' ? '18px' : '24px';
  const subSz = size === 'sm' ? '8px' : '10px';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Elevator shaft icon */}
      <svg width={sz} height={sz} viewBox="0 0 28 28" fill="none">
        <defs>
          <linearGradient id="lgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--blue)"/>
            <stop offset="100%" stopColor="var(--accent)"/>
          </linearGradient>
        </defs>
        <polygon points="0,0 24.64,0 28,3.36 28,28 3.36,28 0,24.64" fill="url(#lgrad)"/>
        <rect x="8" y="5" width="12" height="18" rx="1" fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M12 12l2-3 2 3M12 16l2 3 2-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: textSz, lineHeight: 1, color: 'var(--white)', letterSpacing: '0.05em' }}>
          SAFETECH
        </div>
        <div style={{ fontSize: subSz, fontWeight: 400, letterSpacing: '0.3em', color: 'var(--accent)', lineHeight: 1.2, marginTop: 1 }}>
          ENGINEERING
        </div>
      </div>
    </div>
  );
}

// Page Hero (for inner pages)
export function PageHero({ label, title, subtitle, breadcrumb = [] }) {
  return (
    <section style={{
      background: 'var(--navy2)',
      borderBottom: '1px solid var(--border)',
      padding: '120px 0 64px',
    }} className="grid-bg">
      <div className="container">
        {breadcrumb.length > 0 && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 12, color: 'var(--gray)' }}>
            {breadcrumb.map((b, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && <span>/</span>}
                {b.href ? <a href={b.href} style={{ color: 'var(--accent)' }}>{b.label}</a> : <span>{b.label}</span>}
              </span>
            ))}
          </div>
        )}
        {label && <SectionLabel>{label}</SectionLabel>}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 16 }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--gray2)', fontSize: 16, maxWidth: 560 }}>{subtitle}</p>}
      </div>
    </section>
  );
}

// Counter with animation (standalone, no hooks import needed here)
export function StatCounter({ value, label, inView = true }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--accent)', lineHeight: 1, marginBottom: 8,
      }}>
        {inView ? value : '—'}
      </div>
      <div style={{ fontSize: 13, color: 'var(--gray2)', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// CTA Banner
export function CTABanner({ title, subtitle, btnText, onClick }) {
  return (
    <section style={{ background: 'var(--blue)', padding: '64px 0' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: 8 }}>{title}</h2>
          {subtitle && <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>{subtitle}</p>}
        </div>
        <button className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }} onClick={onClick}>
          {btnText}
        </button>
      </div>
    </section>
  );
}
