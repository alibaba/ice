---
title: 构建发布
order: 8
---

## 构建

通过运行 build 命令令可以快速构建小程序应用。

```bash
$ npm run build
```

**构建产物**

构建产物置于 `build/` 目录下。

**多端构建**

多端应用会构建出不同平台的代码（目录名标示平台），例如在 `build.json` 配置如下：

```json
{
  "targets": ["miniapp", "wechat-miniprogram"]
}
```

则构建产物目录如下：

```markdown
build
├─miniapp             // 阿里小程序
├─wechat-miniprogram  // 微信小程序
```


## 发布

构建完成后，根据需要发布的小程序平台发布流程进行发布即可。

- [支付宝小程序发布流程](https://opendocs.alipay.com/mini/introduce/release)
- [微信小程序发布流程](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/release.html#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%9A%84%E7%89%88%E6%9C%AC)
