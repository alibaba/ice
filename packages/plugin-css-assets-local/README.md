# @ice/plugin-css-assets-local

An ice.js plugin for localize css assets resource.

## Install

```bash
npm i -D @ice/plugin-css-assets-local
```

## Usage

Add plugin to your `ice.config.mts`:

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import cssAssetsLocal from '@ice/plugin-css-assets-local';

export default defineConfig(() => ({
  plugins: [
    cssAssetsLocal(),
  ],
}));
```

After running `npm run build`, you can see asset resources will be downloaded to your local disk.

## Options

### `outputPath`

The assets resource output path.

- Type: `string`
- Default: `"assets"`

### `relativeCssPath`

The asset paths relative to the css file path.

- Type: `string`
- Default: `"../"`

### `enableInDev`

Whether enable the plugin in dev or not.

- Type: `boolean`
- Default: `false`
