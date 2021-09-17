# plugin-icestark

> Easy use [`icestark`](https://github.com/ice-lab/icestark) in icejs.

## Usage

### Framework Application

Through `appConfig` configuration of your framework application.

```js
const appConfig = {
  ...
  icestark: {
    type: 'framework',
    getApps: () => {
      return [{
        path: '/seller',
        title: '商家平台',
        url: [
          '//ice.alicdn.com/icestark/child-seller-react/index.js',
          '//ice.alicdn.com/icestark/child-seller-react/index.css',
        ],
      }];
    },
  },
};
```

**Options:**

 - `type`: config framework to enable Framework application
 - `getApps`: get sub-application information, support async function
 - `appRouter`
   - `ErrorComponent`: error component
   - `LoadingComponent`: loading component
   - `NotFoundComponent`: 404 not found component
   - `shouldAssetsRemove`
 - `removeRoutesLayout`: remove global Layout when config `true`
 - `AppRoute`: custom AppRoute component
 - `Layout`: specify Framework application Layout, use `layouts/index` as default if exisit

### Sub-application

modify `appConfig`:

```js
// app.ts
const appConfig = {
  ...
  icestark: {
    type: 'child',
  },
};
```

**Options:**
 - `type`: config `child` to enable Sub-application
