import { inject, observer } from 'mobx-react';
import { Input } from '@icedesign/base';
import React, { Component } from 'react';

/**
 * 模板生成表单项目
 */

@inject('customBlocks')
@observer
export default class BlockRenameForm extends Component {
  /** 修改项目名称 */
  changeBlockName = (value) => {
    this.props.customBlocks.resetBlockName(value);
  };

  changeBlockAlias = (value) => {
    this.props.customBlocks.resetBlockAlias(value);
  };

  render() {
    return (
      <div className="project-config-form">
        <div className="project-config-form-item">
          <h3 style={{ margin: 0 }}>
            <span style={{ color: 'red' }}>*</span> 区块名：
          </h3>
          <Input
            ref="name"
            placeholder={'字母数字中下划线组合 (必填)'}
            value={this.props.customBlocks.renameBlockName}
            onChange={this.changeBlockName}
          />
          <div className="project-config-form-item-error-message">
            {this.props.customBlocks.blockNameValidation}
          </div>
        </div>
        <div className="project-config-form-item">
          <h3 style={{ margin: 0 }}>区块别名：</h3>
          <Input
            placeholder={'可输入中文 (选填)'}
            value={this.props.customBlocks.renameBlockAlias}
            onChange={this.changeBlockAlias}
          />
        </div>
      </div>
    );
  }
}
