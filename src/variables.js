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

//Token generated from https://developer.spotify.com/console/get-users-currently-playing-track/?market=&additional_types=
const spotifyHeaders = {
  headers: {
    'Authorization': process.env.SPOTIFY_OAUTH_TOKEN,
  }
}

module.exports = {
  clientVars,
  streamHeaders,
  spotifyHeaders
};
