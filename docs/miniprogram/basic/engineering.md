---
title: 工程配置
order: 9
---

`build.json` 用于应用的工程构建配置。

## 开发调试

默认情况下，项目的 package.json 会配置以下命令：

```json
{
  "scripts": {
    "start": "icejs start",
    "build": "icejs build"
  }
}
```

## 构建配置

### targets

- 类型： `array` 
- 默认值：``

* `miniapp`：阿里小程序
* `wechat-miniprogram`：微信小程序

可选值：`["miniapp", "wechat-miniprogram]`

### alias

- 类型： `object` 
- 默认值： `` 

在 icejs 默认配置了 `{ "@": "./src/" }` 的规则，因此项目大多数时候不需要配置，配置完成后则可以更加简单的导入模块了：

```javascript
-import CustomTips from '../../../components/CustomTips';
+import CustomTips from '@/components/CustomTips';
```

### outputDir

- 类型：`string`
- 默认值：`build`

修改构建后的文件目录

```json
{
  "outputDir": "dist"
}
```

### lessLoaderOptions

- 类型：`object`
- 默认值：`{}`

为 less-loader 提供快捷配置，将与默认配置进行浅合并。详细配置可参考 [less-loader options](https://webpack.js.org/loaders/less-loader/#options)。

### eslint

- 类型：`boolean` | `object`
- 默认值：`false`

默认关闭 eslint 代码检测，如需开启配置为 `true` 即可。

```json
{
  "eslint": true
}
```

配置 eslint 相关选项，详见 [eslint-loader](https://github.com/webpack-contrib/eslint-loader)。

```json
{
  "eslint": {
    "quiet": true
  }
}
```

### tsChecker

- 类型：`boolean`
- 默认值：`false`

默认关闭 TypeScript 类型检测，如需开启配置为 `true` 即可。

```json
{
  "tsChecker": true
}
```

其他更多配置详见 [工程构建配置](https://ice.work/docs/guide/basic/build#%E5%B7%A5%E7%A8%8B%E6%9E%84%E5%BB%BA%E9%85%8D%E7%BD%AE)
