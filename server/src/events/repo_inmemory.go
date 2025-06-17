package events

import (
	"errors"
	"sort"
	"sync"
	"time"
)

// Event Repository
type EventRepository interface {
	GetByID(id string) (*Event, error)
	GetUpcoming() ([]Event, error)
	GetAll() ([]Event, error)
	Create(event *Event) error
	Update(event *Event) error
	Delete(id string) error
}

type InMemoryEventRepository struct {
	mu     sync.RWMutex
	events map[string]*Event
}

func NewInMemoryEventRepository() *InMemoryEventRepository {
	return &InMemoryEventRepository{
		events: make(map[string]*Event),
	}
}

func (r *InMemoryEventRepository) GetByID(id string) (*Event, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	event, exists := r.events[id]
	if !exists {
		return nil, errors.New("event not found")
	}
	return event, nil
}

func (r *InMemoryEventRepository) GetUpcoming() ([]Event, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	now := time.Now()
	var upcomingEvents []Event

	for _, event := range r.events {
		if event.Date.After(now) {
			upcomingEvents = append(upcomingEvents, *event)
		}
	}

	// Sort by date
	sort.Slice(upcomingEvents, func(i, j int) bool {
		return upcomingEvents[i].Date.Before(upcomingEvents[j].Date)
	})

	return upcomingEvents, nil
}

func (r *InMemoryEventRepository) GetAll() ([]Event, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	events := make([]Event, 0, len(r.events))
	for _, event := range r.events {
		events = append(events, *event)
	}
	return events, nil
}

func (r *InMemoryEventRepository) Create(event *Event) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.events[event.ID] = event
	return nil
}

func (r *InMemoryEventRepository) Update(event *Event) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.events[event.ID]; !exists {
		return errors.New("event not found")
	}
	r.events[event.ID] = event
	return nil
}

func (r *InMemoryEventRepository) Delete(id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.events[id]; !exists {
		return errors.New("event not found")
	}
	delete(r.events, id)
	return nil
}
