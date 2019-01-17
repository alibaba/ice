# ice-midway-react-scaffold

## Badges

[![Build status][build-status-image]][aone-ci-url]
[![Line coverage][line-coverage-image]][aone-ci-url]
[![Branch coverage][branch-coverage-image]][aone-ci-url]
![install-alinode 3.11.7](https://duing.alibaba-inc.com/img/label?key=install-alinode&value=3.11.7&keyBgColor=505050&valueBgColor=51CA2A&size=12)

[aone-ci-url]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/link?repo=git@github.com:Lellansin/ice.git
[build-status-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=git@github.com:Lellansin/ice.git&type=%E6%9E%84%E5%BB%BA%E7%8A%B6%E6%80%81
[line-coverage-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=git@github.com:Lellansin/ice.git&type=%E5%8D%95%E6%B5%8B%E8%A1%8C%E8%A6%86%E7%9B%96%E7%8E%87
[branch-coverage-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=git@github.com:Lellansin/ice.git&type=%E5%8D%95%E6%B5%8B%E5%88%86%E6%94%AF%E8%A6%86%E7%9B%96%E7%8E%87

--------------------

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [midway 文档][midway]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:6001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [midway-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [midway 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[midway]: https://midwayjs.org
