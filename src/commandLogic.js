const randomNumberGenerator = (num) => {
  const toInteger = parseInt(num);
  if (isNaN(toInteger)) {
    return Math.floor(Math.random() * 101);
  } else {
    return Math.floor(Math.random() * (toInteger + 1));
  }
}

module.exports = {
  randomNumberGenerator
};
