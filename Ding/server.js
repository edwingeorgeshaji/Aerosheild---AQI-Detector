/// Server.js
// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5010;

// تفعيل CORS عشان المتصفح يقدر يعمل fetch من أي دومين
app.use(cors());

// Endpoint تجريبي للتأكد أن السيرفر شغال
app.get('/', (req, res) => {
  res.send('AQI Server is running!');
});

// Endpoint لاستقبال بيانات AQI حسب الإحداثيات
app.get('/current', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat or lon parameter" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OWM_KEY}`
    );

    if (!response.ok) throw new Error("OpenWeatherMap API error");

    const data = await response.json();
    res.json(data); // ترجع بيانات AQI للمتصفح
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch AQI data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
