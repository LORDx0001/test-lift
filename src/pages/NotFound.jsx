import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--navy)', textAlign: 'center', padding: 24,
    }}>
      <div style={{ fontSize: '8rem', fontFamily: 'Rajdhani', fontWeight: 700, color: 'var(--navy3)', lineHeight: 1 }}>404</div>
      <div style={{ width: 48, height: 3, background: 'var(--accent)', margin: '16px auto 24px' }} />
      <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>{t.notFound.subtitle}</h1>
      <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>{t.notFound.btn}</Link>
    </div>
  );
}
