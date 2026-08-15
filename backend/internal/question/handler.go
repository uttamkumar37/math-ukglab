package question

import (
	"errors"
	"net/http"
	"strconv"

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
	router.GET("/questions", handler.list)
	router.GET("/questions/:slug", handler.findBySlug)
}

func (handler *Handler) list(c *gin.Context) {
	classNumber := 0
	if raw := c.Query("class"); raw != "" {
		value, err := strconv.Atoi(raw)
		if err != nil {
			httpjson.Error(c, http.StatusBadRequest, "INVALID_CLASS_FILTER", "Class filter must be numeric")
			return
		}
		classNumber = value
	}
	questions, err := handler.service.List(Filters{
		ClassNumber: classNumber,
		TopicSlug:   c.Query("topic"),
		Difficulty:  c.Query("difficulty"),
	})
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "QUESTIONS_LIST_FAILED", "Unable to load questions")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": questions})
}

func (handler *Handler) findBySlug(c *gin.Context) {
	question, err := handler.service.FindBySlug(c.Param("slug"))
	if errors.Is(err, ErrNotFound) {
		httpjson.NotFound(c, "QUESTION_NOT_FOUND", "Question not found")
		return
	}
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "QUESTION_LOAD_FAILED", "Unable to load question")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": question})
}
