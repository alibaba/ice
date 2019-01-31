---
title: 动态增加、减少表单项
order: 8
importStyle: true
---

演示 Input 组件数据交互和循环数组数据交互，数组表单用法，动态增加、减少表单项。


````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Input, Button, Grid, DatePicker } from '@alifd/next';
const { Row, Col } = Grid;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: {
        items: [{}]
      }
    };
  }

  addItem = () => {
    this.state.value.items.push({});
    this.setState({ value: this.state.value });
  };

  formChange = value => {
    // 说明：
    //  1. 表单是双向通行的，所有表单的响应数据都会同步更新 value
    //  2. 这里 setState 只是为了实时展示当前表单数据的演示使用
    this.setState({ value });
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
     this.refs.form.validateFields((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <div>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <ArticleList
            items={this.state.value.items}
            addItem={this.addItem}
            removeItem={this.removeItem}
            validateAllFormField={this.validateAllFormField}
          />
        </FormBinderWrapper>

        <div style={styles.preview}>
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
      <div>
        {this.props.items.map((item, index) => {
          return (
            <Row key={index} style={styles.row}>
              <Col>
                <span>文章名称：</span>
                <FormBinder required message="文章名称必填" name={`items[${index}].name`} >
                  <Input />
                </FormBinder>
                <FormError name={`items[${index}].name`} style={styles.formError} />
              </Col>
              <Col>
                <span>文章地址：</span>
                <FormBinder name={`items[${index}].url`} type="url" required message="请输入正确的 URL 地址" >
                  <Input />
                </FormBinder>
                <FormError name={`items[${index}].url`} style={styles.formError} />
              </Col>
              <Col>
                <Button type="secondary" onClick={this.props.removeItem.bind(this, index)}>删除</Button>
              </Col>
            </Row>
          );
        })}
        <div style={styles.buttons}>
          <Button type="secondary" onClick={this.props.addItem}>新 增</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={this.props.validateAllFormField}>
            校 验
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  row: {
    marginBottom: '20px',
  },
  formError: {
    display: 'block',
    marginTop: '10px',
    marginLeft: '70px',
  },
  buttons: {
    margin: '20px 0 0 86px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10
  }
}

ReactDOM.render(<App />, mountNode);
````
