package artists

import (
	"errors"
	"sync"
)

type InMemoryArtistRepository struct {
	mu      sync.RWMutex
	artists map[string]*Artist
}

func NewInMemoryArtistRepository() *InMemoryArtistRepository {
	return &InMemoryArtistRepository{
		artists: make(map[string]*Artist),
	}
}

func (r *InMemoryArtistRepository) GetByID(id string) (*Artist, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	artist, exists := r.artists[id]
	if !exists {
		return nil, errors.New("artist not found")
	}
	return artist, nil
}

func (r *InMemoryArtistRepository) GetAll() ([]Artist, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	artists := make([]Artist, 0, len(r.artists))
	for _, artist := range r.artists {
		artists = append(artists, *artist)
	}
	return artists, nil
}

func (r *InMemoryArtistRepository) Create(artist *Artist) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.artists[artist.ID] = artist
	return nil
}

func (r *InMemoryArtistRepository) Update(artist *Artist) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.artists[artist.ID]; !exists {
		return errors.New("artist not found")
	}
	r.artists[artist.ID] = artist
	return nil
}

func (r *InMemoryArtistRepository) Delete(id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.artists[id]; !exists {
		return errors.New("artist not found")
	}
	delete(r.artists, id)
	return nil
}
