package controller

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/joaoafonsoassumpcao/blogrealiza/database"
	"github.com/joaoafonsoassumpcao/blogrealiza/models"
	util "github.com/joaoafonsoassumpcao/blogrealiza/utils"
	"gorm.io/gorm"
)

func CreatePost(c *fiber.Ctx) error {
	var blogPost models.Blog
	if err := c.BodyParser(&blogPost); err != nil {
		fmt.Println("Error: ", err)
	}

	if err := database.DB.Create(&blogPost).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid payload",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Post created",
	})

}

// func to get all posts that accepts a category parameter
func GetAllPosts(c *fiber.Ctx) error {
	category := c.Params("category")
	var getBlog []models.Blog
	if category == "" {
		database.DB.Preload("User").Order("id DESC").Find(&getBlog)
	} else {
		database.DB.Where("category = ?", category).Preload("User").Order("id DESC").Find(&getBlog)
	}

	//c.Response().Header.Set("Access-Control-Allow-Origin", "*")

	return c.Status(200).JSON(fiber.Map{
		"data": getBlog,
	})
}

func GetPost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var getBlog models.Blog
	database.DB.Where("id = ?", id).Preload("User").First(&getBlog)

	return c.Status(200).JSON(fiber.Map{
		"data": getBlog,
	})
}

func UpdatePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	blog := models.Blog{
		ID: uint(id),
	}

	if err := c.BodyParser(&blog); err != nil {
		fmt.Println("Error: ", err)
	}

	database.DB.Model(&blog).Updates(blog)

	return c.Status(200).JSON(fiber.Map{
		"message": "Post updated",
	})
}

func UniquePost(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	id, _ := util.ParseJwt(cookie)
	var getBlog []models.Blog
	database.DB.Model(&models.Blog{}).Where("user_id = ?", id).Preload("User").Find(&getBlog)

	return c.Status(200).JSON(fiber.Map{
		"data": getBlog,
	})

}

func DeletePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	blog := models.Blog{
		ID: uint(id),
	}

	deleteQuery := database.DB.Delete(&blog)
	if errors.Is(deleteQuery.Error, gorm.ErrRecordNotFound) {
		return c.Status(404).JSON(fiber.Map{
			"message": "Post not found",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Post deleted",
	})
}
