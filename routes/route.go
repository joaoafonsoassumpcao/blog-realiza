package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/joaoafonsoassumpcao/blogrealiza/controller"
	"github.com/joaoafonsoassumpcao/blogrealiza/middleware"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)
	app.Get("/api/allposts", controller.GetAllPosts)
	app.Get("/api/post/:id", controller.GetPost)
	app.Get("/api/allposts/:category", controller.GetAllPosts)
	app.Get("api/uniquepost/:id", controller.UniquePost)
	app.Static("/api/uploads", "./uploads")
	app.Use(middleware.IsAuthenticated)
	app.Post("/api/logout", controller.LogOut)
	app.Post("/api/post", controller.CreatePost)
	app.Put("/api/updatepost/:id", controller.UpdatePost)
	app.Delete("/api/deletepost/:id", controller.DeletePost)
	app.Post("/api/uploads", controller.Upload)

}
