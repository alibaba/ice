---
title: 前后端通信
order: 2
---

## 使用 AJAX 进行通信
以前端工程中使用最普遍的 [axios](https://github.com/axios/axios) 为例，在进行数据的处理时，一般如下：

```js
class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      total: 0,
      lists: [],
    }
  }

  componentDidMount() {
    getData({page: 1, pageSize: 10})
  }

  getData(params) {
    axios({
      method: 'get',
      url: '/api/getData',
      data: params
    }).then(res => {
      this.setState({
        // page: xxx,
        // pageSize: xxx,
        // total: xxx,
        // lists: [...],
      })
    });
  }

  updateData() {
    axios({
      // ...
    })
  }

  deleteData() {
    axios({
      // ...
    })
  }

  render() {
    const { lists, page, pageSize, total } = this.state;
    return <div>...</div>
  }
}
``` 
从以上代码可以看出，每一个 Action 背后，用户都要关注 AJAX 的逻辑以及管理 state 的变化，这无疑给开发者带来多余的开发成本。试想，如果能通过一份配置，结合更新数据的 API，让用户不再关注 AJAX 层的实现、不再维护 state 的状态，仅专注于 render 层的 UI 逻辑实现，这是多么理想的一种状态。ice 提供的 [DataBinder](https://ice.work/component/databinder) 组件便是为优化这种问题而开发的。

## 使用 DataBinder 简化
DataBinder 的灵感来源于 Webx，基于一定的**约定**在组件上绑定数据，同时暴露一些更新数据的 API。帮助用户屏蔽掉 AJAX 层的实现逻辑、减少维护数据状态的成本，使用户专注在 UI 层的实现。

使用方法：  
1. 在 Class 上面配置当前需要的 DataSource  

    ```js
    @DataBinder({
      demo: {
        url: '/api/getData',
        method: 'get',
        // 请求附带的 request 参数，method post 下是 data 参数
        data: {
          page: 1,
          pageSize: 10
        },
        // AJAX 部分的参数完全继承自 axios ，参数请详见：https://github.com/axios/axios
        // 下面是请求会返回的默认数据
        defaultBindingData: {
          // ...字段需要与 xxxx.json 接口返回的字段一一对应
          dataList: [],
          page: 1,
          pageSize: 10, 
          total: 0
        }
      }
    })
    class Demo extends Component {
      ...
    }
    ```

2. 通过 `this.props.bindingData.demo` 来获取绑定的数据 

    ```js
    @DataBinder({...})
    class Demo extends Component {

      render() {
        const { demo } = this.props.bindingData;

        return (
          <div>
            {demo.lists}
          </div>
        );
      }
    }
    ```

3. 通过 `this.props.updateBindingData` 来更新模块数据

    ```js
    @DataBinder({...})
    class Demo extends Component {
      // e.g. 翻页
      changePage(pageNo) {
        this.props.updateBindingData('demo', {
          data: {
            page: pageNo,
          },
        });
      }
      // ...
    }
    ```
    DataBinder 不会在组件初始化的时候自动发起请求，所以在对应的生命周期中需要主动调用一次该方法：

    ```js
    @DataBinder({...})
    class Demo extends Component {
      componentDidMount() {
        // 拉取第一页的数据
        this.props.updateBindingData('demo', {
          data: {
            page: 1
          }
        });
      }
    }
    ```
4. 处理 Loading 逻辑和效果   
  AJAX 是异步的，为了更好的用户体验，推荐添加一个 Loading 组件来实时反馈异步调用的进度。  
  每一个 DataSource 模块的数据附带了一个私有属性 `__loading` 来标记当前模块是否正在请求过程中，这样你可以在组件 render 中读取这个数据来判断是否正在加载数据。比如 Table 组件内部封装了一个 Loading 的效果，需要使用 `isLoading` props 进行配置，那么就可以写：

    ```js
    const { demo } = this.props.bindingData;

    <Table dataSource={demo.lists} isLoading={demo.__loading}>
      ...
    </Table>;
    ```

更详细的使用教程参考 [DataBinder](https://ice.work/component/databinder) 文档。


## 跨域问题
前后端通信，不可避免的一个话题就是跨域问题。
常见的解决方式有：
1. jsonp  
  其原理是：Web 页面上调用 js 文件时不受是否跨域的影响（不仅如此，凡是拥有”src”这个属性的标签都拥有跨域的能力，比如 `<script>`、`<img>`、`<iframe>`）。
2. 代理转发  
  server 到 server 不存在跨域问题，当前后端资源不是部署在同一个域名下的时候，可以使用前端的 server 进行 api 接口的代理转发，从而解决跨域问题。
3. CORS  
  跨域资源共享（Cross-Origin Resource Sharing）是一种机制，它使用额外的 HTTP 头部告诉浏览器可以让一个 web 应用进行跨域资源请求。
  这也是最常用的一种跨域解决方式，不便之处就是需要服务端配合修改。
