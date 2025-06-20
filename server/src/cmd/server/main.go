package main

import (
	"log"
	"net/http"
	"server/src/artists"
	"server/src/auth"
	"server/src/events"
	"server/src/images"
	"server/src/merch"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// Initialize repositories
	artistRepo := artists.NewInMemoryArtistRepository()
	eventRepo := events.NewInMemoryEventRepository()
	productRepo := merch.NewInMemoryProductRepository()

	// Initialize Spotify service
	// ClientID a2faff2b9b084dc685c7c6b54ce47274
	// ClientSecret your-client-secret
	spotifyService := images.NewSpotifyService("a2faff2b9b084dc685c7c6b54ce47274", "7b58b31897a84e4c8cf13f82b37fb524")

	// Initialize services
	artistService := artists.NewArtistService(artistRepo, spotifyService)
	eventService := events.NewEventService(eventRepo, artistService)
	productService := merch.NewProductService(productRepo)

	// Initialize handlers
	eventHandler := events.NewEventHandler(eventService)
	productHandler := merch.NewProductHandler(productService)

	// Initialize Auth service
	authService := auth.NewAuthService(
		"google-client-id", "google-client-secret",
		"facebook-client-id", "facebook-client-secret",
		"apple-client-id", "apple-client-secret",
	)

	// Setup router
	router := mux.NewRouter()
	setupRoutes(router, eventHandler, productHandler, authService)

	// Seed some test data
	seedData(artistService, eventService, productService)

	// Enable CORS
	corsHandler := handlers.CORS(
		// FrontEnd URL
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	log.Println("Server starting on :5000")
	log.Fatal(http.ListenAndServe(":5000", corsHandler(router)))
}

func setupRoutes(router *mux.Router, eventHandler *events.EventHandler, productHandler *merch.ProductHandler, authService *auth.AuthService) {
	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/events", eventHandler.GetUpcomingEvents).Methods("GET")
	api.HandleFunc("/events/{id}", eventHandler.GetEventByID).Methods("GET")

	api.HandleFunc("/products", productHandler.GetAllProducts).Methods("GET")

	// Add authentication routes
	api.HandleFunc("/auth/google", authService.HandleGoogleLogin).Methods("GET")
	api.HandleFunc("/auth/facebook", authService.HandleFacebookLogin).Methods("GET")
	api.HandleFunc("/auth/apple", authService.HandleAppleLogin).Methods("GET")
}

type Artist = artists.Artist

func seedData(artistService *artists.ArtistService, eventService *events.EventService, productService *merch.ProductService) {
	log.Println("Seeding test data...")

	// Create artists
	artists := []Artist{
		{
			ID:      "2",
			Name:    "LIL TEXAS",
			Spotify: "76raIy8boaM9sf9gMGXGJ5",
		},
		{
			ID:      "3",
			Name:    "GRAVEDGR",
			Spotify: "1kiZfWU37oS0pCOV7Os1Pj",
		},
		{
			ID:      "4",
			Name:    "FNDS",
			Spotify: "38I2Hx8uBxpFFyCouO8HTu",
		},
		{
			ID:      "5",
			Name:    "MUTIC",
			Spotify: "33ycZPnd9aM9YjzXeeE5q8",
		},
		{
			ID:      "6",
			Name:    "SKRIØUT ",
			Spotify: "2mtSOQei9kRyJBsrF9mZPN",
		},
		{
			ID:      "7",
			Name:    "DJ Adr ",
			Spotify: "25R0tljjJl8dNlZOJy0Sxd",
		},
		{
			ID:      "8",
			Name:    "DJ Ketibz ",
			Spotify: "5HoAra2ZY9dH5XewVp87CZ",
		},
	}

	for _, artist := range artists {
		if err := artistService.CreateArtist(&artist); err != nil {
			log.Printf("Error creating artist %s: %v", artist.Name, err)
		}
	}

	artists, _ = artistService.GetAllArtists()

	// Create events
	events := []events.Event{
		{
			ID:          "1",
			Name:        "Redd Monday",
			Description: "A weekly event featuring Redd's latest tracks.",
			Date:        time.Date(2025, time.September, 8, 20, 0, 0, 0, time.UTC),
			Artists:     []Artist{artists[0], artists[1], artists[2]},
		},
		{
			ID:          "2",
			Name:        "Invasion Nocturne",
			Description: "An immersive night of electronic music.",
			Date:        time.Date(2025, time.September, 9, 20, 0, 0, 0, time.UTC),
			Artists:     []Artist{artists[2], artists[3], artists[4]},
		},
		{
			ID:          "3",
			Name:        "CTRL+REW",
			Description: "A retro-themed event celebrating classic electronic music.",
			Date:        time.Date(2025, time.September, 10, 20, 0, 0, 0, time.UTC),
			Artists:     []Artist{artists[0], artists[2], artists[5]},
		},
		{
			ID:          "4",
			Name:        "Jeudi Etudiant",
			Description: "A student night with special discounts and performances.",
			Date:        time.Date(2025, time.September, 11, 20, 0, 0, 0, time.UTC),
			Artists:     []Artist{artists[1], artists[2], artists[3]},
		},
		{
			ID:          "5",
			Name:        "TrackList",
			Description: "You chose the tracks, we play them.",
			Date:        time.Date(2025, time.September, 12, 20, 0, 0, 0, time.UTC),
			Artists:     []Artist{artists[0], artists[1], artists[2], artists[3], artists[4]},
		},
		{
			ID:          "6",
			Name:        "F.Y.P",
			Description: "TikTok's latest hits live.",
			Date:        time.Date(2025, time.September, 13, 20, 0, 0, 0, time.UTC),
			Artists:     []Artist{artists[0], artists[2], artists[3], artists[4]},
		},
		{
			ID:          "7",
			Name:        "Insomnia",
			Description: "On est pas fatigué !",
			Date:        time.Date(2025, time.September, 14, 20, 0, 0, 0, time.UTC),
			Artists:     []Artist{artists[2], artists[3], artists[4]},
		},
	}

	for _, event := range events {
		if err := eventService.CreateEvent(&event); err != nil {
			log.Printf("Error creating event %s: %v", event.Name, err)
		}
	}

	// Create products
	products := []merch.Product{
		{
			ID:          "1",
			Name:        "Palace T-Shirt",
			Description: "A stylish t-shirt from Palace.",
			Type:        "t-shirt",
			Image:       "tshirt1.png",
			Price:       15.99,
		},
		{
			ID:          "2",
			Name:        "Palace Hoodie",
			Description: "A comfortable hoodie from Palace.",
			Type:        "hoodie",
			Image:       "tshirt2.png",
			Price:       39.99,
		},
		{
			ID:          "3",
			Name:        "Palace Cap",
			Description: "A trendy cap from Palace.",
			Type:        "cap",
			Image:       "tshirt3.png",
			Price:       14.99,
		},
		{
			ID:          "4",
			Name:        "Palace Bag",
			Description: "A spacious bag for your essentials.",
			Type:        "bag",
			Image:       "tshirt4.png",
			Price:       18.99,
		},
		{
			ID:          "5",
			Name:        "Palace T-Shirt",
			Description: "A stylish t-shirt from Palace.",
			Type:        "mug",
			Image:       "tshirt5.png",
			Price:       15.99,
		},
		{
			ID:          "6",
			Name:        "Palace T-Shirt",
			Description: "A stylish t-shirt from Palace.",
			Type:        "mug",
			Image:       "tshirt6.png",
			Price:       15.99,
		},
	}
	for _, product := range products {
		if err := productService.CreateProduct(&product); err != nil {
			log.Printf("Error creating product %s: %v", product.Name, err)
		}
	}

	log.Println("Test data seeded successfully")
}
