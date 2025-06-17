package artists

import "errors"

// Artist Repository
type ArtistRepository interface {
	GetByID(id string) (*Artist, error)
	GetAll() ([]Artist, error)
	Create(artist *Artist) error
	Update(artist *Artist) error
	Delete(id string) error
}

// Artist Service
type ArtistService struct {
	repo ArtistRepository
}

func NewArtistService(repo ArtistRepository) *ArtistService {
	return &ArtistService{repo: repo}
}

func (s *ArtistService) GetArtistByID(id string) (*Artist, error) {
	return s.repo.GetByID(id)
}

func (s *ArtistService) GetAllArtists() ([]Artist, error) {
	return s.repo.GetAll()
}

func (s *ArtistService) CreateArtist(artist *Artist) error {
	if artist.ID == "" || artist.Name == "" {
		return errors.New("artist ID and name are required")
	}
	return s.repo.Create(artist)
}

func (s *ArtistService) UpdateArtist(artist *Artist) error {
	if artist.ID == "" || artist.Name == "" {
		return errors.New("artist ID and name are required")
	}
	return s.repo.Update(artist)
}

func (s *ArtistService) DeleteArtist(id string) error {
	return s.repo.Delete(id)
}
