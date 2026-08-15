package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"time"

	chapterapi "math-ukglab/backend/internal/chapter"
	classapi "math-ukglab/backend/internal/class"
	"math-ukglab/backend/internal/config"
	"math-ukglab/backend/internal/database"
	lessonapi "math-ukglab/backend/internal/lesson"
	"math-ukglab/backend/internal/middleware"
	questionapi "math-ukglab/backend/internal/question"
	topicapi "math-ukglab/backend/internal/topic"
	unitapi "math-ukglab/backend/internal/unit"

	"github.com/gin-gonic/gin"
)

func main() {
	log := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	cfg, err := config.Load()
	if err != nil {
		log.Error("config_load_failed", "error", err)
		os.Exit(1)
	}
	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if cfg.AutoMigrate {
		if err := database.ApplyMigrations(ctx, cfg.DatabaseURL, "migrations"); err != nil {
			log.Error("migration_failed", "error", err)
			os.Exit(1)
		}
	}

	db, err := database.Open(cfg.DatabaseURL)
	if err != nil {
		log.Error("database_connection_failed", "error", err)
		os.Exit(1)
	}
	if cfg.SeedDatabase && cfg.AppEnv != "production" {
		if err := database.SeedDevelopmentData(db); err != nil {
			log.Error("seed_failed", "error", err)
			os.Exit(1)
		}
	}

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(middleware.RequestID())
	router.Use(middleware.Logger(log))
	router.Use(middleware.CORS(cfg.CORSAllowedOrigins))

	api := router.Group("/api/v1")
	api.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	classService := classapi.NewService(classapi.NewRepository(db))
	classapi.NewHandler(classService).RegisterRoutes(api)

	unitService := unitapi.NewService(unitapi.NewRepository(db))
	unitapi.NewHandler(unitService).RegisterRoutes(api)

	chapterService := chapterapi.NewService(chapterapi.NewRepository(db))
	chapterapi.NewHandler(chapterService).RegisterRoutes(api)

	topicService := topicapi.NewService(topicapi.NewRepository(db))
	topicapi.NewHandler(topicService).RegisterRoutes(api)

	lessonService := lessonapi.NewService(lessonapi.NewRepository(db))
	lessonapi.NewHandler(lessonService).RegisterRoutes(api)

	questionService := questionapi.NewService(questionapi.NewRepository(db))
	questionapi.NewHandler(questionService).RegisterRoutes(api)

	router.StaticFile("/swagger/openapi.yaml", "docs/openapi.yaml")
	router.GET("/swagger/index.html", func(c *gin.Context) {
		c.Header("Content-Type", "text/html; charset=utf-8")
		c.String(http.StatusOK, swaggerHTML)
	})

	address := fmt.Sprintf(":%s", cfg.Port)
	log.Info("server_starting", "address", address, "env", cfg.AppEnv)
	if err := router.Run(address); err != nil {
		log.Error("server_failed", "error", err)
		os.Exit(1)
	}
}

const swaggerHTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Math by UKG Lab API</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body { font-family: ui-sans-serif, system-ui, sans-serif; margin: 2rem; color: #111827; }
      main { max-width: 760px; }
      code { background: #eef2ff; padding: .15rem .35rem; border-radius: .35rem; }
      a { color: #0f766e; font-weight: 700; }
    </style>
  </head>
  <body>
    <main>
      <h1>Math by UKG Lab API</h1>
      <p>The OpenAPI document is available at <a href="/swagger/openapi.yaml">/swagger/openapi.yaml</a>.</p>
      <p>Use this with Swagger UI, Redoc, or an API client. Core local base URL: <code>http://localhost:8080/api/v1</code>.</p>
    </main>
  </body>
</html>`
