## build-plugin-dev-inspector

用于在本地调试时，快速定位页面上的组件所在的源码的位置。

Install:

```bash
$ npm i --save-dev build-plugin-dev-inspector
```

### 基础用法

在 `build.json` 中引入插件：

```json
{
  "plugins": [
    "build-plugin-dev-inspector"
  ]
}
```

完成上述配置后，则在本地调试的环境下，把鼠标 hover 到想要调试的元素，就会显示出遮罩框；再点击一下，会自动在编辑器中跳转到对应的文件中，并且跳转到对应的行和列。

示例：

![img](https://img.alicdn.com/imgextra/i4/O1CN01xDJWsb1fJAz3VPeGE_!!6000000003985-1-tps-1080-588.gif)
