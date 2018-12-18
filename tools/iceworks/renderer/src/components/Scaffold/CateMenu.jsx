import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import './CateMenu.scss';

export default class CateMenu extends Component {
  static displayName = 'CateMenu';

  static propTypes = {
    defaultActiveKey: PropTypes.number,
    data: PropTypes.array,
    onCick: PropTypes.func,
  };

  static defaultProps = {
    defaultActiveKey: 0,
    data: [],
    onCick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.defaultActiveKey,
    };
  }

  handleClick = (index, value) => {
    this.setState(
      {
        activeIndex: index,
      },
      () => {
        this.props.onClick(value);
      }
    );
  };

  render() {
    const { data } = this.props;
    const { activeIndex } = this.state;

    return (
      <ul className="scaffold-cate-menu">
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className={cx('scaffold-cate-menu-item', {
                active: activeIndex === index,
              })}
              onClick={() => this.handleClick(index, item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    );
  }
}
