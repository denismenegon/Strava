// src/config.js
require('dotenv').config({ path: '../.env' }); 

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REDIRECT_URI = process.env.STRAVA_REDIRECT_URI;

const MAPS_ID = process.env.MAPS_ID;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  console.error("Certifique-se de que as variáveis CLIENT_ID, CLIENT_SECRET e REDIRECT_URI estão definidas no arquivo .env.");
  process.exit(1);
}

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
};