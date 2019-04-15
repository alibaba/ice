/**
 * 渲染物料源的布局
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import Tooltip from 'rc-tooltip';
import { inject, observer } from 'mobx-react';

const LAYOUT_TITLE = '选择布局';

@inject('newpage')
@observer
class LayoutPicker extends Component {
  // 选择 layout
  handleOnSelected = (layout) => {
    this.props.newpage.setCurrentLayout(layout);
  };

  render() {
    // 渲染当前项目下的 layouts
    const { layouts, currentLayout, loading } = this.props.newpage;
    if (loading) {
      return <div className="layout-options-wrapper" />;
    } else if (layouts.length === 0) {
      return (
        <div className="layout-options-wrapper">
          <div className="layout-title">{LAYOUT_TITLE}</div>
          <div className="layout-loading">暂无可用布局</div>
        </div>
      );
    } else if (layouts.length === 1) {
      return null;
    }

    return (
      <div className="layout-options-wrapper">
        <div className="layout-title">{LAYOUT_TITLE}</div>
        <div className="layout-options-body">
          <div style={{ width: 60 * layouts.length }}>
            {layouts.map((layout, index) => {
              const classes = classnames('layout-option', {
                'layout-option-selected': currentLayout.name === layout.name,
              });
              return (
                <div
                  key={layout.name + index}
                  className={classes}
                  onClick={this.handleOnSelected.bind(this, layout)}
                >
                  <Tooltip
                    placement="top"
                    overlay={
                      <div style={{ width: 240 }}>
                        <div style={{ fontSize: 14, color: '#eee' }}>
                          {layout.title}
                        </div>
                        <div style={{ fontSize: 12, color: '#eee' }}>
                          {layout.name}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: '#bbb',
                            overflow: 'auto',
                            maxHeight: 300,
                          }}
                        >
                          <pre style={{ whiteSpace: 'pre-wrap' }}>
                            {layout.description}
                          </pre>
                        </div>
                      </div>
                    }
                  >
                    <div className="layout-option-screenshots">
                      <div
                        className="layout-option-screenshots-img"
                        style={{
                          backgroundImage: `url(${layout.thumbnail})`,
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default LayoutPicker;
