import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@alifd/next';

import styles from '../ScaffoldPanel/index.module.scss';

const InstallDialog = ({ type, ...other }) => {
  return (
    <Dialog className={styles.materialsPanel} {...other}>
      <div>
        aaaa
      </div>
    </Dialog>
  );
};

InstallDialog.defaultProps = {
  type: 'scaffold',
};

InstallDialog.propTypes = {
  type: PropTypes.string,
};

export default InstallDialog;
