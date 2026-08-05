import React from 'react';
import { content } from '../content';
import '../styles/footer.css';
import Phone from './Icons/Phone';
import Socials from './Icons/Socials';

const iconComponents = {
  phone: <Phone />,
  socials: <Socials />,
};

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="golden-text"> {content.footer.contactTitle}</h3>
          <ul>
            {content.footer.contactItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer noopener' : undefined}
                  className="golden-text-on-hover"
                >
                  {iconComponents[item.type]} {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="golden-text">{content.footer.informationTitle}</h3>
          <ul>
            {content.footer.informationLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="golden-text-on-hover">
                  {item.label}
                </a>
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
