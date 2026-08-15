package database

import "time"

type Curriculum struct {
	ID           string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Board        string    `json:"board"`
	AcademicYear string    `json:"academic_year"`
	Subject      string    `json:"subject"`
	Status       string    `json:"status"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Classes      []Class   `json:"classes,omitempty"`
}

func (Curriculum) TableName() string {
	return "curricula"
}

type Class struct {
	ID           string     `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	CurriculumID string     `gorm:"type:uuid;index" json:"curriculum_id"`
	ClassNumber  int        `gorm:"uniqueIndex" json:"class_number"`
	Title        string     `json:"title"`
	Slug         string     `gorm:"uniqueIndex" json:"slug"`
	Description  string     `json:"description"`
	DisplayOrder int        `json:"display_order"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
	Curriculum   Curriculum `json:"curriculum,omitempty"`
	Units        []Unit     `json:"units,omitempty"`
}

type Unit struct {
	ID           string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	ClassID      string    `gorm:"type:uuid;index;uniqueIndex:idx_units_class_slug" json:"class_id"`
	Title        string    `json:"title"`
	Slug         string    `gorm:"uniqueIndex:idx_units_class_slug" json:"slug"`
	Description  string    `json:"description"`
	DisplayOrder int       `json:"display_order"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Class        Class     `json:"class,omitempty"`
	Chapters     []Chapter `json:"chapters,omitempty"`
}

type Chapter struct {
	ID           string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UnitID       string    `gorm:"type:uuid;index;uniqueIndex:idx_chapters_unit_slug" json:"unit_id"`
	Title        string    `json:"title"`
	Slug         string    `gorm:"uniqueIndex:idx_chapters_unit_slug" json:"slug"`
	Description  string    `json:"description"`
	DisplayOrder int       `json:"display_order"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Unit         Unit      `json:"unit,omitempty"`
	Topics       []Topic   `json:"topics,omitempty"`
}

type Topic struct {
	ID           string     `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	ChapterID    string     `gorm:"type:uuid;index" json:"chapter_id"`
	Title        string     `json:"title"`
	Slug         string     `gorm:"uniqueIndex" json:"slug"`
	Description  string     `json:"description"`
	DisplayOrder int        `json:"display_order"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
	Chapter      Chapter    `json:"chapter,omitempty"`
	Lesson       *Lesson    `json:"lesson,omitempty"`
	Questions    []Question `json:"questions,omitempty"`
}

type Lesson struct {
	ID              string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	TopicID         string    `gorm:"type:uuid;uniqueIndex" json:"topic_id"`
	Title           string    `json:"title"`
	Slug            string    `gorm:"uniqueIndex" json:"slug"`
	Description     string    `json:"description"`
	SimpleContent   string    `json:"simple_content"`
	MediumContent   string    `json:"medium_content"`
	HardContent     string    `json:"hard_content"`
	FormulaContent  string    `json:"formula_content"`
	RevisionContent string    `json:"revision_content"`
	CommonMistake   string    `json:"common_mistake"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
	Topic           Topic     `json:"topic,omitempty"`
}

type Question struct {
	ID                 string                 `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	TopicID            string                 `gorm:"type:uuid;index" json:"topic_id"`
	Slug               string                 `gorm:"uniqueIndex" json:"slug"`
	CourseType         string                 `json:"course_type"`
	Difficulty         string                 `json:"difficulty"`
	QuestionType       string                 `json:"question_type"`
	QuestionText       string                 `json:"question_text"`
	Approach           string                 `json:"approach"`
	FinalAnswer        string                 `json:"final_answer"`
	Explanation        string                 `json:"explanation"`
	AlternativeMethods string                 `json:"alternative_methods"`
	CommonMistakes     string                 `json:"common_mistakes"`
	CreatedAt          time.Time              `json:"created_at"`
	UpdatedAt          time.Time              `json:"updated_at"`
	Topic              Topic                  `json:"topic,omitempty"`
	Hints              []QuestionHint         `json:"hints,omitempty"`
	SolutionSteps      []QuestionSolutionStep `json:"solution_steps,omitempty"`
}

type QuestionHint struct {
	ID         string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	QuestionID string    `gorm:"type:uuid;index" json:"question_id"`
	HintOrder  int       `json:"hint_order"`
	HintText   string    `json:"hint_text"`
	CreatedAt  time.Time `json:"created_at"`
}

type QuestionSolutionStep struct {
	ID         string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	QuestionID string    `gorm:"type:uuid;index" json:"question_id"`
	StepOrder  int       `json:"step_order"`
	StepText   string    `json:"step_text"`
	CreatedAt  time.Time `json:"created_at"`
}
