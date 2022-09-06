# ICE Request Plugin

## Usage

Install from npm.

```bash
$ npm i @ice/plugin-request -S
```

Add plugin.

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import request from '@ice/plugin-request';

export default defineConfig({
  plugins: [
    request(),
  ],
});
```

## API

### request

```js title="service.ts"
import { request } from 'ice';

export async function getUser(id) {
  return await request(`/api/user/${id}`);
}
```

### useRequest

```js title="home.tsx"
import { useEffect } from 'react';
import { useRequest } from 'ice';

export default function Home() {
  const {
    data,
    error,
    loading,
    request
  } = useRequest(service.getUser);

  useEffect(() => {
    request();
  }, []);

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data || loading) {
    return <div>loading...</div>;
  }
  return (
    <h2 className={styles.title}>
      Name: {data.name} Age: {data.age}
    </h2>
  );
}
```
