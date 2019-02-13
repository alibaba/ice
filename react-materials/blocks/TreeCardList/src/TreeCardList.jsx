import React, { Component } from 'react';
import { Select } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './TreeCardList.scss';

const { Option } = Select;

const dataSource = [
  { tab: '首页', url: '##', subTitle: '10W' },
  { tab: '列表页', url: '##', subTitle: '20W' },
  { tab: '详情页', url: '##', subTitle: '30W' },
  { tab: '下单页', url: '##', subTitle: '10W' },
  { tab: '猜你喜欢', url: '##', subTitle: '40W' },
  { tab: '欢迎页面', url: '##', subTitle: '10W' },
  { tab: '项目管理页', url: '##', subTitle: '20W' },
];

export default class TreeCardList extends Component {
  static displayName = 'TreeCardList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // ICE: React Component 的生命周期

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  renderItem = (item, idx) => {
    return (
      <a
        href={item.url}
        className="tree-card-item"
        style={styles.treeCardItem}
        key={idx}
      >
        <span style={styles.tab}>{item.tab}</span>
        <span style={styles.subTitle}>{item.subTitle}</span>
      </a>
    );
  };

  render() {
    return (
      <div className="tree-card-list" style={styles.treeCardList}>
        <IceContainer>
          <div style={styles.firstRow}>
            <span>站点列表</span>
            <Select size="small">
              <Option value="淘宝">淘宝</Option>
              <Option value="支付宝">支付宝</Option>
              <Option value="阿里巴巴">阿里巴巴</Option>
            </Select>
          </div>
          {dataSource.map(this.renderItem)}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  firstRow: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  treeCardItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: '4px',
    height: '40px',
    lineHeight: '40px',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    padding: '0 10px',
    textDecoration: 'none',
  },
};
