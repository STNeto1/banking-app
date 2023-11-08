package handlers

type HealthResponse struct {
	Database bool `json:"database"`
}

type AuthResponse struct {
	Token string `json:"token"`
}

type GenericErrorResponse struct {
	Message string `json:"message"`
}

type GenericSuccessResponse struct {
	Message string `json:"message"`
}
