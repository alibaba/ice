---
title: Simple Usage
order: 1
importStyle: true
---

本 Demo 演示List组件的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List, { Item } from '@icedesign/list';


class App extends Component {

  render() {
    const dataSource = [
      {text: 'Apple'},
      {text: 'Samsung'},
      {text: 'Sony'},
      {text: 'Huawei'},
      {text: 'Xiaomi'}
    ];
    return (
      <div>
        <List
          column={2}
          spacing={20}
          style={{
            width: 450,
            backgroundColor: '#ccc'
          }}
        >
          {dataSource.map((value, index) => {
            return (
              <Item
                key={index}
                style={{
                  background: '#4aa',
                  height: 150
                }}
              >
                <div
                  style={{
                    lineHeight: '150px',
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: '24px',
                  }}
                >
                  {value.text}
                </div>
              </Item>
            );
          })}
        </List>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
