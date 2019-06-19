import React from 'react';
import { Grid } from '@alifd/next';
import PropTypes from 'prop-types';
import ScaffoldCard from '@components/ScaffoldCard';
import MaterialCategories from '@components/MaterialCategories';
import NoData from '@components/NoData';

import styles from './index.module.scss';

const { Row, Col } = Grid;

const ScaffoldPanel = ({ dataSource, currentCategory, onDownload, onCategoryChange }) => {
  const { categories, materials } = dataSource;
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
      <Row wrap gutter="40">
        {
          currentMaterials.length
          ? currentMaterials.map((data) => {
              const key = data.source && data.source.npm ? data.source.npm : data.title;

              return (
                <Col l="12" s="12" xs="24" xxs="24" key={key}>
                  <ScaffoldCard dataSource={data} onDownload={onDownload} />
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

ScaffoldPanel.defaultProps = {
  dataSource: {
    categories: [],
    materials: {},
  },
  onDownload: f => f,
};

ScaffoldPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    materials: PropTypes.object.isRequired,
  }),
  currentCategory: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
  onCategoryChange: PropTypes.func.isRequired,
};

export default ScaffoldPanel;
