// Home Page Component
const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="page-section active">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo">👑</div>
          <h1>Palace Club</h1>
          <p className="hero-subtitle">
            Espace Multi-Univers • Sensoriel • Événementiel
          </p>
          <p style={{ marginBottom: "2rem", fontSize: "1.1rem" }}>Angers</p>
          <button className="btn" onClick={() => setCurrentPage("agenda")}>
            Découvrir nos soirées
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Prochaine Soirée */}
        <section className="section">
          <h2 className="section-title">Prochaine Soirée</h2>
          <div className="event-card">
            <h3 className="event-title">
              Swipe pour ta soirée - TikTok & Gen Z
            </h3>
            <div className="event-details">
              <div className="event-detail">
                <span>🎶</span>
                <span>Les sons du moment sur TikTok & Reels</span>
              </div>
              <div className="event-detail">
                <span>🖥</span>
                <span>Projection FYP géant sur mur</span>
              </div>
              <div className="event-detail">
                <span>🫰</span>
                <span>Dress code : viral, fun, young</span>
              </div>
              <div className="event-detail">
                <span>📸</span>
                <span>Stories, contenus créés en live</span>
              </div>
              <div className="event-detail">
                <span>👥</span>
                <span>Public : 14-25 ans</span>
              </div>
            </div>
            <button
              className="btn"
              onClick={() => setCurrentPage("reservation")}
            >
              Réserver ma place
            </button>
          </div>
        </section>

        {/* Aftermovie */}
        <section className="section">
          <h2 className="section-title">Dernier Aftermovie</h2>
          <div className="event-card" style={{ textAlign: "center" }}>
            <div
              style={{
                background: "#333",
                height: "300px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "3rem" }}>🎬</span>
            </div>
            <h3>Soirée Hip-Hop Underground</h3>
            <p style={{ color: "#ccc", margin: "1rem 0" }}>
              Revivez l'ambiance explosive de notre dernière soirée
            </p>
            <button className="btn">Voir sur Instagram</button>
          </div>
        </section>

        {/* After Camp */}
        <section className="section">
          <div className="after-camp">
            <h3>After Camp 🏕️</h3>
            <p>
              Une innovation unique à Angers ! Reste dormir sur place dans notre
              camping sécurisé. Fini les risques d'accidents après une soirée
              intense. L'After Camp te permet de prolonger l'expérience en toute
              sécurité et de créer des souvenirs inoubliables avec tes amis.
            </p>
            <button className="btn" style={{ marginTop: "1.5rem" }}>
              En savoir plus
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
