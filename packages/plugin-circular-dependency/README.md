# build-plugin-circular-dependency

Detect modules with circular dependencies for [ice.js]([ice.js](https://github.com/alibaba/ice)) project.

## Usage

```
npm install --save-dev build-plugin-circular-dependency
```

Use plugin in ice.js. Edit [build.json](https://ice.work/docs/guide/basic/build#%E5%B7%A5%E7%A8%8B%E6%9E%84%E5%BB%BA%E9%85%8D%E7%BD%AE).

```
{
  "plugins": [
    "build-plugin-circulalr-dependency"
  ]
}
```

## Others
- Based on [circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin)
