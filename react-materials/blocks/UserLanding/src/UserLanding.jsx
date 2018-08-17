import React, { Component } from 'react';
import Container from '@icedesign/container';
import Img from '@icedesign/img';

class UserLanding extends Component {
  state = {
    userLevel: ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
    userCurrentLevel: 'L5',
  };

  render() {
    return (
      <Container style={styles.container}>
        <div style={styles.avatarWrapper}>
          <a href="#">
            <Img
              width={64}
              height={64}
              src={require('./images/avatar.jpg')}
              style={styles.avatar}
            />
          </a>
          <img
            alt="用户等级"
            src={require('./images/level.png')}
            style={styles.level}
          />
        </div>
        <div style={styles.userInfo}>
          <div style={styles.userDetail}>
            <a href="#">
              <span style={styles.userName}>淘小宝</span>
            </a>
            <div style={styles.userLabel}>官方账号</div>
          </div>
          <div style={styles.userOther}>绑定机构：阿里巴巴飞冰团队</div>
          <div style={styles.userOther}>认证信息：hello 大家好！</div>
        </div>
        <div style={styles.userAttribute}>
          <div style={styles.userLevelWrapper}>
            <div style={styles.userLevelLine} />
            {this.state.userLevel.map((level, index) => {
              const isCurrent = this.state.userCurrentLevel === level;
              return (
                <div
                  style={{
                    ...styles.userlevelItem,
                    marginLeft: index === 0 ? 0 : 14,
                    backgroundColor: isCurrent ? 'rgb(255, 44, 84)' : '#fff',
                    color: isCurrent ? '#fff' : '#666',
                  }}
                  key={index}
                >
                  {level}
                  {isCurrent && (
                    <div style={styles.userLevelLight}>当前等级</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    );
  }
}

const styles = {
  container: { display: 'flex' },
  avatarWrapper: {
    width: 64,
    height: 65,
    position: 'relative',
    // filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))',
  },
  avatar: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
  },
  level: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
  },
  userInfo: {
    marginLeft: 20,
    color: '#999',
    flex: 'auto',
  },
  userDetail: {
    display: 'flex',
    height: 24,
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    color: '#666',
    marginRight: 5,
    display: 'inline-block',
    maxWidth: 200,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  userLabel: {
    height: 16,
    lineHeight: '16px',
    borderRadius: 2,
    padding: '0 5px',
    marginLeft: 10,
    fontSize: 12,
    textAlign: 'center',
    color: 'rgb(255, 44, 84)',
    backgroundColor: 'rgb(255, 242, 244)',
    whiteSpace: 'nowrap',
  },
  userOther: {
    fontSize: 12,
    lineHeight: '20px',
  },
  userLevelWrapper: {
    display: 'flex',
    position: 'relative',
  },
  userlevelItem: {
    backgroundColor: '#fff',
    border: '1px solid rgb(255, 44, 84)',
    borderRadius: '12px',
    padding: '2px 6px',
    marginLeft: 14,
    position: 'relative',
  },
  userLevelLight: {
    position: 'absolute',
    color: 'rgb(255, 44, 84)',
    top: 30,
    width: 48,
    fontSize: 12,
    left: -12,
  },
  userLevelLine: {
    height: 2,
    backgroundColor: 'rgb(255, 44, 84)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 11,
    zIndex: 0,
  },
};

export default UserLanding;
