import React, { Component } from 'react';
import { Button, Feedback } from '@icedesign/base';
import { inject, observer } from 'mobx-react';

import './CustomBlockPanel.scss';

const Toast = Feedback.toast;

@inject('customBlocks')
@observer
export default class CustomBlockPanel extends Component {

  editBlock = (name) => {
    if (this.operationValidation()) {
      this.props.customBlocks.editBlock(name);
    }
  };

  renameBlock = (name) => {
    if (this.operationValidation()) {
      this.props.customBlocks.renameOpen(name);
    }
  };

  deleteBlock = (name) => {
    if (this.operationValidation()) {
      this.props.customBlocks.deleteBlock(name);
    }
  };

  operationValidation = () => {
    if(this.props.customBlocks.blockEditing){
      Toast.show({
        type: 'prompt',
        content: '请先关闭正在搭建的区块',
        duration: 1000
      });
      return false;
    } else if (this.props.customBlocks.dataLoading) {
      this.props.customBlocks.openProgress();
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { blocks } = this.props;
    if(Object.keys(blocks).length > 0){
      return (
        Object.keys(blocks).map((blockName, index) => {
          return (
            <div
              className="scaffold-item"
              key={index}
            >
              <div className="scaffold-image">
                <img src={'data:image/png;base64,' + this.props.customBlocks.getBlockImg(blockName)} alt="" />
              </div>
              <div className="scaffold-title">{blockName}</div>
              <div className="scaffold-flipcard">
                <div className="scaffold-flipcard-body">
                  <h2>{blockName}</h2>
                  <h3>{blocks[blockName]['alias']}</h3>
                  <div>
                    <p>修改时间: {blocks[blockName]['time']}</p>
                  </div>
                </div>
                <div className="scaffold-flipcard-button">
                  <Button size="small"  type="primary" onClick={this.editBlock.bind(this, blockName)}>
                    搭建
                  </Button>
                  &nbsp;
                  <Button size="small"  type="normal" onClick={this.renameBlock.bind(this, blockName)}>
                    重命名
                  </Button>
                  &nbsp;
                  <Button size="small"  type="normal" onClick={this.deleteBlock.bind(this, blockName)}>
                    删除
                  </Button>
                </div>
              </div>
            </div>
          );
        }
        )
      );
    }else {
      return null;
    }
  }
}
