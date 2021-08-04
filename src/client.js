const tmi = require('tmi.js');

const { clientVars } = require('./variables');

// Twitch docs can be found here: https://dev.twitch.tv/docs/
const client = new tmi.Client(clientVars);

module.exports = {
  client
}