import React, { Component } from 'react';
import IceImg from '@icedesign/img';
import './SingleItem.scss';

export default class SingleItem extends Component {
  static displayName = 'SingleItem';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      style,
      className = '',
      active,
      title,
      image,
      price,
      extra,
    } = this.props;
    return (
      <div
        className={`${className} single-item`}
        style={{
          ...style,
          width: '165px',
          height: '230px',
          cursor: 'pointer',
          borderRadius: '4px',
          backgroundColor: active ? '#f4f4f4' : undefined,
        }}
      >
        <IceImg
          src={image}
          width={149}
          height={149}
          style={{ margin: '8px' }}
        />
        <div
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: '#999',
            fontSize: '12px',
            lineHeight: '18px',
            margin: '0 14px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: '#999',
            lineHeight: '18px',
            fontSize: '12px',
            margin: '0 14px',
          }}
        >
          {price}
        </div>
        <div
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            lineHeight: '18px',
            color: '#C0C0C0',
            fontSize: '12px',
            margin: '0 14px',
          }}
        >
          {extra}
        </div>
      </div>
    );
  }
}
