import { Dialog, Button, Feedback } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

// components
import {
  Panel as BlockPickerPanel,
  Previewer as BlockPickerPreviewer,
  LayoutPicker as BlockPickerLayouts,
} from '../../../components/BlockPicker';
import Icon from '../../../components/Icon';
import PageConfig from './PageConfig';
import LocalBuildForm from './LocalBuildForm';
import './index.scss';

@inject('projects', 'newpage', 'blocks', 'localBlocks', 'progress')
@observer
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBlocks: [],
    };
    this.props.localBlocks.initCustomBlocks();
  }

  handleCancelCreate = () => {
    this.props.newpage.toggle();
    this.props.blocks.reset();
  };

  /**
   * 区块别名检测，是否重名或者为空
   */
  aliasNameValidated = (blocks) => {
    const aliasNameCollector = [];
    let conflictName = '';

    const hasEmptyAliasName = blocks.some((block) => {
      return block.alias.trim() === '';
    });

    // 冲突检测
    const hasConflictAliasName = blocks.some((block) => {
      if (aliasNameCollector.indexOf(block.alias.toLowerCase()) === -1) {
        aliasNameCollector.push(block.alias.toLowerCase());
        return false;
      }
      conflictName = block.alias;
      return true;
    });

    if (hasEmptyAliasName) {
      Feedback.toast.show({
        type: 'error',
        content: '已选 Blocks 名称不能为空，请修改后重试。',
        hasMask: true,
      });
      return false;
    }
    if (hasConflictAliasName) {
      Feedback.toast.show({
        type: 'error',
        content: `已选 Blocks 存在多个名为: ${conflictName} 冲突，请修改后重试。`,
        hasMask: true,
      });
      return false;
    }
    return true;
  };

  // 生成页面，唤起 dialog 让用户输入页面名，与路由名
  generatePage = (blocks) => {
    let selectedBlocks;
    if (Array.isArray(blocks)) {
      selectedBlocks = blocks;
    } else {
      selectedBlocks = this.props.blocks.selected;
      // 检测别名是否为空或者重名
      if (!this.aliasNameValidated(selectedBlocks)) return;
    }

    this.props.newpage.openSave();
    this.setState({
      selectedBlocks,
    });
  };

  /**
   * 添加区块，支持多个
   */
  handleBlocksAdd = (blockObj) => {
    if (!Array.isArray(blockObj)) {
      blockObj = [blockObj];
    }
    blockObj.forEach((block) => this.props.blocks.addBlock(block));
  };

  render() {
    const { projects, newpage, blocks } = this.props;
    const currentProject = projects.currentProject;
    const currentTabKey = blocks.currentTabKey;
    // 当前项目为空，则不渲染新建页面的组件
    if (!currentProject) return null;
    // 脚手架类型
    const applicationType = currentProject.getApplicationType();
    const showLayoutPicker = applicationType === 'ice';
    return (
      <Dialog
        className="create-dialog"
        footer={false}
        minMargin={0}
        visible={this.props.newpage.visible}
        onCancel={this.handleCancelCreate}
        onClose={this.handleCancelCreate}
        onOk={this.handleCancelCreate}
        closable="mask,close"
      >
        <div className="careate-page">
          <div className="create-page-body">
            <div className="material-wrapper">
              {showLayoutPicker && <BlockPickerLayouts />}
              <BlockPickerPanel
                handleBlocksAdd={this.handleBlocksAdd}
                generatePage={this.generatePage}
                style={{
                  paddingTop: showLayoutPicker ? 0 : 10,
                }}
              />
            </div>
            <BlockPickerPreviewer title="已选区块" />
          </div>
          <div className="create-page-footer">
            <Button onClick={this.handleCancelCreate}>
              <Icon size="small" type="close" />
              {' '}
取消
            </Button>
            <Button type="primary" onClick={this.generatePage}>
              <Icon size="small" type="paper-plane" />
              {' '}
生成页面
            </Button>
          </div>
        </div>
        {
          this.props.newpage.savePageVisible && (
            <PageConfig
              selectedBlocks={this.state.selectedBlocks}
              libary={this.props.projects.currentProject.getLibraryType()}
            />
          )
        }
        {newpage.localBuildFormVisible && (
          <LocalBuildForm />
        )}
      </Dialog>
    );
  }
}

export default CreatePage;
