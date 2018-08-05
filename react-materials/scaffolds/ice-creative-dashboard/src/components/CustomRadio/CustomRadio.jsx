import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

class CustomRadio extends React.Component {
  render() {
    let classes = '';
    if (this.props.formGroupProps !== undefined) {
      if (this.props.formGroupProps.className !== undefined) {
        classes += ' ' + this.props.formGroupProps.className;
      }
    }
    return (
      <FormGroup
        check
        {...this.props.formGroupProps}
        className={'form-check-radio' + classes}
      >
        <Label check {...this.props.labelProps}>
          <Input {...this.props.inputProps} type="radio" />
          <span className="form-check-sign" />
          {this.props.label ? this.props.label : ''}
        </Label>
      </FormGroup>
    );
  }
}

CustomRadio.propTypes = {
  label: PropTypes.node,
};

export default CustomRadio;
