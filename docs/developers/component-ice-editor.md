---
title: 富文本编辑器接入
category: 项目开发手册
order: 1
---

## 初始化

引入编辑器所需的 CDN 资源（注意版本号），并实例化

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <!-- 引入编辑器样式 -->
  <link rel="stylesheet" type="text/css" href="https://g.alicdn.com/creator/editor/0.0.3/index.css">
  <title>飞冰富文本编辑器示例</title>
</head>

<body>
  <!-- 编辑器容器节点 -->
  <div id="J_container"></div>
  <!-- 引入编辑器JS -->
  <script type="text/javascript" charset="utf-8" src="https://g.alicdn.com/creator/editor/0.0.3/index.js"></script>
  <!-- 实例化编辑器 -->
  <script type="text/javascript">
    // 等待资源加载完成
    window.addEventListener("editorReady", function() {
      // 实例化
      window.IceEditor.init({
        container: 'J_container'
      });
    });
  </script>
</body>

</html>
```

## 获取编辑器内容

通过 `getHtml` 方法可以获取编辑器当前 Html

```js
window.IceEditor.getHtml();
```

## 自定义配置

### 字体大小

编辑器默认提供以下字体选择

![](https://img.alicdn.com/tfs/TB1HqMJDL1TBuNjy0FjXXajyXXa-494-314.png_200x200)

调整字体大小，可以在初始化编辑器时，进行如下配置(默认字体单位为 px）：

```
var config = {
  fontSize: [
    {
      text: '大',
      value: 20,
    }, {
      text: '中',
      value: 18,
    }, {
      text: '小',
      value: 14,
    }
  ]
};

IceEditor.init({
  container: 'ice_container',
  config: config
});
```

如需指定字体单位，例如 pt，可以配置 `unit` 字段：

```
fontSize: [
  {
    value: 14,
    unit: 'px'
  }, {
    value: 12,
    unit: 'px'
  }, {
    value: 14,
    unit: 'pt'
  }, {
    value: 12,
    unit: 'pt'
  }
]
```

![IMAGE](https://img.alicdn.com/tfs/TB1PGwIDL1TBuNjy0FjXXajyXXa-498-398.png_200x200)

### 字体颜色

配置 `fontColor` , 可以指定字体的可选颜色

```
var config = {
  fontColor: [{
    text: '基本黑色',
    value: '000000',
  }, {
    text: '常规文字',
    value: '051B28',
  }, {
    text: '辅助文字一',
    value: '3E3E3E',
  }, {
    text: '辅助文字二',
    value: '666666',
  }, {
    text: '辅助文字三',
    value: '999999',
  }]
};

IceEditor.init({
  container: 'ice_container',
  config: config
});
```

### 图片上传

启用图片上传功能，需要为图片插件配置上传接口的地址：

```
  var config = {
    image: {
        uploadApi: 'http://127.0.0.1:3030/upload' //修改为自定义的图片上传接口
    }
  };

  IceEditor.init({
    container: 'ice_container',
    config: config
  );
```

详细的接口格式要求可以参考这份[文档](https://github.com/alibaba/ice/wiki/Upload-%E7%BB%84%E4%BB%B6%E6%8E%A5%E5%8F%A3%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E7%BA%A6%E5%AE%9A)。

### 默认样式

如果需要定制编辑器的默认字号、字体颜色、行高等，可以在编辑器容器定义 `class` 后，采用覆盖样式的方式。

例如：

```
.xxx-editor-container .ice-editor h1 {
  font-size: 28px;
}
```

## 渲染内容

通过 `getHtml` 方法获取的 HTML，是不带编辑器的默认样式，只保留编辑的内容和通过编辑器工具栏配置的样式。渲染时，可以根据实际需要定义基础样式。

但如果需要加载编辑器的样式，可以引入下面的 css，并为渲染的容器节点加上 class `ice-rich-text-preview`。

css 地址：

https://g.alicdn.com/creator/editor/0.0.3/preview.css
