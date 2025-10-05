AeroShield - Real-Time Air Quality Index (AQI) Detector
AeroShield is an interactive web-based dashboard that provides real-time Air Quality Index (AQI) data for any location in the world. With a user-friendly map interface, historical data visualization, and actionable health recommendations, AeroShield empowers users to stay informed about the air they breathe.

Live Demo 🚀
✨ Features
Interactive Map: Click anywhere on the map or use the search bar to get instantaneous AQI data.

Real-time AQI Data: Get up-to-date information on PM2.5 levels and the overall AQI.

24-Hour Historical Data: View a chart of the AQI trend over the last 24 hours for any selected location.

Health Recommendations: Receive personalized health advice based on the current AQI level.

Color-Coded Legend: Easily understand the air quality levels with a clear, color-coded legend.

Heatmap View: Visualize AQI hotspots in different regions.

"My Location" Button: Instantly get the AQI for your current location.

Light & Dark Mode: Switch between themes for your viewing comfort.

Responsive Design: Fully functional on both desktop and mobile devices.

💻 Technologies Used
Frontend:

HTML5

CSS3

JavaScript

Leaflet.js - Interactive Map Library

Chart.js - Data Visualization

Leaflet-GeoSearch - Location Search

Leaflet.heat - Heatmap Generation

Backend:

Node.js

Express.js

CORS

dotenv for environment variable management

API:

OpenWeatherMap Air Pollution API

OpenStreetMap Nominatim for reverse geocoding

🛠️ Setup and Installation
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js and npm installed on your machine. You can download them here.

An API key from OpenWeatherMap.

Installation
Clone the repository:

git clone [https://github.com/your-username/aerosheild-aqi-detector.git](https://github.com/your-username/aerosheild-aqi-detector.git)
cd aerosheild-aqi-detector

Install NPM packages for the server:

npm install

Create a .env file in the root directory and add your OpenWeatherMap API key:

OWM_KEY=your_openweathermap_api_key

Start the backend server:

npm start

The server will be running on http://localhost:5010.

Open index.html in your browser to view the application. You can use a live server extension for automatic reloads.

🚀 Usage
Open the application in your browser.

Search for a location: Use the search bar at the top to find a specific city or address.

Click on the map: Click anywhere on the map to get the AQI details for that point.

Use "My Location": Click the "📍 My Location" button to get data for your current position.

The info panel on the right (or bottom on mobile) will display the current AQI, a 24-hour historical chart, and health recommendations.

📸 Screenshots
Light Mode Interface

Dark Mode Interface

Responsive Mobile View

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.

🙏 Acknowledgements
This project was created for the NASA Space Apps Challenge.

Air quality data provided by OpenWeatherMap.

Maps and geocoding services by OpenStreetMap.

Icons and inspiration from the open-source community.
