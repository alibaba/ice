---
title: 使用样式提高视觉还原度
order: 10
category: 入门指引
---

ICE 的整套方案尽量降低让开发者写样式的成本，为此，我们提供了以下方案：

- 提供 Layout 组件完成页面的框架，比如 Header, Sidebar, Footer 等，参考 [Layout 示例](/modules/ice-layout#modules-ice-layout-demo-withHeaderFooterSidebar)
- 通过 Layout 的 Block 功能实现页面的基础布局，参考 [Block 示例](/modules/ice-layout#modules-ice-layout-demo-block)
- 通过 List 组件完成列表类展现，参考 [List 示例](/modules/ice-list#modules-ice-list-demo-simple)
- 所有业务组件跟视觉设计师达成一致的规范

但是，在某些复杂的业务场景里，或多或少需要开发者对页面或组件样式进行调整，使页面更加美观易用。

## 如何进行样式调整

下面将会讲解两个调整样式的方法，通过这两种方法添加几条 CSS 就可以实现样式调整了。此部分的 Demo 及代码请参考 [Playground](/playground/175)。

### 通过 style props 调整样式

几乎所有的 ICE 组件都可以通过 `style` 属性控制组件样式，`style` 属性的书写规则如下：

```jsx
<div
  style={{
    属性名: '属性值',
    fontSize: '20px'
  }}
>
   ...
</div>
```

如上，style 的属性名是可枚举的字符串，如 width, height, marginTop 等等，属性值通常为字符串，仅设置像素单位时可使用数字，如 `{width: '10px'}` 等价于 `{width: 10}`。

下面是一个实际的栗子，Button 需要距左侧元素 10 像素:

```jsx
import {Button} from '@ali/ice';

class Demo extends React.Component {
  render() {
    return (
      <Button
        style={{
          marginLeft: '10px'
        }}
      >
        按钮
      </Button>
    );
  }
}
```

接下来详细介绍 style 里属性名（marginLeft）和属性值（10px）的书写规则。

#### 属性名

由于 JavaScript 的 `-` 为减法操作，因此使用 style 的方式书写样式时，需要把原有的 CSS 中的 `-` 写法转成驼峰式的写法：

比如调整文字大小使用的 CSS 属性为 `font-size`，这时候通过 style 使用将 `font-size` 转化为 `fontSize`，因为 `font-size` 在 JavaScript 中会被当做 `font - size` 操作。

同一个 style 属性，属性名必须唯一且不能重复，否则 JS 会报错：一个 object 有两个相同的 key。

#### 属性值

属性值是字符串类型，因此需要用 `'属性值'` 来表示。不同的 CSS 属性会有对应要求的属性值格式，下面也会列举。

很多 CSS 属性需要尺寸单位来标记当前元素的大小、间距、尺寸等，在 Web 页面上，我们统一使用 px 单位来描述。px 是像素点的意思，20px 表示屏幕上 20 个像素点大小。

比如 `fontSize: '20px'` 表示当前结构下面所有文本的文字高度、宽度为 20 个像素点。

### 通过 className props 来调整样式

通常 style 的方式可以基本完成视觉微调，考虑到极特殊的场景，我们把 className 的使用方法同样写出来备用。

style 的方式使用比较简单，但是它把样式写到了组件上面，当样式非常多的时候就会比较杂乱，className 的方式支持将 CSS 代码剥离出来独立维护，可以提高代码可维护性和整洁度。

CSS 独立维护就需要有一个桥梁将组件与 CSS 关联在一起，这就是 className。首先我们需要在组件上面添加一个 props `className` 并声明一个值。

```jsx
<div className="custom-font-size">
  ...
</div>
```

之后我们需要在当前文件下面手动创建一个名为 `index.scss` 的文件，然后编写下面代码：

```css
.custom-font-size {
  font-size: 20px;
}
```

即可通过 className 将 `font-size: 20px` 这个样式描述信息与组件关联起来。当然，你还需要在当前的 `xxx.jsx` 文件上面添加：

```js
import './index.scss';
```

这样会让我们的构建器明白当前组件是需要依赖这个 CSS 文件的，因此可以读取内容进行打包构建。

## 常见 CSS 属性参考

以下示例的 demo 和代码请参见 [Playground](/playground/178).

### 调整背景颜色

* 属性名：`background`
* 属性值：类似 `#ff0000` 的 16进制 hex 值（稍后会提到如何获取这个值）
* 效果：对当前结构添加背景
* 举例：背景颜色设置成灰色（以 #cccccc 为例）`background: #cccccc;`

### 文字大小

* 属性名：`font-size`
* 属性值：以 px 为单位的值
* 效果：文字变小变大
* 举例：将文字设置成 28px 大小 `font-size: 28px;` 对于 style 的使用方式，需要用 `fontSize: '28px'` 实现

### 文字颜色

* 属性名：`color`
* 属性值：类似 `#ff0000` 的 16进制 hex 值
* 效果：对当前组件下面的所有文字内容赋予相应颜色
* 举例：将文字设置成红色（#ff0000）`color: #ff0000;`

### 文字加粗

* 属性名：`font-weight`
* 属性值：`bold` 表示加粗，默认值为 `normal`
* 效果：对当前文字加粗
* 举例：将某段文字加粗标重点 `font-weight: bold;`

### 模块之间的间距

* 属性名：`margin`
* 属性值：由于某个块与其他块的间距有上、右、下、左四个方向，因此这个属性的值为四个值，比如 `20px 10px -30px 40px` 分别表示与上面的块间距拉大 20px 与右边块拉大 10px 与下面的块缩小 30px（会重叠）与左边的块拉大 40px
* 效果：模块之间的间距调整
* 举例：与下面的模块间距为 20px `margin: 0 0 20px 0;`

### 模块内部的内边距

* 属性名：`padding`
* 属性值：与 `margin` 格式一致
* 效果：模块与模块内容之间的间隙，避免内容与模块黏在一起
* 举例：当前模块的所有内容与模块边缘间距 20px `padding: 20px 20px 20px 20px;`

## 常见问题

### 如何获取属性值？比如颜色的值和文字大小、颜色？

可以直接在设计版上从设计稿中获取相关数据，这里以 ICE 首页的设计稿为例，[视觉稿地址](https://designboard.alibaba-inc.com/sketch/file/313445/marketch)，当我们选中中间的某块文本，可以显示出来当前文字的颜色、大小等，这样就可以取出来跟设计稿一致的值：

![](https://img.alicdn.com/tps/TB1X9pzOXXXXXbkXVXXXXXXXXXX-1912-1172.png)

当选中一个块之后，鼠标移动到另一个块上，可以看出这两个块之间的间距（margin），如图所示当前

![](https://img.alicdn.com/tps/TB1lERBOXXXXXa8XVXXXXXXXXXX-1478-730.png)

大标题和小标题之间的间距为 16px 如果要实现这样的视觉，我们可以为大标题添加底部的 margin 值 `margin: 0 0 16px 0;` 即可实现与小标题的视觉稿的边距。

### style 和 className 两种方式有什么区别？

- 属性名的格式不同，对于 style 需要改成驼峰命名，比如 `font-size` -> `fontSize`。
- 属性值的格式不同，对于 style 需要以字符串的形式赋值，比如一条 CSS 属性写法 'font-size: 20px;' 用 style 描述是 `fontSize: '20px'`。
- 代码存放位置不同。style 直接把样式代码写在 JSX 代码里面，但是 className 关联的 CSS 必须额外创建一个 SCSS 文件，并在 jsx 中 import 进来。
- 能力范围不同。className 方式作为常规 CSS 使用方式，可以实现一切 CSS 的功能，比如组件样式覆盖等，但是 style 只能实现部分组件本身的样式修饰。