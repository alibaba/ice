import React from 'react';
import { injectIntl } from 'react-intl';
import Exception from '../../components/Exception';

const NotFound = ({ intl }) => {
  return (
    <Exception
      statusCode="400"
      image="https://img.alicdn.com/tfs/TB1BJ_3GxTpK1RjSZFKXXa2wXXa-260-260.png"
      description={intl.formatMessage({ id: 'app.exception.description.404' })}
      backText={intl.formatMessage({ id: 'app.exception.backtext' })}
    />
  );
};

export default injectIntl(NotFound);
