package topic

import (
	"errors"

	"math-ukglab/backend/internal/database"

	"gorm.io/gorm"
)

type Repository interface {
	List() ([]database.Topic, error)
	FindBySlug(slug string) (database.Topic, error)
}

type GormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *GormRepository {
	return &GormRepository{db: db}
}

func (repo *GormRepository) List() ([]database.Topic, error) {
	var topics []database.Topic
	err := repo.db.Preload("Chapter").Order("display_order asc").Find(&topics).Error
	return topics, err
}

func (repo *GormRepository) FindBySlug(slug string) (database.Topic, error) {
	var topic database.Topic
	err := repo.db.
		Preload("Chapter").
		Preload("Chapter.Unit").
		Preload("Lesson").
		Where("slug = ?", slug).
		First(&topic).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return database.Topic{}, ErrNotFound
	}
	return topic, err
}
