import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import { content } from './content';
import { CartProvider } from './context/CartContext';

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  return (
    <CartProvider>
      {pathname === content.routes.catalogo && <Catalogo />}
      {pathname === content.routes.carrito && <Carrito />}
      {pathname !== content.routes.catalogo && pathname !== content.routes.carrito && <Home />}
    </CartProvider>
  );
}

export default App;
