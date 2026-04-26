package routes

import (
	"catetin-backend/internal/modules/auth/handler"

	"github.com/gofiber/fiber/v2"
)

// @Summary Health Check
// @Description Check if the API is running
// @Tags health
// @Accept json
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Router /health [get]
func HealthCheck(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "ok",
		"message": "Catetin API is running",
	})
}

func Setup(app *fiber.App, authHandler *handler.AuthHandler) {
	api := app.Group("/api/v1")

	authGroup := api.Group("/auth")
	authGroup.Post("/register", authHandler.Register).Name("auth.register")
	authGroup.Post("/login", authHandler.Login).Name("auth.login")
}
