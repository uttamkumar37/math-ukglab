package unit

import (
	"errors"

	"math-ukglab/backend/internal/database"
)

var ErrNotFound = errors.New("unit not found")

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (service *Service) ListByClass(classNumber int) ([]database.Unit, error) {
	return service.repo.ListByClass(classNumber)
}

func (service *Service) FindBySlug(slug string) (database.Unit, error) {
	return service.repo.FindBySlug(slug)
}

func (service *Service) FindByClassAndSlug(classNumber int, slug string) (database.Unit, error) {
	return service.repo.FindByClassAndSlug(classNumber, slug)
}
