import { content } from '../../content';

function getItemTitle(item) {
  return item.nombre || item.name;
}

function CatalogoResults({
  loading,
  filteredItems,
  currentPage,
  totalPages,
  visibleItems,
  formatPrice,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  getItemQuantity,
  orderSent,
  onPageChange,
}) {
  return (
    <div className="catalogo-results">
      <div className="catalogo-results-header">
        <p>
          {loading
            ? content.catalogo.results.loadingSummary
            : `${filteredItems.length} ${filteredItems.length === 1 ? content.catalogo.results.resultSingular : content.catalogo.results.resultPlural}`}
        </p>
        <p>
          {content.catalogo.results.pagePrefix} {currentPage} {content.catalogo.results.pageSeparator} {totalPages}
        </p>
      </div>

      {loading ? (
        <div className="loading-state">{content.catalogo.results.loadingState}</div>
      ) : visibleItems.length === 0 ? (
        <div className="empty-state">{content.catalogo.results.emptyState}</div>
      ) : (
        <div className="catalogo-grid">
          {visibleItems.map((item) => {
            const title = getItemTitle(item);
            const image = item.imagen || item.image;
            const displayPrice = item.price ?? item.precio ?? 0;
            const originalPrice = item.originalPrice;
            const quantity = getItemQuantity(item.id);
            const isUnavailable = !item.stock || orderSent;

            return (
              <article className="catalogo-card" key={item.id}>
                <div className="catalogo-card-image">
                  <img src={image} alt={title} loading="lazy" />
                  {item.discount > 0 && <span className="catalogo-badge">-{item.discount}%</span>}
                </div>

                <div className="catalogo-card-body">
                  <p className="catalogo-card-name">{title}</p>

                  <div className="catalogo-price-row">
                    <strong>${formatPrice(displayPrice)}</strong>
                    {originalPrice && originalPrice !== displayPrice && (
                      <del>${formatPrice(originalPrice)}</del>
                    )}
                  </div>

                  <p className="catalogo-stock">
                    {item.stock ? content.catalogo.results.available : content.catalogo.results.unavailable}
                  </p>

                  <div className="catalogo-quantity-control" aria-label={`Control de cantidad de ${title}`}>
                    <button
                      type="button"
                      className="catalogo-qty-button"
                      onClick={() => onDecreaseQuantity(item.id)}
                      disabled={quantity === 0 || orderSent}
                      aria-label={`Quitar una unidad de ${title}`}
                    >
                      -
                    </button>
                    <span className="catalogo-qty-value">{quantity}</span>
                    <button
                      type="button"
                      className="catalogo-qty-button"
                      onClick={() => (quantity === 0 ? onAddToCart(item) : onIncreaseQuantity(item.id))}
                      disabled={isUnavailable}
                      aria-label={`Agregar una unidad de ${title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="catalogo-pagination" aria-label="Paginación del catálogo">
          <button
            type="button"
            className="page-button"
            onClick={() => onPageChange((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
            aria-label={content.catalogo.buttons.prevPageLabel}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              className={`page-button ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            className="page-button"
            onClick={() => onPageChange((current) => Math.min(totalPages, current + 1))}
            disabled={currentPage === totalPages}
            aria-label={content.catalogo.buttons.nextPageLabel}
          >
            ›
          </button>
        </nav>
      )}
    </div>
  );
}

export default CatalogoResults;