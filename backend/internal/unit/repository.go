package unit

import (
	"errors"

	"math-ukglab/backend/internal/database"

	"gorm.io/gorm"
)

type Repository interface {
	ListByClass(classNumber int) ([]database.Unit, error)
	FindBySlug(slug string) (database.Unit, error)
	FindByClassAndSlug(classNumber int, slug string) (database.Unit, error)
}

type GormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *GormRepository {
	return &GormRepository{db: db}
}

func (repo *GormRepository) ListByClass(classNumber int) ([]database.Unit, error) {
	var units []database.Unit
	err := repo.db.
		Joins("JOIN classes ON classes.id = units.class_id").
		Where("classes.class_number = ?", classNumber).
		Preload("Chapters", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Preload("Chapters.Topics", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Order("units.display_order asc").
		Find(&units).Error
	return units, err
}

func (repo *GormRepository) FindBySlug(slug string) (database.Unit, error) {
	var unit database.Unit
	err := repo.db.
		Preload("Class").
		Preload("Chapters", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Preload("Chapters.Topics", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Where("slug = ?", slug).
		First(&unit).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return database.Unit{}, ErrNotFound
	}
	return unit, err
}

func (repo *GormRepository) FindByClassAndSlug(classNumber int, slug string) (database.Unit, error) {
	var unit database.Unit
	err := repo.db.
		Joins("JOIN classes ON classes.id = units.class_id").
		Preload("Class").
		Preload("Chapters", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Preload("Chapters.Topics", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Where("classes.class_number = ? AND units.slug = ?", classNumber, slug).
		First(&unit).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return database.Unit{}, ErrNotFound
	}
	return unit, err
}
