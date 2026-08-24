import CartItem from '../components/CartItem';
import PaymentSelector from '../components/Carrito/PaymentSelector';
import PriceBreakdown from '../components/Carrito/PriceBreakdown';
import { content } from '../content';
import { useCart } from '../context/CartContext';
import '../styles/carrito-page.css';

function Carrito() {
  const {
    cartItems,
    paymentMethod,
    orderSent,
    totals,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    setPaymentMethod,
    sendOrder,
    restartOrder,
  } = useCart();

  const canSend = cartItems.length > 0 && paymentMethod && !orderSent;

  const handleRestartOrder = () => {
    restartOrder();

    if (typeof window !== 'undefined') {
      window.location.href = content.routes.catalogo;
    }
  };

  return (
    <article className="carrito-page">
      <section className="carrito-main">
        <header className="carrito-head">
          <div>
            <span className="carrito-eyebrow">{content.catalogo.cart.title}</span>
            {cartItems.length > 0 && (
              <a href={content.routes.catalogo} className="carrito-back-link golden-background">
                Seguir comprando
              </a>
            )}
          </div>
          <h1 id="carrito-title">{content.catalogo.cart.cartPageTitle}</h1>
          <p className="carrito-intro">{content.catalogo.cart.cartPageIntro}</p>
        </header>

        {orderSent && (
          <p className="carrito-lock-banner" role="status">
            {content.catalogo.cart.lockMessage}
          </p>
        )}

        {cartItems.length === 0 ? (
          <div className="carrito-empty">
            <p>{content.catalogo.cart.emptyState}</p>
            <a href={content.routes.catalogo} className="carrito-primary-link golden-background">
              Ir al catálogo
            </a>
          </div>
        ) : (
          <>
            <div className="carrito-items">
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  item={cartItem}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                  disabled={orderSent}
                />
              ))}
            </div>
            <div className="flex w-full justify-between items-center gap-4 flex-wrap">
              <PaymentSelector
                value={paymentMethod}
                onChange={setPaymentMethod}
                disabled={orderSent}
              />

              <PriceBreakdown totals={totals} />
            </div>

            <div className="carrito-actions">
              <button
                type="button"
                className="carrito-secondary-btn"
                onClick={clearCart}
                disabled={orderSent}
              >
                {content.catalogo.cart.clearLabel}
              </button>

              <button
                type="button"
                className="carrito-primary-btn golden-background"
                onClick={sendOrder}
                disabled={!canSend}
              >
                {orderSent ? content.catalogo.cart.sentLabel : content.catalogo.cart.sendLabel}
              </button>

              {orderSent && (
                <button
                  type="button"
                  className="carrito-secondary-btn"
                  onClick={handleRestartOrder}
                >
                  {content.catalogo.cart.restartLabel}
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </article>
  );
}

export default Carrito;
