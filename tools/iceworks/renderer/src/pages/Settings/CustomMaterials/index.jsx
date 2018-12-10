import { inject, observer } from 'mobx-react';
import { Input, Button, Switch } from '@icedesign/base';
import React, { Component } from 'react';

import Separator from '../Separator';

import './index.scss';

@inject('settingsMaterials')
@observer
class CustomMaterials extends Component {

  handleEditMaterial = (index) => {
    this.props.settingsMaterials.editCustomMaterial(index);
  };

  // 取消编辑
  handleCancelEditMaterial = (index) => {
    this.props.settingsMaterials.cancelEditCustomMaterial(index);
  };

  /**
   * 删除自定义物料源
   */
  handleRemoveMaterial = (index) => {
    this.props.settingsMaterials.removeCustomMaterial(index);
  };

  handleChangeMaterialName = (index, value) => {
    this.props.settingsMaterials.updateCustomMaterialName(index, value);
  };

  handleChangeMaterialSource = (index, value) => {
    this.props.settingsMaterials.updateCustomMaterialSource(index, value);
  };

  handleSaveMaterial = () => {
    this.props.settingsMaterials.save();
  };

  handleCheckChange = (checked, selectedMaterial) => {
    this.props.settingsMaterials.switchCustomMaterial(
      checked,
      selectedMaterial
    );
  };

  handleAddMaterial = () => {
    this.props.settingsMaterials.addCustomMaterials();
  };

  renderMaterialItem = (item, index) => {
    const editting = item.editing || item.update;

    return (
      <div key={index} className="cm-item">
        <div className="cm-item-name">
          {
            editting ? (
              <Input
                placeholder="物料名"
                style={{ width: '100%' }}
                value={item.name}
                onChange={this.handleChangeMaterialName.bind(this, index)}
              />
            ) : (
              item.name
            )
          }
        </div>
        <div className="cm-item-source">
          {
            editting ? (
              <Input
                htmlType="url"
                placeholder="物料地址"
                style={{ width: '100%' }}
                value={item.source}
                onChange={this.handleChangeMaterialSource.bind(this, index)}
              />
            ) : (
              item.source
            )
          }
        </div>
        <div className="cm-item-action">
          {
            editting ? (
              <Button
                size="small"
                type="primary"
                style={{ marginRight: 10 }}
                onClick={this.handleSaveMaterial}
              >
                保存
              </Button>
            ) : (
              <Button
                size="small"
                type="primary"
                style={{ marginRight: 10 }}
                onClick={this.handleEditMaterial.bind(this, index)}
              >
                编辑
              </Button>
            )
          }
          {
            editting ? (
              <Button
                size="small"
                style={{ marginRight: 10 }}
                onClick={this.handleCancelEditMaterial.bind(this, index)}
              >
                取消
              </Button>
            ) : (
              <Button
                size="small"
                style={{ marginRight: 10 }}
                onClick={this.handleRemoveMaterial.bind(this, index)}
              >
                删除
              </Button>
            )
          }
          {
            // 编辑状态不显示 switch
            !this.props.settingsMaterials.edittingCustomMaterialValue && (
              <Switch
                checked={item.checked !== false}
                onChange={(checked) =>
                  this.handleCheckChange(checked, item)
                }
                checkedChildren="展示"
                unCheckedChildren="隐藏"
                size="small"
              />
            )
          }
        </div>
      </div>
    );
  };

  render() {
    const { customMaterials } = this.props.settingsMaterials;

    return (
      <div className="custom-materials">
        <Separator
          title="自定义物料源"
          additional={
            <span>
              <Button size="small" onClick={this.handleAddMaterial}>
                新增
              </Button>{' '}
            </span>
          }
        />
        <div style={{ padding: '0 20px' }}>
          {
            customMaterials.length === 0 ? (
              <div className="cm-list-empty">
                自定义物料源为空，你可以
                <a href="javascript:void(0)" onClick={this.handleAddMaterial}>新增物料源</a>或者了解
                <a href="https://alibaba.github.io/ice/docs/materials/ice-devtools" target="__blank">自定义物料源使用文档</a>
              </div>
            ) : (
              <div className="cm-list">
                {
                  customMaterials.map(this.renderMaterialItem)
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default CustomMaterials;
