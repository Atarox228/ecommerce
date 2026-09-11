import Bag from '../Icons/Bag';
import '../../styles/product-card.css';

function ProductCard({
  product,
  isOffer = false,
  isCategory = false,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  getItemQuantity,
  orderSent,
}) {
  // Soportar ambos formatos: "imagen"/"nombre" (del mock) y "image"/"name"
  const name = product.nombre || product.name;
  const image = product.imagen || product.image;
  const price = product.price;
  const description = product.descripcion || product.description;
  const quantity = getItemQuantity(product.id);
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
    <div
      className={`product-card hover:shadow-md transition-transform duration-300 ${product.stock ? '' : 'brightness-55'} ${quantity > 0 ? 'product-added' : ''}`}
    >
      {quantity > 0 && (
        <div className="product-bag-icon">
          <Bag />
          <span>{quantity}</span>
        </div>
      )}
      {isOffer && product.discount && <span className="discount-badge">{product.discount}%</span>}
      <figure className="product-image">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </figure>
      <div className="product-info">
        <h3>{name}</h3>
        {isOffer && product.originalPrice && (
          <span className="price-section flex text-center">
            <span className="price">${price}</span>
            <span className="original-price">${product.originalPrice}</span>
          </span>
        )}
        {!isOffer && <span className="price">${price}</span>}
        {description && <span className="description">{description}</span>}
      </div>
      <div className="product-quantity-control" aria-label={`Control de cantidad de ${name}`}>
        <button
          type="button"
          className=" product-minus-button"
          onClick={() => onDecreaseQuantity(product.id)}
          disabled={quantity === 0 || orderSent}
          aria-label={`Quitar una unidad de ${name}`}
        ></button>
        <span className={`product-qty-value ${quantity > 0 ? 'active' : ''}`}>{quantity}</span>
        <button
          type="button"
          className="product-plus-button"
          onClick={() => (quantity === 0 ? onAddToCart(product) : onIncreaseQuantity(product.id))}
          disabled={!product.stock}
          aria-label={`Agregar una unidad de ${name}`}
        ></button>
      </div>
    </div>
  );
}

export default ProductCard;
