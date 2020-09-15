import { createElement, PureComponent } from 'rax';
import Image from 'rax-image';
import { withRouter } from 'rax-app';

import './index.css';

class Logo extends PureComponent {
  public render() {
    const source = {
      uri: '//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png',
    };
    console.log('with router =>', this.props);
    return (
      <Image
        className="logo"
        source={source}
      />
    );
  }
}

export default withRouter(Logo);
