import { inject, observer } from 'mobx-react';
import { Tab, Input } from '@icedesign/base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BlockCategory from '../BlockCategory/';
import CustomBlockCategory from '../BlockCategory/Custom';
import BlockGroupCategory from '../BlockGroupCategory/';
import BlockSlider from '../BlockSlider/';

@inject('newpage', 'blocks', 'customBlocks', 'blockGroups')
@observer
class BlockPicker extends Component {
  static displayName = 'BlockPicker';

  static propTypes = {
    onSelected: PropTypes.func,
    handleOpenPreviewPage: PropTypes.func,
    generatePage: PropTypes.func,
  };

  static defaultProps = {
    onSelected: () => {},
    handleOpenPreviewPage: () => {},
    generatePage: () => {},
  };

  constructor(props) {
    super(props);

    this.idPrefix = 'Block-' + Date.now().toString(32) + '-';
    this.iceMaterialsSource = 'ice.alicdn.com/assets/react-materials.json';
  }

  UNSAFE_componentWillMount() {
    this.props.blocks.fetch();
  }

  handleSearchBlock = (value) => {
    // const value = event.target.value;
    this.props.blocks.search(value);
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

  handleTabChange = (key) => {
    this.props.blocks.setCurrentTabKey(key);
  };

  formatMaterials = (materials) => {
    let iceIndex = -1;
    materials.forEach( (material, index) => {
      // 当有飞冰物料源时，fetch组合推荐；
      if( material.source.includes(this.iceMaterialsSource) ) {
        iceIndex = index;
      }
    });
    if (iceIndex !== -1) {
      const formatMaterials = materials.slice();
      formatMaterials.splice(iceIndex+1, 0 , {
        name: '飞冰区块组合',
        key: '-2'
      })
      return formatMaterials;
    }
    return materials;
  }

  render() {
    const { materials, isLoading, type, currentTabKey } = this.props.blocks;
    const { blockGroups } = this.props.blockGroups;
    const { style = {}, handleOpenPreviewPage, onSelected,  generatePage } = this.props;
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
    const tabBarExtraContent = currentTabKey !== "-2" ? (
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
    ) : null;

    // materials 中有飞冰物料时，加赛飞冰组合推荐
    const formatMaterials = this.formatMaterials(materials);

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
            onChange={this.handleTabChange}
            tabBarExtraContent={tabBarExtraContent}
          >
            {formatMaterials.map((material, index) => {
              // 区块组合，目前只在有飞冰物料源时展示
              if (material.key === '-2') {
                return (
                  <Tab.TabPane
                    tab={material.name}
                    key={material.key}
                    contentStyle={{ position: 'relative' }}
                    tabClassName="custom-material-tab"
                  >
                    <BlockGroupCategory 
                      generatePage={generatePage}
                      handleOpenPreviewPage={handleOpenPreviewPage}
                      onSelected={onSelected}
                    />
                  </Tab.TabPane>
                )
              }

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
                    onSelected={onSelected}
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
