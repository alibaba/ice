/// <reference types="react" />

import React from "react";

export interface PanelProps {
  /**
   * 二维码的展示内容
   */
  value?: string;

  /**
   * 二维码下方文案
   */
  text?: any;

  /**
   * 二维码展示位置
   */
  align?: "left" | "right" | "top" | "bottom";

  /**
   * 二维码背景色
   */
  bgColor?: string;

  /**
   * 二维码前景色
   */
  fgColor?: string;

  /**
   * 二维码的纠错等级
   */
  level?: "L" | "M" | "Q" | "H";

  /**
   * 二维码尺寸
   */
  size?: number;
}

export class Panel extends React.Component<PanelProps, any> {}
export interface QrcodeProps {
  /**
   * 二维码的展示内容
   */
  value: string;

  /**
   * 二维码下方文案
   */
  text?: any;

  /**
   * 二维码展示位置
   */
  align?: "left" | "right" | "top" | "bottom";

  /**
   * 二维码背景色
   */
  bgColor?: string;

  /**
   * 二维码前景色
   */
  fgColor?: string;

  /**
   * 二维码的纠错等级
   */
  level?: "L" | "M" | "Q" | "H";

  /**
   * 触发器 icon 的大小
   */
  triggerSize?: "xxs" | "xs" | "small" | "medium" | "large" | "xl" | "xxl";

  /**
   * 触发器 icon 的 inline-style
   */
  triggerStyle?: {};

  /**
   * 触发器的触发节点
   */
  trigger?: any;
}

export default class Qrcode extends React.Component<QrcodeProps, any> {
  static Panel: typeof Panel;
}
