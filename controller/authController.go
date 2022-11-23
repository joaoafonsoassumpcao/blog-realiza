package controller

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/joaoafonsoassumpcao/blogrealiza/database"
	"github.com/joaoafonsoassumpcao/blogrealiza/models"
	util "github.com/joaoafonsoassumpcao/blogrealiza/utils"
)

func validateEmail(email string) bool {
	Re := regexp.MustCompile(`^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)
	return Re.MatchString(email)
}

func Register(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.User
	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Unable to parse body")

	}

	//check if password is greater than 6 characters
	if len(data["password"].(string)) < 6 {
		return c.Status(400).JSON(fiber.Map{
			"message": "A senha deve ser maior que 6 caracteres",
		})
	}

	//check if email is valid
	if !validateEmail(strings.TrimSpace(data["email"].(string))) {
		return c.Status(400).JSON(fiber.Map{
			"message": "Email inválido",
		})
	}

	// check if email already exists
	database.DB.Where("email=?", strings.TrimSpace(data["email"].(string))).First(&userData)
	if userData.ID != 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Email já cadastrado",
		})
	}

	// save user to database
	user := models.User{
		Nome:  data["nome"].(string),
		Email: strings.TrimSpace(data["email"].(string)),
	}

	user.SetPassword(data["password"].(string))
	err := database.DB.Create(&user).Error
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Não foi possível cadastrar o usuário",
		})
	}

	c.Response().Header.Set("Access-Control-Allow-Origin", "*")
	c.Status(201)

	return c.JSON(fiber.Map{
		"message": "Usuário cadastrado com sucesso",
		"user":    user,
	})

}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Unable to parse body",
		})
	}

	var user models.User

	database.DB.Where("email=?", data["email"]).First(&user)
	if user.ID == 0 {
		return c.Status(400).JSON(fiber.Map{
			"message": "Dados inválidos",
		})
	}

	if err := user.CheckPassword(data["password"]); !err {
		return c.Status(400).JSON(fiber.Map{
			"message": "Dados inválidos",
		})
	}

	token, err := util.GenerateJwt(strconv.Itoa(int(user.ID)))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Unable to generate token",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.Status(200).JSON(fiber.Map{
		"message": "Logado com sucesso", "user": user})

}

// function to clear cookies

func LogOut(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-24 * time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.Status(200).JSON(fiber.Map{
		"message": "Deslogado com sucesso",
	})
}

type Claims struct {
	jwt.StandardClaims
}
