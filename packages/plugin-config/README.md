# `plugin-config`

> Define application config in icejs

## Install

```bash
$ npm i --save build-plugin-ice-config
```

Add plugin to `build.json`:

```json
{
  "plugins": [
    "build-plugin-ice-config"
  ]
}
```

Set runtime options to `src/app.ts`:

```ts
import { createApp } from 'ice';

const appConfig = {
  config: {
    // only working in development environment
    dev: {

    },
    // only working in production environment
    prod: {

    },
    // common configuration working in production environment and development environment
    common: {
      appId: 'secret'
    }
  }
};

createApp(appConfig);
```

Set `mode` options to `package.json`:

```json
"scripts": {
  "start": "icejs start --mode dev",
  "build": "icejs build --mode prod"
},
```

## Usage

```ts
import { useApp } from 'ice'

const View = () => {
  const { config } = useApp()
  // console.log(config)
}
```

or

```ts
import { config } from 'ice'

// console.log(config)
```

## License

MIT
