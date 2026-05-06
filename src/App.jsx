import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import EdadRestringida from './pages/EdadRestringida';
import AgeGateModal from './components/AgeGateModal';
import { content } from './content';
import { CartProvider } from './context/CartContext';

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const [ageStatus, setAgeStatus] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(content.ageGate.storageKey) === 'adult' ? 'adult' : null;
  });

  const isAgeRestrictionRoute = pathname === content.routes.edadRestringida;

  useEffect(() => {
    document.body.style.overflow = ageStatus === 'adult' || isAgeRestrictionRoute ? '' : 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [ageStatus, isAgeRestrictionRoute]);

  const handleAdultAccess = () => {
    window.localStorage.setItem(content.ageGate.storageKey, 'adult');
    setAgeStatus('adult');
  };

  const handleMinorAccess = () => {
    window.localStorage.removeItem(content.ageGate.storageKey);
    setAgeStatus('minor');
    window.history.pushState({}, '', content.routes.edadRestringida);
  };

  if (ageStatus === 'minor' || isAgeRestrictionRoute) {
    return (
      <CartProvider>
        <EdadRestringida />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      {pathname === content.routes.catalogo && <Catalogo />}
      {pathname === content.routes.carrito && <Carrito />}
      {pathname !== content.routes.catalogo && pathname !== content.routes.carrito && <Home />}
      {ageStatus !== 'adult' && (
        <AgeGateModal
          badge={content.ageGate.badge}
          title={content.ageGate.title}
          description={content.ageGate.description}
          adultPrompt={content.ageGate.adultPrompt}
          adultAction={content.ageGate.adultAction}
          minorPrompt={content.ageGate.minorPrompt}
          minorAction={content.ageGate.minorAction}
          onAdultAccess={handleAdultAccess}
          onMinorAccess={handleMinorAccess}
        />
      )}
    </CartProvider>
  );
}

export default App;
