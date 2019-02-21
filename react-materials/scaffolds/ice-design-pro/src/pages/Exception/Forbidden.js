import React from 'react';
import { injectIntl } from 'react-intl';
import Exception from '../../components/Exception';

const Forbidden = ({ intl }) => {
  return (
    <Exception
      statusCode="403"
      image="https://img.alicdn.com/tfs/TB174TvGCzqK1RjSZPcXXbTepXa-260-260.png"
      description={intl.formatMessage({ id: 'app.exception.description.403' })}
      backText={intl.formatMessage({ id: 'app.exception.backtext' })}
    />
  );
};

export default injectIntl(Forbidden);
