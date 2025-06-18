import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AgendaPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const showEventDetails = (event) => {
    setSelectedEvent(event);
  };

  const renderCalendarDay = (day) => {
    const today = new Date();
    const isToday =
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear;

    const event = events.find(
      (e) =>
        new Date(e.date).getDate() === day &&
        new Date(e.date).getMonth() === currentMonth &&
        new Date(e.date).getFullYear() === currentYear
    );

    return (
      <div
        key={day}
        className={`calendar-day ${event ? "has-event" : ""} ${
          isToday ? "today" : ""
        }`}
        onClick={() => event && showEventDetails(event)}
      >
        <div className="day-number">{day}</div>
        {event && <div className="event-name">{event.title}</div>}
      </div>
    );
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderArtists = (artists) => {
    return (
      <div className="artists-list">
        {artists.map((artist, index) => (
          <div key={index} className="artist-card">
            <h4 className="artist-name">{artist.name}</h4>
            <a
              href={`https://open.spotify.com/artist/${artist.spotify}`}
              target="_blank"
              rel="noopener noreferrer"
              className="artist-spotify-link"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
              />
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page-section">
      <div className="main-content">
        <section className="section">
          <h2 className="section-title">Agenda des Soirées</h2>

          {/* Calendar */}
          <div className="calendar-grid">
            {Array.from(
              { length: getDaysInMonth(currentMonth, currentYear) },
              (_, i) => renderCalendarDay(i + 1)
            )}
          </div>

          {/* Month Navigation */}
          <div className="calendar-navigation">
            <button className="btn-calendar-nav" onClick={handlePreviousMonth}>
              &lt;
            </button>
            <h3>
              {new Date(currentYear, currentMonth).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button className="btn-calendar-nav" onClick={handleNextMonth}>
              &gt;
            </button>
          </div>

          {/* Event Details Modal */}
          {selectedEvent && (
            <div className="event-card">
              <h3 className="event-title">{selectedEvent.name}</h3>
              <p>
                {new Date(selectedEvent.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p>{selectedEvent.description}</p>

              {/* Render Artists */}
              {selectedEvent.artists && selectedEvent.artists.length > 0 && (
                <div className="event-artists">
                  {renderArtists(selectedEvent.artists)}
                </div>
              )}

              <button
                className="btn"
                style={{ marginTop: "1rem" }}
                onClick={() => navigate("/reservation")}
              >
                Réserver
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AgendaPage;
