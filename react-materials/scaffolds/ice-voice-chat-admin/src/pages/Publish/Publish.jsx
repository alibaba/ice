import React, { Component } from 'react';
import { Dialog } from '@alifd/next';
import TopBar from '../../components/TopBar';
import PublishTable from './components/PublishTable';
import Overview from './components/Overview';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      time: `2018-12-1${index} 1${index}:28:38`,
      desc: '发布备注信息',
    };
  });
};

export default class Projects extends Component {
  state = {
    data: getData(),
  }

  handlePublish = () => {
    Dialog.confirm({
      title: '提示',
      content: '没有需要发布的项目',
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <TopBar
          style={styles.topbar}
          extraBefore={<Overview />}
          buttonText="发布项目"
          onClick={this.handlePublish}
        />
        <div style={{ height: '40px' }} />
        <PublishTable data={data} />
      </div>
    );
  }
}

const styles = {
  topbar: {
    height: '100px',
  },
};
