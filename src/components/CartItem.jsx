import { content } from '../content';

function CartItem({ item, onIncrease, onDecrease, onRemove, disabled = false, compact = false }) {
  const formatPrice = (value) => new Intl.NumberFormat('es-AR').format(Math.round(value || 0));

  if (compact) {
    return (
      <article className="cart-item">
        <img src={item.image} alt={item.title} className="cart-item-image" loading="lazy" />
        <div className="cart-item-body">
          <p className="cart-item-title">{item.title}</p>
          <p className="cart-item-price">${formatPrice(item.price)} c/u</p>

          <div className="cart-item-controls">
            <button
              type="button"
              className="cart-step-button"
              onClick={() => onDecrease(item.id)}
              disabled={disabled}
            >
              −
            </button>
            <span>{content.catalogo.cart.quantityLabel}: {item.quantity}</span>
            <button
              type="button"
              className="cart-step-button"
              onClick={() => onIncrease(item.id)}
              disabled={disabled}
            >
              +
            </button>
          </div>

          <div className="cart-item-footer">
            <strong>${formatPrice(item.price * item.quantity)}</strong>
            <button
              type="button"
              className="cart-remove-button"
              onClick={() => onRemove(item.id)}
              disabled={disabled}
            >
              {content.catalogo.cart.removeLabel}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="carrito-item">
      <img src={item.image} alt={item.title} className="carrito-item-image" loading="lazy" />

      <div className="carrito-item-content">
        <p className="carrito-item-title">{item.title}</p>
        <p className="carrito-item-price">${formatPrice(item.price)} c/u</p>

        <div className="carrito-item-controls">
          <button
            type="button"
            className="qty-button"
            onClick={() => onDecrease(item.id)}
            disabled={disabled}
            aria-label={`Quitar una unidad de ${item.title}`}
          >
            -
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            type="button"
            className="qty-button"
            onClick={() => onIncrease(item.id)}
            disabled={disabled}
            aria-label={`Agregar una unidad de ${item.title}`}
          >
            +
          </button>
        </div>
      </div>

      <div className="carrito-item-side">
        <strong>${formatPrice(item.quantity * item.price)}</strong>
        <button
          type="button"
          className="carrito-remove-button"
          onClick={() => onRemove(item.id)}
          disabled={disabled}
        >
          {content.catalogo.cart.removeLabel}
        </button>
      </div>
    </article>
  );
}

export default CartItem;
