package middleware

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
	util "github.com/joaoafonsoassumpcao/blogrealiza/utils"
)

func IsAuthenticated(c *fiber.Ctx) error {
	bearerToken := c.Get("Authorization")

	onlyToken := strings.Split(bearerToken, " ")
	fmt.Println("only token", onlyToken)

	if len(onlyToken) > 1 {
		if _, err := util.ParseJwt(onlyToken[1]); err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Unauthorized",
			})
		}
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	return c.Next()
}
