import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@alifd/next';
import MaterialCategories from '@components/MaterialCategories';
import ComponentCard from '@components/ComponentCard';

import styles from '../ScaffoldPanel/index.module.scss';

const { Row, Col } = Grid;

const ComponentPanel = ({ dataSource, current, onInstall }) => {
  const { categories = [], materials = {} } = dataSource;
  const cueeMaterials = materials[current] || [];

  return (
    <div className={styles.materialsPanel}>
      <MaterialCategories dataSource={categories} current={current} />
      <Row wrap gutter="20">
        {cueeMaterials.map((data) => {
          const key = data.source && data.source.npm ? data.source.npm : data.title;
          return (
            <Col l="8" m="8" s="12" xs="24" xxs="24" key={key}>
              <ComponentCard dataSource={data} onInstall={onInstall} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

ComponentPanel.defaultProps = {
  dataSource: {
    categories: [],
    materials: {},
  },
  current: 'all',
  onInstall: f => f,
};

ComponentPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    materials: PropTypes.object.isRequired,
  }),
  current: PropTypes.string,
  onInstall: PropTypes.func,
};

export default ComponentPanel;
