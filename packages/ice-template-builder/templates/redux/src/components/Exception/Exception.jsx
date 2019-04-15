import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './Exception.scss';

export default class Exception extends Component {
  static defaultProps = {
    statusCode: '400',
    description: '抱歉，你访问的页面不存在',
    image: 'https://img.alicdn.com/tfs/TB1ODH2GAvoK1RjSZPfXXXPKFXa-780-780.png',
    backText: '返回首页',
    redirect: '/',
  };

  static propTypes = {
    statusCode: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    backText: PropTypes.string,
    redirect: PropTypes.string,
  };

  render() {
    const { statusCode, description, image, backText, redirect } = this.props;
    return (
      <IceContainer>
        <div className="exception-content">
          <img src={image} className="exception-image" alt="页面不存在" />
          <div className="exception-prompt">
            <h1 className="statuscode">{statusCode}</h1>
            <p className="description">{description}</p>
            <Button type="primary">
              <Link to={redirect} className="back-text">
                {backText}
              </Link>
            </Button>
          </div>
        </div>
      </IceContainer>
    );
  }
}
