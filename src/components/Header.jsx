import React, { useState } from 'react';
import { content } from '../content';
import logoFass from '../assets/logoFass.webp';
import '../styles/header.css';
import Cart from './Icons/Cart';
import { useCart } from '../context/CartContext';
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = window.location.href;
  const cart = useCart();
  const cartItemCount = cart.cartItems.reduce((total, item) => total + item.quantity, 0);
  const isActive = (href) => {
    if (href === '/') {
      return pathname.endsWith('/');
    }
    return pathname.includes(href);
  };

  const linkClassName = (href) => {
    const active = isActive(href);
    return `text-xs sm:text-sm transition-colors font-semibold duration-300 px-2 sm:px-3 py-2 
    ${active ? 'golden-text' : 'text-white golden-text-on-hover'}`;
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-brand-row">
          <a href={content.routes.home} className="header-brand-link" aria-label="Ir al inicio">
            <img src={logoFass} alt="Fass Bebidas Logo" className="header-logo" />
            <h1 className="header-brand golden-text">{content.site.name}</h1>
          </a>
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

        <ul id="primary-navigation" className={`header-links ${menuOpen ? 'is-open' : ''}`}>
          {content.navLinks.map(({ href, label }) => {
            return (
              <li key={href}>
                <a
                  href={href}
                  className={linkClassName(href)}
                  aria-current={isActive(href) ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {href === '/carrito' ? (
                    <span className="flex items-center gap-1 relative">
                      <Cart className="inline-block h-8 w-8 "></Cart>
                      {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                    </span>
                  ) : (
                    label
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
