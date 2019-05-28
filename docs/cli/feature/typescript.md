---
title: 使用 TypeScript
order: 1
---

`ice-scripts` 内置了对使用 TypeScript 开发的支持。

## 选择 TypeScript 模板初始化项目

你只需要在 iceworks 模板界面选择对应模板进行初始化：

![](https://img.alicdn.com/tfs/TB1.YxLHY2pK1RjSZFsXXaNlXXa-954-684.png)

初始化完成之后，接下来就是使用 TypeScript 编写代码了，所有以 `.tsx` 或者 `.ts` 结尾的文件都支持其语法。

## 已有项目如何迁移到 TypeScript

迁移步骤如下：

### 新增 tsconfig.json 文件

```js
{
  "compileOnSave": false,
  "buildOnSave": false,
  "compilerOptions": {
    "outDir": "build",      // 指定输出目录
    "module": "esnext",     // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "target": "es6",        // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "jsx": "react",        // 允许编译 javascript 文件
    "moduleResolution": "node", // 选择模块解析策略
    "allowSyntheticDefaultImports": true,
    "lib": ["es6", "dom"],
    "sourceMap": true,     // 生成相应的 '.map' 文件
    "allowJs": true,       // 扩展名可以是 .js/.jsx
    "noUnusedLocals": true // 有未使用的变量时，抛出错误
  },
  "include": ["src/*"],  // 需要编译的文件目录
  "exclude": ["node_modules", "build", "public"] // 排除编译的文件目录
}
```

### 按需修改文件后缀

在 TypeScript 工程中推荐使用 `.tsx` 替代 `.jsx`、使用 `.ts` 替代 `.js`，这里可以根据自身需求按需更改，一般情况下更改后缀之后需要修改部分语法，否则 ts 语法检测可能会不通过

### 按需修改 Entry 入口

如果将 `src/index.js` 的后缀做了修改，那么同步需要修改 `package.json` 里的 entry 字段：

```diff
// packgae.json
buildConfig: {
-  entry: './src/index.js'
+  entry: './src/index.ts'
}
```

按照以上步骤，可按需迁移项目到 TypeScript 工程。如有疑问，请通过飞冰钉钉群联系我们。