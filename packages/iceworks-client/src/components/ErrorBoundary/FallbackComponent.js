import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Loading } from '@alifd/next';

const FallbackComponent = ({ intl }) => {
  return (
    <div
      style={{
        minWidth: '240px',
        minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Loading
        tip={intl.formatMessage({ id: 'iceworks.global.fallback.title' })}
      />
    </div>
  );
};

FallbackComponent.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(FallbackComponent);
