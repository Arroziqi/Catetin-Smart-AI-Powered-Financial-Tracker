package domain

import (
	"time"
)

type Item struct {
	Name  string  `json:"name" example:"Aqua 600ml"`
	Qty   int     `json:"qty" example:"2"`
	Price float64 `json:"price" example:"4000"`
}

type Transaction struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `json:"user_id"`
	Type      string    `json:"type"` // income | expense
	Category  string    `json:"category"`
	Note      string    `json:"note"`
	StoreName string    `json:"store_name" example:"Alfamart"`
	Date      string    `json:"date" example:"2026-04-26"`
	Items     []Item    `gorm:"serializer:json" json:"items"`
	Subtotal  float64   `json:"subtotal" example:"8000"`
	Tax       float64   `json:"tax" example:"0"`
	Total     float64   `json:"total" example:"8000"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
