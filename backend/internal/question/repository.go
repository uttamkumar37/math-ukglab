package question

import (
	"errors"
	"strings"

	"math-ukglab/backend/internal/database"

	"gorm.io/gorm"
)

type Filters struct {
	ClassNumber int
	TopicSlug   string
	Difficulty  string
}

type Repository interface {
	List(filters Filters) ([]database.Question, error)
	FindBySlug(slug string) (database.Question, error)
}

type GormRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *GormRepository {
	return &GormRepository{db: db}
}

func (repo *GormRepository) List(filters Filters) ([]database.Question, error) {
	query := repo.db.Model(&database.Question{}).
		Joins("JOIN topics ON topics.id = questions.topic_id").
		Joins("JOIN chapters ON chapters.id = topics.chapter_id").
		Joins("JOIN units ON units.id = chapters.unit_id").
		Joins("JOIN classes ON classes.id = units.class_id").
		Preload("Topic").
		Preload("Hints", func(db *gorm.DB) *gorm.DB { return db.Order("hint_order asc") }).
		Preload("SolutionSteps", func(db *gorm.DB) *gorm.DB { return db.Order("step_order asc") }).
		Order("questions.created_at asc")

	if filters.ClassNumber > 0 {
		query = query.Where("classes.class_number = ?", filters.ClassNumber)
	}
	if filters.TopicSlug != "" {
		query = query.Where("topics.slug = ?", filters.TopicSlug)
	}
	if filters.Difficulty != "" {
		query = query.Where("questions.difficulty = ?", strings.ToUpper(filters.Difficulty))
	}

	var questions []database.Question
	err := query.Find(&questions).Error
	return questions, err
}

func (repo *GormRepository) FindBySlug(slug string) (database.Question, error) {
	var question database.Question
	err := repo.db.
		Preload("Topic").
		Preload("Topic.Chapter").
		Preload("Hints", func(db *gorm.DB) *gorm.DB { return db.Order("hint_order asc") }).
		Preload("SolutionSteps", func(db *gorm.DB) *gorm.DB { return db.Order("step_order asc") }).
		Where("slug = ?", slug).
		First(&question).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return database.Question{}, ErrNotFound
	}
	return question, err
}
