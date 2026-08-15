package topic

import (
	"errors"

	"math-ukglab/backend/internal/database"
)

var ErrNotFound = errors.New("topic not found")

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (service *Service) List() ([]database.Topic, error) {
	return service.repo.List()
}

func (service *Service) FindBySlug(slug string) (database.Topic, error) {
	return service.repo.FindBySlug(slug)
}
