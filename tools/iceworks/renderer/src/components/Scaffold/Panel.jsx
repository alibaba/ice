import { observer } from 'mobx-react';
import React, { Component } from 'react';

import CateMenu from './CateMenu';
import EmptyTips from '../EmptyTips';
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
    const { material } = this.props;
    const scaffolds = material.scaffolds;
    if (scaffolds) {
      scaffolds.activeCategory = value;
    }
  };

  render() {
    const { material } = this.props;
    const scaffolds = material.scaffolds || null;

    if (!scaffolds) {
      return <EmptyTips size={120}>加载中...</EmptyTips>;
    }

    if (Array.isArray(scaffolds.values) && scaffolds.values.length == 0) {
      return (
        <div style={{ padding: 10 }}>
          <EmptyTips size={120}>当前物料源暂无模板</EmptyTips>
        </div>
      );
    }

    return (
      <div className="scaffold-panel-body">
        {scaffolds.categories && scaffolds.categories.length > 0 && (
          <CateMenu data={scaffolds.categories} onClick={this.handleClick} />
        )}
        <div className="scaffold-items-wrapper">
          {scaffolds.values.map((scaffold, index) => {
            return (
              <Item
                key={index}
                mobile={material.platform === 'mobile'}
                data={scaffold}
                scaffolds={scaffolds}
                createProject={this.props.onClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Panel;
