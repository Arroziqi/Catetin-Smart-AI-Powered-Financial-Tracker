# 📄 **Catetin – Smart AI-Powered Financial Tracker**

---

# 🧠 1. Overview

**Catetin** adalah aplikasi pencatatan keuangan berbasis AI yang membantu pengguna mencatat pemasukan dan pengeluaran secara cepat melalui scan foto serta memberikan insight finansial yang personal dan actionable.

Aplikasi ini menggabungkan:

* Kemudahan input (scan & auto-fill)
* Analisis data
* Insight berbasis AI

---

# 🎯 2. Tujuan Produk

* Mengurangi friction dalam pencatatan keuangan
* Meningkatkan awareness finansial pengguna
* Memberikan insight berbasis kebiasaan pengguna
* Membantu pengambilan keputusan keuangan

---

# 💡 3. Value Proposition

> “Catetin makes financial tracking effortless by combining image-based input and AI-driven insights into a simple, intuitive experience.”

---

# 👥 4. Target Pengguna

* Mahasiswa / anak kos
* Pekerja muda
* UMKM kecil
* Pengguna yang ingin mulai mengatur keuangan

---

# 🧩 5. Fitur Utama

## 📸 Smart Input (AI-powered)

* Scan struk (OCR)
* Scan makanan (AI estimation)
* Auto-fill data transaksi:

  * nominal
  * kategori
  * tanggal

---

## ✍️ Manual Input

* Input pemasukan & pengeluaran
* Kategori fleksibel
* Catatan tambahan

---

## 📊 Dashboard & Visualisasi

* Ringkasan keuangan
* Grafik:

  * kategori pengeluaran
  * tren waktu

---

## 🧠 AI Insights

Insight otomatis berdasarkan periode:

* **Harian** → kebiasaan harian
* **Mingguan** → perbandingan
* **Bulanan** → analisis kategori
* **Quarterly** → tren
* **Tahunan** → pola jangka panjang

---

# 🔄 6. User Flow (Ringkas)

## Input Transaksi:

1. User upload foto / input manual
2. AI memproses data (OCR / detection)
3. Sistem auto-fill form
4. User validasi / edit
5. Data disimpan

---

## Insight:

1. Sistem mengumpulkan data transaksi
2. Data diolah & dibandingkan
3. AI menghasilkan insight naratif
4. Insight ditampilkan ke user

---

# 🤖 7. Peran AI dalam Sistem

## 1. Input Assistance

* OCR untuk struk
* Deteksi makanan
* Estimasi harga

---

## 2. Data Processing

* Kategorisasi otomatis
* Normalisasi data

---

## 3. Insight Generation (Core Value)

* Analisis kebiasaan
* Deteksi perubahan
* Generasi insight dalam bentuk narasi

---

# 🏗️ 8. Arsitektur Sistem

Catetin menggunakan pendekatan **microservices architecture** untuk memastikan skalabilitas dan modularitas sistem.

## Komponen utama:

* API Gateway
* Auth Service
* Transaction Service
* AI Service
* Insight Service

---

# ⚙️ 9. Tech Stack

## Frontend

* Next.js (Web)
* Kotlin (Android)

---

## Backend

* Go (Golang)
* Fiber / Gin

---

## AI Stack

* Ollama (Local LLM)
* LangChain (AI orchestration)
* LangGraph (workflow AI)

---

## Database & Infra

* PostgreSQL
* Redis (cache / queue)
* Docker

---

# 🔐 10. Keamanan

* JWT Authentication
* Secure API communication
* Data validation & sanitization

---

# 📊 11. Data Structure (Simplified)

## Transaction

* id
* user_id
* type (income/expense)
* amount
* category
* date
* note

---

## Insight

* id
* user_id
* period
* content
* created_at

---

# 🚀 12. Roadmap Pengembangan

## Phase 1 (MVP)

* Manual input
* Scan struk
* Dashboard sederhana
* Insight basic

---

## Phase 2

* Food recognition improvement
* Insight lebih advanced
* Notifikasi

---

## Phase 3

* Multi-platform optimization
* Integrasi fintech
* Recommendation system

---

# 💰 13. Model Bisnis (Opsional)

* Freemium:

  * Basic → gratis
  * Premium → insight advanced
* Subscription
* B2B (UMKM tools)

---

# 🔥 14. Keunggulan Kompetitif

* Input berbasis gambar (lebih cepat dari manual)
* Insight naratif berbasis AI
* Cost-efficient (LLM lokal)
* UX sederhana & ringan

---

# 🎯 15. Kesimpulan

Catetin bukan hanya aplikasi pencatatan keuangan, tetapi sebuah **financial companion** yang membantu pengguna memahami dan mengelola keuangan mereka secara lebih cerdas melalui teknologi AI.
