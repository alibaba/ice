---
title: 前后端一体化 Serverless
order: 4
---

> #### 如果是阿里内部同学，请参考 [文档](https://yuque.alibaba-inc.com/ice/rdy99p/ds1xv0) 

------

基于 ServerLess 的能力，在前端项目中可以完成 api 的编写以及页面的渲染，不需要再创建一个后端应用。

## 应用创建

使用 VS Code Iceworks 插件可视化创建：

![](https://img.alicdn.com/tfs/TB1mWt5YuL2gK0jSZPhXXahvXXa-2049-970.png)

使用 CLI 创建：

```bash
$ npm init ice ice-app --template @icedesign/scaffold-midway-faas 
```

## 目录说明

```md
├── src/
│   ├── apis/                 
│   └── app.ts
├── build.json
├── f.yml
└── tsconfig.json
```

相比普通的前端项目新增了 `src/apis` 目录以及 `f.yml` 文件：

- `f.yml`: serverless 相关配置
- `src/apis`：编写后端函数

## 编写函数

在 `src/apis/lambda/` 目录新建 ts 文件即可编写函数：

```typescript
// src/apis/lambda/index.ts
export async function hello() {
  return {
    message: 'Hello ICE & Midway Serverless & Aliyun!',
  };
}
```

函数运行在 Node.js 环境中，可以理解为一段服务端代码，可以实现数据处理、DB 读写、服务调用等能力。这里导出的函数即对应一个个 HTTP 接口，在前端代码中可直接调用。

> 关于编写函数更完整的能力（比如获取 query 参数等）请参考 Midway 文档：https://www.yuque.com/midwayjs/faas/iwwlq2

## 调用函数

函数编写完成后，即可在前端代码中调用：

```diff
import React, { useState, useEffect } from 'react';
import { useRequest } from 'ice';
+import { hello } from '@/apis/lambda';

export default function Home() {
+  const { data, loading, request } = useRequest(() => hello());

  useEffect(() => {
+    request();
  }, []);

  return (
    <>请求函数结果：{ loading ? 'loading....' : data?.message }</>
  );
}
```

相比于传统的 HTTP 调用，一体化项目可以直接通过 `import` 的方式调用函数，在前后端约定、类型提示、联调等方面有非常大的效率提升。

## 函数部署

完成函数开发之后，即可将整个应用（函数+静态资源）部署到云平台，这里以阿里云为例：

```bash
$ npm i -g @midwayjs/faas-cli --registry=https://registry.npm.taobao.org
$ f deploy --npm cnpm # 发布函数（包含前端静态资源）
```

`f deploy` 需要填入一些信息：

- 阿里云账号的 Access Key：[访问](https://ram.console.aliyun.com/manage/ak)
- 提前开通阿里云的函数计算服务，有免费额度可以试用
- 更多：https://www.yuque.com/midwayjs/faas/deploy_aliyun_faq

发布完成后，阿里云会提供一个临时域名用于访问站点，比如：http://30791687-1052730113742573.test.functioncompute.com/

## 其他问题

### 函数是如何渲染 HTML 的？

`src/apis/render.ts` 即渲染 html 的函数

### 如何开启 SSR？

能力开发中……如果你很需要这个功能，欢迎通过 GitHub issue 反馈给我们，飞冰团队会根据需求度来加速该功能的开发。
