import React, { Component } from 'react';
import { Input, Button, Icon } from '@icedesign/base';
import TopBar from '../../components/TopBar';
import SmallCard from '../../components/SmallCard';

const cardsData = [
  {
    name: 'repository',
    desc: '一些简单的描述',
  },
];

export default class Repository extends Component {
  static displayName = 'Repository';

  renderExtraAfter = () => {
    return (
      <div>
        <Button size="large" type="normal" style={{ marginRight: '10px' }}>
          <Icon type="process" />
          预发
        </Button>
        <Button size="large" type="normal" style={{ marginRight: '10px' }}>
          <Icon type="share" />
          发布
        </Button>
        <Button size="large" type="normal" style={{ marginRight: '10px' }}>
          同义词配置
        </Button>
        <Button size="large" type="primary">
          新建知识库
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <TopBar title="知识库" extraAfter={this.renderExtraAfter()} />
        <div style={styles.searchContainer}>
          <Input
            size="large"
            style={{ width: '300px' }}
            placeholder="请输入关键词搜索知识库"
          />
        </div>
        <SmallCard data={cardsData} />
      </div>
    );
  }
}

const styles = {
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '20px 0',
  },
};
