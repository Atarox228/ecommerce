import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import './App.css';

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (pathname === '/catalogo') {
    return <Catalogo />;
  }

  return <Home />;
}

export default App;
