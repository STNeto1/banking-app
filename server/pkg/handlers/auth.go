package handlers

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/stneto1/banking-server/pkg/core"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Auth godoc
//
// @Summary	Authenticate user
// @Tags		auth
// @Consumes	json
// @Produce	json
// @Param		body	body		loginRequest	true	"User credentials"
// @Success	201		{object}	AuthResponse
// @Failure	400		{object}	GenericErrorResponse
// @Failure	500		{object}	GenericErrorResponse
// @Router		/auth/login [post]
func (c *Container) LoginHandler(ctx echo.Context) error {
	req := new(loginRequest)
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: "Invalid request",
		})
	}

	user, err := c.authContainer.AuthenticateUser(ctx.Request().Context(), req.Email, req.Password)
	if err != nil {
		if err == core.ErrInternalError {
			log.Println("error authenticating", err)
			return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
				Message: "Internal error",
			})

		}

		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: err.Error(),
		})
	}

	token, err := c.authContainer.CreateToken(user)
	if err != nil {
		log.Println("error creating token", err)
		return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
			Message: "Internal error",
		})
	}

	return ctx.JSON(http.StatusCreated, AuthResponse{
		Token: token,
	})
}

type createUserRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Auth godoc
//
// @Summary	Create user
// @Tags		auth
// @Consumes	json
// @Produce	json
// @Param		body	body		createUserRequest	true	"User credentials"
// @Success	201		{object}	AuthResponse
// @Failure	400		{object}	GenericErrorResponse
// @Failure	500		{object}	GenericErrorResponse
// @Router		/auth/register [post]
func (c *Container) CreateUserHandler(ctx echo.Context) error {
	req := new(createUserRequest)
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: "Invalid request",
		})
	}

	user, err := c.authContainer.CreateUser(ctx.Request().Context(), req.Name, req.Email, req.Password)
	if err != nil {
		if err == core.ErrInternalError {
			log.Println("error creating user", err)
			return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
				Message: "Internal error",
			})

		}

		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: err.Error(),
		})
	}

	token, err := c.authContainer.CreateToken(user)
	if err != nil {
		log.Println("error creating token", err)
		return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
			Message: "Internal error",
		})
	}

	return ctx.JSON(http.StatusCreated, AuthResponse{
		Token: token,
	})
}

// Auth godoc
//
// @Summary	User profile
// @Tags		auth
// @Produce	json
// @Success	200	{object}	core.User
// @Failure	400	{object}	GenericErrorResponse
// @Failure	401	{object}	GenericErrorResponse
// @Failure	500 {object}	GenericErrorResponse
// @Router		/auth/profile [get]
// @Security	ApiKeyAuth
func (c *Container) ProfileHandler(ctx echo.Context) error {
	usr, err := c.authContainer.UseUser(ctx)
	if err != nil {
		if err == core.ErrInternalError {
			log.Println("error getting user", err)
			return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
				Message: "Internal error",
			})
		}

		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: err.Error(),
		})
	}

	return ctx.JSON(http.StatusOK, usr)
}
