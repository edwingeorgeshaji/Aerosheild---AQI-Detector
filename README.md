# 🌍 **AeroShield – Advanced AQI Detection Dashboard**

> **Real-time Air Quality Intelligence for a Healthier Planet.**

AeroShield is a sophisticated, data-driven web application that visualizes **Air Quality Index (AQI)** metrics in real-time using the **OpenWeatherMap Air Pollution API**. Designed for global accessibility and environmental awareness, it empowers users to monitor air quality, analyze patterns, and make informed health decisions.

---

## 🚀 **Overview**

AeroShield delivers a seamless, interactive experience for visualizing AQI data through **maps, charts, and health recommendations**. It features location-based insights, predictive trends, and dynamic visuals that bring environmental data to life.

---

## ✨ **Key Features**

### 🗺️ **Interactive Global Map**

* Real-time air quality visualization via **Leaflet.js** and **OpenStreetMap**.
* Integrated **GeoSearch** for global address or city lookup.
* Clickable map locations displaying current AQI, PM2.5 concentration, and health category.

### 📈 **Dynamic AQI Analytics**

* 24-hour AQI trend chart powered by **Chart.js**.
* Responsive design for desktop and mobile users.

### ⚕️ **Personalized Health Recommendations**

* Adaptive health guidance tailored to AQI severity levels.
* Highlights sensitive groups and provides actionable advice.

### 🔥 **Heatmap Visualization**

* Real-time regional heat intensity display for comparative analysis.

### 🌓 **Smart Theme Switching**

* Smooth dark/light mode transition.
* Persistent theme preference stored via `localStorage`.

### 📍 **Location Awareness**

* One-click geolocation feature for instant local AQI detection.

---

## 🧠 **Technology Stack**

| Category                      | Technologies                                     |
| ----------------------------- | ------------------------------------------------ |
| **Frontend**                  | HTML5, CSS3, JavaScript (Vanilla)                |
| **Mapping & Geolocation**     | Leaflet.js, OpenStreetMap, GeoSearch, Heatmap.js |
| **Data Visualization**        | Chart.js                                         |
| **Backend**                   | Node.js, Express.js                              |
| **Environment Configuration** | dotenv                                           |
| **Security & Network**        | CORS Middleware                                  |
| **Data Source**               | OpenWeatherMap Air Pollution API                 |

---

## 🧩 **Project Architecture**

```
AeroShield-AQI-Detector/
│
├── index.html            # Core dashboard UI
├── style.css             # Theme, layout, and animations
├── main.js               # Main frontend logic and AQI handling
├── script.js             # Alternate AQI visualization script
├── server.js             # Express backend and API routing
├── package.json          # Node.js project configuration
├── package-lock.json     # Dependency lockfile
└── README.md             # Documentation
```

---

## ⚙️ **Setup & Installation**

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/yourusername/AeroShield-AQI-Detector.git
cd AeroShield-AQI-Detector
```

### 2️⃣ **Install Dependencies**

```bash
npm install
```

### 3️⃣ **Configure Environment Variables**

Create a `.env` file in the project root:

```env
OWM_KEY=your_openweathermap_api_key_here
```

### 4️⃣ **Run the Backend Server**

```bash
npm start
```

Server will start at: **[http://localhost:5010](http://localhost:5010)**

### 5️⃣ **Launch the Frontend**

Open `index.html` directly in your browser, or use a local server (e.g., VS Code Live Server).

---

## 📡 **API Endpoints**

**Base URL:** `https://api.openweathermap.org/data/2.5/air_pollution`

| Endpoint                                                             | Description                    |
| -------------------------------------------------------------------- | ------------------------------ |
| `/air_pollution?lat={lat}&lon={lon}`                                 | Fetches current AQI data.      |
| `/air_pollution/history?lat={lat}&lon={lon}&start={start}&end={end}` | Retrieves 24-hour AQI history. |

---

## 🧬 **Core Functionality**

### `updateAQI(lat, lng)`

Fetches live AQI data, updates map visuals, and displays location-specific insights.

### `updateChart(lat, lng)`

Renders interactive 24-hour AQI trend charts.

### `getHealthRecommendations(aqi)`

Provides context-aware health advice based on AQI category.

### `loadHeatmap()`

Generates AQI intensity heatmaps across multiple regions.

### `setTheme(theme)`

Manages theme preferences with smooth transitions and persistent storage.

---

## 🧰 **Dependencies**

* **Express.js** – Web server and API handling
* **Leaflet.js** – Interactive mapping
* **Chart.js** – AQI trend visualization
* **GeoSearch** – Geocoding and map search integration
* **Heatmap.js** – Heatmap rendering
* **dotenv** – Environment configuration
* **CORS** – Cross-Origin Resource Sharing support

---

## 👥 **Contributors**

| Role               | Contributor                                  |
| ------------------ | -------------------------------------------- |
| Project Lead       | [Your Name](https://github.com/yourusername) |
| Backend Developer  | NASA Space Apps Team                         |
| Frontend Developer | [Your Name / Team Member]                    |
| API Provider       | [OpenWeatherMap](https://openweathermap.org) |

---

## 🏆 **Acknowledgments**

* 🌍 *NASA Space Apps Challenge 2025* — for inspiring global environmental innovation.
* ☁️ *OpenWeatherMap API* — for providing reliable environmental data.
* 🗺️ *OpenStreetMap Community* — for open-source geographic mapping support.

---

## 📜 **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🔮 **Future Roadmap**

* 🤖 Predictive AQI forecasting using ML models.
* 📱 PWA (Progressive Web App) for mobile accessibility.
* 🗓️ Historical AQI comparison & trend analytics.
* 🧑‍🤝‍🧑 Community-driven pollution reporting features.

---

> *"Breathe better, live smarter — with AeroShield."* 🌤️
