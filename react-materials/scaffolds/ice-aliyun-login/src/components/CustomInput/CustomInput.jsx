import React from 'react';
import { Input } from '@icedesign/base';

const CustomInput = (props) => {
  return <Input {...props} style={styles.input} />;
};

export default CustomInput;

const styles = {
  input: {
    width: '320px',
    height: '42px',
    lineHeight: '42px',
    borderRadius: 0,
    borderColor: '#ebedf2',
  },
};
