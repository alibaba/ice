import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

const mockData = [
  {
    name: '应用总数',
    value: '126',
    src: 'https://ase.alibaba-inc.com/dist/app-total.png',
  },
  {
    name: '容器可用预览',
    value: '221',
    src: 'https://ase.alibaba-inc.com/dist/app-budget.png',
  },
];

export default class AssetCard extends Component {
  static displayName = 'AssetCard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title = '资源概览' } = this.props;
    return (
      <IceContainer title={title}>
        <ul style={styles.items}>
          {mockData.map((item, index) => {
            return (
              <li key={index} style={styles.itemBox}>
                <div style={styles.imgBox}>
                  <img src={item.src} alt="" style={styles.img} />
                </div>
                <div style={styles.itemText}>
                  <div style={styles.value}>{item.value}</div>
                  <div style={styles.name}>{item.name}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </IceContainer>
    );
  }
}

const styles = {
  items: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 40px',
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    margin: '20px 0',
  },
  value: {
    color: '#546970',
    fontSize: '28px',
    fontWeight: '500',
  },
  name: {
    marginTop: '5px',
    fontSize: '14px',
  },
  imgBox: {
    marginRight: '20px',
  },
  img: {
    width: '60px',
  },
};
