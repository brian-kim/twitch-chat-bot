require('dotenv').config();
const tmi = require('tmi.js');
const axios = require('axios');

const { clientVars, streamHeaders } = require('./clientVars');
const { randomNumberGenerator } = require('./commandLogic');

//Twitch docs can be found here: https://dev.twitch.tv/docs/
const client = new tmi.Client(clientVars);

client.connect();

client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
});

client.on('message', (channel, user, msg, self) => {
  // Ignore echoed messages.
  if (self) {
    return;
  };

  const args = msg.split(' ');
  const command = args.shift().toLowerCase();
  const commandArgs = args.join(' ');

  // Basic hello response
  if (command === '!hello') {
    client.say(channel, `Hey, what's up ${user.username}`);
  // Random number generator
  } else if (command === '!random') {
    const generatedNum = randomNumberGenerator(args[0]);
    client.say(channel, `${user.username} rolled ${generatedNum}`);
  // Shows random love percentage between user and message
  } else if (command === '!love') {
    const generatePercentage = randomNumberGenerator();
    client.say(channel, `There is ${generatePercentage}% love between ${user.username} and ${commandArgs}.`);
  // Change stream title
  } else if (user.username === process.env.STREAMER_USERNAME && command === '!title') {
    const newTitle = {
      'channel': {
        'status': commandArgs
      }
    };
    axios.put(`https://api.twitch.tv/v5/channels/${process.env.STREAMER_CHANNEL_ID}`, newTitle, streamHeaders)
      .then(client.say(channel, `Title changed to "${newTitle.channel.status}"`))
      .catch(err => console.log(err))
  // Change stream game
  } else if (user.username === process.env.STREAMER_USERNAME && command === '!game') {
    const newGame = {
      'channel': {
        'game': commandArgs
      }
    };
    axios.put(`https://api.twitch.tv/v5/channels/${process.env.STREAMER_CHANNEL_ID}`, newGame, streamHeaders)
      .then(client.say(channel, `Game changed to "${newGame.channel.game}"`))
      .catch(err => console.log(err))
  }
});
