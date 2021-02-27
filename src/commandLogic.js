const randomNumberGenerator = (num) => {
  if (!num || typeof num !== 'number') {
    return Math.floor(Math.random() * 101);
  } else {
    return Math.floor(Math.random() * (num + 1));
  }
}

module.exports = {
  randomNumberGenerator
}
