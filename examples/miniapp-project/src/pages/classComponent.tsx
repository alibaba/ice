import { Component } from 'react';

export default class Comp extends Component {
  constructor(props) {
    super(props);
  }

  onLoad() {
    console.log('yes, page onLoad in class component page');
    debugger;
  }

  onShow() {
    console.log('yes, page onShow in class component page');
    debugger;
  }

  onReady() {
    console.log('yes, page onReady in class component page');
    debugger;
  }
  componentDidMount(): void {
    // window.addEventListener('onLoad', function() {
    //   console.log('yes, page onload in class component page');
    // });
  }
  render() {
    return (
      <view>我是 class 组件</view>
    );
  }
}
