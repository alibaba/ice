import { Dialog, Button } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import Chrome from '../Chrome';
import ScaffoldAttribute from './Attribute';
import ScaffoldColorCard from './ColorCard';
import ScaffoldPreview from '../Scaffold/Preview';

@inject('customScaffold', 'scaffold')
@observer
class CustomDialog extends Component {
  handleToggle = () => {
    if (!this.props.scaffold.isCreating) {
      this.props.customScaffold.toggle();
    }
  };

  /**
   * 保存自定义模板数据
   */
  handleSaveCustomScaffold = () => {
    // 需要将 Ovservable 对象转换为普通 javascript 结构
    const scaffold = this.props.customScaffold.scaffold;
    const layoutConfig = this.props.customScaffold.layoutConfig;

    // 添加到自定义脚手架历史记录中
    this.props.customScaffold
      .saveCustomScaffoldConfig({ scaffold, layoutConfig })
      .then(() => {
        this.handleToggle();
      });
  };

  handleSaveCustomScaffoldLayoutConfig = (value) => {
    this.props.customScaffold.setLayoutConfig(value);
  };

  render() {
    const { customScaffold } = this.props;
    return (
      <Dialog
        className="fullscreen-dialog"
        title={customScaffold.title}
        visible={customScaffold.visible}
        onClose={this.handleToggle}
        footer={
          <div
            style={{
              background: '#f3f3f3',
              padding: '10px 0',
              textAlign: 'center',
              borderBottomLeftRadius: '6px',
              borderBottomRightRadius: '6px',
            }}
          >
            <Button onClick={this.handleSaveCustomScaffold} type="primary">
              保存
            </Button>
            <Button
              disabled={this.props.scaffold.isCreating}
              onClick={this.handleToggle}
            >
              取消
            </Button>
          </div>
        }
      >
        <div className="custom-scaffold">
          <div className="custom-scaffold-form">
            <ScaffoldAttribute
              onChange={this.handleSaveCustomScaffoldLayoutConfig}
              layoutConfig={this.props.customScaffold.layoutConfig}
            />
          </div>
          <div className="custom-scaffold-preview">
            <Chrome>
              <ScaffoldPreview
                layoutConfig={this.props.customScaffold.layoutConfig}
              />
            </Chrome>
            <ScaffoldColorCard />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default CustomDialog;
