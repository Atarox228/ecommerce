import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import PaymentSelector from '../components/Carrito/PaymentSelector';
import PriceBreakdown from '../components/Carrito/PriceBreakdown';
import { content } from '../content';
import { useCart } from '../context/CartContext';
import '../styles/shared.css';
import '../styles/carrito-page.css';
import '../styles/carrito-items.css';
import '../styles/carrito-payment.css';
import '../styles/carrito-summary.css';

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

  return (
    <div className="carrito-page">
      <Header />

      <main className="carrito-main">
        <section className="carrito-card" aria-labelledby="carrito-title">
          <div className="carrito-head">
            <div>
              <p className="carrito-eyebrow">{content.catalogo.cart.title}</p>
              <h1 id="carrito-title">{content.catalogo.cart.cartPageTitle}</h1>
              <p className="carrito-intro">{content.catalogo.cart.cartPageIntro}</p>
            </div>
            <a href={content.routes.catalogo} className="carrito-back-link">Seguir comprando</a>
          </div>

          {orderSent && (
            <p className="carrito-lock-banner" role="status">
              {content.catalogo.cart.lockMessage}
            </p>
          )}

          {cartItems.length === 0 ? (
            <div className="carrito-empty">
              <p>{content.catalogo.cart.emptyState}</p>
              <a href={content.routes.catalogo} className="carrito-primary-link">Ir al catálogo</a>
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

              <PaymentSelector
                value={paymentMethod}
                onChange={setPaymentMethod}
                disabled={orderSent}
              />

              <PriceBreakdown totals={totals} />

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
                  className="carrito-primary-btn"
                  onClick={sendOrder}
                  disabled={!canSend}
                >
                  {orderSent ? content.catalogo.cart.sentLabel : content.catalogo.cart.sendLabel}
                </button>

                {orderSent && (
                  <button type="button" className="carrito-secondary-btn" onClick={restartOrder}>
                    {content.catalogo.cart.restartLabel}
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Carrito;
