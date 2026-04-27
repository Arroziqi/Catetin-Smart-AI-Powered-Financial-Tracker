package usecase

import (
	"catetin-backend/internal/modules/transaction/domain"
	"catetin-backend/internal/modules/transaction/dto"
	"catetin-backend/internal/modules/transaction/repository"
)

type CreateTransactionUsecase interface {
	Execute(userID uint, req dto.CreateTransactionRequest) error
}

type createTransactionUsecase struct {
	repo repository.ITransactionRepository
}

func NewCreateTransactionUsecase(repo repository.ITransactionRepository) CreateTransactionUsecase {
	return &createTransactionUsecase{repo: repo}
}

func (u *createTransactionUsecase) Execute(userID uint, req dto.CreateTransactionRequest) error {
	var items []domain.Item
	for _, item := range req.Items {
		items = append(items, domain.Item{
			Name:  item.Name,
			Qty:   item.Qty,
			Price: item.Price,
		})
	}

	transaction := domain.Transaction{
		UserID:    userID,
		Type:      req.Type,
		Category:  req.Category,
		Note:      req.Note,
		StoreName: req.StoreName,
		Date:      req.Date,
		Items:     items,
		Subtotal:  req.Subtotal,
		Tax:       req.Tax,
		Total:     req.Total,
	}

	return u.repo.Create(transaction)
}
