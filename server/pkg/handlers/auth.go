package handlers

import (
	"github.com/labstack/echo/v4"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

//	Auth godoc
//
// @Summary	Authenticate user
// @Tags		auth
// @Consumes	json
// @Produce	json
// @Param		body	body		loginRequest	true	"User credentials"
// @Success	200		{object}	core.User
// @Router		/auth/login [post]
func (c *Container) LoginHandler(ctx echo.Context) error {
	req := new(loginRequest)
	if err := ctx.Bind(req); err != nil {
		return err
	}

	user, err := c.authContainer.AuthenticateUser(ctx.Request().Context(), req.Email, req.Password)
	if err != nil {
		return err
	}

	return ctx.JSON(200, user)
}

type createUserRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

//	Auth godoc
//
// @Summary	Create user
// @Tags		auth
// @Consumes	json
// @Produce	json
// @Param		body	body		createUserRequest	true	"User credentials"
// @Success	201		{object}	core.User
// @Router		/auth/register [post]
func (c *Container) CreateUserHandler(ctx echo.Context) error {
	req := new(createUserRequest)
	if err := ctx.Bind(req); err != nil {
		return err
	}

	user, err := c.authContainer.CreateUser(ctx.Request().Context(), req.Name, req.Email, req.Password)
	if err != nil {
		return err
	}

	return ctx.JSON(201, user)
}
