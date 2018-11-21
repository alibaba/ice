## Usage

用于 ICE 业务组件的文档生成器

```js
import docsGen from 'components-docs-generator';

/**
 * @param {string} sourceDir      输入的文件目录，必须
 * @param {string} destDir        输出的文件目录，可选，默认为 process.cwd()
 * @param {string} outputFilename 输出的文件名称，可选，默认为 biz-components.json
 */
docsGen(sourceDir, destDir, outputFilename)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```
