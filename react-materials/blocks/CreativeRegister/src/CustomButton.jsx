import React from 'react';
import { Button } from '@icedesign/base';

const CustomButton = (props) => {
  return <Button {...props} style={{ ...styles.button, ...props.style }} />;
};

export default CustomButton;

const styles = {
  button: {
    marginTop: '40px',
    width: '180px',
    height: '48px',
    lineHeight: '48px',
    textAlign: 'center',
    borderRadius: '50px',
    border: '1px solid #9816f4',
    boxShadow: '0px 5px 10px 2px rgba(152,22,244,0.19)',
  },
};
