import React, { Component } from 'react';
import cx from 'classnames';

import './index.scss';

const DEFAULT_APP_WIDTH = 890;

class BlockSlider extends Component {
  state = {
    visible: false,
  };

  containerRef = React.createRef();

  handleClick(index) {
    const { onClick } = this.props;
    if ('function' == typeof onClick) {
      onClick(index);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.containerRef.current.addEventListener(
      'mouseenter',
      this.handleMouseenter
    );
    this.containerRef.current.addEventListener(
      'mouseleave',
      this.handleMouseleave
    );
    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.containerRef.current.removeEventListener(
      'mouseenter',
      this.handleMouseenter
    );
    this.containerRef.current.removeEventListener(
      'mouseleave',
      this.handleMouseleave
    );
  }

  init = () => {
    if (window.innerWidth > DEFAULT_APP_WIDTH) {
      this.setState({
        visible: true,
      });
    }
  };

  handleMouseenter = () => {
    this.setState({
      visible: true,
    });
  };

  handleMouseleave = () => {
    this.setState({
      visible: false,
    });
  };

  handleResize = () => {
    let { visible } = this.state;
    if (window.innerWidth > DEFAULT_APP_WIDTH) {
      visible = true;
    } else {
      visible = false;
    }

    this.setState({
      visible,
    });
  };

  render() {
    const { blocksWithCategory } = this.props;
    const { visible } = this.state;

    return (
      <div
        ref={this.containerRef}
        className={cx('block-slider', { 'block-slider-visible': visible })}
      >
        <div className="block-slider-trigger" />
        <ul className="block-category-nav">
          {blocksWithCategory.map(({ category, blocks }, index) => {
            if (blocks.length == 0) {
              return null;
            }
            return (
              <li onClick={this.handleClick.bind(this, index)} key={index}>
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default BlockSlider;
