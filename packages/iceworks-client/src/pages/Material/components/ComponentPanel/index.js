import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@alifd/next';
import MaterialCategories from '@components/MaterialCategories';
import ComponentCard from '@components/ComponentCard';
import NoData from '@components/NoData';

import styles from './index.module.scss';

const { Row, Col } = Grid;

const ComponentPanel = ({ dataSource, currentCategory, onCategoryChange, onInstall }) => {
  const { categories = [], materials = {} } = dataSource;
  const currentMaterials = materials[currentCategory] || [];

  return (
    <div className={styles.materialsPanel}>
      {
        categories.length < 1 ?
          null :
          <MaterialCategories
            dataSource={categories}
            current={currentCategory}
            onChange={onCategoryChange}
          />
      }
      <Row wrap gutter="20">
        {
          currentMaterials.length
          ? currentMaterials.map((data, index) => {
              return (
                <Col l="8" m="8" s="12" xs="24" xxs="24" key={index}>
                  <ComponentCard dataSource={data} onInstall={onInstall} />
                </Col>
              );
            })
          : (
            <Col span="24">
              <NoData />
            </Col>
          )
        }
      </Row>
    </div>
  );
};

ComponentPanel.defaultProps = {
  dataSource: {
    categories: [],
    materials: {},
  },
  onInstall: f => f,
};

ComponentPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    materials: PropTypes.object.isRequired,
  }),
  currentCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onInstall: PropTypes.func,
};

export default ComponentPanel;
