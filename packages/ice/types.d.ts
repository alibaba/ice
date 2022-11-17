// CSS modules
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// images
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.ico' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.avif' {
  const src: string;
  export default src;
}

// media
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.webm' {
  const src: string;
  export default src;
}
declare module '*.ogg' {
  const src: string;
  export default src;
}
declare module '*.mp3' {
  const src: string;
  export default src;
}
declare module '*.wav' {
  const src: string;
  export default src;
}
declare module '*.flac' {
  const src: string;
  export default src;
}
declare module '*.aac' {
  const src: string;
  export default src;
}

// fonts
declare module '*.woff' {
  const src: string;
  export default src;
}
declare module '*.woff2' {
  const src: string;
  export default src;
}
declare module '*.eot' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const src: string;
  export default src;
}
declare module '*.otf' {
  const src: string;
  export default src;
}

// web worker
declare module '*?worker' {
  const workerConstructor: {
    new(): Worker;
  };
  export default workerConstructor;
}
declare module '*?worker&inline' {
  const workerConstructor: {
    new(): Worker;
  };
  export default workerConstructor;
}
declare module '*?sharedworker' {
  const sharedWorkerConstructor: {
    new(): SharedWorker;
  };
  export default sharedWorkerConstructor;
}

// other
declare module '*.pdf' {
  const src: string;
  export default src;
}
declare module '*.txt' {
  const src: string;
  export default src;
}
declare module '*?url' {
  const src: string;
  export default src;
}
declare module '*?raw' {
  const src: string;
  export default src;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    ICE_CORE_NODE_ENV: 'development' | 'production';
    ICE_CORE_MODE: string;
    ICE_CORE_ROUTER: 'true' | 'false';
    ICE_CORE_ERROR_BOUNDARY: 'true' | 'false';
    ICE_CORE_INITIAL_DATA: 'true' | 'false';
    ICE_CORE_DEV_PORT: number;
  }
}
