import { content } from '../../content';

function PaymentSelector({ value, onChange, disabled = false }) {
  return (
    <section className="carrito-payment" aria-labelledby="payment-title">
      <h2 id="payment-title">{content.catalogo.cart.paymentTitle}</h2>
      <p>{content.catalogo.cart.paymentHint}</p>

      <div className="carrito-payment-options" role="radiogroup" aria-label={content.catalogo.cart.paymentTitle}>
        {content.catalogo.cart.paymentMethods.map((method) => (
          <label key={method.value} className={`payment-option ${value === method.value ? 'is-selected' : ''}`}>
            <input
              type="radio"
              name="payment-method"
              value={method.value}
              checked={value === method.value}
              onChange={() => onChange(method.value)}
              disabled={disabled}
            />
            <span>{method.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default PaymentSelector;
