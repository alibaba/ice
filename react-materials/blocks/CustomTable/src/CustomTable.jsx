import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './CustomTable.scss';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={{ padding: 0 }}>
        <h3 style={styles.title}>模型服务信息</h3>
        <div style={{ padding: '20px' }}>
          <table className="custom-table">
            <tbody>
              <tr>
                <td>名称</td>
                <td>神经网络模型</td>
                <td>状态</td>
                <td>待上线</td>
              </tr>
              <tr>
                <td>创建人</td>
                <td>淘小宝</td>
                <td>创建时间</td>
                <td>2018-09-19 21:34:28</td>
              </tr>
              <tr>
                <td>算法场景类型</td>
                <td>分类</td>
                <td>算法实现</td>
                <td>CNN</td>
              </tr>
              <tr>
                <td>最近修改时间</td>
                <td>2018-09-19 21:34:31</td>
                <td>最新版本号</td>
                <td>0.0.1</td>
              </tr>
              <tr>
                <td>分享状态</td>
                <td>未分享</td>
                <td>调用量</td>
                <td>237,341</td>
              </tr>
            </tbody>
          </table>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
};
