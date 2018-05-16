import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownDocs.scss';

const initialSource = `
# 开发者入驻

## 产品定位

支付宝小程序是一种全新的开放模式，它运行在支付宝客户端，可以被便捷地获取和传播，为终端用户提供更优的用户体验。小程序开放给开发者更多的JSAPI和OpenAPI能力，通过小程序可以为用户提供多样化便捷服务。

支付宝小程序开放给企业帐号，想要成为支付宝小程序开发者，需要完成注册、入驻以及小程序创建三步。


## 第一步：注册

* 用【企业支付宝账号】登录开放平台 ；
* 进入【小程序公测首页】 申请小程序公测，审核时间为1个工作日；

> 注意1：公测期间尚未开放个人支付宝账户
> 注意2：未注册企业支付宝账号请访问：注册企业支付宝账号

## 第二步：入驻

使用企业支付宝账户登录，依照入驻指引选择自己入驻的身份角色，完善身份信息，签署平台服务协议，成为开放平台合作伙伴。

**1. 支付宝账号登录**

![](https://gw.alipayobjects.com/zos/skylark/public/files/e3ecca36714dd5d0cc8ecca0f84c000a.png)

**2. 选择入驻身份**

![](https://gw.alipayobjects.com/zos/skylark/public/files/b39b0dfa0c13882e4ab7377fc9f194d0.png)

**3. 完善信息**

![](https://gw.alipayobjects.com/zos/skylark/public/files/af51a6e5c4c41089588b8a2ea9f4c993.png)

## 第三步：登录小程序管理中心

完成注册后，可以选择以下渠道进入小程序管理中心：

* 通过小程序首页,点击“登录管理中心”，进入小程序管理中心，开始【创建小程】
* 通过开放平台首页,点击"登录"，进入开放平台管理中心，选择“开发者中心／小程序”，开始【创建小程序】

![](https://gw.alipayobjects.com/zos/skylark/public/files/5272d5041de283125ac03428a6e0ed4f.png)`;

export default class MarkdownDocs extends Component {
  static displayName = 'MarkdownDocs';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ReactMarkdown className="markdown-docs-body" source={initialSource} />
      </div>
    );
  }
}
