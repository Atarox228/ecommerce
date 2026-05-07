import React, { useEffect, useState } from 'react';
import { content } from '../content';
import logoFass from '../assets/logoFass.webp';
import '../styles/header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  const isActive = (href) => {
    const targetPath = href.split('#')[0].replace(/\/+$/, '') || '/';

    if (targetPath === '/') {
      return pathname === '/';
    }

    return pathname === targetPath;
  };

  const linkClassName = (href) => {
    const active = isActive(href);
    return `text-xs sm:text-sm transition-colors duration-300 px-2 sm:px-3 py-2 ${active ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`;
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-brand-row">
          <img src={logoFass} alt="Fass Bebidas Logo" className="header-logo" />
          <h1 className="header-brand">{content.site.name}</h1>
          <button
            type="button"
            className="header-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <ul
          id="primary-navigation"
          className={`header-links ${menuOpen ? 'is-open' : ''}`}
        >
          {content.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={linkClassName(link.href)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
