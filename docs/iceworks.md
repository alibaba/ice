---
title: 快速上手
order: 3
---

ICE 企业级泛后台应用解决方案，提供程序员更快、更优、更 Cool 的开发体验。

## 项目开发流程

ICE 提供了开发过程中的各环节的配套工具，在实际项目中你会用到创建项目、新增页面、新增模块、安装业务组件、调试、构建、打包部署等一系列工程化的操作。我们提供了一套工程套件来简化此过程，下面我们以一个简单的项目来演示说明。

### 1. 安装 ICE SDK

安装流程分为几个步骤，ICE 提供了 OSX 以及 window 的一键安装脚本，你可以通过以下方式安装 ICE SDK。

- OSX 安装方法

```bash
curl http://gitlab.alibaba-inc.com/ice/kit-ice/raw/master/install.sh | sh
```

- Windows 安装方法

前往 [Windows ICE SDK install](http://gitlab.alibaba-inc.com/ice/kit-ice-windows/raw/master/build/ICE%20install.exe) 下载安装包，并按照相关指示操作。

### 2. 创建 ICE 项目

使用命令行进行初始化。在初始化之前，需要在已存在的目录下执行。

```bash
$ mkdir ice-demo
$ cd ice-demo
$ def init ice
```

确认回车后，会提示用户选择初始化类型，这里选择 **项目** 模板即可

```
➜ ice-demo $ def init ice
? 选择模板 (Use arrow keys)
❯ 项目
  组件
```

默认前端资源单独存放，回车确定，同时询问填入应用名，默认为当前目录名（建议按照 `业务名 + -assets` 的规范来命名，比如达人业务命名为：`daren-assets`），如果不需要修改则直接回车即可，当看到生成好的文件列表之后项目就创建好了。

按照提示继续执行 `def dev` 即可开启调试模式。

### 3. 新建页面

创建的项目中，默认生成了好几个 Demo 的页面，里面包含了 ICE 最常用的一些业务场景，接下来创建属于自己的页面。

执行命令行新增页面。 `def add page`

```bash
➜ ice-demo $ def add page
? 页面名称
```

回车并输入页面名称，创建名为 *Test* 的页面。 创建完成后，会生成 `src/pages/Test` 目录，命令行会显示新增的文件路径。

由于 ICE 项目是基于单页面技术的，所以页面的访问 url 管理在前端，因此你还需要修改 `src/routes.jsx` 在适当的位置加上你页面的路由信息：

```jsx

import TestPage from './pages/Test';

...

// 自定义路由，如果 path 相同则会覆盖自动生成部分的路由配置
const customRoutes = [
  {
    path: '/test',
    component: AsideLayout,
    indexRoute: { component: TestPage }
  },
  ...
```

这句配置的含义就是当访问 `/test` 的时候，就会渲染 `AsideLayout` 这个 layout 组件，然后再在 `AsideLayout` 内部渲染 `TestPage` 组件。详细的路由配置规则请参见相关文档。

之后就可以通过 `http://127.0.0.1:3333/#/test` 进行访问。

### 4. 创建公共组件

ICE 小组抽象了众多的[业务组件](/modules/about)，以提高开发效率。一个项目往往含有固定的布局，[ice-layout](/modules/ice-layout) 组件提供了常用的页面框架的布局，因此我们在 SDK 生成项目的时候默认给你生成了多份常用 Layout，详情可以看下 `/src/Layouts/` 具体代码了解引用、调用方式。

如果你需要创建新的自定义公共组件，可以执行下面命令按照步骤操作：`def add module`

```bash
➜ ice-demo $ def add module
? 请选择将 module 添加到以下路径 (Use arrow keys)
❯ 公共组件 (components)
  页面 example
  页面 home

```

回车后，会提示输入 `module 名称`，键入：`CustomButton`，然后选择 **公共组件 (components)** 回车。会生成 `src/components/CustomButton/index.jsx` 等文件。

> 组件名称首字母为大写，小写字母会默认转换为大写。

在该文件编写公共组件业务代码即可。此外也可以创建页面级别的公共组件，在命令行提示中做相关选择即可。

之后可以在 `src/pages/Test/Test.jsx` 中，编写如下代码引入使用：

```jsx
import CustomButton from '../../components/CustomButton/index';

...

render() {
    return (
        <div className="Test">
            Test 页面
            <CustomButton />
        </div>
    )
}
```

### 5. 安装业务模块

如果你的页面需要显示图片，那么可以使用我们增强版的图片业务组件 [@ali/ice-img](/modules/ice-img/) 业务组件。首先需要执行下面命令安装组件：

```bash
$ def add @ali/ice-img
```

回车则立即安装，同理当需要其他业务模块的时候，同样使用此命令即可。

模块被安装后，通过 `import xx from 'xx';` 语法引入，如：

```jsx
import IceImg from '@ali/ice-img';
```

具体请详见：[@ali/ice-img](/modules/ice-img/)。我们可以再刚刚创建的 Test 页面中 render 部分，加入如下代码显示一个图片：

```jsx
<IceImg
  width={200}
  height={200}
  src="//img.alicdn.com/tfs/TB1K..3PpXXXXa4XFXXXXXXXXXX-311-199.png"
  type="cover"
  shape="circle"
  style={{border: '1px solid #ccc', margin: '10px'}}
/>
```

### 6. 预览调试

一键启动调试实时预览，按照上面所说，添加好路由配置之后，访问 <http://127.0.0.1:3333/#/test> 查看效果。

```bash
$ def dev
```

预览调试是实时编译的，此时尝试修改 `src/pages/Test/Test.jsx` 文件里的代码，可以看到浏览器自动刷新了，在后续的开发过程中，你可以这样实时开发预览。

### 7. 使用基础组件

通过基础的布局搭建，基本的框架已创建好了，下面我们使用基础组件来搭建我们的页面。基础组件的包，此创建项目时已经默认安装好了。不需要再安装了，直接使用即可。

使用以下代码替换 `src/pages/Test/Test.jsx` 里的内容。保存后，浏览器自动刷新，查看效果。

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card } from '@alife/next';

export default class Test extends Component {
  render() {
    return (
      <Card style={{ width: 300 }} title="阿里老黄历" subTitle="没品位" extra={<a href="#">Link &gt;</a>}>
        <h3>抽一管烟</h3>
        <p>抽烟有利于提神，增加思维敏捷</p>
        <h3>跳槽</h3>
        <p>该放手时就放手</p>
        <h3>招聘</h3>
        <p>为新商业文明的未来招兵买马</p>
        <h3>逛闲鱼</h3>
        <p>飙车的时候顺便卖卖东西</p>
      </Card>
    );
  }
}
```

这里演示的是 [Card 卡片](http://ice.alibaba-inc.com/ice/card) 的使用，你还可以使用[基础组件](http://ice.alibaba-inc.com/ice/about)中其他更多的组件，完成更丰富的页面。

### 9. 项目构建

当页面开发完成后，需要将代码进行构建，以便于上线使用。

> 注意：如果采用『资源独立仓库』模式，此步骤非必须，直接执行 def publish 命令发布到 CDN 云构建服务器会自动帮你 build。

命令行执行

```bash
$ def build
```

结束后会生成页面对应的 index.js index.css 文件。

如 home 页面将生成：

```
build/pages/home/index.js
build/pages/home/index.css
```

### 10. 发布文件到 CDN

『资源独立仓库』模式下，你的代码需要放在 GitLab 的一个仓库中才可以实现发布 CDN。你可以自己创建一个仓库，也可以申请使用 ICE 官方的 GitLab group。详情请查看 [资源独立仓库开发实践](/docs/guide/fed-assets)。

这里简单的介绍下如何将开发完成的项目（资源独立仓库）发布到 CDN。

首先 CDN 是不能覆盖发布的，因此我们约定了一个版本号发布机制，使用 `daily/x.y.z` 的分支号，作为 CDN 的资源版本号。

当你要发布，先确认一个发布分支（例如：`daily/0.1.0`），之后将你的开发分支 merge 到这个发布分支上面，然后执行如下命令：

```bash
$ def publish -d
```

此命令将发布到 CDN 日常环境，上述的文件最终会得到以下地址：

```
//g-assets.daily.taobao.net/{groupid}/ice-demo/0.1.0/pages/home/index.js
//g-assets.daily.taobao.net/{groupid}/ice-demo/0.1.0/pages/home/index.css
```

> 提示：groupid: 为该仓库所在 gitlab 上的组名。ice-demo 为仓库名。

命令行执行：

```bash
$ def publish -o
```
此命令将发布到 CDN 线上环境，最终会得到以下地址：

```
//g.alicdn.com/{groupid}/ice-demo/0.1.0/pages/home/index.js
//g.alicdn.com/{groupid}/ice-demo/0.1.0/pages/home/index.css
```

正式发布后，原本 daily/0.1.0 分支会合并到主干并自动删除。如需更新代码，需要重新切换分支升级版本（如 daily/0.1.1）进行发布，以此类推。

关于前端版本管理最佳实践，可以参考：[淘宝达人前端版本管理最佳实践](https://www.atatech.org/articles/71313)。

### 11. 创建页面并在页面引入 CDN 地址渲染生效

前端发布完成之后不代表线上页面生效，只表示前端资源可以在 CDN 上访问。如果要在线上生效还需要你在 vm 文件中，将引入的前端静态资源的版本号进行更新并发布。

ICE 构建出来的仅为 JS 和 CSS 代码，需要将其引入到 HTML 页面中，交由浏览器解析执行。因此你的应用需要支持渲染 HTML 页面以及 HTTP 请求等。

可以打开 ICE 项目的 `/src/index.html` ，你需要做的就是将这里的 HTML 代码拷贝到你应用里（通常是 vm 文件），使其支持 HTTP 访问渲染：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>xxxx 项目示例（todo 改成你应用当前的页面名称）</title>
    <!--[if lt IE 9]>
    <script>location.href = "//www.taobao.com/markets/tbhome/ali-page-updater"; </script>
    <![endif]-->

    <!-- todo 下面的 /build/pages/xxx 需要更换成刚发布的 CDN 地址 -->
    <link rel="stylesheet" type="text/css" charset="utf-8" href="/build/pages/ask-daren/index.css">

</head>
<body>
    <div id="ice_container"></div>

    <!-- todo 下面的 /build/pages/xxx 需要更换成刚发布的 CDN 地址 -->
    <script type="text/javascript" charset="utf-8" src="/build/pages/ask-daren/index.js" id="ice-script"></script>
</body>
</html>
```

最佳实践通常是创建这样一份 vm 文件用来渲染：

```html
## 前端静态资源版本
#set($version = "0.0.1")

## 当前页面名称
## 通常在外层根据页面请求地址映射不同的 name 传递进来
## 实现前端复用一份 vm 不同页面地址渲染不同页面的 JS 代码
## #set($pageName = "ask-daren")

## 前端 cdn 地址
#if($envUtil.isDaily())
    #set($assetsCDN = "//g-assets.daily.taobao.net/daren-platform/daren-agency-assets/${version}/pages")
#else
    #set($assetsCDN = "//g.alicdn.com/daren-platform/daren-agency-assets/${version}/pages")
#end

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>
        #if($pageChineseName)
            $pageChineseName
        #else
            XX 小二后台
        #end
    </title>
    <!--[if lt IE 9]>
    <script>location.href = "//www.taobao.com/markets/tbhome/ali-page-updater"; </script>
    <![endif]-->

    <link rel="stylesheet" href="${assetsCDN}/$pageName/index.css">

</head>
<body>

    <div id="ice_container"></div>
    <script src="${assetsCDN}/$pageName/index.js" id="ice-script"></script>

</body>
</html>
```

创建好文件之后，配置应用使其支持 HTTP 访问即可将 ICE 代码发布上线，之后每次升级前端版本只需要更新 `$version` 变量发布即可。

我们推荐把 `$version` 变量通过 EMS 技术片段或 Diamond 方式接入, 这样每次需要更新前端资源无需重新部署 Java 后端只需发布片段即可。

至此，你可以通过访问 `http://your-app.alibaba-inc.com/your-html-path.html#/test` 来访问上面创建的测试页面。