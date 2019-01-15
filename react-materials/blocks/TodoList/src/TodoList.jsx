import React, { Component } from 'react';
import { Grid, Checkbox, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';

const avatarImg = require('./images/avatar.jpg');

const { Row, Col } = Grid;
const mockData = {
  accounts: [
    {
      avatar: avatarImg,
      username: 'David',
      position: 'UI/UX Designer',
      time: '2018-06-10',
    },
    {
      avatar: avatarImg,
      username: 'Edward Fletcher',
      position: 'Business Development',
      time: '2018-06-02',
    },
    {
      avatar: avatarImg,
      username: 'Allen Donald',
      position: 'SEO Expert',
      time: '2018-06-10',
    },
  ],
  todos: [
    {
      title: '参加2018国际体验设计师大会',
      time: '2018-06-11 15:00',
      tags: ['designer', 'AWD'],
    },
    {
      title: '参加2018国际体验设计师大会',
      time: '2018-06-11 15:00',
      tags: ['designer', 'AWD'],
    },
    {
      title: '参加2018国际体验设计师大会',
      time: '2018-06-11 15:00',
      tags: ['designer', 'AWD'],
    },
  ],
};

export default class TodoList extends Component {
  static displayName = 'TodoList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap guttter="20">
        <Col xxs="12" l="10">
          <IceContainer title="新增用户" style={styles.container}>
            {mockData.accounts.map((item, index) => {
              return (
                <div style={styles.userItem} key={index}>
                  <img src={item.avatar} alt="" style={styles.avatar} />
                  <div style={styles.userInfo}>
                    <h3 style={styles.userName}>{item.username}</h3>
                    <p style={styles.userPosition}>{item.position}</p>
                  </div>
                  <div style={styles.createTime}>{item.time}</div>
                </div>
              );
            })}
          </IceContainer>
        </Col>
        <Col xxs="12" l="14">
          <IceContainer title="任务列表" style={styles.container}>
            {mockData.todos.map((item, index) => {
              return (
                <div style={styles.taskList} key={index}>
                  <Checkbox id="pear" />
                  <div style={styles.taskBody}>
                    <h6 style={styles.taskTitle}>{item.title}</h6>
                    <p style={styles.taskTime}>{item.time}</p>
                    <div style={styles.taskTags}>
                      {item.tags.map((tag, idx) => {
                        return (
                          <span style={styles.taskTag} key={idx}>
                            # {tag}{' '}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div style={styles.taskOper}>
                    <Icon type="ellipsis" />
                  </div>
                </div>
              );
            })}
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  container: {
    height: '316px',
    overflowY: 'scroll',
  },
  userItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    padding: '10px 0',
  },
  avatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
  },
  userInfo: {
    marginLeft: '20px',
  },
  userName: {
    margin: 0,
  },
  userPosition: {
    margin: 0,
    fontSize: '12px',
    color: '#666',
  },
  createTime: {
    position: 'absolute',
    right: 0,
    color: '#999',
  },
  taskList: {
    display: 'flex',
    borderBottom: '1px solid #eee',
    padding: '10px 0',
  },
  taskBody: {
    width: '100%',
    padding: '0 10px',
    marginTop: '-2px',
  },
  taskTitle: {
    margin: 0,
  },
  taskTime: {
    margin: '2px 0',
    fontSize: '13px',
    color: '#666',
  },
  taskTag: {
    color: '#4AD172',
    fontSize: '12px',
    marginRight: '4px',
  },
  taskOper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#4AD172',
  },
};
