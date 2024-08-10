const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(express.json())
app.use(cors());

// Dummy data simulating vehicle movement
const vehicleRoute = [
  { latitude: 17.385044, longitude: 78.486671, timestamp: '2024-07-20T10:00:00Z' },
  { latitude: 17.385045, longitude: 78.486672, timestamp: '2024-07-20T10:00:05Z' },
  // Add more points...
];

let currentIndex = 0;

app.get('/api', (req, res) => {
  if (currentIndex >= vehicleRoute.length) currentIndex = 0;
  const location = vehicleRoute[currentIndex];
  currentIndex++;
  res.json(location);
});

let latitude = 17.385044;
let longitude = 78.486671;

app.get('/apis', (req, res) => {
  // Randomly adjust the latitude and longitude slightly
  latitude += (Math.random() - 0.5) * 0.001; // Adjust this value to control movement speed
  longitude += (Math.random() - 0.5) * 0.001;

  const vehicleData = {
    latitude: latitude,
    longitude: longitude,
    timestamp: new Date().toISOString(),
  };

  res.json(vehicleData);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


