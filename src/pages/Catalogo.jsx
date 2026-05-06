import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CatalogoHero from '../components/Catalogo/CatalogoHero';
import CatalogoToolbar from '../components/Catalogo/CatalogoToolbar';
import CatalogoSidebar from '../components/Catalogo/CatalogoSidebar';
import CatalogoResults from '../components/Catalogo/CatalogoResults';
import { getCatalogoItems } from '../services/api';
import { useCart } from '../context/CartContext';
import '../styles/shared.css';
import '../styles/catalogo-hero.css';
import '../styles/catalogo-toolbar.css';
import '../styles/catalogo-sidebar.css';
import '../styles/catalogo-cards.css';

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
  const {
    cartItems,
    totals,
    orderSent,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getItemQuantity,
  } = useCart();

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
        <CatalogoHero
          itemsCount={items.length}
          filteredCount={filteredItems.length}
          maxPrice={availableRange.max}
          formatPrice={formatPrice}
        />

        <CatalogoToolbar
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        <section className="catalogo-layout">
          <CatalogoSidebar
            priceMin={priceMin}
            priceMax={priceMax}
            onPriceMinChange={handlePriceMinChange}
            onPriceMaxChange={handlePriceMaxChange}
            formatPrice={formatPrice}
            cartItems={cartItems}
            cartTotals={totals}
            onClearCart={clearCart}
            orderSent={orderSent}
          />

          <CatalogoResults
            loading={loading}
            filteredItems={filteredItems}
            currentPage={currentPage}
            totalPages={totalPages}
            visibleItems={visibleItems}
            formatPrice={formatPrice}
            onAddToCart={addItem}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            getItemQuantity={getItemQuantity}
            orderSent={orderSent}
            onPageChange={setPage}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Catalogo;