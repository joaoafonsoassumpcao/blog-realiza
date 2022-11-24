package controller

import (
	"math/rand"
	"os"

	"github.com/gofiber/fiber/v2"
)

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randomString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func Upload(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return err
	}
	files := form.File["image"]
	fileName := ""

	for _, file := range files {
		fileName = randomString(5) + "-" + file.Filename
		if err := c.SaveFile(file, "./uploads/"+fileName); err != nil {
			return err
		}

	}
	c.Response().Header.Set("Access-Control-Allow-Origin", "*")

	url := ""

	if os.Getenv("GOMODE") == "DEV" {
		url = "http://localhost:3030/api/uploads/"
	} else {
		url = "https://blog.faculdaderealiza.com.br:3030/api/uploads"
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "File uploaded successfully",
		"file":    fileName,
		"url":     url + fileName,
	})
}
