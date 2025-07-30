# 🌦️ 7-Day Weather Forecast App

A weather forecast app built with **React**, **TypeScript**, and **Vite**. Enter any U.S. address to instantly view a detailed 7-day weather forecast using public government APIs.

---

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **Vite** – blazing fast dev/build tool
- **Tailwind CSS** – utility-first styling
- **Axios** – for HTTP requests
- **React Testing Library** + **Vitest** – for testing components and hooks

---

## 🌐 APIs Used

- **US Census Geocoding API**  
  Converts a U.S. address into latitude and longitude.

- **US National Weather Service API**  
  Retrieves a 7-day weather forecast based on geographic coordinates.

---

## 🗂️ Project Structure

```
src/
├── components/         # Reusable UI components (InputForm, ForecastCard, etc.)
├── hooks/              # Custom React hooks (useWeather, useGeocode)
├── interfaces/         # TypeScript interfaces
├── test/               # Vitest setup and tests
├── App.tsx             # App root
└── main.tsx            # App entry point
```

---

## ✅ Features

- 📍 Converts address to latitude/longitude
- 📆 7-day forecast with day/night split
- 🌦️ Icons, temperature, precipitation, and descriptions
- 📱 Fully responsive UI (mobile and desktop)
- ♿ Accessible components
- 🧪 Unit tested: components + custom hooks

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/brunobz/weather-forecast-app.git
cd weather-forecast-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

App will be running at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Running Tests

This project uses **Vitest** and **React Testing Library** for unit testing.

### Run all tests

```bash
npm run test
```

### Run in watch mode with UI

```bash
npm run test:ui
```

---

## 🧠 Accessibility & UX

- ARIA roles and labels included
- Loading and error feedback
- Focus management
- Semantic HTML structure

---

## 🏗️ Build for Production

```bash
npm run build
```

---

## 📌 Known Limitations

- The app currently supports **U.S. addresses only**
- The **National Weather Service API** may occasionally rate-limit requests

---

## 🤝 Author

**Bruno Bianchini Zandavalle**  
Frontend Engineer – React + TypeScript  
[LinkedIn →](https://www.linkedin.com/in/bruno-bianchini-zandavalle-9ab37ab0)

---
