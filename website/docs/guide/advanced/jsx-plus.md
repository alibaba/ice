# JSX+

该插件支持了一种 JSX 扩展语法 JSX+，它能帮助业务开发者更爽更快地书写 JSX。JSX+ 不是一种新的概念，它是 JSX 基础上的扩展指令概念。

## 为什么需要 JSX+

- JSX 虽然语法灵活，但是大量的花括号 + JS 语法导致了上下文切换和代码可读性的下降，JSX+ 的指令很好的解决了这个问题
- JSX 本质是 JS 表达式，在运行时阶段才可以计算出真实的 DOM 结构，JSX+ 引入了一部分静态模板特性可以满足编译优化
- 不新创造实体，指令在社区中是已经被广泛接受的概念，对开发者更友好，语法糖的表达更简单
- 统一一套 JSX+ 类似概念的语法规范，减少已存在和潜在的重复建设

## 安装使用

```bash
$ npm i @ice/plugin-jsx-plus -D
```

配置插件使用：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import jsxPlus from '@ice/plugin-jsx-plus';

export default defineConfig({
  plugins: [
    jsxPlus(),
  ],
});
```

接下来就可以使用更强大的 JSX+ 语法了：

```jsx
function ExampleComponent(props) {
  const { isAdmin, dataSource } = props;

  return (
    <div>
      <div x-if={isAdmin}>admin</div>
      <div x-else>guest</div>

      <div x-for={item in dataSource}>
        <span>{item.name}</span>
      </div>
    </div>
  );
}
```

## 指令语法

以下是 JSX+ 规范已有的指令列表：

### 1. 条件判断

语法：

```jsx
<View x-if={condition}>Hello</View>
<View x-elseif={anotherCondition}>World</View>
<View x-else>NothingElse</View>
```

:::caution
`x-elseif` 可以多次出现，但是顺序必须是 x-if -> x-elseif -> x-else，且这些节点是兄弟节点关系，如顺序错误则指令被忽略。
:::

### 2. 循环列表

语法：

```jsx
{/* Array or Plain Object*/}
<tag x-for={item in foo}>{item}</tag>
  
<tag x-for={(item, key) in foo}>{key}: {item}</tag>
```

说明：

1. 若循环对象为数组，key 表示循环索引，其类型为 Number。

1. 当 `x-for` 与 `x-if` 同时作用在同一节点上时，循环优先级大于条件，即循环的 `item` 和 `index` 可以在子条件判断中使用。



### 3. 单次渲染

仅在首次渲染时会触发 `createElement` 并将其引用缓存，重新渲染时直接复用缓存，用于提高不带绑定节点渲染效率和 Diff 性能。

语法:

```html
<p x-memo>this paragragh {mesasge} content will not change.</p>
```



### 4. 插槽指令

类似 WebComponents 的 slot 概念，并提供插槽作用域。

语法：

```html
<tag x-slot:slotName="slotScope" />
```

示例：

```jsx
// Example
<Waterfall>
  <view x-slot:header>header</view>
  <view x-slot:item="props">{props.index}: {props.item}</view>
  <view x-slot:footer>footer</view>
</Waterfall>
<slot name="header" /> // 槽位
```

对比传统 JSX：

```jsx
<Waterfall
  renderHeader={() => (<view>header</view>)}
  renderFooter={() => (<view>footer</view>)}
  renderItem={(item, index) => (<view>{index}: {item}</view>}
/>
```

对比小程序：

```jsx
<Waterfall>
  <view slot="header">header</view>
  <view slot="item" slot-scope="props">{props.index}: {props.item}</view>
  <view slot="footer">footer</view>
</Waterfall>
```



### 5. Fragment 组件

提供空组件，不产生 UI，提供绑定 `x-if` `x-for` `x-slot` 指令。

使用：

```jsx
<Fragment />
```



### 6. 类名绑定

语法：

```jsx
<div x-class={{ item: true, active: val }} />
```

参考实现：

```jsx
<div className={classnames({ item: true, active: val})} />
```

`classnames` 方法能力参考[同名 npm 包](https://npmjs.com/classnames)。

> 更多请参考 [jsx-plus](https://github.com/jsx-plus/jsx-plus)
