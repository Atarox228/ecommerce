import { useEffect, useRef } from 'react';
import '../styles/age-gate-modal.css';
import logo from '../assets/logoFassSinFondo.webp';

function AgeGateModal({
  badge,
  title,
  description,
  adultPrompt,
  adultAction,
  minorPrompt,
  minorAction,
  onAdultAccess,
  onMinorAccess,
}) {
  const adultButtonRef = useRef(null);

  useEffect(() => {
    adultButtonRef.current?.focus();
  }, []);

  return (
    <div className="age-gate-overlay">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        className="age-gate-panel"
      >
        <div className="age-gate-frame">
          <p className="age-gate-badge">{badge}</p>
          <h2 id="age-gate-title" className="age-gate-title">
            {title}
          </h2>

          <div className="age-gate-brand">
            <img className="age-gate-logo" src={logo} alt="Logo de Fass Bebidas" />
          </div>

          <p className="age-gate-description">{description}</p>

          <div className="age-gate-actions">
            <button
              ref={adultButtonRef}
              type="button"
              className="age-gate-action age-gate-action--adult"
              onClick={onAdultAccess}
            >
              <span className="age-gate-action-kicker">{adultPrompt}</span>
              <span className="age-gate-action-title">{adultAction}</span>
            </button>

            <button
              type="button"
              className="age-gate-action age-gate-action--minor"
              onClick={onMinorAccess}
            >
              <span className="age-gate-action-kicker">{minorPrompt}</span>
              <span className="age-gate-action-title">{minorAction}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgeGateModal;
