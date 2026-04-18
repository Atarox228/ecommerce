import React, { useEffect, useState } from 'react';
import { getCombos } from '../../services/api';
import { content } from '../../content';
import '../../styles/home-sections.css';
import ProductCard from './ProductCard';

function CombosSection() {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    const loadCombos = async () => {
      const data = await getCombos();
      setCombos(data);
    };
    loadCombos();
  }, []);

  return (
    <section className="combos-section">
      <div className="section-header">
        <h2>{content.home.combos.title}</h2>
        <p className="section-subtitle">{content.home.combos.subtitle}</p>
      </div>
      <div className="combos-grid">
        {combos.slice(0, content.home.combos.maxItems).map((combo) => (
          <ProductCard key={combo.id} product={combo} isCombo />
        ))}
      </div>
      <div className="section-footer">
        <a className="btn-primary" href={content.home.combos.ctaHref}>
          {content.home.combos.ctaLabel}
        </a>
      </div>
    </section>
  );
}

export default CombosSection;
