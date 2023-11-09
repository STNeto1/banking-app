package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/stneto1/banking-server/pkg/core"
)

// List friends godoc
//
//	@Summary	List user friends
//	@Tags		friend
//	@Produce	json
//	@Success	200	{object}	[]core.User
//	@Failure	400	{object}	GenericErrorResponse
//	@Failure	500	{object}	GenericErrorResponse
//	@Router		/friends/list [get]
//
//	@Security	ApiKeyAuth
func (c *Container) ListFriendsHandler(ctx echo.Context) error {

	usr, err := c.authContainer.UseUser(ctx)
	if err != nil {
		if err == core.ErrInternalError {
			return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
				Message: "Internal error",
			})
		}

		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: err.Error(),
		})
	}

	friends, err := c.friendContainer.GetFriends(ctx.Request().Context(), usr.ID)
	if err != nil {
		if err == core.ErrInternalError {
			return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
				Message: "Internal error",
			})
		}

		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: err.Error(),
		})
	}

	return ctx.JSON(http.StatusOK, friends)
}

// Remove friend godoc
//
//	@Summary	Remove friend
//	@Tags		friend
//	@Produce	json
//
//	@Param		id	path		string	true	"Friend ID"
//
//	@Success	204	{object}	nil
//	@Failure	400	{object}	GenericErrorResponse
//	@Failure	500	{object}	GenericErrorResponse
//	@Router		/friends/remove/{id} [post]
//
//	@Security	ApiKeyAuth
func (c *Container) RemoveFriendHandler(ctx echo.Context) error {

	usr, err := c.authContainer.UseUser(ctx)
	if err != nil {
		if err == core.ErrInternalError {
			return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
				Message: "Internal error",
			})
		}

		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: err.Error(),
		})
	}

	friendID := ctx.Param("id")

	if err := c.friendContainer.DeleteFriend(ctx.Request().Context(), usr.ID, friendID); err != nil {
		if err == core.ErrInternalError {
			return ctx.JSON(http.StatusInternalServerError, GenericErrorResponse{
				Message: "Internal error",
			})
		}

		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: err.Error(),
		})
	}

	return ctx.JSON(http.StatusNoContent, nil)
}
