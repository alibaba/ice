# @icedesign/iceworks-scaffolder

用于向模板目录添加页面，菜单，路由等功能，提供给 GUI 工具 iceworks 操作项目使用

## 安装

```
npm install @icedesign/iceworks-scaffolder --save
```

## 使用

```js
import Scaffolder from 'iceworks-scaffolder';

const scaffolder = new Scaffolder({
  cwd: 'project_path', // 项目地址
  interpreter: function({ type, message, data }, callback) { // 根据应用进程返回 true/false 表示是否继续
    callback(Boolean)
  };
});
```

## API

- `async createPage({ name: pageNmae, layout, blocks, preview = false })` 创建页面
- `async appendMenu({ name, path: menuPath, icon }, prettierConfig)` 创建菜单
- `async removeMenu({ path: menuPath }, prettierConfig)` 删除菜单
- `async appendRouter({ path: routerPath, component: pageComponentName = '', module: pageModule = '', pagePath, layoutName = '', layoutPath, })` 添加 router
- `async removeRouter({ path: routerPath, pagePath })` 删除 router
- `async removePreviewPage({ menuPath = '/IceworksPreviewPage', routerPath = '/IceworksPreviewPage' } = {})` 移除页面
