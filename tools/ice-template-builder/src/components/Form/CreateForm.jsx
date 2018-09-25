import React, { Component } from 'react';

const CreateForm = (WrappedComponent) => {
  class Form extends Component {
    static displayName = 'Form';
    constructor(props) {
      super(props);
      this.state = {
        value: props.value,
      };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }

    /**
     * 表单改变时动态监听
     */
    formChange = (value) => {
      this.setState(
        {
          value,
        },
        () => {
          this.props.onChange(value);
        }
      );
    };

    handleColorChange = (key, hex) => {
      const { value } = this.state;
      if (key === 'primary') {
        value.themeConfig.primaryColor = hex;
      } else {
        value.themeConfig.secondaryColor = hex;
      }

      this.setState(
        {
          value,
        },
        () => {
          this.props.onChange(this.state.value);
        }
      );
    };

    handlePresetColor = (color) => {
      const { value } = this.state;
      value.themeConfig.primaryColor = color.primaryColor;
      value.themeConfig.secondaryColor = color.secondaryColor;

      this.setState(
        {
          value,
        },
        () => {
          this.props.onChange(this.state.value);
        }
      );
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          formChange={this.formChange}
          handleColorChange={this.handleColorChange}
          handlePresetColor={this.handlePresetColor}
        />
      );
    }
  }

  return Form;
};

export default CreateForm;
