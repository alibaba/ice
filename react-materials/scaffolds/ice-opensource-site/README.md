# ice-opensource-site

## 功能特性

该模板基于 docsite，适用于开源站点类的场景，支持以下功能：

- 同时支持 PC 端和移动端
- 支持中英文国际化
- 支持 SEO
- 支持 markdown 文档
- 支持开源站点常见的首页、文档页、博客列表页、博客详情页、社区页
- 支持站点的风格的自定义，包括站点主题风格、文档代码高亮风格等的自定义
- 支持自定义页面

## 使用文档

- https://txd-team.github.io/docsite-doc-v1/zh-cn/docs/installation.html

## 结合 ICE 使用

docsite 整体设计基于 react，内置模板默认包含首页、文档页、博客列表页、博客详情页、社区页，分别对应 src/pages 目录下的 home、documentation、blog、blogDetail、community 目录，如果我们需要添加新的页面，可以使用 Iceworks 的新建页面功能，选择对应的区块，会自动下载到对应的 src/pages 目录下，同样，也可以在页面列表添加新的区块进行开发。

![screentshot](https://img.alicdn.com/tfs/TB1d1QqXwHqK1RjSZFEXXcGMXXa-2840-1596.png)
