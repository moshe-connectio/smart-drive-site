import { Container } from '@shared/components/layout/Container';
import { dealershipConfig } from '@core/config/site.config';
import { LeadForm } from '@modules/leads';

const trustPoints = [
  'חזרה אישית מהיועץ תוך זמן קצר בשעות הפעילות',
  'התאמת רכב מדויקת לתקציב, לשימוש ולסגנון נהיגה',
  'ליווי מלא — מימון, טרייד-אין, רישוי וביטוח',
];

const phoneRaw = dealershipConfig.contact.phone;
const phoneDisplay = dealershipConfig.contact.phoneDisplay;
const whatsappLink = dealershipConfig.social.whatsapp;
const email = dealershipConfig.contact.email;
const address = dealershipConfig.contact.address;
const hours = dealershipConfig.contact.businessHours;

export function HomeContactBlock() {
  return (
    <section className="home-contact-section" aria-labelledby="home-contact-title">
      <div className="home-contact-atmo" aria-hidden="true" />
      <div className="home-contact-grid-bg" aria-hidden="true" />

      <Container>
        <div className="home-contact-layout">
          {/* ─── LEFT: messaging + contact rails ─────────────────── */}
          <div className="home-contact-copy">
            <p className="home-contact-kicker">ייעוץ אישי</p>
            <h2 id="home-contact-title" className="home-contact-title">
              מתלבטים? <span className="home-contact-title-accent">דברו איתנו.</span>
            </h2>
            <p className="home-contact-lead">
              הצוות שלנו זמין כדי להבין מה אתם מחפשים — ולהציע את הרכב הנכון, במחיר נכון,
              עם ליווי מקצה לקצה.
            </p>

            <ul className="home-contact-trust">
              {trustPoints.map((p) => (
                <li key={p}>
                  <span className="home-contact-trust-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="home-contact-channels">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="home-contact-channel home-contact-channel-whatsapp"
                aria-label="פתיחת שיחת ווטסאפ"
              >
                <span className="home-contact-channel-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.304A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z" />
                  </svg>
                </span>
                <span className="home-contact-channel-text">
                  <span className="home-contact-channel-label">דברו בוואטסאפ</span>
                  <span className="home-contact-channel-value">מענה ישיר ליועץ</span>
                </span>
              </a>

              <a
                href={`tel:${phoneRaw}`}
                className="home-contact-channel home-contact-channel-phone"
                aria-label={`התקשרו ל־${phoneDisplay}`}
              >
                <span className="home-contact-channel-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="home-contact-channel-text">
                  <span className="home-contact-channel-label">{phoneDisplay}</span>
                  <span className="home-contact-channel-value">התקשרו עכשיו</span>
                </span>
              </a>
            </div>

            <div className="home-contact-meta">
              <div className="home-contact-meta-item">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div>
                  <span className="home-contact-meta-label">שעות פעילות</span>
                  <span className="home-contact-meta-value">
                    א׳–ה׳ {hours.weekdays} · ו׳ {hours.friday}
                  </span>
                </div>
              </div>

              <div className="home-contact-meta-item">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <span className="home-contact-meta-label">מיקום</span>
                  <span className="home-contact-meta-value">{address}</span>
                </div>
              </div>

              <div className="home-contact-meta-item">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div>
                  <span className="home-contact-meta-label">דוא״ל</span>
                  <a className="home-contact-meta-value home-contact-meta-link" href={`mailto:${email}`}>
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: form panel ─────────────────────────────── */}
          <div className="home-contact-form-panel">
            <div className="home-contact-form-glow" aria-hidden="true" />
            <div className="home-contact-form-inner">
              <LeadForm
                formId="contact-page"
                title="השאירו פרטים ונחזור אליכם"
                subtitle="מענה אישי ומהיר בשעות הפעילות"
                showEmail
                showMessage
                submitLabel="שליחה וקבלת ייעוץ אישי"
                variant="card"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
