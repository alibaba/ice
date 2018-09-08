import React from 'react';
import { Button } from '@icedesign/base';

const CustomButton = (props) => {
  return <Button {...props} style={{ ...styles.button, ...props.style }} />;
};

export default CustomButton;

const styles = {
  button: {
    width: '100%',
    height: '42px',
    lineHeight: '42px',
    textAlign: 'center',
    border: '1px solid #00c1de',
  },
};
