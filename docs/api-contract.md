# 📘 Catetin API Contract

## 🌐 Base URL
```
/api/v1
```

---

# 🔐 AUTH SERVICE

## Register
**POST** `/auth/register`

### Request
```json
{
  "email": "user@mail.com",
  "password": "password123"
}
````

### Response

```json
{
  "id": "user_id",
  "email": "user@mail.com",
  "created_at": "2026-04-07T10:00:00Z"
}
```

---

## Login

**POST** `/auth/login`

### Request

```json
{
  "email": "user@mail.com",
  "password": "password123"
}
```

### Response

```json
{
  "access_token": "jwt_token",
  "token_type": "Bearer"
}
```

---

## 🔒 Authorization Header

```
Authorization: Bearer <token>
```

---

# 💰 TRANSACTION SERVICE

## Create Transaction

**POST** `/transactions`

### Request

```json
{
  "type": "expense",
  "amount": 25000,
  "category": "food",
  "date": "2026-04-07",
  "note": "nasi goreng"
}
```

### Response

```json
{
  "id": "trx_123",
  "type": "expense",
  "amount": 25000,
  "category": "food",
  "date": "2026-04-07",
  "note": "nasi goreng",
  "created_at": "2026-04-07T10:00:00Z"
}
```

---

## Get Transactions

**GET** `/transactions`

### Query Params

```
?start_date=2026-04-01
&end_date=2026-04-07
&category=food
&type=expense
```

### Response

```json
{
  "data": [
    {
      "id": "trx_123",
      "type": "expense",
      "amount": 25000,
      "category": "food",
      "date": "2026-04-07",
      "note": "nasi goreng"
    }
  ]
}
```

---

## Update Transaction

**PUT** `/transactions/:id`

### Request

```json
{
  "amount": 30000,
  "category": "food"
}
```

---

## Delete Transaction

**DELETE** `/transactions/:id`

---

# 📦 BULK TRANSACTION (FROM RECEIPT)

## Bulk Insert Transactions

**POST** `/transactions/bulk`

### Request

```json
{
  "date": "2026-04-07",
  "transactions": [
    {
      "type": "expense",
      "amount": 20000,
      "category": "food",
      "note": "Nasi Goreng"
    },
    {
      "type": "expense",
      "amount": 10000,
      "category": "drink",
      "note": "Es Teh"
    },
    {
      "type": "expense",
      "amount": 3000,
      "category": "tax",
      "note": "PPN"
    },
    {
      "type": "expense",
      "amount": 2000,
      "category": "service",
      "note": "Service Charge"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "inserted": 4
}
```

---

# 📊 SUMMARY SERVICE

## Get Summary

**GET** `/summary`

### Response

```json
{
  "total_income": 5000000,
  "total_expense": 2000000,
  "balance": 3000000
}
```

---

## Category Breakdown

**GET** `/summary/categories`

### Response

```json
{
  "data": [
    { "category": "food", "total": 500000 },
    { "category": "transport", "total": 200000 }
  ]
}
```

---

## Trend Data

**GET** `/summary/trend`

### Query

```
?period=weekly
```

### Response

```json
{
  "data": [
    { "date": "2026-04-01", "total": 100000 },
    { "date": "2026-04-02", "total": 150000 }
  ]
}
```

---

# 📸 AI SERVICE

## Scan Receipt (Detailed)

**POST** `/ai/scan-receipt`

### Request

```
multipart/form-data
file: receipt.jpg
```

### Response

```json
{
  "merchant": "Warung Makan Sederhana",
  "date": "2026-04-07",
  "items": [
    {
      "name": "Nasi Goreng",
      "quantity": 1,
      "price": 20000,
      "total": 20000,
      "category": "food"
    },
    {
      "name": "Es Teh",
      "quantity": 2,
      "price": 5000,
      "total": 10000,
      "category": "drink"
    }
  ],
  "summary": {
    "subtotal": 30000,
    "tax": 3000,
    "service_fee": 2000,
    "total": 35000
  },
  "raw_text": "optional OCR result"
}
```

---

## Scan Food

**POST** `/ai/scan-food`

### Request

```
multipart/form-data
file: image.jpg
```

### Response

```json
{
  "name": "nasi goreng",
  "category": "food",
  "estimated_price": 20000
}
```

---

# 🧠 INSIGHT SERVICE

## Get Insight

**GET** `/insights`

### Query

```
?period=weekly
```

### Response

```json
{
  "period": "weekly",
  "content": "Your spending increased this week, mainly due to food and online shopping.",
  "generated_at": "2026-04-07T10:00:00Z"
}
```

---

## Generate Insight (Optional)

**POST** `/insights/generate`

### Request

```json
{
  "period": "monthly"
}
```

---

# 🧩 OPTIONAL ENDPOINTS

## Get Categories

**GET** `/categories`

```json
{
  "data": ["food", "transport", "shopping"]
}
```

---

# 📦 STANDARD RESPONSE FORMAT

## Success

```json
{
  "success": true,
  "data": {},
  "message": "optional"
}
```

## Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 📅 DATE FORMAT

```
YYYY-MM-DD
```

---

# 🧠 NOTES

* Semua endpoint (kecuali auth) membutuhkan JWT
* Gunakan `/api/v1` sebagai prefix
* Gunakan JSON untuk semua request/response kecuali upload file
* Receipt scan mendukung multiple items + tax + service fee
* Gunakan bulk insert untuk efisiensi dari hasil scan

---

# 🚀 FUTURE IMPROVEMENTS

* Add budgeting endpoint
* Add recurring transactions
* Add notification system
* Add multi-currency support
