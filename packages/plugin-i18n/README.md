# @ice/plugin-i18n

组件功能描述

## Install

```bash
$ npm i @ice/plugin-i18n --save-dev
```

## Usage

```ts
import { defineConfig } from '@ice/app';
import i18n from '@ice/plugin-i18n';

export default defineConfig({
  plugins: [
    i18n({
      locales: ['zh-CN', 'en-US'],
      defaultLocale: 'zh-CN',
    }),
  ],
});
```

## Options

### `locales`

- **type:** `string[]`

The locales you want to support in your app. This option is required.

### defaultLocale

- **type:** `string`

The default locale you want to be used when visiting a non-locale prefixed path. This option is required.

### autoRedirect

- **type:** `boolean`
- **default:** `true`

Redirect to the preferred locale automatically. This option should be used with the middleware which the plugin export. If you deploy your application in production, you should use:


