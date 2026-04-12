import React from 'react';

function ProductCard({ product, isOffer = false, isCategory = false, isCombo = false }) {
  // Soportar ambos formatos: "imagen"/"nombre" (del mock) y "image"/"name"
  const name = product.nombre || product.name;
  const image = product.imagen || product.image;
  const price = product.precio || product.price;
  const description = product.descripcion || product.description;

  if (isCategory) {
    return (
      <div className="product-card category-card hover:shadow-md transitoin-transform duration-300">
        <div className="product-image">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="product-info">
          <h3>{name}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card hover:shadow-md transition-transform duration-300">
      {isOffer && product.discount && (
        <span className="discount-badge">{product.discount}%</span>
      )}
      <div className="product-image">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        {isOffer && product.originalPrice && (
          <div className="price-section">
            <span className="price">${product.price}</span>
            <span className="original-price">${product.originalPrice}</span>
          </div>
        )}
        {!isOffer && <p className="price">${price}</p>}
        {description && <p className="description">{description}</p>}
        {isCombo && (
          <a href="#" className="combo-button inline-block bg-blue-900 hover:bg-blue-800 text-white py-2 px-3 rounded text-xs sm:text-sm font-semibold transition-colors duration-300">Ver detalle</a>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
