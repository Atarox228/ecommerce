import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CatalogoHero from '../components/Catalogo/CatalogoHero';
import CatalogoToolbar from '../components/Catalogo/CatalogoToolbar';
import CatalogoSidebar from '../components/Catalogo/CatalogoSidebar';
import CatalogoResults from '../components/Catalogo/CatalogoResults';
import { getCatalogoItems } from '../services/api';
import { content } from '../content';
import '../styles/catalogo-page.css';

const PAGE_SIZE = 9;

function formatPrice(value) {
  return new Intl.NumberFormat('es-AR').format(Math.round(value || 0));
}

function getItemTitle(item) {
  return item.nombre || item.name || '';
}

function buildWhatsAppMessage(cartItems, subtotal, totalQuantity) {
  const lines = [content.catalogo.cart.messageIntro, ''];

  cartItems.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${getItemTitle(item)} x${item.quantity} - $${formatPrice(item.price * item.quantity)}`,
    );
  });

  lines.push(
    '',
    `${content.catalogo.cart.totalLabel}: $${formatPrice(subtotal)}`,
    `${content.catalogo.cart.itemsLabel}: ${totalQuantity}`,
    '',
    content.catalogo.cart.messageFooter,
  );

  return lines.join('\n');
}

function Catalogo() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('destacados');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [page, setPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);

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

  const handleAddToCart = (item) => {
    const title = getItemTitle(item);
    const price = item.price ?? item.precio ?? 0;
    const image = item.imagen || item.image || '';

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return currentItems.map((cartItem) => (
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      }

      return [
        ...currentItems,
        {
          id: item.id,
          title,
          image,
          price,
          quantity: 1,
        },
      ];
    });
  };

  const handleIncreaseQuantity = (itemId) => {
    setCartItems((currentItems) => currentItems.map((cartItem) => (
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )));
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems((currentItems) => currentItems
      .map((cartItem) => {
        if (cartItem.id !== itemId) {
          return cartItem;
        }

        return { ...cartItem, quantity: cartItem.quantity - 1 };
      })
      .filter((cartItem) => cartItem.quantity > 0));
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((currentItems) => currentItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotals = useMemo(() => {
    const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return {
      quantity,
      subtotal,
    };
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    const message = buildWhatsAppMessage(cartItems, cartTotals.subtotal, cartTotals.quantity);
    const whatsappUrl = `https://wa.me/${content.catalogo.cart.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const isItemInCart = (itemId) => cartItems.some((cartItem) => cartItem.id === itemId);

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
            cartTotals={cartTotals}
            onDecreaseQuantity={handleDecreaseQuantity}
            onIncreaseQuantity={handleIncreaseQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onCheckout={handleCheckout}
          />

          <CatalogoResults
            loading={loading}
            filteredItems={filteredItems}
            currentPage={currentPage}
            totalPages={totalPages}
            visibleItems={visibleItems}
            formatPrice={formatPrice}
            onAddToCart={handleAddToCart}
            isItemInCart={isItemInCart}
            onPageChange={setPage}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Catalogo;