require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
// const cors = require("cors");

require("./config/database");

const app = express();
app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.json());

// Configure CORS
// const corsOptions = {
//   origin: ["http://localhost:3000", "http://localhost:8000", "https://macro-count.vercel.app"], // Allow both local development and deployed domain
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// Configure the auth middleware
app.use(require("./config/auth"));
const openWeatherRoutes = require('./routes/api/openweather');
app.use('/api/openweather', openWeatherRoutes);

// API routes must be before the "catch all" route

const manifest = require('./dist/manifest.json');
app.use(express.static(path.join(__dirname, "dist")));

// "catch all" route
app.get('/*', function(req, res) {
  res.render(path.join(__dirname, 'dist', 'index.ejs'), {manifest});
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log(`> Local: http://localhost:${port}/`);
});