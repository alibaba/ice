// copy from react-router-dom, very simple, make size smaller
export const createSearchParams = (init) => {
  if (init === void 0) {
    init = '';
  }

  return new URLSearchParams(typeof init === 'string' || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
  }, []));
};
