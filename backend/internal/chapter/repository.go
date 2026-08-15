package chapter

import (
	"errors"

	"math-ukglab/backend/internal/database"

	"gorm.io/gorm"
)

type Filters struct {
	ClassNumber int
	UnitSlug    string
}

type Repository interface {
	List(filters Filters) ([]database.Chapter, error)
	FindBySlug(slug string) (database.Chapter, error)
	FindByClassAndSlug(classNumber int, slug string) (database.Chapter, error)
}

type GormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *GormRepository {
	return &GormRepository{db: db}
}

func (repo *GormRepository) List(filters Filters) ([]database.Chapter, error) {
	query := repo.db.Model(&database.Chapter{}).
		Joins("JOIN units ON units.id = chapters.unit_id").
		Joins("JOIN classes ON classes.id = units.class_id").
		Preload("Unit").
		Preload("Topics", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Order("chapters.display_order asc")

	if filters.ClassNumber > 0 {
		query = query.Where("classes.class_number = ?", filters.ClassNumber)
	}
	if filters.UnitSlug != "" {
		query = query.Where("units.slug = ?", filters.UnitSlug)
	}

	var chapters []database.Chapter
	err := query.Find(&chapters).Error
	return chapters, err
}

func (repo *GormRepository) FindBySlug(slug string) (database.Chapter, error) {
	var chapter database.Chapter
	err := repo.db.
		Preload("Unit").
		Preload("Unit.Class").
		Preload("Topics", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Where("slug = ?", slug).
		First(&chapter).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return database.Chapter{}, ErrNotFound
	}
	return chapter, err
}

func (repo *GormRepository) FindByClassAndSlug(classNumber int, slug string) (database.Chapter, error) {
	var chapter database.Chapter
	err := repo.db.
		Joins("JOIN units ON units.id = chapters.unit_id").
		Joins("JOIN classes ON classes.id = units.class_id").
		Preload("Unit").
		Preload("Unit.Class").
		Preload("Topics", func(db *gorm.DB) *gorm.DB { return db.Order("display_order asc") }).
		Where("classes.class_number = ? AND chapters.slug = ?", classNumber, slug).
		First(&chapter).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return database.Chapter{}, ErrNotFound
	}
	return chapter, err
}
