package main

import (
	"github.com/labstack/echo/v4"
	"github.com/stneto1/banking-server/pkg/core"
	"github.com/stneto1/banking-server/pkg/handlers"
	"github.com/swaggo/echo-swagger"

	_ "github.com/stneto1/banking-server/docs"
)

//	@title			Banking API
//	@version		1.0
//	@description	This is a generic app
//	@termsOfService	http://swagger.io/terms/

//	@contact.name	API Support
//	@contact.url	https://stneto.dev
//	@contact.email	not@stneto.dev

//	@license.name	Apache 2.0
//	@license.url	http://www.apache.org/licenses/LICENSE-2.0.html

//	@host		localhost:1323
//	@BasePath	/

// @securityDefinitions.apiKey	ApiKeyAuth
// @in							header
// @name						Authorization
// @description				JWT token
func main() {
	conn := core.CreateDB()

	handlerContainer := handlers.CreateContainer(conn)

	app := echo.New()

	app.GET("/health", handlerContainer.HealthHandler)

	app.POST("/auth/register", handlerContainer.CreateUserHandler)
	app.POST("/auth/login", handlerContainer.LoginHandler)
	app.GET("/auth/profile", handlerContainer.ProfileHandler)

	app.GET("/swagger/*", echoSwagger.WrapHandler)

	app.Logger.Fatal(app.Start(":1323"))
}
