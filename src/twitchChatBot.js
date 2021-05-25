require('dotenv').config();
const axios = require('axios');

const { client } = require('./client');
const { streamHeaders } = require('./variables');
const helpers = require('./helpers');

client.connect();

client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
});

client.on('message', (channel, user, msg, self) => {
  // Ignore echoed messages.
  if (self) {return};

  const args = msg.split(' ');
  const command = args.shift().toLowerCase();
  const commandArgs = args.join(' ');

  // Basic hello response
  if (msg === 'hello' || msg === 'hi' || msg === 'hey') {
    client.say(channel, `Hey ${user.username} AYAYA`);
  // Random number generator
  } else if (command === '!random') {
    const generatedNum = helpers.randomNumberGenerator(args[0]);
    client.say(channel, `${user.username} rolled ${generatedNum}`);
  // Shows random love percentage between user and message
  } else if (command === '!love') {
    const generatePercentage = helpers.randomNumberGenerator();
    /* Add logic when there is no arguments after the command */
    client.say(channel, `There is ${generatePercentage}% love between ${user.username} and ${commandArgs}.`);
  // Get the current stream title
  } else if (command === '!slots') {
    /* Maybe put axios calls into async/await functions instead? */
    axios.get(`https://decapi.me/bttv/emotes/${process.env.STREAMER_USERNAME}`)
      .then(res => {
        const emotes = res.data.split(' ');
        const slotsResult = helpers.slotMachine(emotes);
        client.say(channel, `/me ${slotsResult.slots[0]} | ${slotsResult.slots[1]} | ${slotsResult.slots[2]}`);
        client.say(channel, slotsResult.result);
      })
      .catch(err => console.log(err))
  // Get current stream uptime
  } else if (command === '!uptime') {
    /* Maybe put axios calls into async/await functions instead? */
    axios.get(`https://api.twitch.tv/helix/search/channels?query=danboorubox`, streamHeaders)
      .then(res => {
        const startTime = res.data.data[0].started_at;
        // Add logic for when stream is offline
        client.say(channel, `Stream has been live for ${helpers.getstreamUptime(startTime)}`)
      })
      .catch(err => console.log(err))
  // Allow broadcaster or mod to change stream title
  } else if ((user.username === process.env.STREAMER_USERNAME || user.mod) && (command === '!title' && commandArgs !== '')) {
    const newInfo = {
      'title': commandArgs
    };
    helpers.changeStreamInfo(newInfo);
    client.say(channel, `Title has been changed to "${commandArgs}"`);      
  // Allow broadcaster or mod to change stream game
  } else if ((user.username === process.env.STREAMER_USERNAME || user.mod) && (command === '!game' && commandArgs !== '')) {
    if (commandArgs === 'unlisted' || commandArgs === 'unset') {
      helpers.changeStreamInfo({game_id: 0});
      client.say(channel, `Game has been ${commandArgs}`);
    } else {
      helpers.changeStreamGame(commandArgs);
      client.say(channel, `Game has been changed to "${commandArgs}"`);
    }
  // Get current stream title
  } else if (command === '!title') {
    /* Maybe put axios calls into async/await functions instead? */
    axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.STREAMER_CHANNEL_ID}`, streamHeaders)
      .then(res => client.say(channel, `Current title: ${res.data.data[0].title}`))
      .catch(err => console.log(err))
  // Get current stream game
  } else if (command === '!game') {
    /* Maybe put axios calls into async/await functions instead? */
    axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.STREAMER_CHANNEL_ID}`, streamHeaders)
      .then(res => client.say(channel, `Current game: ${res.data.data[0].game_name}`))
      .catch(err => console.log(err))
  }
});
