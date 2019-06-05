---
title: Vue 物料开发指南
order: 7
---

> 工程统一使用 Vue CLI

## 开发业务组件

**暂时不支持，需要确定组件开发及构建规范。**

## 使用 element-ui

### 1. 将 vue 和 element 作为 npm 依赖

区块请移除 `demo/index.html` 里的 script 标签，建议将 `.template/block` 一起改掉

```diff
// demo/index.html
- <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
- <script src="https://cdn.jsdelivr.net/npm/vue"></script>
- <script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

执行命令：

```bash
npm install vue element-ui --save
```

### 2. 在入口文件里引入并注册 element 组件

- 区块入口文件：`demo/index.js`
- 模板入口文件：`src/main.js`

```diff
import Vue from 'vue';
+import Element from 'element-ui';
+import 'element-ui/lib/theme-chalk/index.css';
import Block from '../src/index';

+Vue.use(Element);
Vue.config.productionTip = false;

new Vue();
```

然后在代码里即可使用 el-button 的组件了。

### 3. 按需打包

参考 Element 官方文档
