import { content } from '../content';

const USE_MOCK = false; // switch to false to use server proxy
const LOCAL_STORAGE_VERSION = 3;
const LOCAL_STORAGE_KEY = `catalogo:cache:v${LOCAL_STORAGE_VERSION}`;
const LOCAL_STORAGE_TTL_MS = 1000 * 60 * 60; // 1 hour
const PLACEHOLDER_IMAGE = 'https://picsum.photos/200/300?random=28';

function normalizePrice(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }

  return value < 1000 ? Math.round(value * 1000) : Math.round(value);
}

function normalizeProduct(product) {
  return {
    ...product,
    precio: normalizePrice(product.precio),
  };
}

function normalizePromo(promo) {
  return {
    ...promo,
    descuento: Number.parseFloat(promo.descuento),
  };
}

export async function getCatalogo() {
  if (USE_MOCK) {
    return {
      ...content.catalogoData,
      packs: (content.catalogoData.packs ?? []).map(normalizeProduct),
      promos: (content.catalogoData.promos ?? []).map(normalizePromo),
      productos: (content.catalogoData.productos ?? []).map(normalizeProduct),
      categorias: content.catalogoData.categorias ?? [],
    };
  }

  try {
    // try localStorage cache first
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.ts && (Date.now() - parsed.ts) < LOCAL_STORAGE_TTL_MS && parsed.data) {
          const data = parsed.data;
          return {
            ...data,
            packs: (data.packs ?? []).map((p) => ({ ...p, imagen: p.imagen || PLACEHOLDER_IMAGE })).map(normalizeProduct),
            promos: (data.promos ?? []).map(normalizePromo),
            productos: (data.productos ?? []).map((p) => ({ ...p, imagen: p.imagen || PLACEHOLDER_IMAGE })).map(normalizeProduct),
            categorias: data.categorias ?? [],
          };
        }
      } catch (e) {
        // ignore parse errors and continue to fetch
      }
    }

    const res = await fetch('/api/catalogo');
    if (!res.ok) {
      throw new Error('Network response not ok');
    }

    const data = await res.json();

    // ensure images fallback and store cache
    const safeData = {
      ...data,
      packs: (data.packs ?? []).map((p) => ({ ...p, imagen: p.imagen || PLACEHOLDER_IMAGE })),
      productos: (data.productos ?? []).map((p) => ({ ...p, imagen: p.imagen || PLACEHOLDER_IMAGE })),
      promos: data.promos ?? [],
      categorias: data.categorias ?? [],
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ts: Date.now(), data: safeData }));
    } catch (e) {
      // ignore localStorage errors
    }

    return {
      ...safeData,
      packs: (safeData.packs ?? []).map(normalizeProduct),
      promos: (safeData.promos ?? []).map(normalizePromo),
      productos: (safeData.productos ?? []).map(normalizeProduct),
      categorias: safeData.categorias ?? [],
    };
  } catch (err) {
    // fallback to mocks if anything fails
    console.warn('Failed to fetch catalogo from server, falling back to mocks', err);
    return {
      ...content.catalogoData,
      packs: (content.catalogoData.packs ?? []).map((p) => ({ ...p, imagen: p.imagen || PLACEHOLDER_IMAGE })).map(normalizeProduct),
      promos: (content.catalogoData.promos ?? []).map(normalizePromo),
      productos: (content.catalogoData.productos ?? []).map((p) => ({ ...p, imagen: p.imagen || PLACEHOLDER_IMAGE })).map(normalizeProduct),
      categorias: content.catalogoData.categorias ?? [],
    };
  }
}

export async function getCategorias() {
  const data = await getCatalogo();
  return data.categorias ?? [];
}

export async function getCombos() {
  const data = await getCatalogo();
  return data.packs ?? [];
}

export async function getOfertas() {
  const data = await getCatalogo();
  const productos = data.productos ?? [];
  const packs = data.packs ?? [];
  const promos = data.promos ?? [];

  return promos
    .map((promo) => {
      const item = productos.find((producto) => producto.id === promo.id_producto)
        || packs.find((pack) => pack.id === promo.id_producto);

      if (!item) {
        return null;
      }

      const discount = Number.isFinite(promo.descuento) ? promo.descuento : 0;

      return {
        ...item,
        discount: Math.round(discount * 100),
        originalPrice: item.precio,
        price: Math.round(item.precio * (1 - discount)),
      };
    })
    .filter(Boolean);
}

export async function getCatalogoItems() {
  const data = await getCatalogo();
  const packs = data.packs ?? [];
  const promos = data.promos ?? [];

  const promoById = new Map(
    promos
      .filter((promo) => Number.isFinite(promo.descuento))
      .map((promo) => [promo.id_producto, promo]),
  );

  return packs.map((pack) => {
    const promo = promoById.get(pack.id);

    if (!promo) {
      return {
        ...pack,
        price: pack.precio,
        originalPrice: null,
        discount: 0,
      };
    }

    const discountedPrice = Math.round(pack.precio * (1 - promo.descuento));

    return {
      ...pack,
      price: discountedPrice,
      originalPrice: pack.precio,
      discount: Math.round(promo.descuento * 100),
    };
  });
}