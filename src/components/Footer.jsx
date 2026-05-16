import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useI18n } from '../i18n';
import { Logo } from './ui';

export default function Footer({ settings }) {
  const { t, lang } = useI18n();

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/services', label: t.nav.services },
    { href: '/projects', label: t.nav.projects },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <footer style={{ background: 'var(--navy)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ padding: '64px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}><Logo /></div>
            <p style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.7, maxWidth: 240 }}>{t.footer.desc}</p>
            {settings?.telegram && (
              <a href={settings.telegram} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, color: 'var(--accent)', fontSize: 13 }}>
                <Send size={16} /> Telegram
              </a>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: 20 }}>{t.footer.links}</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(l => (
                <Link key={l.href} to={l.href} style={{ fontSize: 14, color: 'var(--gray2)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--gray2)'}
                >{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: 20 }}>{t.footer.contacts}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {settings?.phone && (
                <a href={`tel:${settings.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--gray2)', textDecoration: 'none' }}>
                  <Phone size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {settings.phone}
                </a>
              )}
              {settings?.email && (
                <a href={`mailto:${settings.email}`} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--gray2)', textDecoration: 'none' }}>
                  <Mail size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {settings.email}
                </a>
              )}
              {settings?.address && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--gray2)' }}>
                  <MapPin size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} /> {settings.address}
                </div>
              )}
              {settings?.working_hours && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--gray2)' }}>
                  <Clock size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {settings.working_hours}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--gray)' }}>{t.footer.copy}</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/contact" style={{ fontSize: 12, color: 'var(--gray)', textDecoration: 'none' }}>{t.footer.privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
