package database

import (
	"log"
	"os"

	"github.com/joaoafonsoassumpcao/blogrealiza/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	dsn := os.Getenv("DSN")
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	} else {
		log.Println("Database connected")
	}

	DB = database
	database.AutoMigrate(
		&models.User{},
		&models.Blog{},
	)

}
