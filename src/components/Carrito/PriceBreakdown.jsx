import { content } from '../../content';
import '../../styles/carrito-summary.css';
function PriceBreakdown({ totals }) {
  const formatPrice = (value) => new Intl.NumberFormat('es-AR').format(Math.round(value || 0));

  return (
    <section className="carrito-summary">
      <div>
        <span className="flex gap-2">
          {content.catalogo.cart.itemsLabel} <strong>{totals.quantity}</strong>
        </span>
      </div>
      <div className="price-breakdown">
        <div>
          <div className="price-row subtotal">
            <span>Subtotal</span>
            <span>${formatPrice(totals.subtotal)}</span>
          </div>
          <hr></hr>
        </div>
        {totals.adjustment !== 0 && (
          <div
            className={`price-row adjustment ${totals.adjustment > 0 ? 'recargo' : 'descuento'}`}
          >
            <span>
              {totals.adjustment > 0 ? 'Recargo' : 'Descuento'} ({totals.adjustmentPercentage}%)
            </span>
            <span>
              {totals.adjustment > 0 ? '+' : ''}${formatPrice(totals.adjustment)}
            </span>
          </div>
        )}
        <div>
          <hr></hr>
          <div className="price-row total">
            <span>{content.catalogo.cart.totalLabel}</span>
            <span>${formatPrice(totals.total)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PriceBreakdown;
