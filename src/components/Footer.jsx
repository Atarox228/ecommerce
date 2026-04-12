import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contacto</h3>
          <ul>
            <li><a href="tel:+541112345678">📍 Av. Libertador 1234, Ciudad</a></li>
            <li><a href="tel:+541112345678">📞 +54 11 1234-5678</a></li>
            <li><a href="mailto:ventas@fassbebidas.com">📧 ventas@fassbebidas.com</a></li>
            <li><a href="#">📱 @fass.logistica</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Categorías</h3>
          <ul>
            <li><a href="#">Vinos, Tintos & Blancos</a></li>
            <li><a href="#">Cervezas Importadas</a></li>
            <li><a href="#">Whiskies & Bourbons</a></li>
            <li><a href="#">Aperitivos & Licores</a></li>
            <li><a href="#">Bebidas sin Alcohol</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Información</h3>
          <ul>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Envíos</a></li>
            <li><a href="#">Preguntas Frecuentes</a></li>
            <li><a href="#">Trabajá con nosotros</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Fass Bebidas. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
