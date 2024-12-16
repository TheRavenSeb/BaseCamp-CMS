const dotenv = require('dotenv');

/**
 * Load environment variables from a .env file, if it exists.
 */

dotenv.config()

const config = {
  DISCORD_TOKEN: process.env.D_TOKEN,
  DISCORD_CLIENT_ID: process.env.D_ID,
  DISCORD_CLIENT_SECRET: process.env.D_SECRET,
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  
};

module.exports = config;