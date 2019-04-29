## Iceworks Events

iceworks 的事件定义，统一规范输出相关事件

## 使用

```js
import emitter from 'xxx-emitter';
import { ICEWORKS_TASK_DEV_DATA } from 'iceworks-events';

setTimeout(function() {
  emitter.emit(ICEWORKS_TASK_DEV_OPEN, { id: '1' });
}, 3000);

emitter.on(ICEWORKS_TASK_DEV_DATA, (data) => {
  console.log(ICEWORKS_TASK_DEV_DATA, data);
});
```
