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
// Token generated from https://twitchtokengenerator.com/
const streamHeaders = {
  headers: {
    'Client-ID': process.env.BOT_CLIENT_ID,
    'Authorization': process.env.BOT_AUTHORIZATION,
  }
}

module.exports = {
  clientVars,
  streamHeaders
};
