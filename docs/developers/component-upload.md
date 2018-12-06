---
title: 组件 Upload 接口数据格式约定
category: 项目开发手册
order: 2
---

#### onChange

文件状态改变的回调，返回为：

```js
{
  file: { ... },
  fileList: [ ... ],
  event: { ... }
}
```

- `file` 当前操作的文件对象。

```js
{
  uid: 'uid', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
  name: 'xx.png', // 文件名
  status: 'done', // 状态有：uploading done error removed
  response: '{"status":"success"}', // 服务端响应内容
  fileURL: '<http://kfupload.alibaba.com/kf-down/HTB1dRttMXXXXXaxaXXXq6xXFXXXU.jpg?size=23616&height=200&width=200&hash=58d62cf6a9633667b9d728d7120a9350>',
  imgURL: '<http://kfupload.alibaba.com/kf-down/HTB1dRttMXXXXXaxaXXXq6xXFXXXU.jpg?size=23616&height=200&width=200&hash=58d62cf6a9633667b9d728d7120a9350>',
}
```

如果上传控件是 multiple 时，此参数将为一个对象数组 `[file, ...]`。

- `fileList` 当前的文件列表。
- `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

#### onSuccess(res, file)

- `res` 后台返回的响应信息。
- `file` 当前操作的文件对象。

```js
{
  uid: 'uid', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
  name: 'xx.png', // 文件名
  status: 'done', // 状态有：uploading done error removed
  response: '{"status":"success"}', // 服务端响应内容
  fileURL:
    '<http://kfupload.alibaba.com/kf-down/HTB1dRttMXXXXXaxaXXXq6xXFXXXU.jpg?size=23616&height=200&width=200&hash=58d62cf6a9633667b9d728d7120a9350>',
  imgURL:
    '<http://kfupload.alibaba.com/kf-down/HTB1dRttMXXXXXaxaXXXq6xXFXXXU.jpg?size=23616&height=200&width=200&hash=58d62cf6a9633667b9d728d7120a9350>',
};
```

#### onRemove(file, fileList)

- `file` 当前操作的文件对象。

```js
{
  uid: 'uid', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
  name: 'xx.png', // 文件名
  status: 'removed', // 状态
  response: '{"status": "success"}', // 服务端响应内容
  fileURL: '<http://kfupload.alibaba.com/kf-down/HTB1dRttMXXXXXaxaXXXq6xXFXXXU.jpg?size=23616&height=200&width=200&hash=58d62cf6a9633667b9d728d7120a9350>',
  imgURL: '<http://kfupload.alibaba.com/kf-down/HTB1dRttMXXXXXaxaXXXq6xXFXXXU.jpg?size=23616&height=200&width=200&hash=58d62cf6a9633667b9d728d7120a9350>',
}
```

- `fileList` 当前的文件列表。

#### 显示下载链接

请使用 fileList 属性设置数组项的 url 属性进行展示控制。

#### 返回数据格式要求

```js
// 标准 JSON 字符串
{
  "code": "0",                                           // 状态码，0 代表成功
  "imgURL": "http://kfupload.alibaba.com/a.png",         // 图片预览地址
  "downloadURL": "http://kfupload.alibaba.com/a.png",    // 文件下载地址 (可选)
  "size": "1024",                                        // 文件大小 (可选)
  "fileHeight": "50",                                    // 图片高度，非图片类型不需要 (可选)
  "fileWidth": "50",                                     // 图片宽度，非图片类型不需要 (可选)
  "fileMd5": "ddahsjccbajh"                              // 文件 hash 值 (可选)
}
```

#### 后端数据格式化

通过 `formatter` 将来自后端的不规则数据转换为符合组件要求的数据格式

- `假设` 服务器的响应数据如下

```js
{
 "status": "success", // 上传成功返回码
 "img_src": "<http://kfupload.alibaba.com/a.jpg>", // 图片链接
 "img_size": 1024 // 文件大小
}
```

- 转换方法

```js
// 函数里面根据当前服务器返回的响应数据
// 重新拼装符合组件要求的数据格式
function formatter(res) {
  return {
    code: res.status === 'success' ? '0' : '1',
    imgURL: res.img_src,
    size: res.img_size,
  };
}
```

## IE9 兼容性

- ie9 下用因为使用 iframe 作为无刷新上传方案，必须保证表单页面的域名和上传的服务器端的域名相同。
- ie9 下服务器端返回数据需要设置头部 `context-type` 为 `text/html`，不要设置为 `application/json`
- 如果只是一级域名相同（`taobao.com` 为一级域名 `shop.taobao.com` 为二级域名），可以通过降域的方式实现跨域上传。

假设你表单页面的域是：shop.taobao.com，而上传的服务器端路径却是 upload.taobao.com。服务端返回必须带额外 scrip t 标签

```html
<script>document.domain = "taobao.com";</script>
{"status":1,"type":"ajax","name":"54.png","url":".\/files\/54.png"}
```

iframe 上传会额外传递参数 `_documentDomain` 方便你设置域名
