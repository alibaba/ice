function toFixed(number, precision) {
  // eslint-disable-next-line
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);

  return Math.round(wholeNumber / 10) * 10 / multiplier;
}

// transform to vw
function transformToVw(value) {
  const defaults = {
    viewportWidth: 750,
    viewportUnit: 'vw',
    unitPrecision: 5,
  };

  const pixels = parseFloat(value);
  const parsedVal = toFixed(pixels / defaults.viewportWidth * 100, defaults.unitPrecision);
  return parsedVal + defaults.viewportUnit;
};

export default transformToVw;
