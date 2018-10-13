import {Component} from 'react';
import blockAddData from '../../commands/block-adddata';
import clearDataKey from '../../commands/block-cleardatabykey';
import { haveDataKeyInSomeBlocks } from '../../queries/have';

export default (type) => (Selector) => {
  return class SharedSelector extends Component {
    typeName = '';
    constructor(props) {
      super(props);
      this.typeName = this.props.type || type;
    }

    onChange = ({ value }) => {
      let { editor } = this.props;

      editor.change(change => {
        // if select `default` remove font size settings
        if (value === 'Default') {
          return clearDataKey(change, type).select();
        }

       blockAddData(change, { data: { [type]: value } }).select();
      });
    };

    render() {
      // eslint-disable-next-line
      const { options, value, ...rest } = this.props;
      const isActive = haveDataKeyInSomeBlocks({value}, type);
      let defaultValue;

      if (isActive) {
        const first = value.blocks
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
