import {Component} from 'react';
import blockAddData from '../../changes/block-adddata';
import clearDataKey from '../../changes/block-cleardatabykey';
import { haveDataKeyInSomeBlocks } from '../../utils/have';

export default (type) => (Selector) => {
  return class SharedSelector extends Component {
    typeName = '';
    constructor(props) {
      super(props);
      this.typeName = this.props.type || type;
    }

    onChange = ({ value }) => {
      let { change, onChange } = this.props;
      this.setState({ value });

      // if select `default` remove font size settings
      if (value === 'Default') {
        return onChange(clearDataKey(change, type).select());
      }

      onChange(blockAddData(change, { data: { [type]: value } }).select());
    };

    render() {
      // eslint-disable-next-line
      const { options, change, onChange, ...rest } = this.props;
      const isActive = haveDataKeyInSomeBlocks(change, type);
      let defaultValue;

      if (isActive) {
        const first = change.value.blocks
          .filter(block => {
            if (block.data && block.data.get(type)) return true;
            return false;
          })
          .first();

        if (first) {
          defaultValue = first.data.get(type);
        }
      }

      return (
        <Selector
          options={options}
          defaultValue={defaultValue}
          onChange={this.onChange}
          {...rest}
        />
      );
    }
  };
};
