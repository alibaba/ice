import React from 'react';
import { FormattedMessage } from 'react-intl';
import Panel from '../Panel';

const OSSPanel = () => {
  return (
    <Panel header={<h3><FormattedMessage id="iceworks.project.panel.oss.title" /></h3>}>
      <div>
        testing...
      </div>
    </Panel>
  );
};

export default OSSPanel;
