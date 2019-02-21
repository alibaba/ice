import { observer } from 'mobx-react';
import React, { Component } from 'react';

import CateMenu from '../../components/CateMenu';
import EmptyTips from '../../components/EmptyTips';
import Item from './Item';

@observer
class Panel extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * 点击模板分类菜单的回调
   */
  handleClick = (value) => {
    // const { material } = this.props;
    // const scaffolds = material.scaffolds;
    // if (scaffolds) {
    //   scaffolds.activeCategory = value;
    // }
  };

  render() {
    const { material } = this.props;
    const components = material.components || null;

    if (!components) {
      return <EmptyTips size={120}>加载中...</EmptyTips>;
    }

    if (Array.isArray(components.values) && components.values.length === 0) {
      return (
        <div style={{ padding: 10 }}>
          <EmptyTips size={120}>当前物料源暂无模板</EmptyTips>
        </div>
      );
    }

    return (
      <div className="component-panel-body">
        {components.categories && components.categories.length > 0 && (
          <CateMenu data={components.categories} onClick={this.handleClick} />
        )}
        <div className="component-items-wrapper">
          {components.values.map((scaffold, index) => {
            return (
              <Item
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Panel;
