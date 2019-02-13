import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcMenu from 'rc-menu';

import classNames from 'classnames';

// import for the iconfont arrow-down
// do not delete this because of the css iconfont
import FoundationSymbol from '@icedesign/foundation-symbol'; // eslint-disable-line

// selectedKeys openKeys props 不要随便设置默认值，否则可能会触发一些值获取逻辑从而出现问题

const noop = () => {};

export default class IceMenu extends Component {
  static displayName = 'IceMenu';

  static propTypes = {
    /**
     * className 前缀
     */
    prefixCls: PropTypes.string,
    /**
     * 主题风格（暗色系、亮色系）
     */
    theme: PropTypes.oneOf(['light', 'dark']),
    /**
     * 主题颜色
     */
    color: PropTypes.oneOf(['', 'green', 'red', 'blue', 'orange', 'reseo']),
    /**
     * 当前选中的菜单项 key 数组
     */
    selectedKeys: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line
    /**
     * 初始选中的菜单项 key 数组
     */
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    /**
     * 初始展开的 SubMenu 菜单项 key 数组
     */
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    /**
     * 当前展开的 SubMenu 菜单项 key 数组
     */
    openKeys: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line
    /**
     * 菜单类型，现在支持垂直、水平、和内嵌模式三种 string: vertical horizontal inline
     */
    mode: PropTypes.string,
    /**
     * 是否允许多选
     */
    multiple: PropTypes.bool,
    /**
     * inline 模式的菜单缩进宽度
     */
    inlineIndent: PropTypes.number,
    /**
     * 点击 MenuItem 调用此函数
     * @param {object} clickItem - 被点击的 item 相关信息
     * @param {object} clickItem.item - 被点击的 item
     * @param {string} clickItem.key - 被点击的 item 的 key
     * @param {array} clickItem.keyPath  - 被点击的 item 的路径
     */
    onClick: PropTypes.func,
    /**
     * SubMenu 展开/关闭的回调
     * @param {string} openKeys - 打开的 keys
     */
    onOpenChange: PropTypes.func,
    /**
     * 被选中时调
     * @param {object} selectedItem - 被选中的 item 相关信息
     * todo
     * @param {object} selectedItem.item - 被选中的 item
     * @param {string} selectedItem.key - 被选中的 item 的 key
     * @param {array} selectedItem.selectedKeys  - 当前被选中的 keys
     */
    onSelect: PropTypes.func,
    /**
     * 取消选中时调用，仅在 multiple 生效
     * @param {object} selectedItem - 被取消选中的 item 相关信息
     * @param {object} selectedItem.item - 被取消选中的 item
     * @param {string} selectedItem.key - 被取消选中的 item 的 key
     * @param {array} selectedItem.selectedKeys  - 当前被选中的 keys
     */
    onDeselect: PropTypes.func,
    /**
     * inline 时菜单是否收起状态
     */
    inlineCollapsed: PropTypes.bool,
    /**
     * className
     */
    className: PropTypes.string,
    openSubMenuOnMouseEnter: PropTypes.bool,
    closeSubMenuOnMouseLeave: PropTypes.bool,
    selectable: PropTypes.bool,
  };

  static defaultProps = {
    prefixCls: 'ice-menu',
    className: '',
    color: '',
    mode: 'vertical',
    openSubMenuOnMouseEnter: true,
    closeSubMenuOnMouseLeave: true,
    selectable: true,
    inlineCollapsed: undefined,
    multiple: false,
    inlineIndent: 24,
    onClick: noop,
    onSelect: noop,
    onOpenChange: noop,
    onDeselect: noop,
    defaultSelectedKeys: [],
    defaultOpenKeys: [],
    theme: 'light',
  };

  constructor(props) {
    super(props);

    const openKeys = [...props.defaultOpenKeys, ...(props.openKeys || [])];

    this.state = {
      openKeys,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mode === 'inline' && nextProps.mode !== 'inline') {
      this.switchModeFromInline = true;
    }
    if ('openKeys' in nextProps) {
      this.setState({ openKeys: nextProps.openKeys });
    }
  }

  handleClick = (e) => {
    this.setOpenKeys([]);

    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  handleOpenChange = (openKeys: string[]) => {
    this.setOpenKeys(openKeys);

    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(openKeys);
    }
  };

  setOpenKeys = (openKeys) => {
    if (!('openKeys' in this.props)) {
      this.setState({ openKeys });
    }
  };

  render() {
    let props = {};

    const className = classNames(this.props.className, {
      [`${this.props.prefixCls}-${this.props.color}-${this.props.theme}`]: this
        .props.color,
      [`${this.props.prefixCls}-${this.props.theme}`]: !this.props.color,
      [`${this.props.prefixCls}-collapse`]: this.props.inlineCollapsed,
    });

    if (this.props.mode !== 'inline') {
      // There is this.state.openKeys for
      // closing vertical popup submenu after click it
      props = {
        openKeys: this.state.openKeys,
        onClick: this.handleClick,
        onOpenChange: this.handleOpenChange,
        className,
      };
    } else if (this.props.inlineCollapsed) {
      props = {
        className,
        mode: 'vertical',
      };
    } else {
      props = {
        className,
      };
    }

    return <RcMenu {...this.props} {...props} />;
  }
}
