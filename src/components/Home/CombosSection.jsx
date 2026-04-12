import React, { useEffect, useState } from 'react';
import { getCombos } from '../../services/api';
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
        <h2>Combos Fiesteros</h2>
        <p className="section-subtitle">Todo lo que necesitas para tu juntada en un solo lugar</p>
      </div>
      <div className="combos-grid">
        {combos.map((combo) => (
          <ProductCard key={combo.id} product={combo} isCombo />
        ))}
      </div>
    </section>
  );
}

export default CombosSection;
