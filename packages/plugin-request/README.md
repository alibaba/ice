# plugin-ice-request

use `request` or `useRequest` in icejs.

## Install

```bash
$ npm i --save build-plugin-ice-request
```

Add plugin to `build.json`:

```json
{
  "plugins": [
    "build-plugin-ice-request"
  ]
}
```

Set runtime options to `src/index.ts`:

```js
import { runApp } from 'ice';

const appConfig = {
  request: {
    // ref: https://github.com/axios/axios#request-config
    ...config,
    // ref: https://github.com/axios/axios#interceptors
    interceptors: {
      request: {
        onConfig: (config) => {},
        onError: (error) => {}
      },
      response: {
        onConfig: (config) => {},
        onError: (error) => {}
      },
    }
  }
};

runApp(appConfig);
```

## Usage

### request

```ts
import { request } from 'ice'

request('/api/repo')
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

### useRequest

```ts
import { useRequest } from 'ice'

const View = () => {
  const { loading, error, data, request } = useRequest({
    url: '/api/list',
    method: 'GET',
  })

  const list = data ? data.list : [];

  useEffect(() => {
    request();
  }, []);

  return (
    // do somethings
  )
}
```
## License

MIT
