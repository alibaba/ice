import { createElement } from 'rax';
import Image from 'rax-image';

import './index.css';

export default (props) => {
  const source = {
    uri: '//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png',
  };
  return (
    <Image
      className="logo"
      source={source}
    />
  );
};
