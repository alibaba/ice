import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Icon } from '@icedesign/base';

const dataSource = [
  {
    text: '昨日浏览次数',
    number: '6,657',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1tlVMcgmTBuNjy1XbXXaMrVXa-140-140.png',
    desc: '相关说明',
  },
  {
    text: '总访问数',
    number: '12,896',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1Py4_ceuSBuNjy1XcXXcYjFXa-142-140.png',
    desc: '相关说明',
  },
  {
    text: '总订阅数',
    number: '9,157',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1Ni4_ceuSBuNjy1XcXXcYjFXa-142-140.png',
    desc: '相关说明',
  },
  {
    text: '总收入数',
    number: '6,682',
    imgUrl:
      'https://img.alicdn.com/tfs/TB1iFKccamWBuNjy1XaXXXCbXXa-140-140.png',
    desc: '相关说明',
  },
];

export default class StatisticalCard extends Component {
  static displayName = 'StatisticalCard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = () => {
    return dataSource.map((data, idx) => {
      return (
        <div key={idx} style={styles.statisticalCardItem}>
          <div style={styles.circleWrap}>
            <img src={data.imgUrl} style={styles.imgStyle} alt="图片" />
          </div>
          <div style={styles.statisticalCardDesc}>
            <div style={styles.statisticalCardText}>
              {data.text}
              <Balloon
                align="t"
                alignment="edge"
                trigger={
                  <span>
                    <Icon type="help" style={styles.helpIcon} size="xs" />
                  </span>
                }
                closable={false}
              >
                {data.desc}
              </Balloon>
            </div>
            <div style={styles.statisticalCardNumber}>{data.number}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="statistical-card" style={styles.statisticalCard}>
        <IceContainer style={styles.statisticalCardItems}>
          {this.renderItem()}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  statisticalCardItems: {
    display: 'flex',
    flexDirection: 'row',
    height: '110px',
    justifyContent: 'space-between',
  },
  statisticalCardItem: {
    display: 'flex',
  },
  circleWrap: {
    width: '70px',
    height: '70px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    marginRight: '10px',
  },
  imgStyle: {
    maxWidth: '100%',
  },
  helpIcon: {
    marginLeft: '5px',
    color: '#b8b8b8',
  },
  statisticalCardDesc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  statisticalCardText: {
    position: 'relative',
    color: '#333333',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  statisticalCardNumber: {
    color: '#333333',
    fontSize: '24px',
  },
  itemHelp: {
    width: '12px',
    height: '12px',
    position: 'absolute',
    top: '1px',
    right: '-15px',
  },
};
