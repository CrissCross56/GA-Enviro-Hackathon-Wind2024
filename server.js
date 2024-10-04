const express = require("express");
const path = require("path");
const logger = require("morgan");



const app = express();

// Middleware setup
app.use(logger("dev"));
app.use(express.json());

// ... [API routes and auth middleware]

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
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});