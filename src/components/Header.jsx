import React from 'react';

function Header() {
  return (
    <header className="header">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <h1 className="text-base sm:text-xl font-bold tracking-wider text-white flex-shrink-0">FASS BEBIDAS</h1>
        <ul className="flex gap-2 sm:gap-4 lg:gap-6 list-none m-0 p-0">
          <li><a href="#" className="text-xs sm:text-sm text-white hover:text-yellow-400 transition-colors duration-300 px-2 sm:px-3 py-2">Inicio</a></li>
          <li><a href="#" className="text-xs sm:text-sm text-white hover:text-yellow-400 transition-colors duration-300 px-2 sm:px-3 py-2">Catálogo</a></li>
          <li><a href="#" className="text-xs sm:text-sm text-white hover:text-yellow-400 transition-colors duration-300 px-2 sm:px-3 py-2">Promociones</a></li>
          <li><a href="#" className="text-xs sm:text-sm text-white hover:text-yellow-400 transition-colors duration-300 px-2 sm:px-3 py-2">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
