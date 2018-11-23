import { inject, observer } from 'mobx-react';
import { Tab, Input } from '@icedesign/base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BlockCategory from '../BlockCategory/';
import CustomBlockCategory from '../BlockCategory/Custom';
import BlockSlider from '../BlockSlider/';

@inject('newpage', 'blocks', 'customBlocks')
@observer
class BlockPicker extends Component {
  static displayName = 'BlockPicker';

  static propTypes = {
    onSelected: PropTypes.func,
  };

  static defaultProps = {
    onSelected: () => {},
  };

  constructor(props) {
    super(props);

    this.idPrefix = 'Block-' + Date.now().toString(32) + '-';
  }

  UNSAFE_componentWillMount() {
    this.props.blocks.fetch();
  }

  handleSearchBlock = (value) => {
    // const value = event.target.value;
    this.props.blocks.search(value);
  };

  handleBlockSelected = (block) => {
    this.props.onSelected(block);
  };

  handleCategorySlideChange = (tabIndex, index) => {
    const id = `#${this.idPrefix}` + index;
    const title = document.querySelector(id);

    title.scrollIntoView({
      behavior: 'instant',
      block: 'start',
      inline: 'start',
    });
  };

  render() {
    const { materials, isLoading, type } = this.props.blocks;
    const { style = {} } = this.props;
    if (!isLoading && materials.length == 0) {
      return (
        <div
          style={{
            paddingTop: '100px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          当前项目类型为 type： {type}
          暂无符合项目使用的区块，请确定物料源设置正确并存在可用类型区块。
        </div>
      );
    } else if (isLoading) {
      return (
        <div
          style={{
            paddingTop: '100px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          Loading....
        </div>
      );
    }
    return (
      <div className="block-picker-panel" style={style}>
        <div className="block-picker-panel-wrapper">
          <Tab
            className="block-picker-tab-parent"
            contentStyle={{
              padding: 0,
              marginBottom: 10,
            }}
            size="small"
            type="bar"
            tabBarExtraContent={
              <div
                style={{
                  height: 39,
                  padding: '0 10px 0 0',
                  lineHeight: '24px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Input
                  size="medium"
                  style={{ width: 160 }}
                  hasClear
                  placeholder="输入关键字"
                  value={this.props.blocks.originKeywords}
                  onChange={this.handleSearchBlock}
                  addonAfter="搜索"
                />
              </div>
            }
          >
            {materials.map((material, index) => {
              const blocksWithCategory = material.blocksWithCategory;

              return (
                <Tab.TabPane
                  tab={material.name}
                  key={index}
                  contentStyle={{ position: 'relative' }}
                  tabClassName="custom-material-tab"
                >
                  <BlockSlider
                    onClick={this.handleCategorySlideChange.bind(this, index)}
                    blocksWithCategory={blocksWithCategory}
                  />
                  <BlockCategory
                    idPrefix={this.idPrefix}
                    onSelected={this.handleBlockSelected}
                    blocksWithCategory={blocksWithCategory}
                    originKeywords={this.props.blocks.originKeywords}
                  />
                </Tab.TabPane>
              );
            })}
            {type == 'react' && (
              <Tab.TabPane
                tab="自定义区块"
                key="-1"
                contentStyle={{ position: 'relative' }}
                tabClassName="custom-material-tab"
              >
                <CustomBlockCategory />
              </Tab.TabPane>
            )}
          </Tab>
        </div>
      </div>
    );
  }
}

export default BlockPicker;
