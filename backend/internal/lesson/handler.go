package lesson

import (
	"errors"
	"net/http"

	"math-ukglab/backend/internal/httpjson"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (handler *Handler) RegisterRoutes(router *gin.RouterGroup) {
	router.GET("/lessons/:slug", handler.findBySlug)
}

func (handler *Handler) findBySlug(c *gin.Context) {
	lesson, err := handler.service.FindBySlug(c.Param("slug"))
	if errors.Is(err, ErrNotFound) {
		httpjson.NotFound(c, "LESSON_NOT_FOUND", "Lesson not found")
		return
	}
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "LESSON_LOAD_FAILED", "Unable to load lesson")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": lesson})
}
