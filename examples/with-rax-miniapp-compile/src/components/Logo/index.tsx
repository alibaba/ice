import { createElement, Component } from 'rax';
import Image from 'rax-image';
import { withRouter } from 'rax-app';

import './index.css';

// eslint-disable-next-line react/prefer-stateless-function
class Logo extends Component {
  public render() {
    const source = {
      uri: `${process.env.PUBLIC_URL}/rax.png`,
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
