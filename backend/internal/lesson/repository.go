package lesson

import (
	"errors"

	"math-ukglab/backend/internal/database"

	"gorm.io/gorm"
)

type Repository interface {
	FindBySlug(slug string) (database.Lesson, error)
}

type GormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *GormRepository {
	return &GormRepository{db: db}
}

func (repo *GormRepository) FindBySlug(slug string) (database.Lesson, error) {
	var lesson database.Lesson
	err := repo.db.
		Preload("Topic").
		Preload("Topic.Chapter").
		Preload("Topic.Chapter.Unit").
		Where("slug = ?", slug).
		First(&lesson).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return database.Lesson{}, ErrNotFound
	}
	return lesson, err
}
