const randomNumberGenerator = (num) => {
  if (!num || isNaN(num)) {
    return Math.floor(Math.random() * 101);
  } else {
    return Math.floor(Math.random() * (num + 1));
  }
}

module.exports = {
  randomNumberGenerator
};
