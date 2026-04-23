import { content } from '../../content';

function PriceBreakdown({ totals }) {
  const formatPrice = (value) => new Intl.NumberFormat('es-AR').format(Math.round(value || 0));

  return (
    <section className="carrito-summary">
      <div>
        <span>{content.catalogo.cart.itemsLabel}</span>
        <strong>{totals.quantity}</strong>
      </div>
      <div className="carrito-price-summary">
        <div className="price-row">
          <span>Subtotal</span>
          <span>${formatPrice(totals.subtotal)}</span>
        </div>
        {totals.adjustment !== 0 && (
          <div className={`price-row adjustment ${totals.adjustment > 0 ? 'recargo' : 'descuento'}`}>
            <span>
              {totals.adjustment > 0 ? 'Recargo' : 'Descuento'} ({totals.adjustmentPercentage}%)
            </span>
            <span>
              {totals.adjustment > 0 ? '+' : ''}${formatPrice(totals.adjustment)}
            </span>
          </div>
        )}
        <div className="price-row total">
          <span>{content.catalogo.cart.totalLabel}</span>
          <strong>${formatPrice(totals.total)}</strong>
        </div>
      </div>
    </section>
  );
}

export default PriceBreakdown;
