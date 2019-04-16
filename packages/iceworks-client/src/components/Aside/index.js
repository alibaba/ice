import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Aside extends Component {
  static defaultProps = {
    menuData: [],
  };

  static propTypes = {
    menuData: PropTypes.array,
  };

  getNavMenuItems = (menuData) => {
    return menuData.map((item, index) => {
      return this.getSubMenuOrItem(item, index);
    });
  };

  getSubMenuOrItem = (item, index) => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);

      if (childrenItems && childrenItems.length > 0) {
        return (
          <div key={index}>
            <span>{item.name}</span>
            {childrenItems}
          </div>
        );
      }
      return null;
    }
    return (
      <div key={item.path}>
        <Link to={item.path}>{item.name}</Link>
      </div>
    );
  };

  render() {
    const { menuData = [] } = this.props;
    return <div>{this.getNavMenuItems(menuData)}</div>;
  }
}
