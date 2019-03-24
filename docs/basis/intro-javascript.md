---
title: JavaScript 基础知识
order: 4

---

写前端必须要掌握一定基础的 JavaScript 语言知识，本文档将介绍绝大部分常用的 JavaScript 语言基础知识，同样概念添加 Java 语言对比，帮你快速学习理解。

## JavaScript 语言概述和开发环境、运行环境配置

JavaScript 是一门脚本语言，用在网页上增强页面功能，是一门动态语言因此不需要进行编译、部署。

JavaScript 是弱类型的语言，语法比较简单，掌握基本语法之后怎么写都可以，比 Java 灵活的多，同时不需要依赖 IDE，任何文本编辑器都可以进行开发。当然如果你用 IDEA 等 IDE 更是锦上添花。

JavaScript 比较常见的运行环境就是 Web 浏览器，比如 Chrome 直接打开 console 输入 JavaScript 代码即可运行实时看到结果：

![](https://img.alicdn.com/tps/TB1tLD7NFXXXXbmXpXXXXXXXXXX-992-616.png)

> 提示：在 Chrome 中，右击网页选择『检查』即可打开开发者工具，可以切换到 console 面板。详情可以看[如何使用控制台](https://leeon.gitbooks.io/devtools/content/learn_basic/using_console.html)。
> 提示：控制台比较常用的有 console.log 方法，它可以打印一些内容、变量值等到你的控制台辅助开发，等同 Java 中的 System.out.println 方法。

## JavaScript 语法基础

### 变量定义

* let 定义普通变量（推荐），详情：http://es6.ruanyifeng.com/#docs/let#let命令。
* const 定义常量，后面只能读不能写，详情：http://es6.ruanyifeng.com/#docs/let#const命令。
* var 定义普通变量，不建议使用。

var 由于缺失某些特性，不建议使用，关于 let 和 var 的对比，详情见：https://www.zhihu.com/question/47456978 。

由于 JavaScript 是弱类型语言，因此你不需要声明变量的数据类型。

JavaScript:

```js
let x = 20;
```

Java:

```java
float x = 20.0;
double x = 20.0;
int x = 20;
```

具体支持的数据类型参照下面文档。

### 数据类型

数据类型基础知识详见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures ，这里针对常用的几种进行重点讲解。

基础类型包括：Undefined、Null、Boolean、Number、String，引用类型包括：Object、Array、Function。当一个变量值为引用类型的时候，直接赋值其他变量传递的是引用。同样的，引用的数据在某个地方改变了值会影响所有调用这个变量的地方。这跟 Java 里面引用概念一样。

#### undefined 和 null

声明一个变量没有赋值，直接访问当前变量可以得到 `undefined`。不同于 Java 针对不同数据类型有不同的初始值：

JavaScript:

```js
let x;
console.log(x); // -> undefined
```

Java:

```java
int x;
System.out.println(x); // -> 0
```

访问一个对象上不存在的 key 也会取到 undefined。

```js
let a = {};
console.log(a.b); // -> undefined
```

null 表示空值。它不同于 undefined，它是有值的只不过是一个空值，而 undefined 是未定义的临时兜底的缺省值。undefined 和 null 具体的区别请参见：http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html 。

#### number、boolean、string

基本的数据类型：

```js
console.log(typeof 10); // -> number
console.log(typeof '10'); // -> string
console.log(typeof true); // -> boolean
console.log(typeof "true"); // -> string
```

JavaScript 中带引号的均为字符串，可以是单引号也可以是双引号。不同于 Java 字符串只能使用双引号表示。JavaScript 没有 int、float 和 double 之分。

#### array

数组类型，栈结构，有序数组。每个 item 可以是任意类型的值，数据类型类似 Java 的 ArrayList ，比如：

```js
// 字符串数组
['string', 'aaa']

// 对象和字符串混合数组
[{
  aa: 'aaa',
  bb: 'bbb',
}, 'string']

// 函数数组
[() => {
  return '这是一个函数'
}, () => {
  return '这是一个函数'
}]
```

如果需要取得特定需要的值，直接获取（比如获取第一个数据）：

JavaScript：

```js
array[0];
```

Java：

```java
list.get(0);
```

数组是有序的，遍历数组需要使用流程控制语句 for 等。为了方便，array 内置了一些数组常用操作方法可以简化常用操作，详情可见：<http://yujiangshui.com/codewars-weekly1/#善用-Array-的函数>。

比较常用 [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 和 [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法，可以重点关注下用法。

简易循环举例：

JavaScript:
```js
let list = [];
list.push('aa');
list.push('bb');

for(let i=0; i<list.length; i++) {
  console.log(list[i]);
}

list.forEach((val, i) => {
  console.log(val, i);
});
```

Java:

```java
List<String> list = new ArrayList<String>();
list.add('aa');
list.add('bb');

for(int i=0; i<list.size();i++) {
  System.out.println(list.get(i));
}
list.forEach((val) -> {
  System.out.println(val);
});
```

相比 Java 的 add 操作，JavaScript array 的出栈入栈删除的方法名略有不同，常见的 push 入栈、pop 出栈，具体的参照 http://javascript.ruanyifeng.com/stdlib/array.html 。

#### object

对象类型，无序，需要指定 key 等信息关联值，类似 Java 的 HashMap，比如：

JavaScript：

```js
let obj = {
  name: 'string 字符串',
  home: {
    province: '山东'
  }
};

obj.age = 18;

console.log(obj.home.province);
let key = 'age';
console.log(obj[key], obj['age']);
delete obj.name;
```

Java:

```java
HashMap<String , Double> obj = new HashMap<String , Double>();
obj.put('age', 18);

obj.get('age');
obj.remove('age');

```

如果不确定 key 的值（变量）可以使用如下方法调用：

```js
let key = 'age';
obj[key]; // -> 18
```

因此可以用来做 key value 的数据映射使用。由于弱类型存储的值可以多种多样，比 Java 使用起来要容易一些。详情：<http://www.w3school.com.cn/js/js_objects.asp>

#### function

函数类型，用来创建一个函数，通常会返回一个数据。

JavaScript:

```js
function fun(a, b) {
  return a + b;
}
fun(1, 2); // -> 3;
```

Java:

```java
public static int fun(int a, int b) {
  int result;
  result = a + b;

  return result;
}
fun(1, 2);
```

函数是一个可执行的小程序，根据参数处理一些逻辑并返回一段新的数据，在 JavaScript 中用非常多，为此 ES6（新版 JavaScript 语言规范）新增了箭头函数语法，用来简化函数书写：

```js
let add = function(a, b) {
  return a + b;
};

等同于

let add = (a, b) => {
  return a + b;
};

循环语句中也非常直观方便：

list.forEach((a, b) => {
  console.log(a + b);
});
```

箭头函数有个重要的特点就是自动绑定了当前的作用域，作用域的概念，JavaScript 和 Java 的一样，JavaScript 中可以使用 bind、call、apply 三个方法改变函数执行的作用域，简单区别如下：

* bind 方法，创建一个新的函数的**引用**并绑定到一个作用域特定作用域上面，同时支持传参。`bind(作用域对象, 参数1, 参数2)`
* apply、call 方法，直接调用执行该函数，在执行的时候将函数内部的作用域绑定到参数指定的作用域。`call(作用域)`

这几个方法详情请见：<http://www.jianshu.com/p/56a9c2d11adc> 。通常可能会在 JavaScript 的作用域上产生疑惑，没关系随时联系 ICE 小组进行处理解答。

箭头函数声明和特性：<http://es6.ruanyifeng.com/#docs/function#箭头函数>

函数作用域：<http://es6.ruanyifeng.com/#docs/function#作用域> 和 <http://www.w3school.com.cn/js/pro_js_object_scope.asp>

设置函数参数的默认值：<http://es6.ruanyifeng.com/#docs/function#参数默认值的位置>

#### 类型转换

类型转换可以通过调用类型的类进行转换，比如将变量 a 转换成 Number 类型，可以使用：

JavaScript:

```js
let a = '10';
a = Number(a);
```

Java:

```java
int x;
(double)x;
```

除了这种比较正规的方法之外，跟 Java 一样还有其他惯用方法进行转换。

##### 转换 number 类型

JavaScript:

```js
let a = '12.33';
console.log(parseInt(a)); // -> 12 number
console.log(parseFloat(a)); // -> 12.33 number
```

Java:

```java
int i = Integer.parseInt(“123”);
```

##### 转换 string 类型

同 Java 每个类型的值都含有 toString() 方法。

```js
let a = 12.33;
console.log(a.toString()); // -> '12.33'

将 Object 转成 JSON 字符串

let obj = {
  a: 'aa',
  b: 'bb'
};
console.log(JSON.stringify(obj)); // -> '{"a":"aa","b":"bb"}'
let objStr = '{"a":"aa","b":"bb"}';
console.log(JSON.parse(objStr)); // -> {a:"aa", b:"bb"}
```

##### 转换 boolean 类型

JavaScript 中的 boolean 的值比较多，空字符串、数字 0、null、undefined 均为布尔值的 false。此外 `!` 表示取当前布尔值的反值，可以通过 `!!` 巧妙的将值转换成布尔值类型的数据。

JavaScript:

```js
console.log(!!'a'); // -> true
console.log(!!''); // -> false 空字符串
console.log(!!0); // -> false 数字 0
console.log(!!10); // -> true
console.log(!!null); // -> false
console.log(!!undefined); // -> false
console.log(!![].length); // -> false
```

### 流程控制、比较、运算符等

* 流程控制
  * If：<http://www.w3school.com.cn/js/js_if_else.asp>
  * Switch：<http://www.w3school.com.cn/js/js_switch.asp>
  * For: <http://www.w3school.com.cn/js/js_loop_for.asp>
  * While: <http://www.w3school.com.cn/js/js_loop_while.asp>
* 比较：<http://www.w3school.com.cn/js/js_comparisons.asp>
* 运算符：<http://www.w3school.com.cn/js/js_operators.asp>

基本跟 Java 一样，下面介绍几个 JavaScript 比较常用、特殊的知识点：

#### == 和 === 的区别

JS 是弱类型语言，=== 表示全等判断，会把类型也进行比较：

```js
2 == '2' // -> true
2 === '2' // -> false
```

#### + 运算符会改变数据类型

运算符会导致数据类型的改变，这是因为运算符同时表示多种含义导致。+ 运算符既可以链接字符串，也可以计算数字，使用时需要注意：

```js
2 + 2 // -> 4 number
2 + '2' // -> '22' string
```

### ES6 新版语法增强功能

ES6 是新一代 JavaScript 语法规范，里面新增了非常多的语法和功能，而且往 Java 等传统语言靠拢。比如 class 类定义、箭头函数、真正的 Set、Map 数据类型等。下面仅列出比较推荐的用法，有一些用法由于不太稳定暂时不推荐使用。

##### `...obj` 扩展运算符

object 的赋值需要遍历相关字段，比如：

```js
let bb = {
  age: 18,
  sex: 'male',
};
let aa = {
  name: '浩睿',
};
// 在 aa 上面新增 bb 的属性需要
aa.age = bb.age;
aa.sex = bb.sex;
```

这样就比较麻烦，你必须知道所有 key 而且每次新增都需要改动相关字段。为此，ES6 规范将扩展运算符（`...`）引入对象。就上面的例子，可以这样写：

```js
let bb = {
  age: 18,
  sex: 'male',
  name: '后面的同 key 内容会覆盖前面的'
};
let aa = {
  name: '浩睿',
  ...bb,
};
```

相当于把某个对象拆开分别赋值，遇到同样的 key 后面内容会覆盖前面的。详情请看：<http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符>