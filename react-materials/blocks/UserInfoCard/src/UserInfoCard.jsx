import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Icon } from '@alifd/next';

export default class UserInfoCard extends Component {
  static displayName = 'UserInfoCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <div className="user-info-card" style={styles.container}>
          <Balloon
            trigger={<a style={styles.triggerText}>张三</a>}
            closable={false}
          >
            <div style={styles.content}>
              <div style={styles.head}>
                <img
                  src={require('./images/TB13xyECxGYBuNjy0FnXXX5lpXa-484-488.png')}
                  style={styles.avatar}
                  alt="头像"
                />
                <div style={styles.baseInfo}>
                  <h5 style={styles.name}>张三</h5>
                  <p style={styles.deptName}>销售部 - 内销平台 - 售后服务</p>
                </div>
              </div>
              <ul style={styles.body}>
                <li style={styles.profileItem}>
                  <Icon type="map" size="xs" style={styles.itemIcon} /> 杭州
                </li>
                <li style={styles.profileItem}>
                  <Icon type="discount" size="xs" style={styles.itemIcon} />
                  销售专家
                </li>
                <li style={styles.profileItem}>
                  <Icon type="phone" size="xs" style={styles.itemIcon} />
                  871066160
                </li>
                <li style={styles.profileItem}>
                  <Icon type="mobile-phone" size="xs" style={styles.itemIcon} />
                  13867894321
                </li>
                <li style={{ ...styles.profileItem, width: '100%' }}>
                  <a href="mailto:ice-admin@alibaba-inc.com">
                    <Icon type="email" size="xs" style={styles.itemIcon} />
                    ice-admin@alibaba-inc.com
                  </a>
                </li>
                <li style={{ ...styles.profileItem, width: '100%' }}>
                  <Icon type="account" size="xs" style={styles.itemIcon} />
                  主管：李四
                </li>
              </ul>
            </div>
          </Balloon>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '20px 0',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  head: {
    display: 'flex',
    paddingBottom: '10px',
    borderBottom: '1px dotted #eee',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50px',
    border: '1px solid #eee',
  },
  name: {
    padding: '0 10px',
    margin: 0,
  },
  deptName: {
    padding: '0 10px',
    margin: 0,
    fontSize: '12px',
  },
  body: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '10px',
  },
  profileItem: {
    width: '50%',
    lineHeight: '26px',
  },
  itemIcon: {
    color: '#8a9099',
    marginRight: '5px',
  },
  triggerText: {
    color: '#108ee9',
    borderBottom: '1px dashed #108ee9',
    cursor: 'pointer',
  },
};
