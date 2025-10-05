# 🌍 **AeroShield – Advanced AQI Detection Dashboard**



[![NASA Space Apps 2025](https://img.shields.io/badge/NASA%20Space%20Apps-2025-blue?logo=nasa\&logoColor=white)](https://www.spaceappschallenge.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![OpenWeatherMap API](https://img.shields.io/badge/API-OpenWeatherMap-orange?logo=openweathermap)](https://openweathermap.org/api)
[![Frontend: Leaflet.js](https://img.shields.io/badge/Frontend-Leaflet.js-brightgreen?logo=leaflet)](https://leafletjs.com)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Real-time Air Quality Intelligence for a Healthier Planet.**

AeroShield is a **collaborative NASA Space Apps 2025 project** that visualizes **Air Quality Index (AQI)** metrics in real-time using the **OpenWeatherMap Air Pollution API**. It empowers global users to monitor air quality, analyze trends, and make informed health decisions — all through an elegant and interactive dashboard.

---

## 🚀 **Overview**

AeroShield delivers a seamless, interactive experience for visualizing AQI data through **maps, charts, heatmaps, and adaptive health guidance**. It’s an innovative solution promoting environmental awareness and sustainability through data-driven insights.

---

## ⚙️ **Tech Stack at a Glance**

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,express,chartjs,leaflet,git,github,vscode" alt="Tech Stack Icons" />
</p>

---

## ✨ **Key Features**

### 🗺️ **Interactive Global Map**

* Live AQI data rendered via **Leaflet.js** and **OpenStreetMap**.
* Integrated **GeoSearch** for address or city lookup.
* Clickable markers displaying AQI, PM2.5, and risk category.

### 📈 **24-Hour AQI Trend Analytics**

* Historical AQI visualization with **Chart.js**.
* Fully responsive for desktop and mobile.

### ⚕️ **Smart Health Recommendations**

* Dynamic health advice based on AQI severity.
* Clear guidance for sensitive groups.

### 🔥 **Heatmap Visualization**

* Real-time AQI intensity map overlay.

### 🌓 **Dark/Light Mode**

* Smooth transitions with local storage memory.

### 📍 **Smart Geolocation**

* One-click local AQI detection and mapping.

---

## 🧠 **Technology Overview**

| Layer                  | Tools & Libraries                    |
| ---------------------- | ------------------------------------ |
| **Frontend**           | HTML5, CSS3, JavaScript              |
| **Mapping**            | Leaflet.js, OpenStreetMap, GeoSearch |
| **Visualization**      | Chart.js, Heatmap.js                 |
| **Backend**            | Node.js, Express.js                  |
| **Environment Config** | dotenv                               |
| **Security**           | CORS Middleware                      |
| **Data Source**        | OpenWeatherMap API                   |

---

## 🧩 **Project Structure**

```
AeroShield-AQI-Detector/
│
├── index.html            # User interface
├── style.css             # Styling & theme
├── main.js               # Core AQI logic
├── server.js             # Express API backend
├── package.json          # Dependencies & scripts
└── README.md             # Documentation
```

---

## 🧭 **Installation & Setup**

```bash
git clone https://github.com/yourusername/AeroShield-AQI-Detector.git
cd AeroShield-AQI-Detector
npm install
```

Create a `.env` file:

```env
OWM_KEY=your_openweathermap_api_key_here
```

Run the backend server:

```bash
npm start
```

Server runs at **[http://localhost:5010](http://localhost:5010)**.

Open `index.html` in a browser or run via VS Code Live Server.

---

## 👩‍🚀 **NASA Space Apps 2025 Collaboration Team**

| Role               | Contributor                                  |
| ------------------ | -------------------------------------------- |
| Project Lead       | [Your Name](https://github.com/yourusername) |
| Backend Developer  | NASA Space Apps 2025 Team                    |
| Frontend Developer | [Team Member Name]                           |
| UI/UX Designer     | [Contributor Name]                           |
| API Provider       | [OpenWeatherMap](https://openweathermap.org) |

---

## 🏆 **Acknowledgments**

* 🌍 *NASA Space Apps Challenge 2025* — for inspiring global innovation.
* ☁️ *OpenWeatherMap API* — for environmental data insights.
* 🗺️ *OpenStreetMap* — for mapping infrastructure.

---

## 📜 **License**

This project is licensed under the **MIT License** — see [LICENSE](LICENSE).

---

## 🔮 **Future Enhancements**

* 🤖 AI-driven AQI prediction.
* 📱 Progressive Web App (PWA) version.
* 🗓️ Historical AQI data explorer.
* 🧑‍🤝‍🧑 Community-based pollution reporting.

---

> *"Collaborating for a cleaner atmosphere — AeroShield, powered by NASA Space Apps 2025."* 🚀
