package main

import (
	"log"
	"net/http"
	"palace/src/artists"
	"palace/src/events"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	// Initialize repositories
	artistRepo := artists.NewInMemoryArtistRepository()
	eventRepo := events.NewInMemoryEventRepository()

	// Initialize services
	artistService := artists.NewArtistService(artistRepo)
	eventService := events.NewEventService(eventRepo, artistService)

	// Initialize handlers
	eventHandler := events.NewEventHandler(eventService)

	// Setup router
	router := mux.NewRouter()
	setupRoutes(router, eventHandler)

	// Seed some test data
	seedData(artistService, eventService)

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func setupRoutes(router *mux.Router, eventHandler *events.EventHandler) {
	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/events", eventHandler.GetUpcomingEvents).Methods("GET")
	api.HandleFunc("/events/{id}", eventHandler.GetEventByID).Methods("GET")
}

type Artist = artists.Artist

func seedData(artistService *artists.ArtistService, eventService *events.EventService) {
	// Create artists
	artists := []Artist{
		{
			ID:      "1",
			Name:    "Martin Garrix",
			Image:   "https://example.com/martin-garrix.jpg",
			Spotify: "https://open.spotify.com/artist/60d24wfXkVzDSfLS6hyCjZ",
		},
		{
			ID:      "2",
			Name:    "David Guetta",
			Image:   "https://example.com/david-guetta.jpg",
			Spotify: "https://open.spotify.com/artist/1Cs0zKBU1kc0i8ypK3B9ai",
		},
		{
			ID:      "3",
			Name:    "Tiësto",
			Image:   "https://example.com/tiesto.jpg",
			Spotify: "https://open.spotify.com/artist/2o5jDhtHVPhrJdv3cEQ99Z",
		},
	}

	for _, artist := range artists {
		if err := artistService.CreateArtist(&artist); err != nil {
			log.Printf("Error creating artist %s: %v", artist.Name, err)
		}
	}

	// Create events
	events := []events.Event{
		{
			ID:          "1",
			Name:        "Electric Night",
			Description: "An electrifying night with the best EDM artists",
			Date:        time.Now().Add(7 * 24 * time.Hour), // Next week
			Artists:     []Artist{artists[0], artists[1]},   // Use the correct type if defined in the events package
		},
		{
			ID:          "2",
			Name:        "Summer Vibes",
			Description: "Feel the summer energy with amazing beats",
			Date:        time.Now().Add(14 * 24 * time.Hour), // In 2 weeks
			Artists:     []Artist{artists[2]},
		},
		{
			ID:          "3",
			Name:        "Weekend Madness",
			Description: "The ultimate weekend party experience",
			Date:        time.Now().Add(21 * 24 * time.Hour), // In 3 weeks
			Artists:     []Artist{artists[0], artists[2]},
		},
	}

	for _, event := range events {
		if err := eventService.CreateEvent(&event); err != nil {
			log.Printf("Error creating event %s: %v", event.Name, err)
		}
	}

	log.Println("Test data seeded successfully")
}
