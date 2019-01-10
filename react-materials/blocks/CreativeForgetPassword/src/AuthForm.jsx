/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Grid } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const { Row, Col } = Grid;

class AuthForm extends Component {
  static displayName = 'AuthForm';

  static propTypes = {
    config: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    links: PropTypes.array,
    handleSubmit: PropTypes.func,
    formChange: PropTypes.func,
  };

  static defaultProps = {
    links: [],
    handleSubmit: () => {},
    formChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.initFields,
    };
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

  renderButton = (item) => {
    return (
      <Row
        style={{ ...styles.formItem, ...styles.submitButton }}
        key={item.label}
      >
        <CustomButton
          {...item.componentProps}
          style={{ border: 0 }}
          onClick={this.handleSubmit}
        >
          {item.label}
        </CustomButton>
      </Row>
    );
  };

  renderInput = (item) => {
    return (
      <Row style={styles.formItem} key={item.label}>
        <Col style={styles.formItemCol}>
          <IceFormBinder {...item.formBinderProps}>
            <CustomInput {...item.componentProps} />
          </IceFormBinder>
        </Col>
        <Col>
          <IceFormError name={item.formBinderProps.name} />
        </Col>
      </Row>
    );
  };

  renderCheckbox = (item) => {
    return (
      <Row style={styles.formItem} key={item.label}>
        <Col>
          <IceFormBinder {...item.formBinderProps}>
            <Checkbox {...item.componentProps}>{item.label}</Checkbox>
          </IceFormBinder>
        </Col>
      </Row>
    );
  };

  renderFromItem = (config) => {
    return config.map((item) => {
      if (item.component === 'Input') {
        return this.renderInput(item);
      } else if (item.component === 'Checkbox') {
        return this.renderCheckbox(item);
      } else if (item.component === 'Button') {
        return this.renderButton(item);
      }
    });
  };

  render() {
    const { title, config, links } = this.props;
    const { value } = this.state;

    return (
      <div style={styles.formContainer}>
        <h4 style={styles.formTitle}>{title}</h4>
        <IceFormBinderWrapper
          value={value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            {this.renderFromItem(config)}

            {Array.isArray(links) && links.length ? (
              <Row style={styles.footer}>
                {links.map((item, index) => {
                  return (
                    <a key={index} href={item.to} style={styles.link}>
                      {item.text}
                    </a>
                  );
                })}
              </Row>
            ) : null}
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  formTitle: {
    marginBottom: '40px',
    fontWeight: '500',
    fontSize: '22px',
    textAlign: 'center',
    letterSpacing: '4px',
  },
  formItem: {
    marginBottom: '20px',
  },
  submitButton: {
    justifyContent: 'center',
  },
  checkbox: {
    color: '#999',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    margin: '0 5px',
    color: '#999',
  },
  link: {
    color: '#999',
    fontSize: '12px',
    margin: '0 5px',
  },
};

export default AuthForm;
