import { content } from '../../content';

function CatalogoHero({ query, onQueryChange, sortBy, onSortByChange }) {
  return (
    <section className="catalogo-hero">
      <div>
        <h2 className="golden-text text-3xl font-semibold">{content.catalogo.eyebrow}</h2>
        <section className="catalogo-toolbar ">
          <input
            type="search"
            name="search"
            placeholder={content.catalogo.toolbar.searchPlaceholder}
            value={query}
            className="catalogo-search flex-1"
            onChange={(event) => onQueryChange(event.target.value)}
          />

          <label className="flex items-center gap-3 sm:w-auto catalogo-sort">
            <span className="sr-only">{content.catalogo.toolbar.sortLabel}</span>

            <div className="relative p-0!">
              <select
                value={sortBy}
                name="sort"
                onChange={(event) => onSortByChange(event.target.value)}
                className="catalogo-sort appearance-none"
              >
                {content.catalogo.toolbar.sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-slate-300"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 8l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </label>
        </section>
      </div>
    </section>
  );
}

export default CatalogoHero;
