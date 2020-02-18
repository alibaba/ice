# `plugin-config`

> Define application config in icejs

## Usage

Set runtime options to `src/config.[t|j]s`:

```ts
const config = {
  config: {
    // only working in development environment
    dev: {

    },
    // only working in production environment
    prod: {

    },
    // default configuration working in production environment and development environment
    default: {
      appId: 'secret'
    }
  }
};

export default config;
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
import { config } from 'ice'

console.log(config)
```

## License

MIT
