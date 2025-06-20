package events

import (
	"errors"
	"server/src/artists"
)

// Event Service
type EventService struct {
	repo          EventRepository
	artistService *artists.ArtistService
}

func NewEventService(repo EventRepository, artistService *artists.ArtistService) *EventService {
	return &EventService{
		repo:          repo,
		artistService: artistService,
	}
}

func (s *EventService) GetUpcomingEvents() ([]Event, error) {
	return s.repo.GetUpcoming()
}

func (s *EventService) GetEventByID(id string) (*Event, error) {
	return s.repo.GetByID(id)
}

func (s *EventService) GetAllEvents() ([]Event, error) {
	return s.repo.GetAll()
}

func (s *EventService) CreateEvent(event *Event) error {
	if event.ID == "" || event.Name == "" {
		return errors.New("event ID and name are required")
	}
	return s.repo.Create(event)
}

func (s *EventService) UpdateEvent(event *Event) error {
	if event.ID == "" || event.Name == "" {
		return errors.New("event ID and name are required")
	}
	return s.repo.Update(event)
}

func (s *EventService) DeleteEvent(id string) error {
	return s.repo.Delete(id)
}
