const API_KEY = "9c928ee0dae5eb40a149066e041c40a5";

// MAP SETUP
const map = L.map("map", {
  dragging: true
}).setView([30.0444, 31.2357], 6);


const lightTiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
});
lightTiles.addTo(map);

const darkTiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap, © CARTO",
});

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

// Prevent automatic zoom/pan on geosearch
map.on('geosearch/showlocation', (result) => {
  const lat = result.location.y;
  const lng = result.location.x;
  updateAQI(lat, lng);
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

// 🔹 Get human-readable location (reverse geocode)
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

// UPDATE AQI
async function updateAQI(lat, lng) {
  document.querySelector('.info-panel').classList.add('visible');
  document.getElementById("info-content").innerHTML = `<div class="loader"></div>`;

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

    // 🔹 Get human-readable location
    const locationName = await getLocationName(lat, lng);

    const html = `
      <div class="card ${aqiClass}">
        <div class="aqi-value">${aqiValue}</div>
        <div class="category">${aqiCategory}</div>
        <p><strong>Location:</strong> ${locationName}</p>
        <p><strong>PM2.5:</strong> ${pm25.toFixed(2)}</p>
        ${aqiValue > 100 ? '<p style="color:red;font-weight:bold;">⚠ Health Alert!</p>' : ""}
      </div>`;

    document.getElementById("info-content").innerHTML = html;
    marker.setPopupContent(`<b>AQI: ${aqiValue}</b> (${aqiCategory})<br>${locationName}`);
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
      options: { responsive: true, scales: { y: { beginAtZero: true, max: 500 } } },
    });
  } catch (err) {
    console.log("Chart error", err);
  }
}

// HEATMAP
async function loadHeatmap() {
  const cities = [
    { lat: 30.0444, lng: 31.2357 },
    { lat: 31.2001, lng: 29.9187 },
    { lat: 30.0131, lng: 31.2089 },
    { lat: 31.1899, lng: 29.9187 },
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

// On map click: update AQI
map.on("click", (e) => updateAQI(e.latlng.lat, e.latlng.lng));

// 📍 ADD MY LOCATION BUTTON
const locateControl = L.control({ position: "topleft" });
locateControl.onAdd = function () {
  const button = L.DomUtil.create("button", "locate-btn");
  button.innerHTML = "📍 My Location";
  button.style.background = "white";
  button.style.padding = "6px";
  button.style.border = "1px solid #aaa";
  button.style.cursor = "pointer";

  button.onclick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          updateAQI(lat, lng); // show AQI at my location
          map.panTo([lat, lng]); // center map (without zooming)
        },
        () => {
          alert("Unable to access your location.");
        }
      );
    } else {
      alert("Geolocation not supported in this browser.");
    }
  };

  return button;
};
locateControl.addTo(map);

// THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");
