package httpjson

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ErrorBody struct {
	Error ErrorDetail `json:"error"`
}

type ErrorDetail struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func Error(c *gin.Context, status int, code string, message string) {
	c.JSON(status, ErrorBody{Error: ErrorDetail{Code: code, Message: message}})
}

func NotFound(c *gin.Context, code string, message string) {
	Error(c, http.StatusNotFound, code, message)
}
