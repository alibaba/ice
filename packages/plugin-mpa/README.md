# plugin-ice-mpa

> plugin for icejs to support mpa

## Usage

modify build options to enable mpa

`build.json`:

```json
{
  "mpa": true
}
```

config router in each `app.[t|j]s` under `src/pages`

```js
import { runApp } from 'ice'
import Dashboard from './index'

const appConfig = {
  router: {
    routes: [{ path: '/', component: Dashboard }],
  },
}

runApp(appConfig)
```
