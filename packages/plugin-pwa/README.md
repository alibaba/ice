# README

> plugin for icejs to create progressive web app

## Usage

modify build options to enable pwa:

```json
{
  "pwa": true
}
```

## Options

- `dev`: whether to disable pwa in `dev`.
- `basename`: app basename.
- `scope`: url scope for pwa.
- `runtimeCaching`: caching strategies.
- `skipWaiting`: whether to call `skipWaiting` when newer service worker takes in control.

More setting options can be found [here](https://ice.work/docs/guide/advanced/pwa).

