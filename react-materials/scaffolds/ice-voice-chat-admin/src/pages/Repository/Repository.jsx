import React, { Component } from 'react';
import { Input, Button, Icon, Dialog, Message } from '@alifd/next';
import TopBar from '../../components/TopBar';
import GeneralDialog from '../../components/GeneralDialog';
import SmallCard from '../../components/SmallCard';

export default class Repository extends Component {
  state = {
    data: [
      {
        name: 'repository',
        desc: '一些简单的描述',
      },
    ],
  };

  handlePrePublish = () => {
    Dialog.confirm({
      title: '发布预发？',
      content:
        '确认要进行预发操作吗？预发需要几分钟的时间，预发完成后，即可在测试界面进行测试。',
    });
  };

  handlePublish = () => {
    Dialog.confirm({
      title: '发布线上',
      content:
        '确认要进行发布操作吗？进行发布操作，会将当前预发环境发布到线上，可能会影响您的线上用户，请谨慎操作。',
    });
  };

  handleConfig = () => {
    Message.error('暂不支持同义词配置');
  };

  getFormValue = (value) => {
    const { data } = this.state;
    data.push({
      name: value.title,
      desc: value.desc,
    });
    this.setState({
      data,
    });
  };

  renderExtraAfter = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Button
          type="normal"
          style={{ marginRight: '10px' }}
          onClick={this.handlePrePublish}
        >
          <Icon type="process" />
          预发
        </Button>
        <Button
          type="normal"
          style={{ marginRight: '10px' }}
          onClick={this.handlePublish}
        >
          <Icon type="share" />
          发布
        </Button>
        <Button
          type="normal"
          style={{ marginRight: '10px' }}
          onClick={this.handleConfig}
        >
          同义词配置
        </Button>
        <GeneralDialog
          buttonText="新建知识库"
          getFormValue={this.getFormValue}
        />
      </div>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <TopBar title="知识库" extraAfter={this.renderExtraAfter()} />
        <div style={styles.searchContainer}>
          <Input
            style={{ width: '300px' }}
            placeholder="请输入关键词搜索知识库"
          />
        </div>
        <SmallCard data={data} />
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
