import React, { Component } from 'react';
import { Input } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 6 }).map((item, index) => {
    return {
      name: '神经网络模型',
      count: `${index}`,
    };
  });
};

export default class ModelList extends Component {
  static displayName = 'ModelList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Input 发生改变的时候触发的回调
   */
  handleChange = (value) => {
    console.log({ value });
  };

  render() {
    const mockData = getData();
    return (
      <div style={styles.wrap}>
        <IceContainer>
          <Input
            size="large"
            style={{ width: '100%' }}
            placeholder="输入关键字搜索"
            onChange={this.handleChange}
          />
        </IceContainer>
        <IceContainer style={styles.modelList}>
          <ContainerTitle title="模型服务列表" />
          <div style={styles.items}>
            {mockData.map((item, index) => {
              return (
                <div style={styles.item} key={index}>
                  <span style={styles.name}>{item.name}</span>
                  <span style={styles.count}>{item.count}</span>
                </div>
              );
            })}
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  modelList: {
    height: '500px',
    padding: '0',
    overflowY: 'scroll',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    height: '44px',
    lineHeight: '44px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
  },
  name: {
    color: '#666',
    fonstSize: '12px',
  },
  count: {
    background: '#58ca9a',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    color: '#fff',
    fonstSize: '12px',
  },
};
