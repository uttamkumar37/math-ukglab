package topic

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
	router.GET("/topics", handler.list)
	router.GET("/topics/:slug", handler.findBySlug)
}

func (handler *Handler) list(c *gin.Context) {
	topics, err := handler.service.List()
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "TOPICS_LIST_FAILED", "Unable to load topics")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": topics})
}

func (handler *Handler) findBySlug(c *gin.Context) {
	topic, err := handler.service.FindBySlug(c.Param("slug"))
	if errors.Is(err, ErrNotFound) {
		httpjson.NotFound(c, "TOPIC_NOT_FOUND", "Topic not found")
		return
	}
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "TOPIC_LOAD_FAILED", "Unable to load topic")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": topic})
}
