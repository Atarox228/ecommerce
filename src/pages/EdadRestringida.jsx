import { content } from '../content';
import '../styles/edad-restringida.css';

function EdadRestringida() {
  return (
    <main className="edad-restringida">
      <section className="edad-restringida-content">
        <img
          src={content.ageRestriction.logoSrc}
          alt={content.ageRestriction.logoAlt}
          className="edad-restringida-logo"
        />
        <p className="edad-restringida-message">{content.ageRestriction.message}</p>
      </section>
    </main>
  );
}

export default EdadRestringida;