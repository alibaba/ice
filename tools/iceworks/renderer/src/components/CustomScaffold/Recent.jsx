import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@icedesign/base';

import Preview from '../Scaffold/Preview';
import ColorBlock from '../ColorBlock/';

@inject('customScaffold', 'scaffold')
@observer
class Recent extends Component {
  handleClick({ scaffold, layoutConfig }) {
    this.props.onClick({ scaffold, layoutConfig });
  }

  handleRemove(index) {
    this.props.customScaffold.removeScaffoldConfigByIndex(index);
  }

  handleEdit(index) {
    this.props.customScaffold.editScaffoldConfigByIndex(index);
  }

  render() {
    const { customScaffold } = this.props;
    const scaffoldConfigStores = customScaffold.scaffoldConfigStores;
    if (
      Array.isArray(scaffoldConfigStores) &&
      scaffoldConfigStores.length > 0
    ) {
      return scaffoldConfigStores.map((scaffoldConfig, index) => {
        const { layoutConfig, scaffold } = scaffoldConfig;
        return (
          <div
            key={index}
            className="scaffold-item"
            style={{ cursor: 'pointer' }}
            onClick={this.handleCustomCreateProject}
          >
            <Preview
              width={235}
              scale={0.7257}
              style={{ borderRadius: 6 }}
              layoutConfig={layoutConfig}
            />
            <div className="scaffold-flipcard">
              <div className="scaffold-flipcard-body">
                <div style={{ display: 'flex', padding: '4px 0' }}>
                  主题：{layoutConfig.themeConfig.theme}
                </div>
                <div style={{ display: 'flex', padding: '4px 0' }}>
                  主色：<ColorBlock
                    backgroundColor={layoutConfig.themeConfig.primaryColor}
                  />
                </div>
                <div style={{ display: 'flex', padding: '4px 0' }}>
                  辅色：<ColorBlock
                    backgroundColor={layoutConfig.themeConfig.secondaryColor}
                  />
                </div>
              </div>
              <div className="scaffold-flipcard-button">
                <Button
                  size="small"
                  onClick={this.handleClick.bind(this, {
                    scaffold,
                    layoutConfig,
                  })}
                  type="primary"
                >
                  使用该模板
                </Button>&nbsp;&nbsp;
                <Button
                  type="secondary"
                  size="small"
                  onClick={this.handleEdit.bind(this, index)}
                >
                  编辑
                </Button>&nbsp;&nbsp;
                <Button
                  size="small"
                  onClick={this.handleRemove.bind(this, index)}
                >
                  删除
                </Button>
              </div>
            </div>
          </div>
        );
      });
    }
    return null;
  }
}

export default Recent;
