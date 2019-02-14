import { Button, Tab } from '@icedesign/base';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import { ScaffoldHoc, Panel as ScaffoldPanel } from '../../components/Scaffold';
import CreateProjectDialog from '../../components/CreateProjectDialog';
import {
  Trigger as ScaffoldTrigger,
  Recent as ScaffoldRecent,
  CustomDialog,
} from '../../components/CustomScaffold';

import './index.scss';

const TabPane = Tab.TabPane;

@inject('materials', 'scaffold', 'customScaffold')
@observer
class Scaffolds extends Component {
  static displayName = 'Scaffolds';

  static propTypes = {
    materials: PropTypes.object.isRequired,
    handleSelectedScaffold: PropTypes.func.isRequired,
    handleTabChange: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    handleOpenCustomScaffoldDialog: PropTypes.func.isRequired,
    handleGenerateProjectByCustom: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.materials.refresh();

  }

  renderScaffoldsTabPanel = () => {
    const { materials, getScaffoldTabActiveKey } = this.props.materials;
    if (!materials || materials.length == 0) {
      return null;
    }
    return materials.map((material, index) => {
      return (
        <TabPane tab={material.name} key={getScaffoldTabActiveKey(index)}>
          <ScaffoldPanel
            onClick={this.props.handleSelectedScaffold}
            material={material}
          />
        </TabPane>
      );
    });
  };

  render() {
    return (
      <div className="scaffold-page">
        <div className="scaffold-header">模板市场</div>
        <div className="scaffold-body">
          <Tab
            className="tab-fullscreen"
            activeKey={this.props.materials.tabScaffoldActiveKey}
            onChange={this.props.handleTabChange}
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
                  onClick={this.props.handleRefresh}
                >
                  刷新列表
                </Button>
              </div>
            }
          >
            {this.renderScaffoldsTabPanel()}
            <TabPane tab="自定义模板" key="custom-scaffold">
              <div className="scaffold-custom">
                <div className="scaffold-items-wrapper">
                  <ScaffoldTrigger
                    onClick={this.props.handleOpenCustomScaffoldDialog}
                  />
                  <ScaffoldRecent
                    onClick={this.props.handleGenerateProjectByCustom}
                  />
                </div>
              </div>
            </TabPane>
          </Tab>
        </div>
        <CustomDialog />
        <CreateProjectDialog />
      </div>
    );
  }
}

export default ScaffoldHoc(Scaffolds);
