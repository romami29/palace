import { useState } from 'react';

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

export default ReservationPage;