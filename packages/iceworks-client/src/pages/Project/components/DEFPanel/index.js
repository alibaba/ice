import React from 'react';
import { FormattedMessage } from 'react-intl';
import Panel from '../Panel';

const DEFPanel = () => {
  return (
    <Panel header={<h3><FormattedMessage id="iceworks.project.panel.def.title" /></h3>}>
      <div>
        testing...
      </div>
    </Panel>
  );
};

export default DEFPanel;
