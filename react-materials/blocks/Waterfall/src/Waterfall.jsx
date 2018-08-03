import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import AutoResponsive from 'autoresponsive-react';
import data from './data';
import './Waterfall.scss';

export default class Waterfall extends Component {
  static displayName = 'Waterfall';

  static propTypes = {
    data: PropTypes.array,
  };

  static defaultProps = {
    data,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      () => {
        this.setState({
          containerWidth: ReactDOM.findDOMNode(this.refs.container).clientWidth,
        });
      },
      false
    );
  }

  getAutoResponsiveProps = () => {
    return {
      itemMargin: 10,
      containerWidth: this.state.containerWidth || document.body.clientWidth,
      itemClassName: 'item',
      gridWidth: 100,
      transitionDuration: '.5',
    };
  };

  render() {
    return (
      <IceContainer>
        <div className="waterfall-panel">
          <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
            {this.props.data.map((i, index) => {
              let style = {
                width: i.w === 'w1' ? 190 : 390,
                height: i.w === 'w1' ? 240 : 490,
              };
              return (
                <a
                  key={index}
                  href="#"
                  className={`${i.w} album item`}
                  style={style}
                >
                  <img
                    className="a-cont"
                    src={require('./images/subjectc10585.jpg')}
                  />
                  <img className="a-cover" src={i.src} />
                  <p className="a-layer">
                    <span className="al-brand">{i.brand}</span>
                    <span className="al-title">{i.title}</span>
                    <span className="al-count">{i.count}件商品</span>
                  </p>
                </a>
              );
            })}
          </AutoResponsive>
        </div>
      </IceContainer>
    );
  }
}

const styles = {};
