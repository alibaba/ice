# plugin-logger

Use builtin logger in icejs.

## Usage

Set runtime options to `src/app.ts`:

```ts
import { APP_MODE } from 'ice'

const appConfig = {
  // set loglevel
  logger: {
    level: APP_MODE === 'development' ? 'error' : 'warn'
  }
}
```

Using a logger in the components

```js
import { logger } from 'ice'

const View = () => {
  // here
  logger.error('error message')

  return (
    // jsx code
  )
}
```

## License

MIT
