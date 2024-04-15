# @ice/plugin-intl

`@ice/plugin-intl` is a ice.js plugin. It provides a simple way to add internationalization support to your application.

> `@ice/plugin-int` is based on `react-intl`.

## Install

```bash
$ npm i @ice/plugin-intl --save-dev
```

## Usage

Define the plugin in `ice.config.mts`:

```ts
import { defineConfig } from '@ice/app';
import intl from '@ice/plugin-intl';

export default defineConfig({
  plugins: [
    intl(),
  ],
});
```

Define locale config in `src/app.ts`:

```ts
import { defineAppConfig } from 'ice';
import type { LocaleConfig } from '@ice/plugin-intl/types';

export default defineAppConfig(() => ({}));

export const locale: LocaleConfig = {
  // Cutomize getLocale method and other options supported by react-intl.
  getLocale: () => 'en-US',
};
```

## Locales

Locales are defined in the `src/locales` directory. Each locale is defined in a separate file, with the locale name as the file name. For example, `en-US.ts`:

```ts
export default {
  'app.title': 'My Application',
  'app.welcome': 'Welcome to my application!',
};
```

Use the `useIntl` hook to access the current locale:

```tsx
import { useIntl } from 'ice';

export default function Home() {
  const intl = useIntl();
  console.log(intl.formatMessage({ id: 'new' }));
  return <h1>home</h1>;
}
```

Use the `intl` function to access the current locale:

```tsx
import { intl } from 'ice';

function alertMessage() {
  alert(intl.formatMessage({ id: 'app.welcome' }));
}
```
