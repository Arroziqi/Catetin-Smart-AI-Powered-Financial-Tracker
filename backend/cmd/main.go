package main

import (
	"log"

	"catetin-backend/internal/app"
	"catetin-backend/internal/config"
	"catetin-backend/internal/database"
	"catetin-backend/internal/modules/auth"
	"catetin-backend/internal/modules/transaction"
)

// @title Catetin API
// @version 1.0
// @description API Catetin Backend
// @BasePath /

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Input token dengan format: Bearer <jwt_token>

// @security BearerAuth

func main() {
	config.LoadEnv()
	database.Connect()

	authModule := auth.NewModule(database.DB)
	transactionModule := transaction.NewModule(database.DB)

	app := app.New(
		authModule,
		transactionModule,
	)

	app.Setup()

	log.Fatal(app.Fiber.Listen(":3008"))
}
