import React from 'react';

function Header() {
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

  return (
    <header className="header">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <h1 className="text-base sm:text-xl font-bold tracking-wider text-white flex-shrink-0">FASS BEBIDAS</h1>
        <ul className="flex gap-2 sm:gap-4 lg:gap-6 list-none m-0 p-0">
          <li><a href="/" className={linkClassName('/')}>Inicio</a></li>
          <li><a href="/catalogo" className={linkClassName('/catalogo')}>Catálogo</a></li>
          <li><a href="/#promociones" className={linkClassName('/#promociones')}>Promociones</a></li>
          <li><a href="/#contacto" className={linkClassName('/#contacto')}>Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
