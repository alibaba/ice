/* eslint no-shadow: 0 */
import React, { Component } from 'react';
import { Select } from '@icedesign/base';

class Toggle extends Component {
  static displayName = 'Toggle';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { value, values, onChange } = this.props;

    let content;
    if (Array.isArray(values) && values.length) {
      content = values.map((value, index) => {
        return (
          <Select.option key={index} value={value}>
            {value}
          </Select.option>
        );
      });
    } else {
      content = <Select.option>- -</Select.option>;
    }

    return (
      <Select defaultValue={value} onChange={onChange}>
        {content}
      </Select>
    );
  }
}

export default Toggle;
