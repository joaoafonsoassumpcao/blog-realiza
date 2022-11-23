package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joaoafonsoassumpcao/blogrealiza/database"
	"github.com/joaoafonsoassumpcao/blogrealiza/routes"
	"github.com/joho/godotenv"
)

func main() {

	if os.Getenv("GOMODE") == "DEV" {
		err := godotenv.Load(".env.dev")

		if err != nil {
			log.Fatal("Error loading .env file")
		}
	} else {
		err := godotenv.Load(".env")

		if err != nil {
			log.Fatal("Error loading .env file")
		}

	}

	database.Connect()

	port := os.Getenv("PORT")
	app := fiber.New()
	app.Use(cors.New())
	routes.Setup(app)
	if os.Getenv("GOMODE") == "DEV" {
		app.Listen(":" + port)
	} else {

		app.ListenTLS(":"+port, os.Getenv("CERTFILE"), os.Getenv("KEYFILE"))
	}

}
