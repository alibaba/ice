import React from 'react';
import { FormattedMessage } from 'react-intl';
import Panel from '../Panel';

const Git = () => {
  return (
    <Panel header={<h3><FormattedMessage id="iceworks.project.panel.git.title" /></h3>}>
      <div>
        testing...
      </div>
    </Panel>
  );
};

export default Git;
