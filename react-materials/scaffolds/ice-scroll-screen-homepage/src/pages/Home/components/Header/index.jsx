/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim';
import Logo from '../../../../components/Logo';
import './index.scss';

const Link = ScrollAnim.Link;
const EventListener = ScrollAnim.Event;
ScrollAnim.scrollScreen.init({ loop: true });

const NAVS = [
  {
    to: 'page1',
    name: '首页',
  },
  {
    to: 'page2',
    name: '极客派',
  },
  {
    to: 'page3',
    name: '极客活动',
  },
  {
    to: 'page4',
    name: '工作坊',
  },
  {
    to: 'page5',
    name: '赞助商',
  },
];

export default class Header extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 添加改变窗口事件,可加setTimeout
    EventListener.addEventListener('resize.userResize', this.barAnimate);
  }

  onFocus = (e) => {
    this.dom = e.target;
    this.barAnimate();
  };

  barAnimate = () => {
    if (!this.dom) {
      return;
    }
    const bar = this.refs.bar;
    bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
  };

  render() {
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo />
          <div className="nav">
            {NAVS.map((nav, index) => {
              return (
                <Link
                  key={index}
                  className="nav-list"
                  to={nav.to}
                  showHeightActive="300"
                  onFocus={this.onFocus}
                >
                  {nav.name}
                </Link>
              );
            })}
            <div ref="bar" className="nav-bar" />
          </div>
        </div>
      </div>
    );
  }
}
