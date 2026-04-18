import { content } from '../../content';

function CatalogoToolbar({ query, onQueryChange, sortBy, onSortByChange }) {
  return (
    <section className="catalogo-toolbar" aria-label="Herramientas del catálogo">
      <label className="catalogo-search">
        <span>{content.catalogo.toolbar.searchLabel}</span>
        <input
          type="search"
          placeholder={content.catalogo.toolbar.searchPlaceholder}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>

      <label className="catalogo-sort">
        <span>{content.catalogo.toolbar.sortLabel}</span>
        <select value={sortBy} onChange={(event) => onSortByChange(event.target.value)}>
          {content.catalogo.toolbar.sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default CatalogoToolbar;