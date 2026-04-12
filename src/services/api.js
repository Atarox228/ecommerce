import catalogo from '../mocks/catalogo.json';

const USE_MOCK = true;

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
      ...catalogo,
      packs: (catalogo.packs ?? []).map(normalizeProduct),
      promos: (catalogo.promos ?? []).map(normalizePromo),
      productos: (catalogo.productos ?? []).map(normalizeProduct),
      categorias: catalogo.categorias ?? [],
    };
  }

  const res = await fetch("/api/catalogo");
  const data = await res.json();

  return {
    ...data,
    packs: (data.packs ?? []).map(normalizeProduct),
    promos: (data.promos ?? []).map(normalizePromo),
    productos: (data.productos ?? []).map(normalizeProduct),
    categorias: data.categorias ?? [],
  };
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