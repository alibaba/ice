import { Button, Tab, Dialog, Feedback, Progress } from '@icedesign/base';
import { hot } from 'react-hot-loader';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { shell } from 'electron';

import BlockPanel from '../../components/Block/Panel';
import EmptyTips from '../../components/EmptyTips';
import Link from '../../components/Link';
import CustomBlockForm from '../../components/Block/CustomBlockForm';
import CustomBlockPanel from '../../components/Block/CustomBlockPanel';
import CustomBlockTrigger from '../../components/Block/Trigger';
import BlockRenameForm from '../../components/Block/BlockRenameForm';
import './index.scss';

const TabPane = Tab.TabPane;
const Toast = Feedback.toast;

@inject('materials', 'localBlocks')
@observer
class PageBlocks extends Component {
  static displayName = 'PageBlocks';

  componentDidMount() {
    this.props.localBlocks.initCustomBlocks();
    this.props.materials.refresh();
  }

  handleRefresh = () => {
    this.props.localBlocks.showCustomBlocks = false;
    this.props.materials.refresh();
  };

  handleTabChange = (key) => {
    if (key) {
      this.props.materials.setBlockTabActiveKey(key);
    } else {
      this.props.materials.setBlockTabActiveKey(-1);
    }
  };

  renderMaterialsTabPanel = () => {
    const { materials, getBlockTabActiveKey } = this.props.materials;

    return materials.map((material, index) => {
      return (
        <TabPane tab={material.name} key={getBlockTabActiveKey(index)} onClick={this.handleShowCustomBlocks.bind(this, false)}>
          <BlockPanel material={material} />
        </TabPane>
      );
    });
  };

  handleShowCustomBlocks = (show) => {
    this.props.localBlocks.showCustomBlocks = show;
  };

  handleOpen = () => {
    const { localBlocks } = this.props;
    if (localBlocks.blockEditing) {
      Toast.show({
        type: 'prompt',
        content: '请先关闭正在搭建的区块',
        duration: 1000,
      });
      return null;
    }
    localBlocks.open();
  };

  handleClose = () => {
    this.props.localBlocks.close();
  };

  handleRenameClose = () => {
    this.props.localBlocks.renameClose();
  };

  handleRenameBlock = () => {
    const { localBlocks } = this.props;
    localBlocks.renameClose();
    localBlocks.refactorBlock();
  };

  handleOpenWorkbench = () => {
    const { localBlocks } = this.props;
    localBlocks.openWorkBench(true, () => {
      return true;
    });
    localBlocks.close();
  };

  handleFeedBack = () => {
    shell.openExternal(
      'https://github.com/alibaba/ice/issues/new?labels=iceworks'
    );
  };

  // 未被使用过的方法
  renderScaffoldsTabPanel = () => {
    const { materials, getBlockTabActiveKey } = this.props.materials;

    return materials.map((material, index) => {
      return (
        <TabPane tab={material.name} key={getBlockTabActiveKey(index)}>
          <BlockPanel material={material} />
        </TabPane>
      );
    });
  };

  renderCustomBlocksTabPanel = () => {
    const { localBlocks } = this.props;
    const { blocksStorage } = localBlocks;
    return (
      <TabPane tab="本地区块" key={-1} onClick={this.handleShowCustomBlocks.bind(this, true)}>
        <div className="scaffold-items-wrapper" style={{ marginTop: '20px' }}>
          <div className="custom-block-notice">目前只有表单区块，iceworks 3.0 版本会开放更多的能力，敬请期待！</div>
          <CustomBlockTrigger onClick={this.handleOpen} />
          <CustomBlockPanel blocks={blocksStorage} />
        </div>
      </TabPane>
    );
  };

  renderBlockTabs = () => {
    const { materials } = this.props.materials;
    if (!materials || materials.length === 0) {
      return (
        <div style={{ padding: 10, textAlign: 'center' }}>
          <EmptyTips size={120}>
            暂无物料源，可前往 <Link to="/settings">物料源配置</Link> 配置
          </EmptyTips>
          <Button
            type="primary"
            loading={this.props.materials.refreshing}
            size="small"
            onClick={this.handleRefresh}
          >
            刷新列表
          </Button>
        </div>
      );
    }

    return (
      <Tab
        className="tab-fullscreen"
        activeKey={this.props.materials.tabBlockActiveKey}
        onChange={this.handleTabChange}
        contentStyle={{
          padding: 0,
          height: 0,
        }}
        tabBarExtraContent={
          <div
            style={{
              height: 48,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 20,
            }}
          >
            {this.props.localBlocks.showCustomBlocks &&
              <Button
                type="primary"
                style={{ marginRight: 4 }}
                loading={this.props.materials.refreshing}
                size="small"
                onClick={this.handleFeedBack}
              >
                反馈意见
              </Button>}
            <Button
              loading={this.props.materials.refreshing}
              size="small"
              onClick={this.handleRefresh}
            >
              刷新列表
            </Button>
          </div>
        }
      >
        {this.renderMaterialsTabPanel()}
        {this.renderCustomBlocksTabPanel()}
      </Tab>
    );
  };

  render() {
    return (
      <div className="blocks-page">
        <div className="blocks-header">
          区块预览
          <span
            style={{
              fontSize: 12,
              color: '#999',
              paddingLeft: 20,
              fontWeight: 300,
            }}
          >
            通过区块搭建组合方式可快速新建项目页面
          </span>
        </div>
        <div
          className="blocks-body"
          style={{
            opacity: this.props.materials.refreshing ? 0.8 : 1,
          }}
        >
          {this.renderBlockTabs()}
        </div>
        <Dialog
          title="新建本地区块"
          autoFocus
          className="poject-config-dialog"
          footerAlign="center"
          onClose={this.handleClose}
          footer={(
            <div className="project-config-footer">
              <Button
                onClick={this.handleOpenWorkbench}
                disabled={this.props.localBlocks.isDisabled}
                type="primary"
              >
                创建区块
              </Button>
              <Button
                onClick={this.handleClose}
              >
                取消
              </Button>
            </div>
          )}
          visible={this.props.localBlocks.visible}
        >
          <CustomBlockForm />
        </Dialog>
        <Dialog
          title="区块重命名"
          autoFocus={true}
          className="poject-config-dialog"
          footerAlign="center"
          onClose={this.handleRenameClose}
          footer={
            <div className="project-config-footer">
              <Button
                onClick={this.handleRenameBlock}
                disabled={this.props.localBlocks.isDisabled}
                type="primary"
              >
                重命名
              </Button>
              <Button
                onClick={this.handleRenameClose}
              >
                取消
              </Button>
            </div>
          }
          visible={this.props.localBlocks.renameVisible}
        >
          <BlockRenameForm />
        </Dialog>
      </div>
    );
  }
}

export default hot(module)(PageBlocks);
