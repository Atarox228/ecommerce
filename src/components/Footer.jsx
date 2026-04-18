import React from 'react';
import { content } from '../content';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{content.footer.contactTitle}</h3>
          <ul>
            {content.footer.contactItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer noopener' : undefined}
                >
                  {item.icon} {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3>{content.footer.informationTitle}</h3>
          <ul>
            {content.footer.informationLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{content.site.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
