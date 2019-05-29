import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Loading } from '@alifd/next';
import Panel from '../Panel';

const FallbackPanel = ({ intl }) => {
  return (
    <Panel
      header={
        <h3>
          {intl.formatMessage({ id: 'iceworks.project.panel.fallback.title' })}
        </h3>
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Loading
          inline={false}
          tip={
            <div style={{ minWidth: '100px' }}>
              {intl.formatMessage({
                id: 'iceworks.project.panel.fallback.desc',
              })}
              ...
            </div>
          }
        />
      </div>
    </Panel>
  );
};

FallbackPanel.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(FallbackPanel);
