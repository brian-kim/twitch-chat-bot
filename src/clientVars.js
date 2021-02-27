require('dotenv').config();

const clientVars = {
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    // Your bot's username
    username: process.env.BOT_USERNAME,
    // Token from https://twitchapps.com/tmi/
    password: process.env.BOT_OAUTH_TOKEN
  },
  // Streams you want your bot to be in
  channels: [process.env.STREAMER_USERNAME]
};

// Headers required to change stream title/game
const streamHeaders = {
  headers: {
    // Client-ID from https://dev.twitch.tv/console/apps
    'Client-ID': process.env.BOT_CLIENT_ID,
    // Token from https://twitchapps.com/tmi/
    'Authorization': process.env.BOT_AUTHORIZATION,
    'Accept': 'application/vnd.twitchtv.v2+json',
    'Content-Type': 'application/json'
  }
}

module.exports = {
  clientVars,
  streamHeaders
}