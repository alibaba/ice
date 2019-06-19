import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@alifd/next';
import LazyLoad from 'react-lazyload';
import MaterialCategories from '@components/MaterialCategories';
import BlockCard from '@components/BlockCard';
import NoData from '@components/NoData';

import styles from './index.module.scss';

const { Row, Col } = Grid;

const BlockPanel = ({ dataSource, currentCategory, onCategoryChange }) => {
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
          ? currentMaterials.map((data) => {
              const key = data.source && data.source.npm ? data.source.npm : data.title;

              return (
                <Col l="8" m="8" s="12" xs="24" xxs="24" key={key}>
                  <LazyLoad height={265} resize scrollContainer=".scollContainer">
                    <BlockCard dataSource={data} />
                  </LazyLoad>
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

BlockPanel.defaultProps = {
  dataSource: {
    categories: [],
    materials: {},
  },
};

BlockPanel.propTypes = {
  dataSource: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    materials: PropTypes.object.isRequired,
  }),
  currentCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default BlockPanel;
