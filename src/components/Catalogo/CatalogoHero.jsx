import { content } from '../../content';

function CatalogoHero({ itemsCount, filteredCount, maxPrice, formatPrice }) {
  return (
    <section className="catalogo-hero">
      <nav className="catalogo-breadcrumb" aria-label="Breadcrumb">
        <a href={content.routes.home}>{content.catalogo.breadcrumbHome}</a>
        <span aria-hidden="true">›</span>
        <span>{content.catalogo.breadcrumbCurrent}</span>
      </nav>

      <div className="catalogo-hero-card">
        <div>
          <p className="catalogo-eyebrow">{content.catalogo.eyebrow}</p>
          <h1>{content.catalogo.title}</h1>
          <p className="catalogo-intro">
            {content.catalogo.intro.lead}
            <strong>{content.catalogo.intro.source}</strong>
            {content.catalogo.intro.middle}
            <strong>{content.catalogo.intro.service}</strong>
            {content.catalogo.intro.tail}
          </p>
        </div>

        <div className="catalogo-stats" aria-label="Resumen del catálogo">
          <div className="stat-card">
            <strong>{formatPrice(itemsCount)}</strong>
            <span>{content.catalogo.stats.products}</span>
          </div>
          <div className="stat-card">
            <strong>{formatPrice(filteredCount)}</strong>
            <span>{content.catalogo.stats.results}</span>
          </div>
          <div className="stat-card">
            <strong>{formatPrice(maxPrice)}</strong>
            <span>{content.catalogo.stats.maxPrice}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CatalogoHero;