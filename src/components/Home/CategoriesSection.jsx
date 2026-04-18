import React, { useEffect, useState } from 'react';
import { getCategorias } from '../../services/api';
import { content } from '../../content';
import '../../styles/home-sections.css';
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
        <h2>{content.home.categories.title}</h2>
        <p className="section-subtitle">{content.home.categories.subtitle}</p>
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
