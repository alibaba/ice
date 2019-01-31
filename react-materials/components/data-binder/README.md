---
title: DataBinder
category: Components
chinese: 数据交互方案
---

ICE 前后端数据绑定、交互方案。

## 介绍和使用方法

### 目标

灵感来源于 Webx，基于一定的**约定**帮你在组件上绑定一些数据和用来更新数据的 API，让你专注于 render 方法中界面显示逻辑，从而屏蔽掉 AJAX、state 管理等开发成本。

如果你希望你的接口更自由，或者你希望自行把数据维护在组件 state 内，则都不推荐使用本方案。

### 15 分钟快速上手教程

15 分钟视频演示快速对比 Data-Binder 与 AJAX 方案对比，详细文档在下面。

[点击这里查看视频](https://cloud.video.taobao.com/play/u/654982961/p/1/e/6/t/1/50636752.mp4)

### 使用方法

**1. 在某个 Class 上面配置当前需要的 DataSource**

DataBinder 采用 decorator（类似 Java 注解）的方式使用，即在 class 上面调用并配置相关信息即可生效。

**DataSource** 是 ICE DataBinder 解决方案中最重要的概念，组件、页面中某一块依赖数据的功能会被作为一个 DataSource 模块，用一个模块 Key 来区分，每一个数据模块可以配置多种数据获取方式以及默认数据等，然后注入到组件中被使用（详细的说明在下面）。比如我们最常见的通过 AJAX 获取、操作数据：

```jsx
@DataBinder({
  '模块名 key': {
    url: 'xxxx.json',
    method: 'post',
    // 请求附带的 request 参数，method post 下是 data 参数
    data: {
      page: 1
    },
    // AJAX 部分的参数完全继承自 axios ，参数请详见：https://github.com/axios/axios
    // 下面是请求会返回的默认数据
    defaultBindingData: {
      // ...字段需要与 xxxx.json 接口返回的字段一一对应
    }
  }
})
class ListView extends Component {
  ...
}
```

例如：

```jsx
@DataBinder({
  account: {
    url: '/getAccountInfo.json',
    type: 'post',
    data: {
      uid: '123123'
    },
    defaultBindingData: {
      // 配置接口返回数据的字段的初次默认值
      userName: '',
      userAge: 0
    }
  }
})
class ListView extends Component {
  ...
}
```

详细的解释下：

* 模块名 key **必填** 用来将数据和接口约束在某一个范围下，通常按照接口数据划分或者按照功能区块。
* `url, type, data, etc.` **选填** 配置当前模块接口相关信息，基于 [axios](https://github.com/axios/axios) 支持其文档所有参数。该参数可选，部分模块可能无需 AJAX 交互，或者无法写死配置需要通过其他接口来获取。
* `defaultBindingData` **选填** 该字段配置当前模块数据初始化默认值，如果当前模块有异步接口配置，则模块的字段需要与接口返回的数据字段一一对应。该参数可选，因为有些接口只需要提交成功即可，无需 UI 变化。

**2. 通过 `this.props.bindingData.模块key` 来获取绑定的数据**

对某个 React class 添加 DataBinder 绑定配置之后，DataBinder 会在组件上添加一个 props `bindingData` 用来存放配置的所有数据，模块 key 为你对应的 DataSource key 的前部分，比如：配置 `account` 可以通过 `this.props.bindingData.account` 获取到被绑定的数据，第一次为 `defaultBindingData` 里面配置的数据。

因此你可以在你 render 部分的代码编写如下代码调用：

```jsx
@DataBinder({...})
class ListView extends Component {

  render() {
    const { account } = this.props.bindingData;

    return (
      <div>
        <p>用户名：{account.userName}</p>
        <p>年龄：{account.userAge}</p>
      </div>
    );
  }
}
```

**3. 通过 `this.props.updateBindingData` 来更新模块数据**

DataBinder 除了为组件添加一个 props 之外，还向组件内部注入一个 API 用来更新模块数据：

`this.props.updateBindingData(key, params, callback);` 第一个参数是模块 key ，字符串类型，用来标记更新哪一个 DataSource，需要保留全名（例如：`account`）。第二个参数是 DataSource 的配置，对象类型，调用时它会和默认定义的数据进行一个 merge 操作，并发起 AJAX 请求。通常你只需要传递 `{data: {...}}` 数据即可，`data` 用来描述对接口发请求时附加的参数。第三个参数是 `callback`，是一个函数，当请求结束之后调用，方便你处理额外逻辑。

> 注意：updateBindingData 里面传递的参数，跟顶部配置的初始化参数是一个 deepmerge 的合并操作。

比如一个翻页组件，当页码变化时获取新数据可以这样做：

```jsx
@DataBinder({
  accountTable: {
    url: '/getAccountTableList.json',
    type: 'post',
    data: {
      page: 1,
      pageSize: 10,
    },
    defaultBindingData: {
      page: 1,
      pageSize: 10,
      total: 0,
      lists: [],
    },
  },
})
class ListView extends Component {
  changePage = (pageNo) => {
    this.props.updateBindingData('accountTable', {
      data: {
        page: pageNo,
      },
    });
  };

  render() {
    const { accountTable } = this.props.bindingData;

    return (
      <div>
        当前 Table 数据：{accountTable.lists}
        <Pagination
          current={accountTable.page}
          pageSize={accountTable.pageSize}
          total={accountTable.total}
          onChange={this.changePage}
        />
      </div>
    );
  }
}
```

DataBinder 不会在组件初始化的时候帮你自动请求一次，因为有些 DataSource 不需要默认就请求一次。如果你需要在初始化的异步请求数据，就需要在合适的生命周期中主动调用该方法，比如组件即将渲染的时候拉取数据：

```jsx
@DataBinder({...})
class ListView extends Component {
  componentDidMount() {
    // 拉取第一页的数据
    this.props.updateBindingData('accountTable', {
      data: {
        page: 1
      }
    });
  }
}
```

**4. 处理 Loading 逻辑和效果**

AJAX 是异步的，为了更好的用户体验，推荐添加一个 Loading 效果组件来给用户请求中的反馈。

每一个 DataSource 模块的数据附带了一个私有属性 `__loading` 来标记当前模块是否正在请求过程中，这样你可以在组件 render 中读取这个数据来判断是否正在加载数据。比如 Table 组件内部封装了一个 Loading 的效果，需要使用 `isLoading` props 进行配置，那么就可以写：

```jsx
const { accountTable } = this.props.bindingData;

<Table dataSource={accountTable.lists} isLoading={accountTable.__loading}>
  ...
</Table>;
```

你也可以使用 `Loading` 组件进行 loading 效果的模拟，参照文档可以写出如下代码：

```jsx
import DataBinder from '@icedesign/data-binder';
import { Loading } from '@alifd/next';

@DataBinder({
  account: {
    // 接口返回数据：{status: 'SUCCESS', data: {foo: 'bar'}}
    url: '/getdefaultBindingData.json',
    defaultBindingData: {
      foo: null,
    },
  },
})
class ListView extends Component {
  componentDidMount() {
    this.props.updateBindingData('account');
  }

  refresh = () => {
    this.props.updateBindingData('account');
  };

  render() {
    const { account } = this.props.bindingData;

    return (
      <div>
        <Loading
          state={account.__loading ? 'on' : 'off'}
          shape="fusion-reactor"
        >
          <div>当前 foo 的值为：{account.foo}</div>
        </Loading>
        <div style={{ marginTop: 20 }}>
          <Button onClick={this.refresh}>点击重新请求</Button>
        </div>
      </div>
    );
  }
}
```

效果如图示：

![](//img.alicdn.com/tfs/TB1qLUVPXXXXXXqaXXXXXXXXXXX-706-372.gif)

此外，根模块也有一个 `__loading` 属性（即：`this.props.bindingData.__loading`），用来标记当前注册的所有模块中是否有某个模块在发送 AJAX 请求。这样可以便于进行全局的提示，比如一个 AJAX 请求全局提示标记等。

## 参数配置

### DataBinder decorator 用法

调用方法：

```js
@DataBinder({
  模块key: {
    url: 'xxx.json',
    //... AJAX axios 配置
    responseFormatter: (responseHandler, res, originResponse) => {
      // 做一些数据转换
      const newRes = {
        status: res.code !== 0 ? 'SUCCESS' : 'ERROR',
        message: res.successMsg,
      };
      // 回传给处理函数
      // 不做回传处理会导致数据更新逻辑中断
      responseHandler(newRes, originResponse);
    },
    defaultBindingData: {
      foo: 'bar',
    },
  },
})
class ListView extends React.Component {
  render() {
    const key = this.props.bindingData.key;

    return <div>{key.foo}</div>;
  }
}
```

* `dataSouce` 内容为符合 [axios](https://github.com/axios/axios) 的请求参数。
* `responseFormatter` 用来做老接口数据转换用，老接口如果不按照现有模式需要进行一层数据转换处理。
* `defaultBindingData` 内容为接口对应字段的默认数据，在 render 中使用 `this.props.bindingData` 获取。

## 接口 API

以下 API 会注入到 Class 中，通过 `this.props.xxxx` 的方式调用。

| API 名                         | 说明                           | 是否有参数 | 参数类型                                        | 参数值 | 备注                                                         |
| ------------------------------ | ------------------------------ | ---------- | ----------------------------------------------- | ------ | ------------------------------------------------------------ |
| `this.props.updateBindingData` | 获取更新 DataSource 的数据     | true       | key: string, params: object, callback: function |        | `this.props.updateBindingData('account', {data: {page: 5}})` |
| `this.props.getDataSource`     | 获取某个 DataSource 的默认配置 | true       | key: string                                     |        |                                                              |

## 后端接口协议

配置的 AJAX 接口需要按照一定的协议规则实现：

**request:**

业务接口自定。

**response:**

```json
{
  "status": "SUCCESS",
  "message":
    "接口请求完成的提示，可有可无，status 为非 SUCCESS 时会显示报错的 UI",
  "data": {
    "foo":
      "data 是具体的数据，需要与该接口定义的 defaultBindingData 字段结构保持一致"
  }
}
```

## 自定义 requestClient

如果你的项目 ajax 模块进行了统一配置和通用处理的封装，或者使用 ws 或者其它的 RPC 手段进行网络通信，DataBinder 允许对请求客户端进行自定义。
在 DataBinder 传递第二个参数对象，并指定 requestClient 为一个返回 promise 的请求函数。该 Promise resolve 的值为 response 对象，该 response 对象必须包含一个 data 字段，值为返回的数据。

**DEMO**

```jsx
import jsonp from 'jsonp';

/**
 * 自定义的 json request client
 */
function request(opts) {
  return new Promise((resolve, reject) => {
    jsonp(opts.url, { name: 'callback' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data });
      }
    })
  });
}

@DataBinder({
  account: {
    // 这里的所有字段会作为参数传递给 requestClient
    url: 'https://ice.alicdn.com/assets/mock/53141.jsonp.js',
  }
}, { requestClient: request })
export default class extends React.Component {
  // ...
}
```


## 常见需求

#### 发送数组类型数据，key 自动加了 `[]` 怎么办？

当你传输的 data 中有个 key 数据（例如：items）为数组格式时，提交给后端 key 会自动添加 `[]`（例如：items[]=xxx、items[]=yyy）。如果你不需要这种功能，希望使用原本的 key 进行提交，可以添加下面配置解决：

```js
{
  serializeArray: false;
}
```

#### 接口是老版本接口，不符合 DataBinder 接口协议如何处理？

配置 DataSource 时，添加 `responseFormatter` 配置进行数据处理，然后返回符合规范的数据。

#### 自定义请求成功、失败的提示和逻辑

在 DataSource 配置部分自定义 success、error callback 实现，以 success 为例：

```js
@DataBinder({
  key: {
    url: 'xxx.json',
    success: (res, defaultCallback, originResponse) => {
      console.log('请求成功了，返回的数据为', res)
      // 执行默认的逻辑请求成功逻辑
      // 通常为弹出反馈 Toast
      defaultCallback();
      // originResponse 内容请参见：https://github.com/axios/axios#response-schema
    },
    defaultBindingData: {
      foo: 'bar'
    }
  }
})
class ...
```

error callback 的参数和逻辑同 success。


