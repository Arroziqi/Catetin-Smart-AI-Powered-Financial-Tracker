# 🧠 Catetin AI Service

The AI engine for **Catetin**, responsible for processing financial data, OCR, and generating personalized insights.

---

## 🛠 Tech Stack

- **Language:** [Python 3.10+](https://www.python.org/)
- **AI Orchestration:** [LangChain](https://www.langchain.com/) & [LangGraph](https://langchain-ai.github.io/langgraph/)
- **Local LLM:** [Ollama](https://ollama.com/)
- **Image Processing:** Tesseract OCR / EasyOCR (Planned)
- **Framework:** FastAPI (Planned)

---

## 🧩 Features

- **📸 Receipt Scanning (OCR):** Extracting nominal, date, and items from receipt images.
- **🍱 Food Recognition:** Estimating costs and categories from food photos.
- **📊 Automated Insights:** Analyzing spending habits to provide actionable financial advice.
- **🏷 Smart Categorization:** Automatically tagging transactions based on description.

---

## 📂 Project Structure

```bash
ai-service/
├── main.py             # Service entry point
├── requirements.txt    # Python dependencies
├── Dockerfile          # Containerization
└── ...                 # AI logic and models
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Python 3.10 or higher
- Ollama installed and running locally
- Docker (optional)

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Service
```bash
python main.py
```

---

## 🤖 LLM Configuration
This service uses **Ollama** for local inference. Ensure you have the required models pulled:
```bash
ollama pull llama3 # or specific model used
```

---

## 📄 License
This project is licensed under the MIT License.
