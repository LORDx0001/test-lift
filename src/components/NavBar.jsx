import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useScrolled } from '../hooks';
import { useI18n } from '../i18n';
import { Logo } from './ui';

export default function NavBar() {
  const scrolled = useScrolled(50);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/projects', label: t.nav.projects },
    { href: '/about', label: t.nav.about },
    { href: '/#contact', label: t.nav.contact },
  ];

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: '0 0',
    background: scrolled ? 'rgba(4,17,30,0.97)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    transition: 'all 0.3s ease',
  };

  const isActive = (href) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <nav style={navStyle}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link to="/"><Logo /></Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {links.map(l => (
              <Link key={l.href} to={l.href} style={{
                fontSize: 13, fontWeight: 500, color: isActive(l.href) ? 'var(--accent)' : 'var(--gray2)',
                textDecoration: 'none', letterSpacing: '0.03em',
                borderBottom: isActive(l.href) ? '2px solid var(--accent)' : '2px solid transparent',
                paddingBottom: 4, transition: 'all 0.2s',
              }}>{l.label}</Link>
            ))}
          </div>

          {/* Right: Lang + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
              {['ru','uz','en'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: '6px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: 'pointer', border: 'none',
                  background: lang === l ? 'var(--accent)' : 'transparent',
                  color: lang === l ? 'white' : 'var(--gray)',
                  transition: 'all 0.2s',
                }}>{l}</button>
              ))}
            </div>
            <Link to="/#contact" className="btn btn-primary btn-sm">
              <Phone size={14} /> {lang === 'ru' ? 'Заявка' : 'Ariza'}
            </Link>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--white)', display: 'none' }} className="mobile-burger">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'var(--navy)', padding: '24px',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <Logo />
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}>
            <X size={32} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {links.map(l => (
            <Link key={l.href} to={l.href} style={{
              fontSize: 28, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
              color: isActive(l.href) ? 'var(--accent)' : 'var(--white)',
              padding: '12px 0', borderBottom: '1px solid var(--border)', textDecoration: 'none',
            }}>{l.label}</Link>
          ))}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
          {['ru','uz','en'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              flex: 1, padding: '12px', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer',
              background: lang === l ? 'var(--accent)' : 'transparent', color: lang === l ? 'white' : 'var(--gray)',
            }}>{l}</button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-burger { display: flex !important; } }
        @media (min-width: 901px) { .mobile-burger { display: none !important; } }
      `}</style>
    </>
  );
}
