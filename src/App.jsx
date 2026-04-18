import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import { content } from './content';

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (pathname === content.routes.catalogo) {
    return <Catalogo />;
  }

  return <Home />;
}

export default App;
