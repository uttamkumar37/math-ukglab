package class

import (
	"errors"

	"math-ukglab/backend/internal/database"

	"gorm.io/gorm"
)

type Repository interface {
	List() ([]database.Class, error)
	FindByNumber(classNumber int) (database.Class, error)
}

type GormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *GormRepository {
	return &GormRepository{db: db}
}

func (repo *GormRepository) List() ([]database.Class, error) {
	var classes []database.Class
	err := repo.db.Preload("Curriculum").Order("display_order asc").Find(&classes).Error
	return classes, err
}

func (repo *GormRepository) FindByNumber(classNumber int) (database.Class, error) {
	var class database.Class
	err := repo.db.Preload("Curriculum").Where("class_number = ?", classNumber).First(&class).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return database.Class{}, ErrNotFound
	}
	return class, err
}
