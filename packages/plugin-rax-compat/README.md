# @ice/plugin-rax-compat

ICE plugin for migrating `rax-app` project into `ICE`.

## Usage

add plugin in `ice.config.ts`:

```js
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig({
  plugins: [compatRax(options)],
});
```

## Options

- inlineStyle: 
  - Enable stylesheet loader to import css file.
  - default to `false`
  
