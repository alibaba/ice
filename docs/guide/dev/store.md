---
title: 数据状态管理
order: 3
---

状态管理通常是一个应用最复杂的部分，React原生提供了setState, Context等方式来实现本地与全局状态管理，对于更复杂的业务场景，原生方案也不能完全满足需求，因此社区中产生了大量状态管理框架来解决这个问题，比较有名的诸如Redux, Mobx，但是这些框架引入了很多概念，有不小的学习成本，而且滥用框架也会带来一定性能上的问题，因此飞冰团队从易用性与性能上出发，基于React Hooks设计了一款面向React的轻量级的状态管理方案icestore，下面介绍一下使用icestore的用法与最佳实践。


## 安装

```bash
$ npm i @ice/store --save
```

## 简介
icestore是基于React Hooks实现的轻量级状态管理框架，有以下核心特点：

* 极简API: 只有3个API，真正做到五分钟上手
* 单向数据流：与Redux一样使用单向数据流，便于状态的追踪与预测
* 性能优化：通过多store的去中心化设计，减少单个state变化触发重新渲染的组件个数，同时改变state时做diff，进一步减少不必要的渲染
* 集成异步状态：记录异步action的执行状态，简化view组件中对于loading与error状态的渲染逻辑

icestore数据流：  
<img src="https://user-images.githubusercontent.com/5419233/60956252-012f9300-a335-11e9-8667-75490ceb62b1.png" width="400" />


> 如果你的项目 React 版本不支持 Hooks（低于 16.8.0），推荐使用社区成熟的方案 [Redux](https://cn.redux.js.org/) 或者 [Mobx](https://cn.mobx.js.org/)

## 快速上手
以下示例中我们使用icestore从头开始搭一个todo应用：

* 首先定义store配置对象，store按属性类型可分为state（非函数属性）与action（函数类型属性） 

```javascript
// src/stores/todos.js
export default {
  dataSource: [],
  async refresh() {
    this.dataSource = await new Promise(resolve =>
      setTimeout(() => {
        resolve([
          {
            name: "react"
          },
          {
            name: "vue",
            done: true
          },
          {
            name: "angular"
          }
        ]);
      }, 1000)
    );  },
  add(todo) {
    this.dataSource.push(todo);
  },
  remove(index) {
    this.dataSource.splice(index, 1);
  },
  toggle(index) {
    this.dataSource[index].done = !this.dataSource[index].done;
  },
};
```
* 初始化store实例，并且按namespace将定义的store配置注释到store实例中。

```javascript
// src/stores/index.js
import todos from './todos';
import Icestore from '@ice/store';

const icestore = new Icestore();
icestore.registerStore('todos', todos);

export default icestore;
```

* 在View组件中import全局store实例，使用useStore hooks访问store中的state和action

```javascript
// src/index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import stores from './stores';

function Todo() {
  const todos = stores.useStore("todos");
  const { dataSource, refresh, add, remove, toggle } = todos;

  React.useEffect(() => {
    refresh();
  }, []);

  function onAdd(name) {
    add({ name });
  }

  function onRemove(index) {
    remove(index);
  }

  function onCheck(index) {
    toggle(index);
  }

  return (
    <div>
      <h2>Todos</h2>
      {!refresh.loading ? (
        dataSource.length ? (
          <ul>
            {dataSource.map(({ name, done }, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={done}
                    onClick={() => onCheck(index)}
                  />
                  {done ? <s>{name}</s> : <span>{name}</span>}
                </label>
                <button onClick={() => onRemove(index)}>-</button>
              </li>
            ))}
          </ul>
        ) : (
          "no task"
        )
      ) : (
        "loading..."
      )}
      <div>
        <input
          onKeyDown={event => {
            if (event.keyCode === 13) {
              onAdd(event.target.value);
              event.target.value = "";
            }
          }}
          placeholder="Press Enter"
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Todo />, rootElement);
```

完整示例请参考线上的[Sandbox](https://codesandbox.io/s/icestore-hs9fe)

## 高级用法
### 使用内置的异步状态
icestore中内置了对于异步action的状态支持，用户可以通过异步action上的loading和error属性拿到执行中与执行结果的状态，免去了在store中定义这些状态的冗余操作。
参考以下示例，从 `refresh` action上可以拿到loading与error状态，在这些状态的值发生变更时icestore会通知view组件重新渲染。

```javascript
const todos = store.useStore('todos');

useEffect(() => {
  todos.refresh();
}, []);

return (
  <div>
    {todos.refresh.error ? 
      todos.refresh.loading ? (
	    <div>
	      loading.......
	    </div>
      ) : (
        <div>
	      error.......
	     </div>
      ) 
    : (
       <ul>
         {dataSource.map(({ name }) => (
           <li>{name}</li>
         ))}
       </ul>
    )}
  <Loading />
);
```

由于loading状态展示是一个高频的业务需求，因此对于所有异步action默认开启loading功能，这意味着每次loading状态变更关联的view都会多刷新一次，如果用不到loading功能想关闭我们提供以下两种方式，其中action上的disableLoading优先级要高于store上的属性。

* store上设置disableLoading属性

```javascript
  store.disableLoading = true;
```
* action调用前设置disableLoading属性

```javascript
  todos.refresh.disableLoading = true;
  todos.refresh();
```

## 最佳实践
### 不要在action之外直接修改state
icestore的架构设计中强制要求对state的变更只能在action中进行。在action之外的对state的修改将直接throw错误。这个设计的原因是在action之外修改state将导致state变更逻辑散落在view中，变更逻辑将会难以追踪和调试。

```javascript
  // store.js
  export default {
    inited: false,
    setInited() {
      this.inited = true;
    }
  }
  
  // view.js
  const todos = useStore('todos');
  
  useEffect(() => {
    // bad
    todos.inited = true;
    
    // good
    todos.setInited();
  });
```

### 尽可能小的拆分store
icestore的设计是所有use同一个store的view组件都会监听store中的state变化，一个state变化的导致重新渲染的view仅限于关联的view。因此出于性能考虑不要将所有状态都放在一个store中，否则一个state变化将会导致更多view组件重新渲染，所以尽可能按照功能划分将store拆分成一个个独立的个体。

### 不要滥用icestore
从工程的角度来看，store中应该只用来存放跨页面与组件的状态。将页面或者组件中的内部状态放到store中将会破坏组件自身的封装性，进而影响组件的复用性。对于组件内部状态完全可以使用useState来实现，因此如果上面的todo app如果是作为工程中的页面或者组件存在的话，使用useState而不是全局store来实现才是更合理的。

## 相关链接

- [icestore GitHub 仓库](https://github.com/ice-lab/icestore)