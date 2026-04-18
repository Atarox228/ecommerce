import { content } from '../../content';

function CatalogoSidebar({
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  formatPrice,
  cartItems,
  cartTotals,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemoveFromCart,
  onClearCart,
  onCheckout,
}) {
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

        {cartItems.length === 0 ? (
          <p className="cart-empty">{content.catalogo.cart.emptyState}</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((cartItem) => (
              <article className="cart-item" key={cartItem.id}>
                <img src={cartItem.image} alt={cartItem.title} className="cart-item-image" loading="lazy" />
                <div className="cart-item-body">
                  <p className="cart-item-title">{cartItem.title}</p>
                  <p className="cart-item-price">${formatPrice(cartItem.price)} c/u</p>

                  <div className="cart-item-controls">
                    <button type="button" className="cart-step-button" onClick={() => onDecreaseQuantity(cartItem.id)}>
                      −
                    </button>
                    <span>{content.catalogo.cart.quantityLabel}: {cartItem.quantity}</span>
                    <button type="button" className="cart-step-button" onClick={() => onIncreaseQuantity(cartItem.id)}>
                      +
                    </button>
                  </div>

                  <div className="cart-item-footer">
                    <strong>${formatPrice(cartItem.price * cartItem.quantity)}</strong>
                    <button type="button" className="cart-remove-button" onClick={() => onRemoveFromCart(cartItem.id)}>
                      {content.catalogo.cart.removeLabel}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <div>
            <span>{content.catalogo.cart.totalLabel}</span>
            <strong>${formatPrice(cartTotals.subtotal)}</strong>
          </div>
          <button type="button" className="cart-clear-button" onClick={onClearCart} disabled={cartItems.length === 0}>
            {content.catalogo.cart.clearLabel}
          </button>
        </div>

        <button
          type="button"
          className="cart-checkout-button"
          onClick={onCheckout}
          disabled={cartItems.length === 0}
        >
          {content.catalogo.cart.checkoutLabel}
        </button>
      </div>
    </aside>
  );
}

export default CatalogoSidebar;