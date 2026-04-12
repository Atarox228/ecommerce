// /src/services/api.js
import catalogo from '../mocks/catalogo.json';

const USE_MOCK = true; // luego lo cambiás

export async function getCatalogo() {
  if (USE_MOCK) {
    return catalogo;
  }

  const res = await fetch("/api/catalogo");
  return res.json();
}

export async function getCategorias() {
  const data = await getCatalogo();
  return data.categorias;
}

export async function getCombos() {
  const data = await getCatalogo();
  return data.packs;
}

export async function getOfertas() {
  const data = await getCatalogo();
  const { productos, packs, promos } = data;
  
  // Mapear las ofertas para combinar info de producto + descuento
  const ofertas = promos.map(promo => {
    let item = productos.find(p => p.id === promo.id_producto) || 
               packs.find(p => p.id === promo.id_producto);
    
    if (item) {
      return {
        ...item,
        discount: Math.round(promo.descuento * 100),
        originalPrice: item.precio,
        price: Math.floor(item.precio * (1 - promo.descuento))
      };
    }
    return null;
  }).filter(Boolean);
  
  return ofertas;
}