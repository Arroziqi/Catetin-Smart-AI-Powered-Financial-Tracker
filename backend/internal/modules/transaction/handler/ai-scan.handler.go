package handler

import (
	"catetin-backend/internal/modules/transaction/usecase"
	"io"

	"github.com/gofiber/fiber/v2"
)

type AIScanHandler struct {
	uc usecase.AIScanUsecase
}

func NewAIScanHandler(uc usecase.AIScanUsecase) *AIScanHandler {
	return &AIScanHandler{uc: uc}
}

// @Summary OCR receipt image
// @Description Upload image receipt and extract shopping data
// @Tags transactions
// @Accept multipart/form-data
// @Produce json
// @Security BearerAuth
// @Param file formData file true "Receipt image"
// @Success 200 {object} dto.ScanReceiptResponse
// @Failure 401 {object} map[string]interface{}
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/v1/transactions/scan [post]
func (h *AIScanHandler) Handle(c *fiber.Ctx) error {
	_, ok := c.Locals("user_id").(uint)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthorized",
		})
	}

	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "file is required",
		})
	}

	mimeType := file.Header.Get("Content-Type")

	f, err := file.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed open file",
		})
	}
	defer f.Close()

	imgBytes, err := io.ReadAll(f)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed read file",
		})
	}

	// Make sure context is properly passed
	result, raw, err := h.uc.Execute(c.Context(), imgBytes, mimeType)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
			"raw":     raw,
		})
	}

	// If the user's snippet result didn't have error but result is empty, we handle it if needed
	// Actually user script returned success directly

	return c.Status(fiber.StatusOK).JSON(result)
}
