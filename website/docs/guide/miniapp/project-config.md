---
title: 原生项目工程配置
order: 7
---

各个小程序端均存在自己的项目工程配置，存放于一个单独的 json 文件中，对应名称如下：

- 微信小程序：`project.config.json`

- 阿里小程序：`mini.project.json`

在 ice.js 中，你可以在小程序开发的插件中使用 `nativeConfig` 字段来进行相应的配置。编译完成后，该字段的内容将被写入项目配置文件中：

```ts title=ice.config.mts
import miniapp from '@ice/plugin-miniapp';

export default defineConfig({
  plugins: [miniapp({
    nativeConfig: {
      appid: '<your-app-id>'
    }
  })],
});
```

参考文档：

- [微信小程序项目配置文件](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)

- [阿里小程序编译配置](https://opendocs.alipay.com/mini/03dbc3)
