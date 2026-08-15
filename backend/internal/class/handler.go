package class

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
	router.GET("/classes", handler.list)
	router.GET("/classes/:classNumber", handler.findByNumber)
}

func (handler *Handler) list(c *gin.Context) {
	classes, err := handler.service.List()
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "CLASSES_LIST_FAILED", "Unable to load classes")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": classes})
}

func (handler *Handler) findByNumber(c *gin.Context) {
	classNumber, err := strconv.Atoi(c.Param("classNumber"))
	if err != nil {
		httpjson.Error(c, http.StatusBadRequest, "INVALID_CLASS_NUMBER", "Class number must be numeric")
		return
	}
	class, err := handler.service.FindByNumber(classNumber)
	if errors.Is(err, ErrNotFound) {
		httpjson.NotFound(c, "CLASS_NOT_FOUND", "Class not found")
		return
	}
	if err != nil {
		httpjson.Error(c, http.StatusInternalServerError, "CLASS_LOAD_FAILED", "Unable to load class")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": class})
}
