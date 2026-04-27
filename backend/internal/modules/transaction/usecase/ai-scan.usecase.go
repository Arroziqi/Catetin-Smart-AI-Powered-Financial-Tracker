package usecase

import (
	"context"
	"encoding/json"
	"os"
	"regexp"
	"strings"

	"catetin-backend/internal/modules/transaction/dto"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type AIScanUsecase interface {
	Execute(ctx context.Context, imgBytes []byte, mimeType string) (dto.ScanReceiptResponse, string, error)
}

type aiScanUsecase struct{}

func NewAIScanUsecase() AIScanUsecase {
	return &aiScanUsecase{}
}

func (u *aiScanUsecase) Execute(ctx context.Context, img []byte, mimeType string) (dto.ScanReceiptResponse, string, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		return dto.ScanReceiptResponse{}, "", err
	}
	defer client.Close()

	prompt := `
	You are OCR receipt extractor.

	Analyze this image and return ONLY valid JSON.
	No markdown.
	No explanation.
	No triple backticks.

	{
	"store_name": "",
	"date": "",
	"items": [
		{
		"name": "",
		"qty": 1,
		"price": 0
		}
	],
	"subtotal": 0,
	"tax": 0,
	"total": 0
	}
	`

	model := client.GenerativeModel("gemini-2.5-flash")

	format := strings.TrimPrefix(mimeType, "image/")
	resp, err := model.GenerateContent(
		ctx,
		genai.Text(prompt),
		genai.ImageData(format, img),
	)

	if err != nil {
		return dto.ScanReceiptResponse{}, "", err
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return dto.ScanReceiptResponse{}, "", nil
	}

	raw := ""
	if part, ok := resp.Candidates[0].Content.Parts[0].(genai.Text); ok {
		raw = string(part)
	}

	clean := cleanJSON(raw)

	var receipt dto.ScanReceiptResponse
	err = json.Unmarshal([]byte(clean), &receipt)
	if err != nil {
		return dto.ScanReceiptResponse{}, raw, err
	}

	return receipt, raw, nil
}

func cleanJSON(s string) string {
	s = strings.TrimSpace(s)

	s = strings.TrimPrefix(s, "```json")
	s = strings.TrimPrefix(s, "```")
	s = strings.TrimSuffix(s, "```")

	re := regexp.MustCompile(`(?s)\{.*\}`)
	match := re.FindString(s)
	if match != "" {
		return match
	}

	return s
}
