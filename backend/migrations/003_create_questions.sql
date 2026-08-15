DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'course_type') THEN
    CREATE TYPE course_type AS ENUM ('SCHOOL', 'JEE_MAIN', 'JEE_ADVANCED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question_difficulty') THEN
    CREATE TYPE question_difficulty AS ENUM ('SIMPLE', 'MEDIUM', 'HARD');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question_type') THEN
    CREATE TYPE question_type AS ENUM ('MCQ', 'NUMERICAL', 'SHORT_ANSWER', 'LONG_ANSWER');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  course_type course_type NOT NULL DEFAULT 'SCHOOL',
  difficulty question_difficulty NOT NULL,
  question_type question_type NOT NULL,
  question_text text NOT NULL,
  approach text NOT NULL DEFAULT '',
  final_answer text NOT NULL DEFAULT '',
  explanation text NOT NULL DEFAULT '',
  alternative_methods text NOT NULL DEFAULT '',
  common_mistakes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_topic_id ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_course_type ON questions(course_type);

CREATE TABLE IF NOT EXISTS question_hints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  hint_order integer NOT NULL,
  hint_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT question_hints_unique_order UNIQUE (question_id, hint_order)
);

CREATE TABLE IF NOT EXISTS question_solution_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  step_order integer NOT NULL,
  step_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT question_solution_steps_unique_order UNIQUE (question_id, step_order)
);
