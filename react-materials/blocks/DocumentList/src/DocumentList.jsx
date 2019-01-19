import React, { Component } from 'react';
import { Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from './ContainerTitle';

const mockData = [
  {
    title: '环境搭建文档',
    description: '有关新人入门环境搭建的相关文档',
    time: '3小时前',
  },
  {
    title: '测试文档',
    description: '有关测试的相关文档',
    time: '12小时前',
  },
];

export default class DocumentList extends Component {
  static displayName = 'DocumentList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={styles.container}>
        <ContainerTitle title="项目文档" buttonText="新建文档" />
        <div style={styles.content}>
          {mockData.map((item, index) => {
            return (
              <a href="#" style={styles.item} key={index}>
                <Icon type="office" style={styles.icon} />
                <span style={styles.title}>{item.title}</span>
                <span style={styles.description}>{item.description}</span>
                <span style={styles.time}>{item.time}</span>
              </a>
            );
          })}
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
    minHeight: '800px',
  },
  item: {
    padding: '20px',
    borderBottom: '1px solid #f0f0f0',
    position: 'relative',
    display: 'block',
  },
  title: {
    marginLeft: '16px',
    marginRight: '24px',
    color: '#314659',
    fontSize: '14px',
  },
  icon: {
    color: '#697b8c',
  },
  description: {
    color: '#697b8c',
    fontSize: '14px',
  },
  time: {
    position: 'absolute',
    right: '20px',
    color: '#314659',
  },
};
