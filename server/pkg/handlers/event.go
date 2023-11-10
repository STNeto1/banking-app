package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/shopspring/decimal"
	"github.com/stneto1/banking-server/pkg/core"
)

// List user events godoc
//
//	@Summary	List user events
//	@Tags		event
//	@Produce	json
//	@Success	200	{object}	[]core.Event
//	@Failure	400	{object}	GenericErrorResponse
//	@Failure	500	{object}	GenericErrorResponse
//	@Router		/events/list [get]
//
//	@Security	ApiKeyAuth
func (c *Container) ListUserEventsHandler(ctx echo.Context) error {

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

	events, err := c.eventContainer.ListUserEvents(ctx.Request().Context(), usr.ID)
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

	return ctx.JSON(http.StatusOK, events)
}

type createEventRequest struct {
	Amount float64 `json:"amount"`
}

// Create Deposit godoc
//
//	@Summary	Create deposit for the user
//	@Tags		event
//	@Consumes	json
//	@Produce	json
//	@Param		body	body		createEventRequest	true	"Event params"
//	@Success	201		{object}	GenericSuccessResponse
//	@Failure	400		{object}	GenericErrorResponse
//	@Failure	500		{object}	GenericErrorResponse
//	@Router		/events/deposit [post]
//
//	@Security	ApiKeyAuth
func (c *Container) CreateDepositHandler(ctx echo.Context) error {
	req := new(createEventRequest)
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

	err = c.eventContainer.CreateDepositEvent(ctx.Request().Context(), usr.ID, decimal.NewFromFloat(req.Amount))
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

	return ctx.JSON(http.StatusCreated, nil)
}

// Create Withdraw godoc
//
//	@Summary	Create withdraw for the user
//	@Tags		event
//	@Consumes	json
//	@Produce	json
//	@Param		body	body		createEventRequest	true	"Event params"
//	@Success	201		{object}	GenericSuccessResponse
//	@Failure	400		{object}	GenericErrorResponse
//	@Failure	500		{object}	GenericErrorResponse
//	@Router		/events/withdraw [post]
//
//	@Security	ApiKeyAuth
func (c *Container) CreateWithdrawHandler(ctx echo.Context) error {
	req := new(createEventRequest)
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

	err = c.eventContainer.CreateWithdrawalEvent(ctx.Request().Context(), usr.ID, decimal.NewFromFloat(req.Amount))
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

	return ctx.JSON(http.StatusCreated, nil)
}
