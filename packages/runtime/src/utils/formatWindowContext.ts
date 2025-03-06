import type { WindowContext } from '../types.js';

const DATA_KEYS = ['appData', 'loaderData', 'serverData'];

export const encodeWindowContext = (context: WindowContext) => {
  const encodedContext = {};
  Object.keys(context).forEach((key) => {
    if (DATA_KEYS.includes(key) && context[key]) {
      encodedContext[key] = encodeURI(JSON.stringify(context[key]));
    } else {
      encodedContext[key] = context[key];
    }
  });
  return encodedContext;
};

export const decodeWindowContext = (context: WindowContext) => {
  const decodedContext = {};
  Object.keys(context).forEach((key) => {
    if (DATA_KEYS.includes(key) && typeof context[key] === 'string') {
      decodedContext[key] = JSON.parse(decodeURI(context[key]));
    } else {
      decodedContext[key] = context[key];
    }
  });
  return decodedContext as WindowContext;
};
