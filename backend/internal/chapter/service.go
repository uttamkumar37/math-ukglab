package chapter

import (
	"errors"

	"math-ukglab/backend/internal/database"
)

var ErrNotFound = errors.New("chapter not found")

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (service *Service) List(filters Filters) ([]database.Chapter, error) {
	return service.repo.List(filters)
}

func (service *Service) FindBySlug(slug string) (database.Chapter, error) {
	return service.repo.FindBySlug(slug)
}

func (service *Service) FindByClassAndSlug(classNumber int, slug string) (database.Chapter, error) {
	return service.repo.FindByClassAndSlug(classNumber, slug)
}
