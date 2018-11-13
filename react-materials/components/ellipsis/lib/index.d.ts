/// <reference types="react" />

import React from "react";

export interface EllipsisProps {
  /**
   * 渲染几行文本
   */
  lineLimit?: number;

  /**
   * 是否显示额外的 tool tip 展示全部内容
   */
  showTooltip?: any;

  /**
   * 实际文本内容
   */
  text?: string;

  /**
   * 针对 tooltip 模式下，Tooltip 组件的自定义 props
   */
  tooltipProps?: {};
}

export default class Ellipsis extends React.Component<EllipsisProps, any> {}
