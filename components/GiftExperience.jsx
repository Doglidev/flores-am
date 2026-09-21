'use client';

import { useEffect, useMemo, useState } from 'react';

const messages = [
  'Por si hoy nadie te regaló flores, estas son para vos.',
  'No hace falta que alguien te elija para recordar lo valiosa que sos.',
  'Tu valor no cambia según quién se acuerde hoy de vos.',
  'Y si necesitabas una señal: seguís siendo especial. Mucho.'
];

const hotspots = [
  { x: 32, y: 34 },
  { x: 66, y: 32 },
  { x: 42, y: 57 },
  { x: 69, y: 61 }
];

export default function GiftExperience() {
  const [stage, setStage] = useState('intro');
  const [gardenReady, setGardenReady] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [opened, setOpened] = useState([]);
  const allOpened = opened.length === messages.length;

  useEffect(() => {
    if (stage !== 'garden') return;
    const t = setTimeout(() => setGardenReady(true), 2200);
    return () => clearTimeout(t);
  }, [stage]);

  const fireflies = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${8 + ((i * 19) % 84)}%`,
    top: `${12 + ((i * 27) % 68)}%`,
    delay: `${(i % 5) * .7}s`,
    duration: `${4.5 + (i % 4) * .8}s`
  })), []);

  function openHotspot(index) {
    setActiveMessage(index);
    setOpened(prev => prev.includes(index) ? prev : [...prev, index]);
  }

  function reset() {
    setStage('intro');
    setGardenReady(false);
    setActiveMessage(null);
    setOpened([]);
  }

  return (
    <main className={`experience stage-${stage}`}>
      <div className="grain" aria-hidden="true" />

      {stage === 'intro' && (
        <section className="screen intro-screen">
          <div className="intro-glow" />
          <div className="intro-copy">
            <p className="eyebrow">un pequeño regalo</p>
            <h1>Hoy quería regalarte algo…</h1>
            <p className="lead">pero no quería enviarte una imagen cualquiera.</p>
            <button className="primary-button" onClick={() => setStage('garden')}>
              Abrir regalo <span>→</span>
            </button>
          </div>
          <p className="tiny-note">A veces, las cosas lindas aparecen cuando menos las esperás.</p>
        </section>
      )}

      {stage === 'garden' && (
        <section className="screen garden-screen">
          <div className="garden-photo" />
          <div className="garden-vignette" />
          <div className="garden-light" />
          <div className="foreground foliage-left" />
          <div className="foreground foliage-right" />
          <div className="fireflies" aria-hidden="true">
            {fireflies.map(f => <span key={f.id} style={{left:f.left, top:f.top, animationDelay:f.delay, animationDuration:f.duration}} />)}
          </div>
          <div className={`garden-copy ${gardenReady ? 'ready' : ''}`}>
            <p className="eyebrow">entrá</p>
            <h2>Este pequeño jardín<br/>es para vos.</h2>
            <p>Quedate un segundo. Hay algo esperándote más adelante.</p>
          </div>
          <button className={`garden-next ${gardenReady ? 'ready' : ''}`} onClick={() => setStage('bouquet')}>
            Acercate al ramo <span>↓</span>
          </button>
        </section>
      )}

      {stage === 'bouquet' && (
        <section className="screen bouquet-screen">
          <div className="bouquet-bg" />
          <div className="bouquet-shade" />
          <div className="bouquet-copy">
            <p className="eyebrow">estas flores son para vos</p>
            <h2>Tocá las flores.</h2>
            <p>Cada una guarda algo que quería decirte.</p>
          </div>

          <div className="bouquet-wrap">
            <img
              className="bouquet-image"
              src="https://images.unsplash.com/photo-1566177643841-b2b5c69f31c8?auto=format&fit=crop&fm=jpg&q=86&w=1200"
              alt="Ramo de flores amarillas"
              draggable="false"
            />
            <div className="bouquet-overlay" />
            {hotspots.map((spot, i) => (
              <button
                key={i}
                className={`hotspot ${opened.includes(i) ? 'opened' : ''}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onClick={() => openHotspot(i)}
                aria-label={`Descubrir mensaje ${i + 1}`}
              >
                <span>{opened.includes(i) ? '✓' : ''}</span>
              </button>
            ))}
          </div>

          <div className="progress" aria-live="polite">{opened.length} / {messages.length}</div>

          {activeMessage !== null && (
            <div className="message-layer" onClick={() => setActiveMessage(null)}>
              <article className="message-card" onClick={e => e.stopPropagation()}>
                <button className="close" onClick={() => setActiveMessage(null)} aria-label="Cerrar">×</button>
                <p>{messages[activeMessage]}</p>
                <span className="heart">♥</span>
              </article>
            </div>
          )}

          {allOpened && activeMessage === null && (
            <button className="final-cta" onClick={() => setStage('final')}>Hay una última cosa <span>→</span></button>
          )}
        </section>
      )}

      {stage === 'final' && (
        <section className="screen final-screen">
          <div className="final-photo" />
          <div className="final-overlay" />
          <div className="final-content">
            <p className="eyebrow">por si hoy nadie te las regaló</p>
            <h2>Acá tenés<br/>tus flores amarillas.</h2>
            <p className="final-line">No hace falta que alguien te las regale para recordar lo especial que sos.</p>
            <div className="final-heart">♥</div>
            <p className="happy-day">Feliz día.</p>
            <button className="ghost-button" onClick={reset}>Volver a verlo</button>
          </div>
        </section>
      )}
    </main>
  );
}
