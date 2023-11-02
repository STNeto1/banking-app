package handlers

type HealthResponse struct {
	Database bool `json:"database"`
}
