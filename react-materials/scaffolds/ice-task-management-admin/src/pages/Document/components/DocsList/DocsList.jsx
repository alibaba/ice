import React, { Component } from 'react';
import { Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { withRouter } from 'react-router-dom';
import ContainerTitle from '../../../../components/ContainerTitle';

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

@withRouter
export default class DocsList extends Component {
  handleAdd = () => {
    this.props.history.push('/add/document');
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <ContainerTitle
          title="项目文档"
          buttonText="添加文档"
          onClick={this.handleAdd}
        />
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
