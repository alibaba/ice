# build-plugin-stark-module

> Plugin for [icestark-module](https://github.com/ice-lab/icestark)

## Usage

```diff
// build.json
{
  "plugins": [
+    ["build-plugin-stark-module", {
      // ...options
    }]
  ]
}
```

**Options:**

- `outputDir`: final build dir
- `modules`: entries of multi-moudles, default `{ "index": "src/index" }`

```json
{
  "plugins": [
    ["build-plugin-stark-module", {
      "modules": {
        "branch-detail": "./src/branch-detail/index.tsx",
        "edit-info": "./src/edit-info/index.tsx"
      }
    }]
  ]
}
```

- `moduleExternals`: see [webpack externals](https://webpack.js.org/configuration/externals/#root), used to optimize loading performance for micro modules.

···json
{
  "plugins": [
    ...
    ["build-plugin-stark-module", {
      "moduleExternals": {
        "react": {
          "root": "React",
          "url": "https://g.alicdn.com/code/lib/react/16.14.0/umd/react.production.min.js",
        },
        "react-dom": {
          "root": "ReactDOM",
          "url": "https://g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.production.min.js"
        }
      }
    }],
		...
  ]
}
```

- `filenameStrategy`: how to name output, default to `./[name]/index`

- `minify`: see [minify](https://ice.work/docs/guide/basic/build#minify)

- `sourceMap`: see [sourceMap](https://ice.work/docs/guide/basic/build#sourceMap)

- `library`: custom name for umd resouces
