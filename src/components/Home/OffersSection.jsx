import React, { useEffect, useState } from 'react';
import { getOfertas } from '../../services/api';
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
    <section className="offers-section">
      <div className="section-header">
        <h2>Ofertas Imperdibles</h2>
        <p className="section-subtitle">Aprovecha nuestros descuentos por tiempo limitado</p>
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
