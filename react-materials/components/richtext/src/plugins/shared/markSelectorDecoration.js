import {Component} from 'react';
import removeType from '../../commands/mark-removetype';
import addMarkOverwrite from '../../commands/mark-addoverwrite';
import { haveMarks } from '../../queries/have';
import { getMarkType } from '../../queries/get';

export default (type) => (Selector) => {
  return class SharedSelector extends Component {
    typeName = '';
    constructor(props) {
      super(props);
      this.typeName = this.props.type || type;
    }

    onChange = ({value}) => {
      let { editor } = this.props;

      editor.change(change => {
        // if select `default` remove font size settings
        if (value === 'Default') {
          return removeType(change, this.typeName);
        }

        addMarkOverwrite(change, {
          type: this.typeName,
          data: {
            [this.typeName]: value
          }
        });
      });
    };

    render() {
      // eslint-disable-next-line
      const { options, value, ...rest } = this.props;
      const isActive = haveMarks({value}, this.typeName);
      let defaultFont;

      if (isActive) {
        const first = getMarkType({value}, this.typeName)
          .first()
          .get('data');
        defaultFont = first.get(this.typeName);
      }

      return (
        <Selector
          options={options}
          defaultValue={defaultFont}
          onChange={this.onChange}
          {...rest}
        />
      );
    }
  };
};
