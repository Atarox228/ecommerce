import { useEffect, useRef } from 'react';
import { content } from '../../content';

function CatalogoSidebar({
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  formatPrice,
  cartItems,
  cartTotals,
  onClearCart,
  orderSent,
}) {
  const cartItemsRef = useRef(null);

  useEffect(() => {
    if (!cartItemsRef.current) {
      return;
    }

    const updateMaxHeight = () => {
      // Find the catalogo-grid in the same layout
      const layout = cartItemsRef.current?.closest('.catalogo-layout');
      const grid = layout?.querySelector('.catalogo-grid');

      if (grid) {
        const gridHeight = grid.getBoundingClientRect().height;
        cartItemsRef.current.style.maxHeight = `${gridHeight}px`;
      }
    };

    // Update on mount and window resize
    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  return (
    <aside className="catalogo-sidebar" aria-label="Filtros del catálogo">
      <div className="filter-card">
        <h2>{content.catalogo.filters.priceTitle}</h2>
        <div className="price-inputs">
          <label>
            <span>{content.catalogo.filters.minLabel}</span>
            <input
              type="number"
              min={0}
              step={500}
              value={priceMin}
              onChange={onPriceMinChange}
            />
          </label>
          <label>
            <span>{content.catalogo.filters.maxLabel}</span>
            <input
              type="number"
              min={0}
              step={500}
              value={priceMax}
              onChange={onPriceMaxChange}
            />
          </label>
        </div>
        <p className="price-summary">
          {content.catalogo.filters.activeRangePrefix} ${formatPrice(priceMin)} - ${formatPrice(priceMax)}
        </p>
      </div>

      {cartItems.length > 0 && (
        <div className="filter-card cart-card">
          <div className="cart-card-header">
            <div>
              <h2>{content.catalogo.cart.title}</h2>
              <p className="sidebar-text">{content.catalogo.cart.subtitle}</p>
            </div>
            <span className="cart-count-badge">
              {cartTotals.quantity} {cartTotals.quantity === 1 ? content.catalogo.cart.itemLabel : content.catalogo.cart.itemsLabel}
            </span>
          </div>

          <ul className="cart-items" ref={cartItemsRef} aria-label={content.catalogo.cart.title}>
            {cartItems.map((cartItem) => (
              <li className="cart-item-row" key={cartItem.id}>
                <span className="cart-item-title" title={cartItem.title}>
                  {cartItem.title}
                </span>
                <span className="cart-item-quantity">x{cartItem.quantity}</span>
              </li>
            ))}
          </ul>

          {orderSent && <p className="cart-lock-message">{content.catalogo.cart.lockMessage}</p>}

          <div className="cart-summary">
            <div>
              <span>{content.catalogo.cart.totalLabel}</span>
              <strong>${formatPrice(cartTotals.subtotal)}</strong>
            </div>
            <button
              type="button"
              className="cart-clear-button"
              onClick={onClearCart}
              disabled={cartItems.length === 0 || orderSent}
            >
              {content.catalogo.cart.clearLabel}
            </button>
          </div>

          <a
            href={content.routes.carrito}
            className="cart-checkout-button"
          >
            {content.catalogo.cart.payLabel}
          </a>
        </div>
      )}
    </aside>
  );
}

export default CatalogoSidebar;