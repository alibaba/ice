# plugin-build-prerender

> plugin for icejs to support Prerender which is based on [plugin-spa-plugin](https://www.npmjs.com/package/prerender-spa-plugin).

## Usage

### use in SPA

`build.json`:

```json
{
  "plugins": [
    [
      "build-plugin-prerender",
      {
        "routes": [
          "/",
          "/about",
          "/dashboard"
        ],
        "minify": {
          "collapseBooleanAttributes": true,
          "collapseWhitespace": true,
          "decodeEntities": true,
          "keepClosingSlash": true,
          "sortAttributes": true
        },
        "renderer": {
          "headless": false
        }
      }
    ]
  ]
}
```
- routes: string[]. Routes to render.
- minify: object. To minify the resulting HTML.
- renderer: object. Renderer options. The default renderer is [PuppeteerRenderer](https://github.com/JoshTheDerf/prerenderer/tree/master/renderers/renderer-puppeteer).

For more detail, you can see [prerender-spa-plugin](https://www.npmjs.com/package/prerender-spa-plugin#advanced-usage--webpackconfigjs-)

Run `npm run build`

```
├── about
|  └── index.html
├── dashboard
|  └── index.html
├── favicon.png
├── index.html
└── js
   └── index.js
```

### use in MPA

```json
{
  "mpa": true,
  "plugins": [
    [
      "build-plugin-prerender",
      {
        "routes": [
          "/about",
          "/dashboard"
        ],
        "minify": {
          ...
        },
        "renderer": {
          ...
        }
      }
    ]
  ]
}
```

Run `npm run build`

```
├── dashboard
|  └── index.html
├── home
|  └── index.html
└── js
   ├── dashboard.js
   ├── home.js
   └── vendor.js
```
