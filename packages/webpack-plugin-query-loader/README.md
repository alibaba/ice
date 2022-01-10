# query-loader-webpack-plugin

webpack plugin for handling static assets with specified query

## import asset as string

```js
import string from './text.txt?raw';
```

## import script as a Worker

Separate chunk in production build

```js
import Worker from './worker.js?worker'
```

Shared Worker

```js
import Worker from './worker.js?sharedworker'
```

inline worker

```js
import Worker from './worker.js?worker&inline'
```

## explicit url imports

```js
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL)
```
