require('dotenv').config();
const axios = require('axios');

const { client } = require('./client');
const { streamHeaders, spotifyHeaders } = require('./variables');
const helpers = require('./helpers');

client.connect();

client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
});

client.on('message', (channel, user, msg, self) => {
  // Ignore echoed messages.
  if (self) {return};

  const args = msg.split(' ');
  const cmd = args.shift().toLowerCase();
  const cmdArgs = args.join(' ');

  /* todo: change if else to switch case */

  // Basic hello response
  if (msg === 'hello' || msg === 'hi' || msg === 'hey') {
    client.say(channel, `Hey ${user.username} AYAYA`);
  // Displays all cmds available
  } else if (msg === '!cmds') {
    client.say(channel, `!love !hate !slots !uptime !song !8ball !game !title`);
  // deletes kendall
  } else if (msg === '!kudastop') {
    client.say(channel, '/timeout fzpowder 1');
  // Random number generator
  } else if (cmd === '!random') {
    const generatedNum = helpers.randomNumberGenerator(args[0]);
    client.say(channel, `${user.username} rolled ${generatedNum}`);
  // Shows random love percentage between user and message
  } else if (cmd === '!love') {
    const generatePercentage = helpers.randomNumberGenerator();
    if (!cmdArgs) {
      client.say(channel, 'Please enter something to test your love with.');
    } else {
      client.say(channel, `There is ${generatePercentage}% love between ${user.username} and ${cmdArgs}.`);
    }
  // Shows random hate percentage between user and message
  } else if (cmd === '!hate') {
    const generatePercentage = helpers.randomNumberGenerator();
    if (!cmdArgs) {
      client.say(channel, 'Please enter something to test your hate with.');
    } else {
      client.say(channel, `There is ${generatePercentage}% hate between ${user.username} and ${cmdArgs}.`);
    }
  // Get the current stream title
  } else if (cmd === '!slots') {
    /* Maybe put axios calls into async/await functions instead? */
    axios.get(`https://decapi.me/bttv/emotes/${process.env.STREAMER_USERNAME}`)
      .then(res => {
        const emotes = res.data.split(' ');
        const slotsResult = helpers.slotMachine(emotes);
        client.say(channel, `/me ${slotsResult.slots[0]} | ${slotsResult.slots[1]} | ${slotsResult.slots[2]}`);
        client.say(channel, slotsResult.result);
      })
      .catch(err => console.log(err))
  // Gives random outcome to user message
  } else if (cmd === '!8ball') {
    client.say(channel, `${helpers.EightBall()}`);
  // Get current Spotify song
  // Spotify docs can be found here https://developer.spotify.com/documentation/general/guides/authorization-guide/
  } else if (cmd === '!song') {
    axios.get('https://api.spotify.com/v1/me/player/currently-playing', spotifyHeaders)
      .then(res => {
        if (res.data.item === undefined) {
          client.say(channel, 'No song playing.')
        } else {
          const songInfo = helpers.getCurrentSong(res.data.item);
          client.say(channel, `${songInfo.artists} - ${songInfo.title}`);
        }
      })
      .catch(() => helpers.refreshSpotifyToken());
    // Get current stream uptime
    } else if (cmd === '!uptime') {
    /* Maybe put axios calls into async/await functions instead? */
    axios.get(`https://api.twitch.tv/helix/search/channels?query=danboorubox`, streamHeaders)
      .then(res => {
        const startTime = res.data.data[0].started_at;
        const uptime = helpers.getstreamUptime(startTime);
        if (uptime === ' ') {
          client.say(channel, 'Stream is currently offline.');
        } else {
          client.say(channel, `Stream has been live for ${uptime}`);
        }
      })
      .catch(err => console.log(err))
  // Allow broadcaster or mod to change stream title
  } else if ((user.username === process.env.STREAMER_USERNAME || user.mod) && (cmd === '!title' && cmdArgs !== '')) {
    const newInfo = {
      'title': cmdArgs
    };
    helpers.changeStreamInfo(newInfo);
    client.say(channel, `Title has been changed to "${cmdArgs}"`);      
  // Allow broadcaster or mod to change stream game
  } else if ((user.username === process.env.STREAMER_USERNAME || user.mod) && (cmd === '!game' && cmdArgs !== '')) {
    if (cmdArgs === 'none' || cmdArgs === 'unset') {
      helpers.changeStreamInfo({game_id: 0});
      client.say(channel, `Game has been ${cmdArgs}`);
    } else {
      helpers.changeStreamGame(cmdArgs);
      client.say(channel, `Game has been changed to "${cmdArgs}"`);
    }
  // Get current stream title
  } else if (cmd === '!title') {
    /* Maybe put axios calls into async/await functions instead? */
    axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.STREAMER_CHANNEL_ID}`, streamHeaders)
      .then(res => client.say(channel, `Current title: ${res.data.data[0].title}`))
      .catch(err => console.log(err))
  // Get current stream game
  } else if (cmd === '!game') {
    /* Maybe put axios calls into async/await functions instead? */
    axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.STREAMER_CHANNEL_ID}`, streamHeaders)
      .then(res => {
        if (res.data.data[0].game_name === '') {
          client.say(channel, 'No game set currently.')
        } else {
          client.say(channel, `Current game: ${res.data.data[0].game_name}`)
        }
      })
      .catch(err => console.log(err))
  }
});
