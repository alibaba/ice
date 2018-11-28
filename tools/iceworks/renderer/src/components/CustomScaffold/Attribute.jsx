import { Tab } from '@icedesign/base';
import React, { Component } from 'react';
import deepcopy from 'deepcopy';
import {
  BasicForm,
  HeaderForm,
  AsideForm,
  FooterForm,
  AdvancedForm,
} from '@icedesign/template-builder';

const TabPane = Tab.TabPane;

export default class Attribute extends Component {
  static defaultProps = {
    onChange: () => {},
  };

  constructor(props) {
    super(props);
  }

  onChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    const { layoutConfig } = this.props;
    const lc = deepcopy(layoutConfig);

    return (
      <div className="project-config-form">
        <Tab size="small" onChange={this.handleChange}>
          <TabPane key="1" tab="主题">
            <BasicForm value={lc} onChange={this.onChange} />
          </TabPane>
          <TabPane key="2" tab="布局">
            <div style={{ height: '284px', overflowY: 'scroll' }}>
              <HeaderForm value={lc} onChange={this.onChange} />
              <AsideForm value={lc} onChange={this.onChange} />
              <FooterForm value={lc} onChange={this.onChange} />
            </div>
          </TabPane>
          <TabPane key="3" tab="高级">
            <AdvancedForm value={lc} onChange={this.onChange} />
          </TabPane>
        </Tab>
      </div>
    );
  }
}
