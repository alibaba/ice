# @ice/plugin-canvas

An ice.js plugin for canvas projects.

## Usage

Add plugin in `ice.config.mts`:

```js
import { defineConfig } from 'ice';
import canvasPlugin from '@ice/plugin-canvas';

export default defineConfig(() => ({
  plugins: [canvasPlugin({ /* options */ })],
}));
```  
