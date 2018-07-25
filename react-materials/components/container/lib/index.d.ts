/// <reference types="react" />

import React from "react";

export interface ContainerProps {
  /**
   * 加载的loading
   */
  loading?: any;

  /**
   * 数据错误
   */
  error?: any;

  /**
   * 数据为空
   */
  empty?: any;

  /**
   * 样式
   */
  style?: React.CSSProperties;

  /**
   * 样式名
   */
  className?: string;

  /**
   * 标题
   */
  title?: string;
}

export default class Container extends React.Component<ContainerProps, any> {}
