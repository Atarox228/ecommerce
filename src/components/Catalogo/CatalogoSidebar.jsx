import CartItem from '../CartItem';
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
  orderSent,
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

      {/* <div className="filter-card cart-card">
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
              <CartItem
                key={cartItem.id}
                item={cartItem}
                onIncrease={onIncreaseQuantity}
                onDecrease={onDecreaseQuantity}
                onRemove={onRemoveFromCart}
                disabled={orderSent}
                compact
              />
            ))}
          </div>
        )}

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
          aria-disabled={cartItems.length === 0}
        >
          {content.catalogo.cart.checkoutLabel}
        </a>
      </div> */}
    </aside>
  );
}

export default CatalogoSidebar;