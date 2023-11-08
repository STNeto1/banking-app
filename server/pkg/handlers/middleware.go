package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/stneto1/banking-server/pkg/core"
)

func UserMiddleware(authContainer *core.AuthContainer) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(ctx echo.Context) error {
			token := ctx.Request().Header.Get("Authorization")
			if token == "" {
				return ctx.JSON(http.StatusUnauthorized, GenericErrorResponse{
					Message: "Unauthorized",
				})
			}

			sub, err := authContainer.UseUserID(token)
			if err != nil {
				return ctx.JSON(http.StatusUnauthorized, GenericErrorResponse{
					Message: "Unauthorized",
				})
			}

			ctx.Set("sub", sub)

			return next(ctx)
		}
	}
}
