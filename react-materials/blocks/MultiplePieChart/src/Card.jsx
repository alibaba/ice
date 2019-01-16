import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import { Select } from '@alifd/next';

const { Option } = Select;

export default class Card extends Component {
  static displayName = 'Card';

  static propTypes = {
    title: PropTypes.string,
    options: PropTypes.array,
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
    title: '标题',
    options: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, options } = this.props;
    return (
      <IceContainer>
        <div style={styles.cardHead}>
          <h4 style={styles.cardTitle}>{title}</h4>
          <Select size="large" defaultValue="day">
            {options.map((option, index) => {
              return (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              );
            })}
          </Select>
        </div>
        {this.props.children}
      </IceContainer>
    );
  }
}

const styles = {
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 0 20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
  },
  cardTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
