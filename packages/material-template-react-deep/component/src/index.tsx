import React from 'react';
import { ConfigProvider } from '@alifd/next';
import PropTypes from 'vision-types';

interface IProps {
}

class Deep<%= className %> extends React.Component<IProps> {
  static defaultProps = {
    deepPrefix: 'deep-'
  }
  // for low-code
  static propTypes = {
    deepPrefix: PropTypes.string
  }

  render() {
    return (
      <div className="deep-<%= npmName %>">Hello <%= className %></div>;
    );
  }
}
export default ConfigProvider.config(Deep<%= className %>, {});

