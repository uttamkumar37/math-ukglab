package database

import "gorm.io/gorm"

type classSeed struct {
	number      int
	title       string
	slug        string
	description string
}

type chapterSeed struct {
	classNumber int
	order       int
	slug        string
	title       string
	description string
}

var schoolClassSeeds = []classSeed{
	{9, "CBSE Class 9 Mathematics", "class-9", "Current NCERT Grade 9 Mathematics chapter sequence from Ganita Manjari."},
	{10, "CBSE Class 10 Mathematics", "class-10", "Current NCERT Class 10 Mathematics chapter sequence."},
	{11, "CBSE Class 11 Mathematics", "class-11", "Current NCERT Class 11 Mathematics chapter sequence."},
	{12, "CBSE Class 12 Mathematics", "class-12", "Current NCERT Class 12 Mathematics Part I and Part II chapter sequence."},
}

var schoolChapterSeeds = []chapterSeed{
	{9, 1, "orienting-yourself-use-of-coordinates", "Orienting Yourself: The Use of Coordinates", "NCERT Ganita Manjari Grade 9 chapter 1."},
	{9, 2, "introduction-to-linear-polynomials", "Introduction to Linear Polynomials", "NCERT Ganita Manjari Grade 9 chapter 2."},
	{9, 3, "world-of-numbers", "The World of Numbers", "NCERT Ganita Manjari Grade 9 chapter 3."},
	{9, 4, "exploring-algebraic-identities", "Exploring Algebraic Identities", "NCERT Ganita Manjari Grade 9 chapter 4."},
	{9, 5, "im-up-and-down-and-round-and-round", "I’m Up and Down, and Round and Round", "NCERT Ganita Manjari Grade 9 chapter 5."},
	{9, 6, "measuring-space-perimeter-and-area", "Measuring Space: Perimeter and Area", "NCERT Ganita Manjari Grade 9 chapter 6."},
	{9, 7, "introduction-to-probability", "The Mathematics of Maybe: Introduction to Probability", "NCERT Ganita Manjari Grade 9 chapter 7."},
	{9, 8, "sequences-and-progressions", "Predicting What Comes Next: Exploring Sequences and Progressions", "NCERT Ganita Manjari Grade 9 chapter 8."},
	{10, 1, "real-numbers", "Real Numbers", "NCERT Class 10 Mathematics chapter 1."},
	{10, 2, "polynomials", "Polynomials", "NCERT Class 10 Mathematics chapter 2."},
	{10, 3, "pair-of-linear-equations-in-two-variables", "Pair of Linear Equations in Two Variables", "NCERT Class 10 Mathematics chapter 3."},
	{10, 4, "quadratic-equations", "Quadratic Equations", "NCERT Class 10 Mathematics chapter 4."},
	{10, 5, "arithmetic-progressions", "Arithmetic Progressions", "NCERT Class 10 Mathematics chapter 5."},
	{10, 6, "triangles", "Triangles", "NCERT Class 10 Mathematics chapter 6."},
	{10, 7, "coordinate-geometry", "Coordinate Geometry", "NCERT Class 10 Mathematics chapter 7."},
	{10, 8, "introduction-to-trigonometry", "Introduction to Trigonometry", "NCERT Class 10 Mathematics chapter 8."},
	{10, 9, "some-applications-of-trigonometry", "Some Applications of Trigonometry", "NCERT Class 10 Mathematics chapter 9."},
	{10, 10, "circles", "Circles", "NCERT Class 10 Mathematics chapter 10."},
	{10, 11, "areas-related-to-circles", "Areas Related to Circles", "NCERT Class 10 Mathematics chapter 11."},
	{10, 12, "surface-areas-and-volumes", "Surface Areas and Volumes", "NCERT Class 10 Mathematics chapter 12."},
	{10, 13, "statistics", "Statistics", "NCERT Class 10 Mathematics chapter 13."},
	{10, 14, "probability", "Probability", "NCERT Class 10 Mathematics chapter 14."},
	{11, 1, "sets", "Sets", "NCERT Class 11 Mathematics chapter 1."},
	{11, 2, "relations-and-functions", "Relations and Functions", "NCERT Class 11 Mathematics chapter 2."},
	{11, 3, "trigonometric-functions", "Trigonometric Functions", "NCERT Class 11 Mathematics chapter 3."},
	{11, 4, "complex-numbers-and-quadratic-equations", "Complex Numbers and Quadratic Equations", "NCERT Class 11 Mathematics chapter 4."},
	{11, 5, "linear-inequalities", "Linear Inequalities", "NCERT Class 11 Mathematics chapter 5."},
	{11, 6, "permutations-and-combinations", "Permutations and Combinations", "NCERT Class 11 Mathematics chapter 6."},
	{11, 7, "binomial-theorem", "Binomial Theorem", "NCERT Class 11 Mathematics chapter 7."},
	{11, 8, "sequences-and-series", "Sequences and Series", "NCERT Class 11 Mathematics chapter 8."},
	{11, 9, "straight-lines", "Straight Lines", "NCERT Class 11 Mathematics chapter 9."},
	{11, 10, "conic-sections", "Conic Sections", "NCERT Class 11 Mathematics chapter 10."},
	{11, 11, "introduction-to-three-dimensional-geometry", "Introduction to Three Dimensional Geometry", "NCERT Class 11 Mathematics chapter 11."},
	{11, 12, "limits-and-derivatives", "Limits and Derivatives", "NCERT Class 11 Mathematics chapter 12."},
	{11, 13, "statistics", "Statistics", "NCERT Class 11 Mathematics chapter 13."},
	{11, 14, "probability", "Probability", "NCERT Class 11 Mathematics chapter 14."},
	{12, 1, "relations-and-functions", "Relations and Functions", "NCERT Class 12 Mathematics Part I chapter 1."},
	{12, 2, "inverse-trigonometric-functions", "Inverse Trigonometric Functions", "NCERT Class 12 Mathematics Part I chapter 2."},
	{12, 3, "matrices", "Matrices", "NCERT Class 12 Mathematics Part I chapter 3."},
	{12, 4, "determinants", "Determinants", "NCERT Class 12 Mathematics Part I chapter 4."},
	{12, 5, "continuity-and-differentiability", "Continuity and Differentiability", "NCERT Class 12 Mathematics Part I chapter 5."},
	{12, 6, "application-of-derivatives", "Application of Derivatives", "NCERT Class 12 Mathematics Part I chapter 6."},
	{12, 7, "integrals", "Integrals", "NCERT Class 12 Mathematics Part II chapter 7."},
	{12, 8, "application-of-integrals", "Application of Integrals", "NCERT Class 12 Mathematics Part II chapter 8."},
	{12, 9, "differential-equations", "Differential Equations", "NCERT Class 12 Mathematics Part II chapter 9."},
	{12, 10, "vector-algebra", "Vector Algebra", "NCERT Class 12 Mathematics Part II chapter 10."},
	{12, 11, "three-dimensional-geometry", "Three Dimensional Geometry", "NCERT Class 12 Mathematics Part II chapter 11."},
	{12, 12, "linear-programming", "Linear Programming", "NCERT Class 12 Mathematics Part II chapter 12."},
	{12, 13, "probability", "Probability", "NCERT Class 12 Mathematics Part II chapter 13."},
}

func SeedDevelopmentData(db *gorm.DB) error {
	curriculum := Curriculum{
		Board:        "CBSE",
		AcademicYear: "2026-27",
		Subject:      "Mathematics",
		Status:       "active",
	}
	if err := upsert(db, &curriculum, "board = ? AND academic_year = ? AND subject = ?", curriculum.Board, curriculum.AcademicYear, curriculum.Subject); err != nil {
		return err
	}

	classesByNumber := make(map[int]Class, len(schoolClassSeeds))
	for index, seed := range schoolClassSeeds {
		class := Class{
			CurriculumID: curriculum.ID,
			ClassNumber:  seed.number,
			Title:        seed.title,
			Slug:         seed.slug,
			Description:  seed.description,
			DisplayOrder: index + 1,
		}
		if err := upsert(db, &class, "class_number = ?", class.ClassNumber); err != nil {
			return err
		}
		classesByNumber[class.ClassNumber] = class
	}

	for _, class := range classesByNumber {
		unitIDs := db.Model(&Unit{}).Select("id").Where("class_id = ?", class.ID)
		if err := db.Where("unit_id IN (?)", unitIDs).Delete(&Chapter{}).Error; err != nil {
			return err
		}
		if err := db.Where("class_id = ?", class.ID).Delete(&Unit{}).Error; err != nil {
			return err
		}
	}

	for _, seed := range schoolChapterSeeds {
		class := classesByNumber[seed.classNumber]
		unit := Unit{
			ClassID:      class.ID,
			Title:        seed.title,
			Slug:         seed.slug,
			Description:  seed.description,
			DisplayOrder: seed.order,
		}
		if err := upsert(db, &unit, "class_id = ? AND slug = ?", unit.ClassID, unit.Slug); err != nil {
			return err
		}

		chapter := Chapter{
			UnitID:       unit.ID,
			Title:        seed.title,
			Slug:         seed.slug,
			Description:  seed.description,
			DisplayOrder: seed.order,
		}
		if err := upsert(db, &chapter, "unit_id = ? AND slug = ?", chapter.UnitID, chapter.Slug); err != nil {
			return err
		}
	}
	return nil
}

func upsert[T any](db *gorm.DB, model *T, query string, args ...any) error {
	return db.Where(query, args...).Assign(model).FirstOrCreate(model).Error
}
