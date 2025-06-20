package artists

import (
	"errors"
	"fmt"
)

// Artist Repository
type ArtistRepository interface {
	GetByID(id string) (*Artist, error)
	GetAll() ([]Artist, error)
	Create(artist *Artist) error
	Update(artist *Artist) error
	Delete(id string) error
}

type ImageService interface {
	GetArtistImage(spotifyID string) (string, error)
}

type ArtistService struct {
	repo         ArtistRepository
	imageService ImageService
}

func NewArtistService(repo ArtistRepository, imageService ImageService) *ArtistService {
	return &ArtistService{
		repo:         repo,
		imageService: imageService,
	}
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
	if artist.Spotify != "" {
		image, err := s.imageService.GetArtistImage(artist.Spotify)
		if err != nil {
			return fmt.Errorf("failed to fetch artist image: %w", err)
		}
		artist.Image = image
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
