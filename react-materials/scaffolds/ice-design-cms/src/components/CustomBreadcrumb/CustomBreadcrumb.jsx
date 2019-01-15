import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from '@alifd/next';
import IceContainer from '@icedesign/container';

export default class CustomBreadcrumb extends Component {
  static displayName = 'CustomBreadcrumb';

  static defaultProps = {
    dataSource: [],
  };

  static propTypes = {
    dataSource: PropTypes.array,
  };

  render() {
    const { dataSource } = this.props;
    return (
      <IceContainer>
        <Breadcrumb style={{ margin: 0 }}>
          {dataSource.map((item, index) => {
            return (
              <Breadcrumb.Item link={item.link} key={index}>
                {item.text}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </IceContainer>
    );
  }
}
