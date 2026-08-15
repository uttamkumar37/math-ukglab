package chapter

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
	router.GET("/chapters", handler.list)
	router.GET("/classes/:classNumber/chapters/:slug", handler.findByClassAndSlug)
	router.GET("/chapters/:slug", handler.findBySlug)
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
	chapters, err := handler.service.List(Filters{ClassNumber: classNumber, UnitSlug: c.Query("unit")})
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "CHAPTERS_LIST_FAILED", "Unable to load chapters")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": chapters})
}

func (handler *Handler) findBySlug(c *gin.Context) {
	chapter, err := handler.service.FindBySlug(c.Param("slug"))
	if errors.Is(err, ErrNotFound) {
		httpjson.NotFound(c, "CHAPTER_NOT_FOUND", "Chapter not found")
		return
	}
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "CHAPTER_LOAD_FAILED", "Unable to load chapter")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": chapter})
}

func (handler *Handler) findByClassAndSlug(c *gin.Context) {
	classNumber, err := strconv.Atoi(c.Param("classNumber"))
	if err != nil {
		httpjson.Error(c, http.StatusBadRequest, "INVALID_CLASS_NUMBER", "Class number must be numeric")
		return
	}
	chapter, err := handler.service.FindByClassAndSlug(classNumber, c.Param("slug"))
	if errors.Is(err, ErrNotFound) {
		httpjson.NotFound(c, "CHAPTER_NOT_FOUND", "Chapter not found")
		return
	}
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "CHAPTER_LOAD_FAILED", "Unable to load chapter")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": chapter})
}
