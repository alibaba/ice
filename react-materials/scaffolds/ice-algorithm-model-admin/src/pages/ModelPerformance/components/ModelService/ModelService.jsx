import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';
import './ModelService.scss';

export default class ModelService extends Component {
  render() {
    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="模型服务信息" />
        <div style={{ padding: '20px' }}>
          <table className="model-service-table">
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
