# `@ice/style-import`

A transform function for automatic import style.

## Usage

```js
import transform from '@ice/style-import';

transfrom(`import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);`, [{
  libraryName: 'antd',
  style: (importSpecifiers) =>
    importSpecifiers.map(specifier =>
      `import 'antd/es/${specifier}/style'`).join('\n'),
}]);

// the code will turn out as blew:
/* 
import { Button } from 'Button';
import 'antd/es/Button/style';
ReactDOM.render(<Button>xxxx</Button>); */
```