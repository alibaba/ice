/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Input,
  Button,
  Grid,
  Select,
  DatePicker,
} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { RangePicker } = DatePicker;

class CustomForm extends Component {
  static displayName = 'CustomForm';

  static propTypes = {
    config: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func,
    formChange: PropTypes.func,
    handleReset: PropTypes.func,
    extraContent: PropTypes.element,
  };

  static defaultProps = {
    extraContent: null,
    handleReset: () => {},
    handleSubmit: () => {},
    formChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.initFields,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  formChange = (value) => {
    this.setState(
      {
        value,
      },
      () => {
        this.props.formChange(value);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      this.props.handleSubmit(errors, values);
    });
  };

  renderInput = (item) => {
    return (
      <Col l="8" key={item.label}>
        <div style={styles.formItem}>
          <span style={styles.formLabel}>{item.label}：</span>
          <IceFormBinder {...item.formBinderProps}>
            <Input {...item.componentProps} style={{ width: '100%' }} />
          </IceFormBinder>
          <div style={styles.formError}>
            <IceFormError name={item.formBinderProps.name} />
          </div>
        </div>
      </Col>
    );
  };

  renderCheckbox = (item) => {
    return (
      <Col l="8" key={item.label}>
        <div style={styles.formItem}>
          <IceFormBinder {...item.formBinderProps}>
            <Checkbox {...item.componentProps}>{item.label}</Checkbox>
          </IceFormBinder>
        </div>
      </Col>
    );
  };

  renderDatePicker = (item) => {
    return (
      <Col l="8" key={item.label}>
        <div style={styles.formItem}>
          <span style={styles.formLabel}>{item.label}：</span>
          <IceFormBinder {...item.formBinderProps}>
            <RangePicker {...item.componentProps} style={{ width: '100%' }} />
          </IceFormBinder>
        </div>
      </Col>
    );
  };

  renderSelect = (item) => {
    return (
      <Col l="8" key={item.label}>
        <div style={styles.formItem}>
          <span style={styles.formLabel}>{item.label}：</span>
          <IceFormBinder {...item.formBinderProps}>
            <Select {...item.componentProps} style={{ width: '100%' }} />
          </IceFormBinder>
        </div>
      </Col>
    );
  };

  renderFromItem = (config) => {
    return config.map((item) => {
      if (item.component === 'Input') {
        return this.renderInput(item);
      } else if (item.component === 'Checkbox') {
        return this.renderCheckbox(item);
      } else if (item.component === 'Select') {
        return this.renderSelect(item);
      } else if (item.component === 'RangePicker') {
        return this.renderDatePicker(item);
      }
    });
  };

  render() {
    const { config, extraContent, handleReset } = this.props;
    const { value } = this.state;

    return (
      <div style={styles.formContainer}>
        <IceFormBinderWrapper
          value={value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <Row wrap gutter={40}>
              {this.renderFromItem(config)}
            </Row>
            <div style={styles.buttons}>
              <Button
                size="large"
                type="primary"
                style={{ marginRight: '10px' }}
                onClick={this.handleSubmit}
              >
                搜 索
              </Button>
              <Button size="large" type="normal" onClick={handleReset}>
                重 置
              </Button>
            </div>
            {extraContent}
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  formContainer: {
    position: 'relative',
    background: '#fff',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '70px',
  },
  buttons: {
    margin: '10px 0 20px',
    textAlign: 'center',
  },
};

export default CustomForm;
