/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Checkbox } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';

class AuthForm extends Component {
  static displayName = 'AuthForm';

  static propTypes = {
    config: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    links: PropTypes.array,
    handleSubmit: PropTypes.func,
    formChange: PropTypes.func,
    extraContent: PropTypes.element,
  };

  static defaultProps = {
    links: [],
    extraContent: null,
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
      <div style={styles.submitButton} key={item.label}>
        <CustomButton
          {...item.componentProps}
          style={{ background: '#00c1de', borderRadius: '0' }}
          onClick={this.handleSubmit}
        >
          {item.label}
        </CustomButton>
      </div>
    );
  };

  renderInput = (item) => {
    return (
      <div style={styles.formItem} key={item.label}>
        <div style={styles.formItemCol}>
          <IceFormBinder {...item.formBinderProps}>
            <CustomInput {...item.componentProps} />
          </IceFormBinder>
        </div>
        <div style={styles.errorCol}>
          <IceFormError name={item.formBinderProps.name} />
        </div>
      </div>
    );
  };

  renderCheckbox = (item) => {
    return (
      <div style={styles.formItem} key={item.label}>
        <IceFormBinder {...item.formBinderProps}>
          <Checkbox {...item.componentProps}>{item.label}</Checkbox>
        </IceFormBinder>
      </div>
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
    const { title, config, links, extraContent } = this.props;
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
              <div style={styles.footer}>
                {links.map((item, index) => {
                  return (
                    <Link key={index} to={item.to} style={styles.link}>
                      {item.text}
                    </Link>
                  );
                })}
              </div>
            ) : null}
            {extraContent}
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  formContainer: {
    background: '#fff',
    padding: '30px',
  },
  formTitle: {
    margin: '0 0 20px',
    fontWeight: '450',
    fontSize: '20px',
    textAlign: 'center',
    letterSpacing: '4px',
    color: '#373d41',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
  },
  errorCol: {
    position: 'absolute',
  },
  submitButton: {
    marginBottom: '10px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: '#9b9ea0',
    fontSize: '12px',
    marginRight: '8px',
  },
};

export default AuthForm;
