package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joaoafonsoassumpcao/blogrealiza/database"
	"github.com/joaoafonsoassumpcao/blogrealiza/routes"
	"github.com/joho/godotenv"
)

// type spaHandler struct {
// 	staticPath string
// 	indexPath  string
// }

// ServeHTTP inspects the URL path to locate a file within the static dir
// on the SPA handler. If a file is found, it will be served. If not, the
// file located at the index path on the SPA handler will be served. This
// is suitable behavior for serving an SPA (single page application).
// func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
// 	// get the absolute path to prevent directory traversal
// 	path, err := filepath.Abs(r.URL.Path)
// 	if err != nil {
// 		// if we failed to get the absolute path respond with a 400 bad request
// 		// and stop
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	// prepend the path with the path to the static directory
// 	path = filepath.Join(h.staticPath, path)

// 	// check whether a file exists at the given path
// 	_, err = os.Stat(path)
// 	if os.IsNotExist(err) {
// 		// file does not exist, serve index.html
// 		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
// 		return
// 	} else if err != nil {
// 		// if we got an error (that wasn't that the file doesn't exist) stating the
// 		// file, return a 500 internal server error and stop
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// otherwise, use http.FileServer to serve the static dir
// 	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
// }

// func startMux() {
// 	router := mux.NewRouter()

// 	spa := spaHandler{staticPath: "./blog-front/.next/server/pages/", indexPath: "index.html"}
// 	static := spaHandler{staticPath: "./blog-front/.next/static/", indexPath: "."}

// 	router.PathPrefix("/_next/static").Handler(static)
// 	router.PathPrefix("/post").Handler(spa)
// 	router.PathPrefix("/").Handler(spa)

// 	srv := &http.Server{
// 		Handler: router,
// 		Addr:    "127.0.0.1:3000",
// 		// Good practice: enforce timeouts for servers you create!
// 		WriteTimeout: 15 * time.Second,
// 		ReadTimeout:  15 * time.Second,
// 	}

// 	log.Fatal(srv.ListenAndServe())
// }

// func startMuxTLS() {

// 	router := mux.NewRouter()

// 	spa := spaHandler{staticPath: "./blog-front/build", indexPath: "index.html"}
// 	router.PathPrefix("/").Handler(spa)

// 	srv := &http.Server{
// 		Handler: router,
// 		Addr:    ":443",
// 		// Good practice: enforce timeouts for servers you create!
// 		WriteTimeout: 15 * time.Second,
// 		ReadTimeout:  15 * time.Second,
// 	}

// 	log.Fatal(srv.ListenAndServeTLS("/etc/letsencrypt/live/blog.faculdaderealiza.com.br/fullchain.pem", "/etc/letsencrypt/live/blog.faculdaderealiza.com.br/privkey.pem"))
// }

func main() {

	if os.Getenv("GOMODE") == "DEV" {
		err := godotenv.Load(".env.dev")
		// go startMux()
		if err != nil {
			log.Fatal("Error loading .env file")
		}

	} else {
		err := godotenv.Load(".env")
		// go startMuxTLS()
		if err != nil {
			log.Fatal("Error loading .env file")
		}

	}

	database.Connect()

	port := os.Getenv("PORT")
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://blog-realiza-front.vercel.app",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Use(logger.New())
	routes.Setup(app)
	if os.Getenv("GOMODE") == "DEV" {
		app.Listen(":" + port)
	} else {
		app.ListenTLS(":"+port, os.Getenv("CERTFILE"), os.Getenv("KEYFILE"))
	}
}
