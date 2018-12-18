import React, { Component } from 'react';
import Container from '@icedesign/container';
import { Grid, Button } from '@icedesign/base';
import { withRouter } from 'react-router-dom';
import Img from '@icedesign/img';

const { Row, Col } = Grid;
@withRouter
class UserLanding extends Component {
  state = {
    userLevel: ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
    userCurrentLevel: 'L5',
  };

  handlePost = () => {
    this.props.history.push('/post/new');
  };

  render() {
    return (
      <Row wrap gutter="20">
        <Col l="18">
          <Container
            style={{
              ...styles.container,
              alignItems: 'center',
              height: 160,
            }}
          >
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
                  <span style={styles.userName}>桥下小猫2</span>
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
                        backgroundColor: isCurrent ? '#ee706d' : '#fff',
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
        </Col>
        <Col l="6">
          <Container style={{ height: 160 }}>
            <h3 style={{ margin: 0, color: '#333' }}>代办事项</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: 12,
                justifyContent: 'space-between',
                padding: '20px 0 10px 0',
                borderBottom: '1px solid #f6f6f6',
              }}
            >
              <div>订阅号留言</div>
              <div>
                V任务 <span>(0)</span>
              </div>
            </div>
            <div style={{ paddingTop: 10, textAlign: 'center' }}>
              <Button
                onClick={this.handlePost}
                type="primary"
                style={{
                  width: '100%',
                  lineHeight: '40px',
                  height: 40,
                  borderRadius: 4,
                }}
              >
                发布新作品
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
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
    color: '#ee706d',
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
    border: '1px solid #ee706d',
    borderRadius: '12px',
    padding: '2px 6px',
    marginLeft: 14,
    position: 'relative',
  },
  userLevelLight: {
    position: 'absolute',
    color: '#ee706d',
    top: 30,
    width: 48,
    fontSize: 12,
    left: -12,
  },
  userLevelLine: {
    height: 2,
    backgroundColor: '#ee706d',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 11,
    zIndex: 0,
  },
};

export default UserLanding;
