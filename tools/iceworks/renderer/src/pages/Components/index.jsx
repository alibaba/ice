import { Button, Tab } from '@icedesign/base';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import './index.scss';
import ComponentPanel from './ComponentPanel';

const TabPane = Tab.TabPane;

@inject('materials', 'scaffold', 'customScaffold')
@observer
class IceComponent extends Component {

  static propTypes = {
    materials: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.materials.refresh();
  }

  handleRefresh = () => {
    this.props.materials.refresh();
  };

  handleTabChange = (key) => {
    if(key){
      this.props.materials.setComponentTabActiveKey(key);
    } else {
      this.props.materials.setComponentTabActiveKey(-1);
    }
  };

  /** 选中项目模板脚手架 */
  handleSelectedComponent = (scaffold) => {
    // this.props.scaffold.setScaffoldConfig({ scaffold });
    // this.props.scaffold.open();
  };

  renderComponentsTabPanel = () => {
    const { materials, getComponentTabActiveKey } = this.props.materials;
    if (!materials || materials.length === 0) {
      return null;
    }
    return materials.map((material, index) => {
      return (
        <TabPane tab={material.name} key={getComponentTabActiveKey(index)}>
          <ComponentPanel
            onClick={this.props.handleSelectedComponent}
            material={material}
          />
        </TabPane>
      );
    });
  };

  render() {
    return (
      <div className="component-page">
        <div className="component-header">组件市场</div>
        <div className="component-body">
          <Tab
            className="tab-fullscreen"
            activeKey={this.props.materials.tabComponentActiveKey}
            onChange={this.handleTabChange}
            contentStyle={{ padding: 0 }}
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
            {this.renderComponentsTabPanel()}
          </Tab>
        </div>
      </div>
    );
  }
}

export default IceComponent;
