---
title: 实现说明
order: 3
---

本篇文档将对 iceworks 的源码具体实现以一个示例进行概述。

如果你想参与 iceworks 的开发，希望这份指南可以帮助你更加轻松的进行修改，我们非常欢迎来自社区的贡献。

## 功能需求

通过 Adapter 机制实现 **布局列表** 的功能，将项目的布局文件进行可视化展示。

## 前端实现

### 数据方案

在数据管理上，我们使用基于 react hooks 的 [icestore](https://github.com/ice-lab/icestore) 方案，其核心思想是通过 Model 的思想模块化管理数据，基于 setState 在生命周期内维护数据，提供 useStore hooks 在组件内获取数据。

根据 [源码概述](#codebase-overview) 章节的相关介绍，布局列表属于项目管理的面板之一，因此我们可以在 `src/pages/projects/stores` 目录下新增对布局功能的数据定义：

* 定义 store

```js
import socket from '@src/socket';

export default {
  dataSource: [],

  async getAll() {
    this.dataSource = await socket.emit('adapter.layout.getAll');
  },
};
```

* 注册 store
```js
import layouts from './layouts';

const icestore = new Icestore();
icestore.registerStore('layouts', layouts);
```

### 面板组件

新增一个 `LayoutPanel` 组件，用于布局列表面板的展示。

```jsx
const LayoutPanel = ({ props }) => {
  // 声明 layoutsStore
  const layoutsStore = stores.useStore('layouts');

  useEffect(() => {
    // 获取数据
    layoutsStore.getAll()
  }, [])

  // 消费数据
  const { dataSource } = layoutsStore;
  return (
    <div>
      {dataSource.map( ... )}
    </div>
  )
}
```

## 后端实现

想要获取项目的布局信息，我们需要借助 Node 的文件系统能力，读取项目的文件目录并返回布局列表信息。

根据 Adapter 的定义，我们可以了解到需要实现的功能的接口定义如下：

```ts
// interface/layout.ts
import { IProjectLayout, IBaseModule } from './base';

export interface ILayoutModule extends IBaseModule {
  /**
   * 获取单个布局的信息
   *
   * @param layoutName 布局名
   */
  getOne(layoutName: string): Promise<IProjectLayout>;

  /**
   * 获取项目内的布局
   */
  getAll(): Promise<IProjectLayout[]>;
}

```

接着，我们只需要在 Adapter 中进行实现对应的接口：

```ts
// adapter/layout/index.ts
import * as path from 'path';
import { ILayoutModule } from '../../../interface';

export default class Layout implements ILayoutModule {
 
  async getAll(): {
    // logic code
  }

  async getOne(layoutName: string): {
   // logic code
  }
}
```

最后，我们在 adapter 的入口文件导出这个模块信息即可，框架层面会自动进行加载并挂载到 adapter 对象上，前端即可通过 `adapter.layout.getAll()` 进行调用。

```ts
// adapter/index.ts
import Layout from './layout';

export {
  Layout
}
```

至此，我们完成了一个简单的布局列表面板的展示功能。
