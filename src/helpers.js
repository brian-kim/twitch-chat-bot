require('dotenv').config();
const axios = require('axios');
const moment = require('moment');

const { streamHeaders } = require('./variables');

const randomNumberGenerator = (num) => {
  const toInteger = parseInt(num);
  if (isNaN(toInteger)) {
    return Math.floor(Math.random() * 101);
  } else {
    return Math.floor(Math.random() * (toInteger + 1));
  }
}

// Update with weights later
const slotMachine = (emotes) => {
  const slotsOutcome = {
    slots: [],
    result: '',
  };

  slotsOutcome.slots.push(getRandomEmote(emotes), getRandomEmote(emotes), getRandomEmote(emotes));

  if (checkResult(slotsOutcome.slots)) {
    slotsOutcome.result = '/me We got a winner! POGSLIDE';
  } else {
    slotsOutcome.result = '/me Never lucky Sadge';
  }
  return slotsOutcome
}

const getRandomEmote = (emotes) => {
  const randomEmote = Math.floor(Math.random() * emotes.length);
  return emotes[randomEmote];
}

const checkResult = (slotsOutcome) => {
  if (slotsOutcome[0] === slotsOutcome[1] && slotsOutcome[0] === slotsOutcome[2]) {
    return true;
  } else {
    return false;
  }
}

const changeStreamInfo = (newInfo) => {
  axios.patch(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.STREAMER_CHANNEL_ID}`, newInfo, streamHeaders)
    .catch(err => console.log(err))
}

const changeStreamGame = async (gameName) => {
  const response = await axios.get(`https://api.twitch.tv/helix/games?name=${gameName}`, streamHeaders);
  const gameID = response.data.data[0].id;
  const newGame = {
    'game_id': gameID
  };
  changeStreamInfo(newGame);
}

const getstreamUptime = (streamStartTime) => {
  const startTime = streamStartTime;
  const currentTime = moment.utc();
  uptime = moment.duration(currentTime.diff(startTime));
  let hours = parseInt(uptime.asHours());
  let minutes = parseInt(uptime.asMinutes()) % 60;
  if (hours === 1) {
    hours += ' hour';
  } else if (hours > 1) {
    hours += ' hours';
  } else {
    hours = '';
  }
  if (minutes === 1) {
    minutes += ' minute';
  } else if (minutes > 1) {
    minutes += ' minutes';
  } else {
    minutes = '';
  }
  return `${hours} ${minutes}`;
}

module.exports = {
  randomNumberGenerator,
  slotMachine,
  changeStreamInfo,
  changeStreamGame,
  getstreamUptime
};
