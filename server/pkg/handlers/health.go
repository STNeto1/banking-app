package handlers

import "github.com/labstack/echo/v4"

// Health godoc
//
//	@Summary	Show health status
//	@Tags		system
//	@Produce	json
//	@Success	200	{object}	HealthResponse
//	@Router		/health [get]
func (c *Container) HealthHandler(ctx echo.Context) error {
	var health bool
	err := c.connection.QueryRow("SELECT true").Scan(&health)

	return ctx.JSON(200, HealthResponse{
		Database: err == nil && health,
	})
}
