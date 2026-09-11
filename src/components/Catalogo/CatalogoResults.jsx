import { content } from '../../content';
import '../../styles/catalogo-results.css';
import Card from '../Card';
import Arrow from '../Icons/Arrow';
import '../../styles/catalogo-cards.css';
function CatalogoResults({
  loading,
  filteredItems,
  currentPage,
  totalPages,
  visibleItems,
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
      </div>

      {loading ? (
        <div className="loading-state">{content.catalogo.results.loadingState}</div>
      ) : visibleItems.length === 0 ? (
        <div className="empty-state">{content.catalogo.results.emptyState}</div>
      ) : (
        <div className="catalogo-grid">
          {visibleItems.map((item) => {
            console.log('Rendering item:', item); // Debugging log
            return (
              <Card
                product={item}
                isOffer={item.discount > 0}
                onAddToCart={onAddToCart}
                onIncreaseQuantity={onIncreaseQuantity}
                onDecreaseQuantity={onDecreaseQuantity}
                getItemQuantity={getItemQuantity}
                orderSent={orderSent}
                key={item.id}
              />
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
            <Arrow className="w-4 h-4" />
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
            <Arrow className="w-4 h-4 rotate-180" />
          </button>
        </nav>
      )}
    </div>
  );
}

export default CatalogoResults;
