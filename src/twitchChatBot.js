require('dotenv').config();
const tmi = require('tmi.js');

const { clientVars } = require('./variables');
const helpers = require('./helpers');

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
    const generatedNum = helpers.randomNumberGenerator(args[0]);
    client.say(channel, `${user.username} rolled ${generatedNum}`);
  // Shows random love percentage between user and message
  } else if (command === '!love') {
    const generatePercentage = helpers.randomNumberGenerator();
    client.say(channel, `There is ${generatePercentage}% love between ${user.username} and ${commandArgs}.`);
  // Only broadcaster or mods can change stream info
  // Change stream title
  } else if ((user.username === process.env.STREAMER_USERNAME || user.mod) && command === '!title') {
    const newInfo = {
      'title': commandArgs
    };
    helpers.changeStreamInfo(newInfo);
    client.say(channel, `Title has been changed to "${commandArgs}"`);
  // Change stream game
  } else if ((user.username === process.env.STREAMER_USERNAME || user.mod) && command === '!game') {
    helpers.changeStreamGame(commandArgs);
    client.say(channel, `Game has been changed to "${commandArgs}"`);
  }
});
