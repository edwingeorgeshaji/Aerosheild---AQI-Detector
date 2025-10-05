const API_KEY = "9c928ee0dae5eb40a149066e041c40a5";

// MAP SETUP
const map = L.map("map").setView([30.0444, 31.2357], 6);

const lightTiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
});

const darkTiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap, © CARTO",
});

lightTiles.addTo(map);

// GEOSEARCH FUNCTIONALITY
const provider = new GeoSearch.OpenStreetMapProvider();
const searchControl = new GeoSearch.GeoSearchControl({
  provider: provider,
  style: 'bar',
  autoClose: true,
  keepResult: true,
  searchLabel: 'Enter address or city',
  showMarker: false,
  retainZoomLevel: true,
});
map.addControl(searchControl);

map.on('geosearch/showlocation', (result) => {
  const lat = result.location.y;
  const lng = result.location.x;
  updateAQI(lat, lng);
});

// CLOSE PANEL LOGIC
const infoPanel = document.querySelector('.info-panel');
const closePanelBtn = document.getElementById('close-panel-btn');

closePanelBtn.addEventListener('click', () => {
  infoPanel.classList.remove('visible');
});

let marker, heatLayer, chart;

// AQI COLOR CLASS
function getAQIClass(aqi) {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "usg";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "vunhealthy";
  return "hazardous";
}

// FETCH AQI
async function fetchAQI(lat, lng) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("API error");
  return response.json();
}

// Get human-readable location (reverse geocode)
async function getLocationName(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "User-Agent": "AeroShield-Dashboard/1.0" } }
    );
    const data = await response.json();

    if (data.address) {
      return (
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        data.address.state ||
        data.address.country ||
        `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      );
    }
    return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch (e) {
    console.error("Reverse geocoding error:", e);
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}

// --- ADDED: Get Health Recommendations based on AQI ---
function getHealthRecommendations(aqiValue) {
  let title = "<h3>⚕️ Health Recommendations</h3>";
  let advice = "";

  if (aqiValue <= 50) {
    advice = "<p>Air quality is excellent. It's a great day to be active outside. Enjoy the fresh air!</p>";
  } else if (aqiValue <= 100) {
    advice = "<p>Air quality is acceptable. However, unusually sensitive individuals should consider reducing prolonged or heavy exertion outdoors.</p>";
  } else if (aqiValue <= 150) {
    advice = "<p><b>Sensitive groups</b> (people with lung disease, children, and older adults) should reduce prolonged or heavy exertion. It's okay to be outside, but take it easy.</p>";
  } else if (aqiValue <= 200) {
    advice = "<p><b>Everyone should reduce heavy exertion outdoors.</b> Sensitive groups should avoid all outdoor physical activity. Consider wearing a mask if you must be outside for an extended period.</p>";
  } else if (aqiValue <= 300) {
    advice = "<p><b>Health Alert:</b> Everyone should avoid prolonged or heavy exertion. Sensitive groups should remain indoors and keep activity levels low. Reschedule outdoor activities.</p>";
  } else {
    advice = "<p><b>Health Warning of Emergency Conditions:</b> Everyone should avoid all outdoor physical activity. Remain indoors and keep windows and doors closed. Air purifiers are recommended.</p>";
  }
  return title + advice;
}
// --- END ---

// UPDATE AQI
async function updateAQI(lat, lng) {
  document.querySelector('.info-panel').classList.add('visible');
  document.getElementById("info-content").innerHTML = `<div class="loader"></div>`;
  // Clear previous health recommendations
  document.getElementById("health-recommendations").innerHTML = "";

  if (marker) marker.remove();
  marker = L.marker([lat, lng]).addTo(map).bindPopup("Loading AQI...").openPopup();
  
  try {
    const json = await fetchAQI(lat, lng);
    const dataRaw = json.list[0];
    const pm25 = dataRaw.components.pm2_5;
    const aqiRaw = dataRaw.main.aqi;

    const aqiMap = {
      1: { val: 25, cat: "Good" },
      2: { val: 75, cat: "Moderate" },
      3: { val: 125, cat: "Unhealthy for Sensitive" },
      4: { val: 175, cat: "Unhealthy" },
      5: { val: 300, cat: "Very Unhealthy" },
    };

    const { val: aqiValue, cat: aqiCategory } = aqiMap[aqiRaw];
    const aqiClass = getAQIClass(aqiValue);
    const locationName = await getLocationName(lat, lng);

    const html = `
      <div class="card ${aqiClass}">
        <div class="aqi-value">${aqiValue}</div>
        <div class="category">${aqiCategory}</div>
        <p><strong>Location:</strong> ${locationName}</p>
        <p><strong>PM2.5:</strong> ${pm25.toFixed(2)} µg/m³</p>
        ${aqiValue > 100 ? '<p style="color:red;font-weight:bold;">⚠ Health Alert!</p>' : ""}
      </div>`;

    document.getElementById("info-content").innerHTML = html;
    marker.setPopupContent(`<b>AQI: ${aqiValue}</b> (${aqiCategory})<br>${locationName}`);
    
    // --- ADDED: Populate health recommendations ---
    const healthAdvice = getHealthRecommendations(aqiValue);
    document.getElementById("health-recommendations").innerHTML = healthAdvice;
    // --- END ---

    updateChart(lat, lng);
  } catch (err) {
    document.getElementById("info-content").innerHTML = `<p style="color:red;">Error fetching data for this location.</p>`;
    marker.setPopupContent("Failed to fetch AQI");
  }
}

// CHART
async function updateChart(lat, lng) {
  const end = Math.floor(Date.now() / 1000);
  const start = end - 24 * 60 * 60;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lng}&start=${start}&end=${end}&appid=${API_KEY}`
    );
    if (!response.ok) return;
    const data = await response.json();

    const labels = data.list.map((d) => new Date(d.dt * 1000).getHours() + ":00");
    const aqiValues = data.list.map((d) => [25, 75, 125, 175, 300][d.main.aqi - 1]);

    if (chart) chart.destroy();
    const ctx = document.getElementById("aqi-chart").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "AQI Last 24h",
            data: aqiValues,
            borderColor: "rgba(231,76,60,1)",
            backgroundColor: "rgba(231,76,60,0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 500 } },
        plugins: {
          legend: {
            display: false
          }
        }
      },
    });
  } catch (err) {
    console.log("Chart error", err);
  }
}

// HEATMAP
async function loadHeatmap() {
  const cities = [
    { lat: 30.0444, lng: 31.2357 }, { lat: 31.2001, lng: 29.9187 },
    { lat: 30.0131, lng: 31.2089 }, { lat: 31.1899, lng: 29.9187 },
  ];

  const points = [];
  for (const city of cities) {
    try {
      const data = await fetchAQI(city.lat, city.lng);
      const aqiRaw = data.list[0].main.aqi;
      const val = [0.2, 0.4, 0.6, 0.8, 1][aqiRaw - 1];
      points.push([city.lat, city.lng, val]);
    } catch {}
  }
  if (heatLayer) heatLayer.remove();
  heatLayer = L.heatLayer(points, { radius: 25, blur: 20, maxZoom: 17 }).addTo(map);
}

map.on("click", (e) => updateAQI(e.latlng.lat, e.latlng.lng));

// "My Location" Button
const locateControl = L.control({ position: "topleft" });
locateControl.onAdd = function () {
  const button = L.DomUtil.create("button", "locate-btn");
  button.innerHTML = "📍 My Location";
  button.style.backgroundColor = "white";
  button.style.padding = "8px 10px";
  button.style.border = "2px solid rgba(0,0,0,0.2)";
  button.style.borderRadius = "4px";
  button.style.cursor = "pointer";
  button.style.fontSize = "14px";
  button.style.boxShadow = "0 1px 5px rgba(0,0,0,0.65)";
  
  L.DomEvent.disableClickPropagation(button);

  button.onclick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          updateAQI(lat, lng);
          map.panTo([lat, lng]);
        },
        () => { alert("Unable to access your location."); }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  };
  return button;
};
locateControl.addTo(map);

// THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.replace("light-theme", "dark-theme");
    map.removeLayer(lightTiles);
    darkTiles.addTo(map);
    themeToggle.textContent = "☀ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.replace("dark-theme", "light-theme");
    map.removeLayer(darkTiles);
    lightTiles.addTo(map);
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

themeToggle.addEventListener("click", () => {
  const current = body.classList.contains("dark-theme") ? "dark" : "light";
  setTheme(current === "dark" ? "light" : "dark");
});

// Load saved theme
const saved = localStorage.getItem("theme") || "light";
setTheme(saved);

loadHeatmap();