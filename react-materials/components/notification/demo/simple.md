---
title: 简单的用法
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IceNotification from '@icedesign/notification';
import { Button, Icon, Select } from '@alifd/next';

class App extends Component {
  state = {};
  basic = () => {
    IceNotification.open({
      message: '蒹葭苍苍，白露为霜',
      description:
        '所謂伊人，在水一方。 溯洄從之，道阻且長。 溯游從之，宛在水中央。 蒹葭萋萋，白露未晞。 所謂伊人，在水之湄。 溯洄從之，道...',
    });
  };

  duration = () => {
    const args = {
      message: '蒹葭苍苍，白露为霜',
      description: '不会自动关闭，除非手动点击关闭按钮！',
      duration: 0,
    };
    IceNotification.open(args);
  };

  icon = () => {
    IceNotification.open({
      message: '蒹葭苍苍，白露为霜',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: <Icon type="credit-level-filling" />,
    });
  };

  placement = () => {
    IceNotification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  btn = () => {
    const close = () => {
      console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.'
      );
    };
    const key = `open${Date.now()}`;
    const btnClick = function() {
      // to hide notification box
      IceNotification.close(key);
    };
    const btn = (
      <Button type="primary" size="small" onClick={btnClick}>
        Confirm
      </Button>
    );
    IceNotification.open({
      message: 'Notification Title',
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      onClose: close,
    });
  };

  openNotificationWithIcon = (type) => {
    IceNotification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  render() {
    return (
      <div>
        <p>
          最简单的用法，4.5 秒后自动关闭。
          <Button type="primary" onClick={this.basic}>
            ClickMe！
          </Button>
        </p>

        <p>
          自定义通知框自动关闭的延时，默认`4.5s`，取消自动关闭只要将该值设为 `0`
          即可。。
          <Button type="primary" onClick={this.duration}>
            ClickMe！
          </Button>
        </p>

        <p>
          图标可以被自定义。
          <Button type="primary" onClick={this.icon}>
            ClickMe！
          </Button>
        </p>

        <p>
          可以设置通知从右上角、右下角、左下角、左上角弹出。
          <Select
            defaultValue="topRight"
            style={{ width: 120, marginRight: 10 }}
            onChange={(val) => {
              IceNotification.config({ placement: val });
            }}
          >
            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((val) => (
              <Select.Option key={val} value={val}>
                {val}
              </Select.Option>
            ))}
          </Select>
          <Button type="primary" onClick={this.placement}>
            ClickMe！
          </Button>
        </p>

        <p>
          自定义关闭按钮的样式和文字。
          <Button type="primary" onClick={this.btn}>
            ClickMe！
          </Button>
        </p>

        <p>
          通知提醒框左侧有图标。
          <Button onClick={() => this.openNotificationWithIcon('success')}>
            Success
          </Button>
          <Button onClick={() => this.openNotificationWithIcon('info')}>
            Info
          </Button>
          <Button onClick={() => this.openNotificationWithIcon('warning')}>
            Warning
          </Button>
          <Button onClick={() => this.openNotificationWithIcon('error')}>
            Error
          </Button>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
