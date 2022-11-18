package middleware

import (
	"github.com/gofiber/fiber/v2"
	util "github.com/joaoafonsoassumpcao/blogrealiza/utils"
)

func IsAuthenticated(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	if _, err := util.ParseJwt(cookie); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Next()
}
