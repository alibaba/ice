import { inject, observer } from 'mobx-react';
import { Input, Button } from '@icedesign/base';
import React, { Component } from 'react';

import Separator from '../Separator';

import './index.scss';

@inject('settingsMaterials')
@observer
class CustomMaterials extends Component {
  constructor(props) {
    super(props);
  }

  handleEditMaterial = (index) => {
    this.props.settingsMaterials.updateCustomMaterial(index);
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

  render() {
    const customMaterials = this.props.settingsMaterials.customMaterials;

    if (customMaterials.length == 0) {
      return null;
    }

    return (
      <div className="custom-materials">
        <Separator title="自定义物料源" />
        <div style={{ padding: '0 20px' }}>
          <table className="material-table">
            <tbody>
              {customMaterials.map((material, index) => {
                if (material.editing || material.update) {
                  return (
                    <tr key={index}>
                      <td>
                        <Input
                          placeholder="物料名"
                          style={{ width: '100%' }}
                          value={material.name}
                          onChange={this.handleChangeMaterialName.bind(
                            this,
                            index
                          )}
                        />
                      </td>
                      <td className="material-source">
                        <Input
                          htmlType={'url'}
                          placeholder="物料地址"
                          style={{ width: '100%' }}
                          value={material.source}
                          onChange={this.handleChangeMaterialSource.bind(
                            this,
                            index
                          )}
                        />
                      </td>
                      <td>
                        <Button
                          size="small"
                          type="primary"
                          style={{ marginRight: 10 }}
                          onClick={this.handleSaveMaterial}
                        >
                          保存
                        </Button>
                        <Button
                          size="small"
                          onClick={this.handleRemoveMaterial.bind(this, index)}
                        >
                          删除
                        </Button>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={index}>
                    <td align="right" width={160}>
                      {material.name}
                    </td>
                    <td>{material.source}</td>
                    <td width={160}>
                      <Button
                        size="small"
                        type="primary"
                        style={{ marginRight: 10 }}
                        onClick={this.handleEditMaterial.bind(this, index)}
                      >
                        编辑
                      </Button>
                      <Button
                        size="small"
                        onClick={this.handleRemoveMaterial.bind(this, index)}
                      >
                        删除
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CustomMaterials;
