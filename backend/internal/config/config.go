package config

import (
	"errors"
	"os"
	"strings"
)

type Config struct {
	AppEnv             string
	Port               string
	DatabaseURL        string
	JWTSecret          string
	CORSAllowedOrigins []string
	AutoMigrate        bool
	SeedDatabase       bool
}

func Load() (Config, error) {
	cfg := Config{
		AppEnv:             value("APP_ENV", "development"),
		Port:               value("PORT", "8080"),
		DatabaseURL:        value("DATABASE_URL", "postgres://math:math@localhost:5432/math_ukglab?sslmode=disable"),
		JWTSecret:          value("JWT_SECRET", "dev-only-change-me"),
		CORSAllowedOrigins: split(value("CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,https://math.ukglab.com")),
		AutoMigrate:        boolValue("APP_AUTO_MIGRATE", true),
		SeedDatabase:       boolValue("APP_SEED_DATABASE", true),
	}

	if cfg.DatabaseURL == "" {
		return Config{}, errors.New("DATABASE_URL is required")
	}
	if cfg.AppEnv == "production" && cfg.JWTSecret == "dev-only-change-me" {
		return Config{}, errors.New("JWT_SECRET must be set in production")
	}
	return cfg, nil
}

func value(key string, fallback string) string {
	if found := strings.TrimSpace(os.Getenv(key)); found != "" {
		return found
	}
	return fallback
}

func boolValue(key string, fallback bool) bool {
	raw := strings.ToLower(strings.TrimSpace(os.Getenv(key)))
	if raw == "" {
		return fallback
	}
	return raw == "1" || raw == "true" || raw == "yes"
}

func split(raw string) []string {
	parts := strings.Split(raw, ",")
	values := make([]string, 0, len(parts))
	for _, part := range parts {
		trimmed := strings.TrimSpace(part)
		if trimmed != "" {
			values = append(values, trimmed)
		}
	}
	return values
}
