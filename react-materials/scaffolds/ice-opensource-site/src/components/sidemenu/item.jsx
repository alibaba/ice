import React from 'react';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import { getLink } from '../../../utils';

@autobind
class Item extends React.Component {
  constructor(props) {
    super(props);
    const { item } = props;
    const hasChildren = item.children && item.children.length;
    let opened = props.item.opened;
    if (hasChildren) {
      if (opened === undefined) {
        // 未配置展开，则是否展开由是否选中决定
        opened = item.children.find(child => getLink(child.link) === window.location.pathname);
      }
    } else {
      opened = false;
    }
    this.state = {
      opened,
    };
  }

  onItemClick(e) {
    this.props.toggleMenuBody();
    e.stopPropagation();
  }

  toggle() {
    this.setState({
      opened: !this.state.opened,
    });
  }

  renderSubMenu(data) {
    return (
      <ul>
      {
        data.map((item, index) => (
          <li
            className={classnames({
              'menu-item': true,
              'menu-item-level-3': true,
              'menu-item-selected': getLink(item.link) === window.location.pathname,
            })}
            key={index}
            onClick={this.onItemClick}
          >
            <a href={getLink(item.link)} target={item.target || '_self'}>{item.title}</a>
          </li>
        ))
      }
      </ul>
    );
  }

  render() {
    const { item } = this.props;
    const hasChildren = item.children && item.children.length;
    const { opened } = this.state;
    const cls = classnames({
      'menu-item': true,
      'menu-item-level-2': true,
      'menu-item-selected': getLink(item.link) === window.location.pathname,
    });
    const style = {
      height: opened ? 36 * (item.children.length + 1) : 36,
      overflow: 'hidden',
    };
    if (hasChildren) {
      return (
        <li style={style} className={cls} onClick={this.toggle}>
        {
          <span>
            {item.title}
            <img style={{ transform: `rotate(${opened ? 0 : -90}deg)` }} className="menu-toggle" src={getLink('/img/system/arrow_down.png')} />
          </span>
        }
        {this.renderSubMenu(item.children)}
        </li>
      );
    }
    return (
      <li style={style} className={cls} onClick={this.onItemClick}>
        <a href={getLink(item.link)} target={item.target || '_self'}>{item.title}</a>
      </li>
    );
  }
}

export default Item;
