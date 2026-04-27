package dto

type ItemDTO struct {
	Name  string  `json:"name" validate:"required"`
	Qty   int     `json:"qty" validate:"required,min=1"`
	Price float64 `json:"price" validate:"required,min=0"`
}

type CreateTransactionRequest struct {
	Type      string    `json:"type" validate:"required"` // income | expense
	Category  string    `json:"category" validate:"required"`
	Note      string    `json:"note"`
	StoreName string    `json:"store_name"`
	Date      string    `json:"date" validate:"required"` // YYYY-MM-DD
	Items     []ItemDTO `json:"items" validate:"dive"`
	Subtotal  float64   `json:"subtotal"`
	Tax       float64   `json:"tax"`
	Total     float64   `json:"total" validate:"required"`
}

type UpdateTransactionRequest struct {
	Type      string    `json:"type" validate:"required"`
	Category  string    `json:"category" validate:"required"`
	Note      string    `json:"note"`
	StoreName string    `json:"store_name"`
	Date      string    `json:"date" validate:"required"` // YYYY-MM-DD
	Items     []ItemDTO `json:"items" validate:"dive"`
	Subtotal  float64   `json:"subtotal"`
	Tax       float64   `json:"tax"`
	Total     float64   `json:"total" validate:"required"`
}

type GetTransactionQuery struct {
	Page      int    `query:"page"`
	Limit     int    `query:"limit"`
	Category  string `query:"category"`
	Type      string `query:"type"`
	StartDate string `query:"start_date"`
	EndDate   string `query:"end_date"`
}

type ScanReceiptResponse struct {
	StoreName string    `json:"store_name" example:"Alfamart"`
	Date      string    `json:"date" example:"2026-04-26"`
	Items     []ItemDTO `json:"items"`
	Subtotal  float64   `json:"subtotal" example:"8000"`
	Tax       float64   `json:"tax" example:"0"`
	Total     float64   `json:"total" example:"8000"`
}
