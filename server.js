// server.js

require("dotenv").config(); // Load environment variables at the very top
const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");

require("./config/database"); // Connect to the database

const app = express();

// Middleware setup
app.use(logger("dev"));
app.use(express.json());

// Configure the authentication middleware
// This decodes the JWT token and assigns the user information to req.user
app.use(require("./config/auth"));

// API routes must be defined before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/openweather", require("./routes/api/openweather"));

// Determine the environment
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // In production, serve static files from 'dist'
  app.use(express.static(path.join(__dirname, 'dist')));

  // "Catch All" route to serve 'dist/index.html'
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // In development, serve static files from 'public'
  app.use(express.static(path.join(__dirname, 'public')));

  // "Catch All" route to serve 'public/index.html'
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Unified port configuration
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running on port ${PORT}`);
  console.log();
  console.log(`  > Local: http://localhost:${PORT}/`);
});