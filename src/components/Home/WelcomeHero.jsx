import React from 'react';
import { content } from '../../content';
import '../../styles/home-hero.css';

function WelcomeHero() {
  return (
    <section className="welcome-hero">
      <div className="hero-content">
        <h1>{content.home.hero.title}</h1>
        <span className="hero-highlight">{content.home.hero.highlight}</span>
        <p>{content.home.hero.description}</p>
        {/* <a className="btn-primary" href={content.home.hero.ctaHref}>
          {content.home.hero.ctaLabel}
        </a> */}
      </div>
    </section>
  );
}

export default WelcomeHero;
