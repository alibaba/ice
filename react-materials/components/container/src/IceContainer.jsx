import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@alifd/next';

export default class Container extends Component {
  static displayName = 'Container';

  static propTypes = {
    /**
     * 加载的loading
     */
    loading: PropTypes.bool,
    /**
     * 数据错误
     */
    error: PropTypes.any,
    /**
     * 数据为空
     */
    empty: PropTypes.any,
    /**
     * 样式
     */
    style: PropTypes.object,
    /**
     * 样式名
     */
    className: PropTypes.string,
    /**
     * 标题
     */
    title: PropTypes.string,
  };

  static defaultProps = {
    loading: false,
    error: false,
    empty: false,
    style: {},
    className: '',
    title: '',
  };

  renderChildren = () => {
    const { error, empty, children } = this.props;

    if (error) {
      return (
        <div
          style={{
            padding: '80px 0',
            textAlign: 'center',
          }}
        >
          <img
            style={{
              width: '108px',
            }}
            src="https://img.alicdn.com/tfs/TB1KJkbRFXXXXbRXVXXXXXXXXXX-216-218.png"
            alt="数据加载错误"
          />
          <p
            style={{
              width: '80%',
              margin: '30px auto 0',
              color: '#999',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        </div>
      );
    } else if (empty) {
      return (
        <div
          style={{
            padding: '80px 0',
            textAlign: 'center',
          }}
        >
          <img
            style={{
              width: '97px',
            }}
            src="https://img.alicdn.com/tfs/TB1df3oRFXXXXbEXFXXXXXXXXXX-194-220.png"
            alt="数据为空"
          />
          <p
            style={{
              width: '80%',
              margin: '30px auto 0',
              color: '#999',
              textAlign: 'center',
            }}
          >
            {empty}
          </p>
        </div>
      );
    }
    return children;
  };

  render() {
    const {
      loading,
      children,
      title,
      style,
      className,
      error,
      empty,
      ...others
    } = this.props;

    const containerStyle = {
      backgroundColor: '#fff',
      borderRadius: '6px',
      padding: '20px',
      marginBottom: '20px',
      ...style,
    };

    if (loading) {
      return (
        <Loading
          color="#66AAFF"
          style={{ width: '100%' }}
        >
          <div
            className={`container-block ${className}`}
            style={containerStyle}
          >
            {children}
          </div>
        </Loading>
      );
    }

    return (
      <div
        className={`container-block ${className}`}
        style={containerStyle}
        {...others}
      >
        {title && (
          <h4
            style={{
              height: '16px',
              lineHeight: '16px',
              fontSize: '16px',
              color: '#333',
              fontWeight: 'bold',
              margin: 0,
              padding: 0,
              marginBottom: '20px',
            }}
          >
            {title}
          </h4>
        )}
        {this.renderChildren()}
      </div>
    );
  }
}
