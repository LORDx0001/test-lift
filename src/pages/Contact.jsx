import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useI18n } from '../i18n';
import { PageHero, FadeUp, SectionLabel } from '../components/ui';
import { endpoints } from '../api';

function ContactForm() {
  const { t, lang } = useI18n();
  const f = t.contact.form;
  const [data, setData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const services = t.services.items.map(s => s.title);

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = lang === 'ru' ? 'Введите имя' : 'Ismingizni kiriting';
    if (!data.phone.trim()) e.phone = lang === 'ru' ? 'Введите телефон' : 'Telefoningizni kiriting';
    else if (!/^\+?[\d\s\-()]{7,20}$/.test(data.phone)) e.phone = lang === 'ru' ? 'Неверный формат' : 'Noto\'g\'ri format';
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      await endpoints.contact({ name: data.name, phone: data.phone, details: `${data.service ? '['+data.service+'] ' : ''}${data.message}` });
      setStatus('success');
      setData({ name: '', phone: '', email: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const field = (key, label, type = 'text', required = false) => (
    <div style={{ marginBottom: 20 }}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-input"
        value={data[key]}
        onChange={e => setData(d => ({ ...d, [key]: e.target.value }))}
        required={required}
      />
      {errors[key] && <div className="form-error">{errors[key]}</div>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate>
      {field('name', f.name, 'text', true)}
      {field('phone', f.phone, 'tel', true)}
      {field('email', f.email, 'email')}
      <div style={{ marginBottom: 20 }}>
        <label className="form-label">{f.service}</label>
        <select className="form-input" value={data.service} onChange={e => setData(d => ({ ...d, service: e.target.value }))}>
          <option value="">{f.servicePlaceholder}</option>
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label className="form-label">{f.message}</label>
        <textarea className="form-input" rows={4} value={data.message} onChange={e => setData(d => ({ ...d, message: e.target.value }))} style={{ resize: 'vertical' }} />
      </div>

      {status === 'success' && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#4ADE80', marginBottom: 16, fontSize: 14 }}>
          <CheckCircle size={18} /> {f.success}
        </div>
      )}
      {status === 'error' && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#FF4D4D', marginBottom: 16, fontSize: 14 }}>
          <AlertCircle size={18} /> {f.error}
        </div>
      )}

      <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }} disabled={status === 'loading'}>
        {status === 'loading' ? '...' : f.btn}
      </button>
    </form>
  );
}

export default function Contact({ settings }) {
  const { t } = useI18n();
  const info = [
    { icon: Phone, label: t.contact.info.phone, value: settings?.phone || '+998 71 000-00-00', href: `tel:${settings?.phone || ''}` },
    { icon: Mail, label: t.contact.info.email, value: settings?.email || 'info@safetech.uz', href: `mailto:${settings?.email || ''}` },
    { icon: MapPin, label: t.contact.info.address, value: settings?.address || 'г. Ташкент, ул. Мустакиллик' },
    { icon: Clock, label: t.contact.info.hours, value: settings?.working_hours || 'Пн–Пт: 09:00–18:00' },
  ];

  return (
    <>
      <PageHero label={t.contact.label} title={t.contact.title} subtitle={t.contact.subtitle}
        breadcrumb={[{ label: t.nav.home, href: '/' }, { label: t.nav.contact }]} />

      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'start' }}>
            {/* Contact info */}
            <FadeUp>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
                {info.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 6 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 6, background: 'rgba(43,143,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={20} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: 15, color: 'var(--white)', fontWeight: 500, textDecoration: 'none' }}>{item.value}</a>
                      ) : (
                        <div style={{ fontSize: 15, color: 'var(--white)', fontWeight: 500 }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div style={{ height: 240, background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)', fontSize: 14 }}>
                📍 Карта объекта
              </div>
            </FadeUp>

            {/* Form */}
            <FadeUp delay={0.15}>
              <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 8, padding: 40 }}>
                <ContactForm />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
