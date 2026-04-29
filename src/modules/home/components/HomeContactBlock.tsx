import { Container } from '@shared/components/layout/Container';
import { dealershipConfig } from '@core/config/site.config';
import { LeadForm } from '@modules/leads';

const contactPoints = [
  'חזרה מהירה בשעות הפעילות',
  'ייעוץ מקצועי ומותאם לתקציב',
  'ליווי אישי עד סגירת העסקה',
];

export function HomeContactBlock() {
  return (
    <section className="home-soft-section py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="home-section-kicker text-right">ייעוץ אישי</p>
            <h2 className="home-section-title text-right">
              השאירו פרטים ונחזור אליכם במהירות
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'var(--color-gray-500)', lineHeight: 1.85 }}
            >
              מחפשים רכב חדש או משומש? הצוות שלנו יחזור אליכם עם התאמה מדויקת
              לצרכים, לתקציב ולסגנון הנהיגה שלכם.
            </p>

            <div className="space-y-3 mb-8">
              {contactPoints.map((item) => (
                <div key={item} className="home-contact-point">
                  <span className="home-contact-point-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={dealershipConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="home-contact-action home-contact-action-whatsapp"
              >
                וואטסאפ
              </a>
              <a
                href={`tel:${dealershipConfig.contact.phone}`}
                className="home-contact-action home-contact-action-primary"
              >
                {dealershipConfig.contact.phone}
              </a>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto lg:mx-0 home-contact-form-shell">
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
      </Container>
    </section>
  );
}
