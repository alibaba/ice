// https://github.com/myrne/performance-now
export let now: () => number;

(function () {
  let loadTime;
  if ((typeof performance !== 'undefined' && performance !== null) && performance.now) {
    now = () => performance.now();
  } else if (Date.now) {
    loadTime = Date.now();
    now = () => Date.now() - loadTime;
  } else {
    loadTime = new Date().getTime();
    now = () => new Date().getTime() - loadTime;
  }
})();

let lastTime = 0;

// https://gist.github.com/paulirish/1579671
// https://gist.github.com/jalbam/5fe05443270fa6d8136238ec72accbc0
const raf = function (callback) {
  const _now = now();
  // First time will execute it immediately but barely noticeable and performance is gained.
  const nextTime = Math.max(lastTime + 16, _now);
  return setTimeout(() => { callback(lastTime = nextTime); }, nextTime - _now);
};

const caf = function (seed) {
    // fix https://github.com/NervJS/taro/issues/7749
    clearTimeout(seed);
  };

export {
  caf,
  raf,
};
