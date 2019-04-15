import { inject, observer } from 'mobx-react';
import { Switch, Button } from '@icedesign/base';
import React, { Component } from 'react';
import Separator from '../Separator';

import './index.scss';

@inject('settingsMaterials')
@observer
class RecommendMaterials extends Component {
  /**
   * 物料源开关状态改变触发此事件
   */
  notificationTimer = null;

  handleCheckChange = (checked, selectedMaterial) => {
    this.props.settingsMaterials.switchBuitInMaterial(
      checked,
      selectedMaterial
    );
  };

  handleResetMaterials = () => {
    this.props.settingsMaterials.resetBuiltInMaterials();
  };

  render() {
    return (
      <div>
        <Separator
          title="官方推荐物料源"
          additional={
            <span>
              <Button size="small" onClick={this.handleResetMaterials}>
                重置
              </Button>
            </span>
          }
        />
        <div className="materials">
          {this.props.settingsMaterials.builtInMaterials.map(
            (material, index) => {
              return (
                <div className="material-item" key={index}>
                  <div className="material-logo">
                    {material.homepage ? (
                      <a
                        href={material.homepage}
                        title={'官网:' + material.homepage}
                        target="_blank"
                      >
                        <img src={material.logo} alt={material.name} />
                      </a>
                    ) : (
                      <img src={material.logo} alt={material.name} />
                    )}
                  </div>
                  <div className="material-body">
                    <div className="material-info">
                      <div className="material-name">{material.name}</div>
                      <div className="material-tags">
                        {material.tags.map((tag, k) => {
                          return (
                            <span className="material-tag" key={k}>
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="material-description">
                      {material.description}
                    </div>
                  </div>
                  <div className="material-extra">
                    <div className="material-switch">
                      <Switch
                        checked={material.checked}
                        onChange={(checked) =>
                          this.handleCheckChange(checked, material)
                        }
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default RecommendMaterials;
