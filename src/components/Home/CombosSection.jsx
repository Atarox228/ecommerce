import React, { useEffect, useState } from 'react';
import { getCombos } from '../../services/api';
import { content } from '../../content';
import '../../styles/home-sections.css';
import ProductCard from './ProductCard';
import { useCart } from '../../context/CartContext';

function CombosSection() {
  const [combos, setCombos] = useState([]);
  const { orderSent, addItem, increaseQuantity, decreaseQuantity, getItemQuantity } = useCart();

  useEffect(() => {
    const loadCombos = async () => {
      const data = await getCombos();
      setCombos(data);
    };
    loadCombos();
  }, []);

  return (
    <section className="combos-section">
      <div className="section-container">
        <div className="section-header">
          <h2>{content.home.combos.title}</h2>
          <h3>{content.home.combos.subtitle}</h3>
        </div>
        <div className="combos-grid">
          {combos.slice(0, content.home.combos.maxItems).map((combo) => (
            <ProductCard
              key={combo.id}
              product={combo}
              isCombo
              onAddToCart={addItem}
              onIncreaseQuantity={increaseQuantity}
              onDecreaseQuantity={decreaseQuantity}
              getItemQuantity={getItemQuantity}
              orderSent={orderSent}
            />
          ))}
        </div>
        <div className="section-footer">
          <a
            className="section-button btn-primary golden-background hover:brightness-110  hover:shadow-amber-500/10! hover:shadow-lg!  transition-all duration-300"
            href={content.home.combos.ctaHref}
          >
            {content.home.combos.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

export default CombosSection;
