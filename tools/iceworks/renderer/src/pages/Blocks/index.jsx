import { Button, Tab, Dialog, Feedback, Progress } from '@icedesign/base';
import { hot } from 'react-hot-loader';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import { shell } from 'electron';
import fecha from 'fecha';

import './index.scss';

const TabPane = Tab.TabPane;
const Toast = Feedback.toast;

import BlockPanel from '../../components/Block/Panel';
import EmptyTips from '../../components/EmptyTips/';
import Link from '../../components/Link';
import CustomBlockForm from '../../components/Block/CustomBlockForm';
import CustomBlockPanel from '../../components/Block/CustomBlockPanel';
import CustomBlockTrigger from '../../components/Block/Trigger';
import BlockRenameForm from '../../components/Block/BlockRenameForm';

@inject('materials', 'customBlocks')
@observer
class PageBlocks extends Component {
  static displayName = 'PageBlocks';

  componentDidMount() {
    this.props.materials.refresh();
  }

  handleRefresh = () => {
    this.props.customBlocks.showCustomBlocks = false;
    this.props.materials.refresh();
  };

  handleTabChange = (key) => {
    if(key){
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
    this.props.customBlocks.showCustomBlocks = show;
  };

  handleProgressClose = () => {
    this.props.customBlocks.closeProgress();
  };

  handleErrorClose = () => {
    this.props.customBlocks.closeError();
  };

  handleOpen = () => {
    if(this.props.customBlocks.blockEditing){
      Toast.show({
        type: 'prompt',
        content: '请先关闭正在搭建的区块',
        duration: 1000
      });
      return null;
    } else if (this.props.customBlocks.dataLoading) {
      this.props.customBlocks.openProgress();
      return null;
    }
    this.props.customBlocks.open();
  };

  handleClose = () => {
    this.props.customBlocks.close();
  };

  handleRenameClose = () => {
    this.props.customBlocks.renameClose();
  };

  handleRenameBlock = () => {
    this.props.customBlocks.renameClose();
    this.props.customBlocks.refactorBlock();
  };

  handleOpenWorkbench = () => {
    this.props.customBlocks.openWorkBench();
    this.props.customBlocks.close();
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
    const { blocksStorage } = this.props.customBlocks;
    return (
      <TabPane tab="自定义区块" key={-1} onClick={this.handleShowCustomBlocks.bind(this, true)}>
        <div className="scaffold-items-wrapper">
          <CustomBlockTrigger onClick={this.handleOpen} />
          <CustomBlockPanel blocks={blocksStorage} />
        </div>
      </TabPane>
    );
  };

  renderBlockTabs = () => {
    const { materials } = this.props.materials;
    if (!materials || materials.length == 0) {
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
            {this.props.customBlocks.showCustomBlocks &&
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
          title="新建自定义区块"
          autoFocus={true}
          className="poject-config-dialog"
          footerAlign="center"
          onClose={this.handleClose}
          footer={
            <div className="project-config-footer">
              <Button
                onClick={this.handleOpenWorkbench}
                disabled={this.props.customBlocks.isDisabled}
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
          }
          visible={this.props.customBlocks.visible}
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
                disabled={this.props.customBlocks.isDisabled}
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
          visible={this.props.customBlocks.renameVisible}
        >
          <BlockRenameForm />
        </Dialog>
        <Dialog
          title="请求物料数据"
          autoFocus={true}
          className="poject-config-dialog progress-dialog"
          onOk={this.handleProgressClose}
          onClose={this.handleProgressClose}
          onCancel={this.handleProgressClose}
          footerAlign="center"
          visible={this.props.customBlocks.progressVisible}
        >
          <div className="project-config-form-item">
            <Progress
              style={{ width: '40%' }}
              showInfo={false}
              percent={this.props.customBlocks.materialProgress}
            />
            <span style={{ fontSize: 12, color: '#999', paddingLeft: 10 }}>
              {this.props.customBlocks.materialProgress}%
            </span>
            <span style={{ fontSize: 12, color: '#999', paddingLeft: 10 }}>
              {this.props.customBlocks.progressSpeed}
              /kbs
            </span>
            <span style={{ fontSize: 12, color: '#999', paddingLeft: 10 }}>
              {this.props.customBlocks.progressTitle}
            </span>
          </div>
        </Dialog>
        <Dialog
          title="请求物料数据失败"
          autoFocus={true}
          className="poject-config-dialog progress-dialog"
          onOk={this.handleErrorClose}
          onClose={this.handleErrorClose}
          onCancel={this.handleErrorClose}
          footerAlign="center"
          visible={this.props.customBlocks.errorVisible}
        >
          <div className="project-config-form-item">
            <h4>请检查网络连接是否正常</h4>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default hot(module)(PageBlocks);
