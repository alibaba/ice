import {Component} from "react";
import removeType from "../../changes/mark-removetype";
import addMarkOverwrite from "../../changes/mark-addoverwrite";
import { haveMarks } from "../../utils/have";
import { getMarkType } from "../../utils/get";

export default (type) => (Selector) => {
  return class SharedSelector extends Component {
    typeName = '';
    constructor(props) {
      super(props);
      this.typeName = this.props.type || type;
    }

    onChange = value => {
      let { change, onChange } = this.props;
      this.setState({ value });

      // if select `default` remove font size settings
      if (value.label === "Default") {
        return onChange(removeType(change, this.typeName));
      }
      onChange(
        addMarkOverwrite(change, {
          type: this.typeName,
          data: {
            [this.typeName]: value.value
          }
        })
      );
    };

    render() {
      // eslint-disable-next-line
      const { options, change, onChange, ...rest } = this.props;
      const isActive = haveMarks(change, this.typeName);
      let defaultFont;

      if (isActive) {
        const first = getMarkType(change, this.typeName)
          .first()
          .get("data");
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
