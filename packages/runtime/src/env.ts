interface GlobalEnv {
  __IS_SERVER__: boolean;
}

let globalPolyfill: unknown = typeof globalThis !== 'undefined' ? globalThis : null;

if (!globalPolyfill) {
  // add polyfill to globalThis
  // eslint-disable-next-line no-nested-ternary
  globalPolyfill = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : {});
}

const isServer = (globalPolyfill as GlobalEnv).__IS_SERVER__;

export {
  isServer,
};
