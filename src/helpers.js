require('dotenv').config();
const axios = require('axios');

const { streamHeaders } = require('./variables');

const randomNumberGenerator = (num) => {
  const toInteger = parseInt(num);
  if (isNaN(toInteger)) {
    return Math.floor(Math.random() * 101);
  } else {
    return Math.floor(Math.random() * (toInteger + 1));
  }
}

const changeStreamInfo = (newInfo) => {
  axios.patch(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.STREAMER_CHANNEL_ID}`, newInfo, streamHeaders)
    .catch(err => console.log(err))
}

const changeStreamGame = (gameName) => {
  axios.get(`https://api.twitch.tv/helix/games?name=${gameName}`, streamHeaders)
    .then(res => {
      newGame = {
        'game_id': res.data.data[0].id
      }
      changeStreamInfo(newGame);
    })
    .catch(err => console.log(err))
}

module.exports = {
  randomNumberGenerator,
  changeStreamInfo,
  changeStreamGame
};
