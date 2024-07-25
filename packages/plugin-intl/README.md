# @ice/plugin-intl

`@ice/plugin-intl` is a ice.js plugin. It provides a simple way to add internationalization support to your application.

> `@ice/plugin-intl` is based on `react-intl`.

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

## Simple mode

Simple mode for remove the dependency of `react-intl`:

Define the plugin in `ice.config.mts`:

```ts
import { defineConfig } from '@ice/app';
import intl from '@ice/plugin-intl';

export default defineConfig({
  plugins: [
    // Add intlSolution to remove the dependency of react-intl
    intl({ intlSolution: 'simple' }),
  ],
});
```

When you use the `simple` mode, you can only use the `intl.formateMessage` function to get the locale message:

```tsx
import { ice } from 'ice';

export default function Home() {
  console.log(intl.formatMessage({ id: 'new' }));
  return <h1>home</h1>;
}
```

Function `intl.formatMessage` is limited, you can only use the syntax below to get the locale message:

Simple Usage:

```tsx
intl.formatMessage({ id: 'app.welcome', defaultMessage: 'Welcome to my application!' });
intl.formatMessage('app.welcome');
```

With Variables:

```tsx
intl.formatMessage({ id: 'app.welcome' }, { name: 'icejs' });
```

> Caution: the message Syntax only support the pattern like `{name}`.
