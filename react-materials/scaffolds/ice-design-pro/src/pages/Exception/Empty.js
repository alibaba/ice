import React from 'react';
import { injectIntl } from 'react-intl';
import Exception from '../../components/Exception';

const Empty = ({ intl }) => {
  return (
    <Exception
      statusCode="204"
      image="https://img.alicdn.com/tfs/TB1P9j4GpzqK1RjSZFCXXbbxVXa-780-780.png"
      description={intl.formatMessage({ id: 'app.exception.description.204' })}
      backText={intl.formatMessage({ id: 'app.exception.backtext' })}
    />
  );
};

export default injectIntl(Empty);
