---
title: 里面包裹更复杂的结构
order: 2
importStyle: true
---

里面可以包裹更加附加的结构。

````jsx
import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import {
  Balloon,
} from '@icedesign/base';
import IceTitle from '@icedesign/title';
import IceIcon from '@icedesign/icon';

class App extends Component {

  state = {

  }

  render() {
    return (
      <div>
        <IceTitle>
          基本数据 &nbsp;
          <Balloon trigger={<IceIcon style={{position: 'relative', color:'#666666'}} type="question" size="medium" />} align="r" triggerType="hover">
            这里是基本数据的更多描述信息。
          </Balloon>
        </IceTitle>
        
        <div 
          style={{
            background:'#999',
            color:'#666',
            height:'100px',
            textAlign:'center',
            paddingTop:'40px'
          }}
        >content</div>
                
        <IceTitle 
            text="主标题"
            subtitle="副标题"
            link="http://www.taobao.com"
            decoration={true}
        />
        <div 
          style={{
            background:'#999',
            color:'#666',
            height:'100px',
            textAlign:'center',
            paddingTop:'40px'
          }}
        >content</div>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
