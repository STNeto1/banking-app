package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/stneto1/banking-server/pkg/core"
)

type createInviteRequest struct {
	Email string `json:"email"`
}

// Create Invite godoc
//
//	@Summary	Create invite to a user
//	@Tags		invite
//	@Consumes	json
//	@Produce	json
//	@Param		body	body		createInviteRequest	true	"Invite params"
//	@Success	201		{object}	GenericSuccessResponse
//	@Failure	400		{object}	GenericErrorResponse
//	@Failure	500		{object}	GenericErrorResponse
//	@Router		/invites/create [post]
//
//	@Security	ApiKeyAuth
func (c *Container) CreateInviteHandler(ctx echo.Context) error {
	req := new(createInviteRequest)
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, GenericErrorResponse{
			Message: "Invalid request",
		})
	}

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

	_, err = c.inviteContainer.CreateInvite(ctx.Request().Context(), usr.ID, req.Email)
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

	return ctx.JSON(http.StatusCreated, GenericSuccessResponse{
		Message: "Invite created with success",
	})
}

// List sent invites godoc
//
//	@Summary	List user sent invites
//	@Tags		invite
//	@Produce	json
//	@Success	200	{object}	[]core.Invite
//	@Failure	400	{object}	GenericErrorResponse
//	@Failure	500	{object}	GenericErrorResponse
//	@Router		/invites/sent [get]
//
//	@Security	ApiKeyAuth
func (c *Container) ListSentInvitesHandler(ctx echo.Context) error {

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

	invites, err := c.inviteContainer.GetUserSentInvites(ctx.Request().Context(), usr.ID)
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

	return ctx.JSON(http.StatusOK, invites)
}

// List received invites godoc
//
//	@Summary	List user received invites
//	@Tags		invite
//	@Produce	json
//	@Success	200	{object}	[]core.Invite
//	@Failure	400	{object}	GenericErrorResponse
//	@Failure	500	{object}	GenericErrorResponse
//	@Router		/invites/received [get]
//
//	@Security	ApiKeyAuth
func (c *Container) ListReceivedInvitesHandler(ctx echo.Context) error {

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

	invites, err := c.inviteContainer.GetUserReceivedInvites(ctx.Request().Context(), usr.ID)
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

	return ctx.JSON(http.StatusOK, invites)
}

// Cancel invite godoc
//
//	@Summary	Cancel an user sent invite
//	@Tags		invite
//	@Produce	json
//
//	@Param		id	path		string	true	"Invite ID"
//
//	@Success	204	{object}	nil
//	@Failure	400	{object}	GenericErrorResponse
//	@Failure	500	{object}	GenericErrorResponse
//	@Router		/invites/cancel/{id} [post]
//
//	@Security	ApiKeyAuth
func (c *Container) CancelInviteHandler(ctx echo.Context) error {

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

	inviteID := ctx.Param("id")

	if err := c.inviteContainer.CancelInvite(ctx.Request().Context(), usr.ID, inviteID); err != nil {
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
