# plugin-icestark

> Easy use [`icestark`](https://github.com/ice-lab/icestark) in [icejs](https://github.com/alibaba/ice).

## Usage

### Install

```bash
npm i -D @ice/plugin-icestark
```

### Framework Application

Configurate plugin to your `ice.config.mts`:

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';

export default defineConfig(() => ({
  plugins: [
    icestark({ type: 'framework' }),
  ],
}));
```

Through export `icestark` configuration of your framework application.

```ts title="src/app.ts"
import { defineFrameworkConfig } from '@ice/plugin-icestark/esm/types';

export const icestark = defineFrameworkConfig(() => ({
  getApps: () => ([]),
}));
```

**Options:**
 - `getApps`: get sub-application information, support async function
 - `appRouter`
   - `ErrorComponent`: error component
   - `LoadingComponent`: loading component
   - `NotFoundComponent`: 404 not found component
   - `shouldAssetsRemove`: check assets if it should be removed
 - `layout`: specify Framework application Layout

### Sub-application

Configurate plugin to your `ice.config.mts`:

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';

export default defineConfig(() => ({
  plugins: [
    icestark({ type: 'child' }),
  ],
}));
```

modify `icestark` exports in `src/app.ts`:

```ts title="src/app.ts"
// app.ts
import { defineChildConfig } from '@ice/plugin-icestark/esm/types';

export const icestark = defineChildConfig(() => ({
  mount: () => {},
  unmount: () => {},
}));
```

**Options:**
 - `mount`: excute before Sub-application mounted
 - `unmount`: excute after Sub-application unmounted