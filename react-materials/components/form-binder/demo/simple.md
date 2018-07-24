---
title: 数组表单用法
order: 2
importStyle: true
---

演示 Input 组件数据交互和循环数组数据交互 Demo。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Grid } from '@icedesign/base';
const { Row, Col } = Grid;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: {
        title: '',
        items: [{}]
      }
    };
  }

  addItem = () => {
    this.state.value.items.push({});
    this.setState({
      value: this.state.value
    });
  };

  formChange = value => {
    console.log('value', value);
    this.setState({
      value
    });
  };

  changeItem = () => {
    let items = this.state.value.items;
    items[0].aaa = '有趣';
    this.setState({
      value: {
        ...this.state.value,
        items: items
      }
    });
  };

  removeItem = (index) => {
    this.state.value.items.splice(index, 1);
    this.setState({
      value: this.state.value
    });
  }

  validateAllFormField = () => {
     this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            <div >
              <span>请输入标题（必填）：</span>
              <IceFormBinder required triggerType="onBlur" max={10} message="标题必填" >
                <Input name="title"/>
              </IceFormBinder>
              <div><IceFormError name="title" /></div>
            </div>
            <div style={{marginTop: 20}}>
              <span>请输入文章名称：</span>
              <ArticleList
                items={this.state.value.items}
                addItem={this.addItem}
                removeItem={this.removeItem}
                validateAllFormField={this.validateAllFormField}
              />
            </div>
          </div>
        </IceFormBinderWrapper>
        <div style={{border: '1px solid #ccc', background: '#cacaca', marginTop: 20, padding: 10}}>
          <strong>当前表单数据：</strong>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

class ArticleList extends Component {
  render() {
    return (
      <div style={{marginTop: 10}}>
        {this.props.items.map((item, index) => {
          return (
            <Row key={index} style={{marginTop: 5}}>
              <Col>
                <span>文章名称：</span>
                <IceFormBinder required message="文章名称必填" >
                  <Input name={`items[${index}].name`} />
                </IceFormBinder>
                <div><IceFormError name={`items[${index}].name`} /></div>
              </Col>
              <Col>
                <span>文章地址：</span>
                <IceFormBinder name={`items[${index}].url`} type="url" required message="文章地址必填，并且是一个 url" >
                  <Input />
                </IceFormBinder>
                <div><IceFormError name={`items[${index}].url`} /></div>
              </Col>
              <Col>
                <Button onClick={this.props.removeItem.bind(this, index)}>删除</Button>
              </Col>
            </Row>
          );
        })}
        <Button style={{marginTop: 10}} onClick={this.props.addItem}>新增一个 item，每一行第一个支持校验</Button>
        <Button style={{marginLeft: 10}} onClick={this.props.validateAllFormField}>
          校验整个表单
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
