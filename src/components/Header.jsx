import React from 'react';
import { content } from '../content';
import logoSinFondo from '../assets/logoFassSinFondo.webp';
import '../styles/header.css';
import Cart from './Icons/Cart';
import { useCart } from '../context/CartContext';
function Header() {
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
    return `text-md transition-colors font-semibold duration-300 px-2 sm:px-3 py-2 
    ${active ? 'golden-text' : 'text-white golden-text-on-hover'}`;
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <a href={content.routes.home} className="header-brand-link" aria-label="Ir al inicio">
          <img src={logoSinFondo} alt="Fass Bebidas Logo" className="header-logo" />
          <h1 className="header-brand golden-text">{content.site.name}</h1>
        </a>

        <ul id="primary-navigation" className="header-links">
          {content.navLinks.map(({ href, label }) => {
            return (
              <li key={href}>
                <a
                  href={href}
                  className={linkClassName(href)}
                  aria-current={isActive(href) ? 'page' : undefined}
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
