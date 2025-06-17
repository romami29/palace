import { useState } from 'react';
import "./App.css";

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <span>👑</span>
          <span className="logo-text">Palace Club</span>
        </div>
        <ul className="nav-links">
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
              className={currentPage === 'home' ? 'active' : ''}
            >
              Accueil
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setCurrentPage('agenda'); }}
              className={currentPage === 'agenda' ? 'active' : ''}
            >
              Agenda
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setCurrentPage('reservation'); }}
              className={currentPage === 'reservation' ? 'active' : ''}
            >
              Réservation
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

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
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Angers</p>
          <button 
            className="btn" 
            onClick={() => setCurrentPage('agenda')}
          >
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
            <h3 className="event-title">Swipe pour ta soirée - TikTok & Gen Z</h3>
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
              onClick={() => setCurrentPage('reservation')}
            >
              Réserver ma place
            </button>
          </div>
        </section>

        {/* Aftermovie */}
        <section className="section">
          <h2 className="section-title">Dernier Aftermovie</h2>
          <div className="event-card" style={{ textAlign: 'center' }}>
            <div
              style={{
                background: '#333',
                height: '300px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontSize: '3rem' }}>🎬</span>
            </div>
            <h3>Soirée Hip-Hop Underground</h3>
            <p style={{ color: '#ccc', margin: '1rem 0' }}>
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
            <button className="btn" style={{ marginTop: '1.5rem' }}>
              En savoir plus
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

// Agenda Page Component
const AgendaPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = {
    tiktok: {
      title: "TikTok Night",
      date: "6 Juin",
      description: "Soirée spéciale TikTok avec les sons du moment"
    },
    hiphop: {
      title: "Hip-Hop Night", 
      date: "13 Juin",
      description: "Soirée Hip-Hop Underground avec les meilleurs DJs"
    },
    techno: {
      title: "Techno Night",
      date: "20 Juin", 
      description: "Techno Warehouse - Une nuit électronique intense"
    }
  };

  const showEventDetails = (eventKey) => {
    setSelectedEvent(events[eventKey]);
  };

  const renderCalendarDay = (day) => {
    let eventKey = null;
    let eventName = '';
    
    if (day === 6) {
      eventKey = 'tiktok';
      eventName = 'TikTok Night';
    } else if (day === 13) {
      eventKey = 'hiphop'; 
      eventName = 'Hip-Hop Night';
    } else if (day === 20) {
      eventKey = 'techno';
      eventName = 'Techno Night';
    }

    return (
      <div
        key={day}
        className={`calendar-day ${eventKey ? 'has-event' : ''}`}
        onClick={() => eventKey && showEventDetails(eventKey)}
      >
        <div className="day-number">{day}</div>
        {eventName && <div className="event-name">{eventName}</div>}
      </div>
    );
  };

  return (
    <div className="page-section">
      <div style={{ paddingTop: '100px' }}></div>
      <div className="main-content">
        <section className="section">
          <h2 className="section-title">Agenda des Soirées</h2>

          {/* Calendar */}
          <div className="calendar-grid">
            {Array.from({ length: 21 }, (_, i) => renderCalendarDay(i + 1))}
          </div>

          {/* Event Details Modal */}
          {selectedEvent && (
            <div className="event-card">
              <h3 className="event-title">{selectedEvent.title}</h3>
              <p><strong>Date:</strong> {selectedEvent.date}</p>
              <p>{selectedEvent.description}</p>
              <button 
                className="btn" 
                style={{ marginTop: '1rem' }}
                onClick={() => setSelectedEvent(null)}
              >
                Fermer
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// Reservation Page Component  
const ReservationPage = () => {
  const [formData, setFormData] = useState({
    event: 'TikTok & Gen Z Night - 6 Juin',
    tickets: '1 billet',
    name: '',
    email: '',
    phone: '',
    afterCamp: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    alert('Réservation envoyée ! Nous vous contacterons bientôt.');
    console.log('Form data:', formData);
    
    // Reset form
    setFormData({
      event: 'TikTok & Gen Z Night - 6 Juin',
      tickets: '1 billet',
      name: '',
      email: '',
      phone: '',
      afterCamp: false
    });
  };

  return (
    <div className="page-section">
      <div style={{ paddingTop: '100px' }}></div>
      <div className="main-content">
        <section className="section">
          <h2 className="section-title">Réservation & Billets</h2>

          <div className="reservation-form">
            <div>
              <div className="form-group">
                <label htmlFor="event">Soirée</label>
                <select 
                  id="event" 
                  name="event"
                  value={formData.event}
                  onChange={handleInputChange}
                >
                  <option>TikTok & Gen Z Night - 6 Juin</option>
                  <option>Hip-Hop Underground - 13 Juin</option>
                  <option>Techno Warehouse - 20 Juin</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tickets">Nombre de billets</label>
                <select 
                  id="tickets" 
                  name="tickets"
                  value={formData.tickets}
                  onChange={handleInputChange}
                >
                  <option>1 billet</option>
                  <option>2 billets</option>
                  <option>3 billets</option>
                  <option>4 billets</option>
                  <option>5+ billets</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  placeholder="06 12 34 56 78"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="afterCamp"
                    checked={formData.afterCamp}
                    onChange={handleInputChange}
                    style={{ width: 'auto', marginRight: '10px' }}
                  />
                  Je souhaite réserver une place à l'After Camp (+15€)
                </label>
              </div>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  onClick={handleSubmit}
                  className="btn"
                  style={{ fontSize: '1.1rem', padding: '1.2rem 3rem' }}
                >
                  Finaliser ma réservation
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'agenda':
        return <AgendaPage />;
      case 'reservation':
        return <ReservationPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
};

export default App;