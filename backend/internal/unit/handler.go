package unit

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
	router.GET("/classes/:classNumber/units", handler.listByClass)
	router.GET("/classes/:classNumber/units/:slug", handler.findByClassAndSlug)
	router.GET("/units/:slug", handler.findBySlug)
}

func (handler *Handler) listByClass(c *gin.Context) {
	classNumber, err := strconv.Atoi(c.Param("classNumber"))
	if err != nil {
		httpjson.Error(c, http.StatusBadRequest, "INVALID_CLASS_NUMBER", "Class number must be numeric")
		return
	}
	units, err := handler.service.ListByClass(classNumber)
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "UNITS_LIST_FAILED", "Unable to load units")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": units})
}

func (handler *Handler) findBySlug(c *gin.Context) {
	unit, err := handler.service.FindBySlug(c.Param("slug"))
	if errors.Is(err, ErrNotFound) {
		httpjson.NotFound(c, "UNIT_NOT_FOUND", "Unit not found")
		return
	}
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "UNIT_LOAD_FAILED", "Unable to load unit")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": unit})
}

func (handler *Handler) findByClassAndSlug(c *gin.Context) {
	classNumber, err := strconv.Atoi(c.Param("classNumber"))
	if err != nil {
		httpjson.Error(c, http.StatusBadRequest, "INVALID_CLASS_NUMBER", "Class number must be numeric")
		return
	}
	unit, err := handler.service.FindByClassAndSlug(classNumber, c.Param("slug"))
	if errors.Is(err, ErrNotFound) {
		httpjson.NotFound(c, "UNIT_NOT_FOUND", "Unit not found")
		return
	}
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "UNIT_LOAD_FAILED", "Unable to load unit")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": unit})
}
