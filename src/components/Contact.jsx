function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.54 15.54 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.11.37 2.31.57 3.57.57.56 0 1 .44 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5c.56 0 1 .44 1 1 0 1.26.2 2.46.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.8 11.8 0 0 0 12.06 0C5.52 0 .18 5.34.18 11.88c0 2.1.54 4.14 1.62 5.94L0 24l6.36-1.68a11.7 11.7 0 0 0 5.7 1.44h.06c6.54 0 11.88-5.34 11.88-11.88 0-3.18-1.26-6.18-3.48-8.4ZM12.12 21.78h-.06a9.8 9.8 0 0 1-4.98-1.38l-.36-.18-3.78.96 1.02-3.66-.24-.36a9.83 9.83 0 0 1-1.5-5.28c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.1 1.02 6.96 2.88a9.8 9.8 0 0 1 2.88 6.96c0 5.46-4.44 9.9-9.84 9.96Zm5.43-7.41c-.3-.15-1.8-.9-2.07-1.02-.27-.09-.48-.15-.66.15-.18.27-.72 1.02-.87 1.23-.18.21-.33.24-.63.09-.3-.15-1.23-.45-2.37-1.44-.87-.78-1.5-1.74-1.68-2.04-.18-.3-.03-.45.12-.6.12-.12.3-.33.45-.48.15-.18.18-.3.27-.48.09-.18.03-.36-.03-.51-.09-.15-.66-1.59-.9-2.16-.24-.6-.48-.51-.66-.51h-.57c-.18 0-.48.06-.72.33-.24.27-.96.93-.96 2.28 0 1.35.99 2.64 1.14 2.82.15.18 1.92 2.94 4.68 4.11.66.3 1.2.48 1.62.6.69.21 1.29.18 1.77.12.54-.09 1.8-.72 2.04-1.41.27-.69.27-1.29.18-1.41-.06-.12-.27-.18-.57-.33Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
      <path
        fill="currentColor"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm-.18 1.8A3.52 3.52 0 0 0 3.8 7.32v9.36a3.52 3.52 0 0 0 3.52 3.52h9.36a3.52 3.52 0 0 0 3.52-3.52V7.32a3.52 3.52 0 0 0-3.52-3.52H7.32Zm9.72 1.35a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34ZM12 6.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 1.8A3.4 3.4 0 1 0 15.4 12 3.4 3.4 0 0 0 12 8.6Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-icon">
      <path
        fill="currentColor"
        d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25Zm2.1.15v.18L12 11.1l6.9-5.52V5.4H5.1Zm13.8 2.49-6.34 5.07a.9.9 0 0 1-1.12 0L5.1 7.89v10.86c0 .08.07.15.15.15h13.5c.08 0 .15-.07.15-.15V7.89Z"
      />
    </svg>
  );
}

function Contact() {
  return (
    <section className="section">
      <div className="contact-card fade-up">
        <div>
          <span className="section-kicker">Contact</span>
          <h2>Questions about batches, format, or enrollment?</h2>
          <p>
            Speak with our team directly and get help choosing the right batch
            for your child.
          </p>
        </div>

        <div className="contact-actions">
          <a className="hero__cta contact-action contact-social" href="tel:9060123600">
            <PhoneIcon />
            Call Us
          </a>
          <a
            className="hero__cta contact-action contact-whatsapp"
            href="https://wa.me/919060123600"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon />
            WhatsApp Us
          </a>
          <a
            className="hero__cta contact-action contact-social"
            href="https://instagram.com/chessiq.in"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
            Instagram
          </a>
          <a
            className="hero__cta contact-action contact-social"
            href="mailto:chessiq.in@gmail.com"
          >
            <MailIcon />
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
