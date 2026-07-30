import React from 'react';
import { content } from '../../content';
import '../../styles/home-hero.css';

function WelcomeHero() {
  return (
    <section className="welcome-hero">
      <div className="hero-content">
        <p className="hero-kicker">Distribuidora oficial de bebidas</p>
        <h1>
          <span className="hero-title-line">{content.home.hero.title}</span>
          <span className="hero-highlight golden-text">{content.home.hero.highlight}</span>
        </h1>
        <p>{content.home.hero.description}</p>
        <a className="btn-primary hero-cta golden-background" href={content.home.hero.ctaHref}>
          {content.home.hero.ctaLabel}
        </a>
        <p className="hero-note">Envíos en el día para eventos, juntadas y reposición express.</p>
      </div>
    </section>
  );
}

export default WelcomeHero;
