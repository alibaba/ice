---
title: 官方 Vue 物料模板
order: 3
---

ICE 提供了标准化的 Vue 物料模版，在使用 `ice-devtools init` 时选择 Vue 官方模版即可。官方 Vue 模版包含以下功能：

- 包含 block、scaffold 两种物料类型，暂不支持 component
- 基于 Vue CLI 作为 Vue 工程工具


## 使用 element-ui

### 1. 将 vue 和 element 作为 npm 依赖

区块请移除 `demo/index.html` 里的 script 标签：

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

参考 Element 官方文档。

