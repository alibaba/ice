import { Logger, Transport } from 'egg-logger';

class ConsoleTransport extends Transport {
  log(level, args, meta) {
    const msg = super.log(level, args, meta);
    return console[level.toLowerCase()](msg);
  }
}

function pad(number, zeros) {
  zeros = zeros || 2;
  return (new Array(zeros + 1).join('0') + number).substr(-zeros, zeros);
}

const format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}';
function formatTimeZone(minutesOffset) {
  var m = Math.abs(minutesOffset);
  return (minutesOffset >= 0 ? '-' : '+')
    + pad(Math.floor(m / 60)) + ':'
    + pad(m % 60);
}

const logger = new Logger();
logger.set('console', new ConsoleTransport({
  level: 'DEBUG',
  formatter: function(meta) {
    const {level, message} = meta;
    const date = new Date();
    return format
      .replace('{level}', level)
      .replace('{text}', message)
      .replace('{y}', String(date.getFullYear()))
      .replace('{m}', pad(date.getMonth() + 1))
      .replace('{d}', pad(date.getDate()))
      .replace('{h}', pad(date.getHours()))
      .replace('{i}', pad(date.getMinutes()))
      .replace('{s}', pad(date.getSeconds()))
      .replace('{ms}', pad(date.getMilliseconds(), 3))
      .replace('{z}', formatTimeZone(date.getTimezoneOffset()));
  }
}));

export default logger;