import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import { throttle, getLink } from '../../../utils';

import './index.scss';

const propTypes = {
  pageSize: PropTypes.number, // 每页最多显示的条数

};
const defaultProps = {
  pageSize: 5,
};

@autobind
class pageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.state = {
      page: 0,
      pageWidth: 0,
    };
  }

  componentDidMount() {
    const pageWidth = this.container.getBoundingClientRect().width;
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      pageWidth,
    });
    this.throttleAdjust = throttle(() => {
      this.setState({
        pageWidth: this.container.getBoundingClientRect().width,
      });
    }, 200);
    window.addEventListener('resize', this.throttleAdjust);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttleAdjust);
  }

  changePage(i) {
    this.setState({
      page: i,
    });
  }

  renderSliderList() {
    const { children, pageSize } = this.props;
    const { page, pageWidth } = this.state;
    const splitGroup = [];
    const len = React.Children.count(children);
    // 分成的屏数
    const splitNum = Math.ceil(len / pageSize);
    /* eslint-disable no-plusplus*/
    for (let i = 0; i < splitNum; i++) {
      splitGroup.push(Array.from(children).slice(i * pageSize, (i + 1) * pageSize));
    }
    return (
      <div
        className="slider-list"
        style={{
          transform: `translateX(-${page * pageWidth}px)`,
          transition: 'transform 500ms ease',
          width: splitNum * pageWidth,
        }}
      >
        {splitGroup.map((group, i) => {
          return (
            <div
              className="slider-page"
              style={{ width: pageWidth }}
              key={i}
            >
              {
                group.map((child, j) => (
                    <div
                      className="slider-item"
                      key={j}
                    >
                      {child}
                    </div>
                  )
                )
              }
            </div>
          );
        })}
      </div>
    );
  }

  renderControl() {
    const { children, pageSize } = this.props;
    const { page } = this.state;
    const len = React.Children.count(children);
    // 分成的屏数
    const splitNum = Math.ceil(len / pageSize);
    return (
      <div className="slider-control">
        <img
          className={
            classnames({
              'slider-control-prev': true,
              'slider-control-prev-hidden': page === 0,
            })
          }
          src={getLink('/img/system/prev.png')}
          onClick={this.changePage.bind(this, page - 1)}
        />
        <img
          className={
            classnames({
              'slider-control-next': true,
              'slider-control-next-hidden': page === splitNum - 1,
            })
          }
          src={getLink('/img/system/next.png')}
          onClick={this.changePage.bind(this, page + 1)}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="page-slider" ref={(node) => { this.container = node; }}>
        {this.renderSliderList()}
        {this.renderControl()}
      </div>
    );
  }
}

pageSlider.propTypes = propTypes;
pageSlider.defaultProps = defaultProps;

export default pageSlider;
