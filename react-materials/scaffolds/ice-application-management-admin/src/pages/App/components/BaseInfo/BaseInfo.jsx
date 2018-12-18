import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './BaseInfo.scss';

export default class BaseInfo extends Component {
  static displayName = 'BaseInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={{ padding: 0 }}>
        <h3 style={styles.title}>应用信息</h3>
        <div style={{ padding: '20px' }}>
          <table className="base-info-table">
            <tbody>
              <tr>
                <td>名称</td>
                <td>淘宝</td>
                <td>状态</td>
                <td>已上线</td>
              </tr>
              <tr>
                <td>创建人</td>
                <td>淘小宝</td>
                <td>创建时间</td>
                <td>2018-09-19 21:34:28</td>
              </tr>
              <tr>
                <td>场景类型</td>
                <td>电子商务</td>
                <td>所属公司</td>
                <td>阿里巴巴</td>
              </tr>
              <tr>
                <td>最近修改时间</td>
                <td>2018-09-19 21:34:31</td>
                <td>最新版本号</td>
                <td>0.0.1</td>
              </tr>
              <tr>
                <td>使用人数</td>
                <td>666,888</td>
                <td>下载量</td>
                <td>888,999</td>
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
