import React, { Component } from 'react';
import Container from '@icedesign/container';
import { Grid, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import Img from '@icedesign/img';
import styles from './index.module.scss';


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
            className={styles.container}
            style={{
              alignItems: 'center',
              height: 160,
            }}
          >
            <div className={styles.avatarWrapper}>
              <a href="#">
                <Img
                  width={64}
                  height={64}
                  src={require('./images/avatar.jpg')}
                  className={styles.avatar}
                />
              </a>
              <img
                alt="用户等级"
                src={require('./images/level.png')}
                className={styles.level}
              />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userDetail}>
                <a href="#">
                  <span className={styles.userName}>桥下小猫2</span>
                </a>
                <div className={styles.userLabel}>官方账号</div>
              </div>
              <div className={styles.userOther}>绑定机构：阿里巴巴飞冰团队</div>
              <div className={styles.userOther}>认证信息：hello 大家好！</div>
            </div>
            <div className={styles.userAttribute}>
              <div className={styles.userLevelWrapper}>
                <div className={styles.userLevelLine} />
                {this.state.userLevel.map((level, index) => {
                  const isCurrent = this.state.userCurrentLevel === level;
                  return (
                    <div
                      className={isCurrent ? styles.userlevelItemCurrent : styles.userlevelItem}
                      style={{
                        marginLeft: index === 0 ? 0 : 14,
                      }}
                      key={index}
                    >
                      {level}
                      {isCurrent && (
                        <div className={styles.userLevelLight}>当前等级</div>
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


export default UserLanding;
