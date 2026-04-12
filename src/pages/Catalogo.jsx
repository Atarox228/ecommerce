import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCatalogoItems } from '../services/api';
import '../styles/Home.css';
import '../styles/Catalogo.css';

const PAGE_SIZE = 9;

function formatPrice(value) {
  return new Intl.NumberFormat('es-AR').format(Math.round(value || 0));
}

function Catalogo() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('destacados');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function loadCatalogo() {
      setLoading(true);

      const data = await getCatalogoItems();

      if (!isMounted) {
        return;
      }

      setItems(data);

      const prices = data.map((item) => item.price ?? item.precio).filter((price) => Number.isFinite(price));
      const min = prices.length > 0 ? Math.min(...prices) : 0;
      const max = prices.length > 0 ? Math.max(...prices) : 0;

      setPriceMin(min);
      setPriceMax(max);
      setPage(1);
      setLoading(false);
    }

    loadCatalogo();

    return () => {
      isMounted = false;
    };
  }, []);

  const availableRange = useMemo(() => {
    const prices = items.map((item) => item.price ?? item.precio).filter((price) => Number.isFinite(price));

    if (prices.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const name = (item.nombre || item.name || '').toLowerCase();
      const price = item.price ?? item.precio ?? 0;
      const matchesQuery = normalizedQuery === '' || name.includes(normalizedQuery);
      const matchesPrice = price >= priceMin && price <= priceMax;

      return matchesQuery && matchesPrice;
    });

    const sorted = [...filtered];

    switch (sortBy) {
      case 'precio-asc':
        sorted.sort((a, b) => (a.price ?? a.precio ?? 0) - (b.price ?? b.precio ?? 0));
        break;
      case 'precio-desc':
        sorted.sort((a, b) => (b.price ?? b.precio ?? 0) - (a.price ?? a.precio ?? 0));
        break;
      case 'nombre-asc':
        sorted.sort((a, b) => (a.nombre || a.name || '').localeCompare(b.nombre || b.name || '', 'es'));
        break;
      case 'destacados':
      default:
        sorted.sort((a, b) => {
          const discountA = a.discount ?? 0;
          const discountB = b.discount ?? 0;

          if (discountA !== discountB) {
            return discountB - discountA;
          }

          return (a.price ?? a.precio ?? 0) - (b.price ?? b.precio ?? 0);
        });
        break;
    }

    return sorted;
  }, [items, priceMax, priceMin, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [query, sortBy, priceMin, priceMax]);

  const handlePriceMinChange = (event) => {
    const nextValue = Number(event.target.value);
    setPriceMin(Number.isFinite(nextValue) ? Math.min(nextValue, priceMax || nextValue) : 0);
  };

  const handlePriceMaxChange = (event) => {
    const nextValue = Number(event.target.value);
    setPriceMax(Number.isFinite(nextValue) ? Math.max(nextValue, priceMin || nextValue) : 0);
  };

  return (
    <div className="catalogo-page">
      <Header />

      <main className="catalogo-main">
        <section className="catalogo-hero">
          <nav className="catalogo-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Inicio</a>
            <span aria-hidden="true">›</span>
            <span>Catálogo</span>
          </nav>

          <div className="catalogo-hero-card">
            <div>
              <p className="catalogo-eyebrow">Catálogo</p>
              <h1>Encontrá tu próximo combo con stock y promos reales</h1>
              <p className="catalogo-intro">
                La información sale únicamente de <strong>catalogo.json</strong> y se consume mediante
                <strong> api.js</strong>, con filtros, ordenamiento y paginación del lado del cliente.
              </p>
            </div>

            <div className="catalogo-stats" aria-label="Resumen del catálogo">
              <div className="stat-card">
                <strong>{formatPrice(items.length)}</strong>
                <span>Productos</span>
              </div>
              <div className="stat-card">
                <strong>{formatPrice(filteredItems.length)}</strong>
                <span>Resultados</span>
              </div>
              <div className="stat-card">
                <strong>{formatPrice(availableRange.max)}</strong>
                <span>Precio máximo</span>
              </div>
            </div>
          </div>
        </section>

        <section className="catalogo-toolbar" aria-label="Herramientas del catálogo">
          <label className="catalogo-search">
            <span>Buscar en catálogo</span>
            <input
              type="search"
              placeholder="Buscar por nombre..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <label className="catalogo-sort">
            <span>Ordenar por</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre-asc">Nombre: A a Z</option>
            </select>
          </label>
        </section>

        <section className="catalogo-layout">
          <aside className="catalogo-sidebar" aria-label="Filtros del catálogo">
            <div className="filter-card">
              <h2>Precio</h2>
              <div className="price-inputs">
                <label>
                  <span>Mínimo</span>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={priceMin}
                    onChange={handlePriceMinChange}
                  />
                </label>
                <label>
                  <span>Máximo</span>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={priceMax}
                    onChange={handlePriceMaxChange}
                  />
                </label>
              </div>
              <p className="price-summary">
                Rango activo: ${formatPrice(priceMin)} - ${formatPrice(priceMax)}
              </p>
            </div>

            <div className="filter-card">
              <h2>Estado</h2>
              <p className="sidebar-text">Se muestran solo productos activos. Las promos sin coincidencia en el mock se ignoran.</p>
            </div>
          </aside>

          <div className="catalogo-results">
            <div className="catalogo-results-header">
              <p>
                {loading
                  ? 'Cargando catálogo...'
                  : `${filteredItems.length} resultado${filteredItems.length === 1 ? '' : 's'} encontrados`}
              </p>
              <p>
                Página {currentPage} de {totalPages}
              </p>
            </div>

            {loading ? (
              <div className="loading-state">Cargando los productos del catálogo...</div>
            ) : visibleItems.length === 0 ? (
              <div className="empty-state">
                No hay productos que coincidan con los filtros actuales.
              </div>
            ) : (
              <div className="catalogo-grid">
                {visibleItems.map((item) => {
                  const title = item.nombre || item.name;
                  const image = item.imagen || item.image;
                  const displayPrice = item.price ?? item.precio ?? 0;
                  const originalPrice = item.originalPrice;

                  return (
                    <article className="catalogo-card" key={item.id}>
                      <div className="catalogo-card-image">
                        <img src={image} alt={title} loading="lazy" />
                        {item.discount > 0 && <span className="catalogo-badge">-{item.discount}%</span>}
                      </div>

                      <div className="catalogo-card-body">
                        <p className="catalogo-card-name">{title}</p>

                        <div className="catalogo-price-row">
                          <strong>${formatPrice(displayPrice)}</strong>
                          {originalPrice && originalPrice !== displayPrice && (
                            <del>${formatPrice(originalPrice)}</del>
                          )}
                        </div>

                        <p className="catalogo-stock">
                          {item.stock ? 'Disponible para despacho' : 'Sin stock'}
                        </p>

                        <button type="button" className="catalogo-button">
                          Ver detalle
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {totalPages > 1 && (
              <nav className="catalogo-pagination" aria-label="Paginación del catálogo">
                <button
                  type="button"
                  className="page-button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    className={`page-button ${pageNumber === currentPage ? 'active' : ''}`}
                    onClick={() => setPage(pageNumber)}
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  className="page-button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                >
                  ›
                </button>
              </nav>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Catalogo;