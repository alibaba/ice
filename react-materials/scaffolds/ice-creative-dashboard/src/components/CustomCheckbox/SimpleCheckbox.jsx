import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

class SimpleCheckbox extends React.Component {
  render() {
    return (
      <FormGroup check {...this.props.formGroupProps}>
        <Label check {...this.props.labelProps}>
          <Input type="checkbox" {...this.props.inputProps} />
          <span className="form-check-sign" />
          {this.props.label ? this.props.label : ''}
        </Label>
      </FormGroup>
    );
  }
}

SimpleCheckbox.propTypes = {
  label: PropTypes.node,
};

export default SimpleCheckbox;
