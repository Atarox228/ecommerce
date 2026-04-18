import React, { useEffect, useState } from 'react';
import { getOfertas } from '../../services/api';
import { content } from '../../content';
import '../../styles/home-sections.css';
import ProductCard from './ProductCard';

function OffersSection() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const loadOffers = async () => {
      const data = await getOfertas();
      setOffers(data);
    };
    loadOffers();
  }, []);

  return (
    <section className="offers-section" id="promociones">
      <div className="section-header">
        <h2>{content.home.offers.title}</h2>
        <p className="section-subtitle">{content.home.offers.subtitle}</p>
      </div>
      <div className="offers-grid">
        {offers.map((offer) => (
          <ProductCard key={offer.id} product={offer} isOffer={true} />
        ))}
      </div>
    </section>
  );
}

export default OffersSection;
