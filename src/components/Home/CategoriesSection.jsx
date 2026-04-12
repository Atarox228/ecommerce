import React, { useEffect, useState } from 'react';
import { getCategorias } from '../../services/api';
import ProductCard from './ProductCard';

function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategorias();
      setCategories(data);
    };
    loadCategories();
  }, []);

  return (
    <section className="categories-section">
      <div className="section-header">
        <h2>Nuestras Categorías</h2>
        <p className="section-subtitle">Explora nuestra selección de bebidas premium y estándar</p>
      </div>
      <div className="categories-grid">
        {categories.map((category) => (
          <ProductCard key={category.id} product={category} isCategory={true} />
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
