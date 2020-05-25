# `plugin-fast-refresh`

A ice.js plugin to enable Fast Refresh (also previously known as Hot Reloading) for React

## Usage

Installation

```bash
$ npm i build-plugin-fast-refresh -D
```

enable "Fast Refresh" in `build.json`

```json
{
  "plugins": [
    [
      "build-plugin-fast-refresh",
      {
        "reactRefresh": true
      }
    ]
  ]
}
```

