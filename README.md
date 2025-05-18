# 🧠 ChatGPT Stream App

Мгновенные ответы от ChatGPT с эффектом "живого набора" через Server-Sent Events. Клиент и сервер разделены по папкам, находятся в одном репозитории. Поддержка анимации, стриминга текста и удобный интерфейс.

---

## 📂 Структура проекта

```
📦 chatgpt-stream-app
├── 📁 client        # Фронтенд (Vite + React + Tailwind + Framer Motion)
│   ├── src
│   │   ├── api/         # Запросы к серверу (опционально)
│   │   ├── app/         # Основное приложение / роутинг (если есть)
│   │   ├── assets/      # Изображения, шрифты и т.д.
│   │   ├── hooks/       # Пользовательские хуки (useStreamChat)
│   │   ├── ui/          # Переиспользуемые UI-компоненты
│   │   ├── components/  # Компоненты (ChatBox)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── 📁 server        # Бэкенд (Node.js + Express + SSE)
│   ├── src
│   │   ├── api/         # API-интеграции (если появятся)
│   │   ├── controller/  # Контроллеры (можно вынести chat логику)
│   │   ├── middleware/  # Middleware'ы
│   │   ├── routes/      # Роуты (chat.ts)
│   │   ├── services/    # Логика взаимодействия с OpenAI (chatgpt.ts)
│   │   ├── utils/       # Утилиты (decoder, логгеры и пр.)
│   │   └── index.ts     # Точка входа сервера
├── .env
├── package.json
└── README.md
```

---

## 🚀 Быстрый старт

### 1. Клонирование и установка зависимостей

```bash
git clone git@github.com:EmranP/ChatGPT-Stream-App.git с SSH
git clone https://github.com/EmranP/ChatGPT-Stream-App.git с HTTPS
cd chatgpt-stream-app

# Установка зависимостей для сервера
cd server
bun install

# Установка зависимостей для клиента
cd ../client
bun install
```

### 2. Настройка переменных окружения

Создай файл `.env` в папке `server`:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=3001
```

### 3. Запуск

#### Запуск сервера:

```bash
cd server
bun run dev
```

#### Запуск клиента:

```bash
cd client
bun run dev
```

Открой `http://localhost:5173` — и вперед, общаться с GPT в реальном времени!

---

## 📦 Фичи

* 📤 Отправка сообщений и стриминг ответов от ChatGPT (SSE)
* 🎬 Анимация появления текста (Framer Motion)
* 🎤 Кнопка голосового ввода (расширяемая)
* 🔥 Эффект "GPT печатает..."
* 💨 Быстрый запуск с Vite + Express

---

## 🧱 Технологии

* **Frontend:** React, Vite, TailwindCSS, Framer Motion
* **Backend:** Express, Node.js, Server-Sent Events (SSE)
* **API:** OpenAI Chat Completions (gpt-3.5-turbo)

---

## 📜 Лицензия

MIT — используй как душе угодно, но звёздочку на GitHub никто не отменял ⭐️

---
