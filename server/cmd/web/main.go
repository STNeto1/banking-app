package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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

	authContainer := core.NewAuthContainer(conn)
	handlerContainer := handlers.CreateContainer(conn)

	app := echo.New()

	app.Use(middleware.Recover(), middleware.Logger())

	app.GET("/health", handlerContainer.HealthHandler)

	app.POST("/auth/register", handlerContainer.CreateUserHandler)
	app.POST("/auth/login", handlerContainer.LoginHandler)
	app.GET("/auth/profile", handlerContainer.ProfileHandler, handlers.UserMiddleware(authContainer))

	app.POST("/invites/create", handlerContainer.CreateInviteHandler, handlers.UserMiddleware(authContainer))
	app.GET("/invites/sent", handlerContainer.ListSentInvitesHandler, handlers.UserMiddleware(authContainer))
	app.GET("/invites/received", handlerContainer.ListReceivedInvitesHandler, handlers.UserMiddleware(authContainer))
	app.POST("/invites/cancel/:id", handlerContainer.CancelInviteHandler, handlers.UserMiddleware(authContainer))
	app.POST("/invites/accept/:id", handlerContainer.AcceptInviteHandler, handlers.UserMiddleware(authContainer))
	app.POST("/invites/reject/:id", handlerContainer.RejectInviteHandler, handlers.UserMiddleware(authContainer))

	app.GET("/friends/list", handlerContainer.ListFriendsHandler, handlers.UserMiddleware(authContainer))
	app.POST("/friends/remove/:id", handlerContainer.RemoveFriendHandler, handlers.UserMiddleware(authContainer))

	app.GET("/swagger/*", echoSwagger.WrapHandler)

	app.Logger.Fatal(app.Start(":1323"))
}
