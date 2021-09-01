declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// eslint-disable-next-line camelcase
declare let __webpack_public_path__: string | undefined;

declare interface Window {
  // eslint-disable-next-line camelcase
  g_config?: any;
  resourceBaseUrl?: string;
}
