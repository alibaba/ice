import { PreviewLayout } from '@icedesign/template-builder';
import React, { Component } from 'react';

class Preview extends Component {
  render() {
    const { style = {}, width = 350, scale = 0.65, layoutConfig } = this.props;
    return (
      <div
        style={{ ...style, width, height: width * scale, overflow: 'hidden' }}
      >
        <PreviewLayout
          value={layoutConfig}
          scale={width / 960} // 缩放比例
          width={960} // 预览宽度
          height={960 * scale} // 预览高度
        />
      </div>
    );
  }
}

export default Preview;
