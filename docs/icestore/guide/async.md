---
title: 异步状态
order: 3
---

icestore 内部集成了对于异步 action 执行状态的记录，方便用户在不增加额外的 state 的前提下访问异步 action 的 loading 与 error 状态，从而使状态的渲染逻辑更简洁。

## API

* `action.loading` - action 是否正在执行中的标志位
  - Type: {boolean}
  - Default: false
* `action.error` - action 执行完成后如果有错误发生返回的错误对象
  - Type: {object}
  - Default: null
* `action.disableLoading` - 是否关闭 action loading 效果的开关, 如果设置为 true, 当 loading 标志位变化时，关联的 view 组件将不会重新渲染
  - Type: {boolean}
  - Default: false
* `store.disableLoading` - 是否全局关闭所有 action 的 loading 效果. 注意当全局与 action 上的该标志位均设置时，action 上标志位优先级高
  - Type: {boolean}
  - Default: false

## 使用方式
调用 useStore 后从 action 的属性上可以实时获取当前 action 的执行状态，包括 loading (执行中）与 error (执行错误对象)，见以下示例

```javascript
const todos = store.useStore('todos');
const { refresh, dataSource } = todos;

useEffect(() => {
  refresh();
}, []);

const loadingView = (
  <div>
    loading...
  </div>
);

const taskView = !refresh.error ? (
  <ul>
   {dataSource.map(({ name }) => (
     <li>{name}</li>
   ))}
  </ul>
) : (
  <div>
    {refresh.error.message}
  </div>
);

return (
  <div>
    {!refresh.loading ? taskView : loadingView}
  <Loading />
);
```
