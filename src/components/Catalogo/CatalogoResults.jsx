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
  isItemInCart,
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

                  <button
                    type="button"
                    className="catalogo-button"
                    onClick={() => onAddToCart(item)}
                  >
                    {isItemInCart(item.id)
                      ? content.catalogo.buttons.addAnother
                      : content.catalogo.buttons.addToCart}
                  </button>
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