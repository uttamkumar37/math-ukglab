package class

import (
	"errors"

	"math-ukglab/backend/internal/database"
)

var ErrNotFound = errors.New("class not found")

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (service *Service) List() ([]database.Class, error) {
	return service.repo.List()
}

func (service *Service) FindByNumber(classNumber int) (database.Class, error) {
	return service.repo.FindByNumber(classNumber)
}
