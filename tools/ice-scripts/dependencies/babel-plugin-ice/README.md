# babel-plugin-ice

ICE babel 插件

## 功能

```jsx
import {Button, Dialog} from '@icedesign/base';
```

会被转换成：

```
var Dialog = require('@icedesign/base/lib/dialog');
var Button = require('@icedesign/base/lib/button');
```