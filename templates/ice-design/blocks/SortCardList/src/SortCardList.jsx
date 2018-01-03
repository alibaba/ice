
import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import './SortCardList.scss';

const stateBackgroundMap = {
  0: '#F4F7FF',
  1: '#FFFAE8',
  2: '#EAFCF6',
  3: '#FFF7F7',
};

export default class SortCardList extends Component {
  static displayName = 'SortCardList';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          state: 0,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
        {
          id: 2,
          state: 1,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
        {
          id: 3,
          state: 2,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
      ],
      doings: [
        {
          id: 1,
          state: 0,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
        {
          id: 2,
          state: 1,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
        {
          id: 3,
          state: 2,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
        {
          id: 4,
          state: 2,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
        {
          id: 5,
          state: 2,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
      ],
      dones: [
        {
          id: 2,
          state: 1,
          description: '这里是任务的描述，用简短的文字介绍任务的内容，最多可以展示两行的文字',
          datetime: '07-07  18:36',
        },
      ],
    };
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleFinish = () => { };

  renderItem = (item) => {
    return (
      <div style={{
        ...styles.cardItem,
        ...{
          backgroundColor: stateBackgroundMap[item.state],
        },
      }}
        key={item.id}
        draggable
      >
        <div style={styles.desc}>{item.description}</div>
        <div>
          <span>
            <img
              alt="icon"
              src="https://gw.alicdn.com/tfs/TB1b8vJjlTH8KJjy0FiXXcRsXXa-22-22.png"
              style={styles.icon}
            />
            {item.datetime}
          </span>
          <span style={styles.done} onClick={this.handleFinish}>完成</span>
        </div>
      </div>
    );
  }

  render() {
    const {
      todos, doings, dones,
    } = this.state;
    return (
      <div className="sort-card-list">
        <IceCard style={styles.cardContainer}>
          <div style={styles.cardList}>
            <div style={styles.title}>待办事项</div>
            <div style={styles.subTitle}>在任务卡片间拖拽来排序</div>
            {todos.map(this.renderItem)}
          </div>
          <div style={styles.cardList}>
            <div style={styles.title}>进行中</div>
            <div style={styles.subTitle}>在任务卡片间拖拽来排序</div>
            {doings.map(this.renderItem)}
          </div>
          <div style={styles.cardList}>
            <div style={styles.title}>已完成</div>
            <div style={styles.subTitle}>在任务卡片间拖拽来排序</div>
            {dones.map(this.renderItem)}
          </div>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardList: {
    flex: 1,
  },
  title: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#000',
  },
  subTitle: {
    fontSize: '12px',
    marginBottom: '10px',
    color: '#000',
  },
  cardItem: {
    width: '324px',
    height: '80px',
    borderRadius: '4px',
    marginBottom: '10px',
    padding: '10px 16px',
    position: 'relative',
  },
  icon: {
    width: '11px',
    height: '11px',
    marginRight: '5px',
  },
  desc: {
    fontSize: '12px',
    color: '#000',
    marginBottom: '10px',
    height: '35px',
    overflow: 'hidden',
  },
  done: {
    fontSize: '12px',
    color: '#000',
    position: 'absolute',
    right: '16px',
    bottom: '10px',
    cursor: 'pointer',
  },
};
