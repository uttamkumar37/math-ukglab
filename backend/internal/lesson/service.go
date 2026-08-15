package lesson

import (
	"errors"

	"math-ukglab/backend/internal/database"
)

var ErrNotFound = errors.New("lesson not found")

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (service *Service) FindBySlug(slug string) (database.Lesson, error) {
	return service.repo.FindBySlug(slug)
}
