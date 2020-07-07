# plugin-core

The core plugin for icejs.

## Runtime in `src/app.ts`

```js
import { createApp } from 'ice'

const appConfig = {
  app: {
    // default: ice-container
    rootId: 'ice-container',
    // default: document.getElementById(rootId)
    mountNode: document.getElementById('ice-container'),
  }
};

createApp(appConfig)
```

## Build abilities

- alias `ice` -> `.ice/index`
- alias `@` -> `src`
- alias `react/react-dom/react-router-dom`, ensure all runtime.ts use the same package

## Generate `.ice`

generate `.ice`

## Support APIs for plugin

`plugin/src/plugin.ts`:

```js
export default async function ({
  getValue,
  applyMethod,
  onHook,
  context,
}) {
  const { rootDir, command } = context;

  // get src/.ice path
  const icePath = getValue('ICE_TEMP');
  // ts/js
  const projectType = getValue('PROJECT_TYPE');

  // modify .ice/createApp.ts
  applyMethod('addEntryImports');
  applyMethod('addEntryCode');

  // modify .ice/index.ts
  applyMethod('addIceExport');
  applyMethod('removeIceExport');

  // modify .ice/pages/*/index.ts
  applyMethod('addPageExport');
  applyMethod('removePageExport');

  // get src/pages/*
  const pages = applyMethod('getPages', rootDir);

  // watch src files
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /stores\/.*/, (event, filepath) => {
      console.log('file changed', filepath);
    });
  });
}
```

## Support APIs for module of plugin

`plugin/src/runtime.ts`:

```js
export default ({
  setRenderRouter,
  addProvider,
  appConfig,
}) => {
  // do something...
}
```

## License

MIT
