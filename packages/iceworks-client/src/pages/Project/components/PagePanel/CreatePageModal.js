import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Select } from '@alifd/next';
import mockData from '@src/mock';
import socket from '@src/socket';
import stores from '@stores';
import Modal from '@components/Modal';
import BlockCard from '@components/BlockCard';
import useModal from '@hooks/useModal';
import useSocket from '@hooks/useSocket';
import pageStores from '../../stores';
import SavePageModal from './SavePageModal';
import styles from './CreatePageModal.module.scss';

const MaterialSelect = ({ resources, onSelect }) => {
  const resource = resources[0];
  const { source } = resource;
  const [data, setData] = useState({ categories: [], materials: { all: [] } });

  useEffect(() => {
    (async () => {
      const { blocks } = await socket.emit('material.index.getOne', { url: source });
      setData(blocks);
    })();
  }, []);

  const { categories = [], materials = {} } = data;

  return (
    <div className={styles.materialWrap}>
      <div className={styles.select}>
        <Select
          dataSource={resources.map(({ source: value, name: label }) => {
            return {
              label,
              value,
            };
          })}
          value={source}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.materials}>
          {
            materials.all.map((dataSource) => {
              return (
                <BlockCard
                  dataSource={dataSource}
                  onClick={() => onSelect(dataSource)}
                />
              );
            })
          }
        </div>
        <div className={styles.categories}>
          {
            categories.map(({ name: categoryName }) => {
              return (
                <div>
                  {categoryName}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

MaterialSelect.propTypes = {
  resources: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const CreatePageModal = ({
  on, onCancel, onOk,
}) => {
  const {
    on: onSaveModal,
    toggleModal: toggleSaveModal,
  } = useModal();
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [page] = pageStores.useStores(['page']);
  const [progress, material, project] = stores.useStores(['progress', 'material', 'project']);
  const { dataSource } = material;
  const { resource } = dataSource;
  const materialSources = resource.official.concat(resource.custom);

  async function onCloseSaveModal() {
    await progress.hide();
    toggleSaveModal();
  }

  function onCreateOk() {
    page.setData({
      selectedBlocks,
      layout: mockData.layout,
    });
    toggleSaveModal();
  }

  async function onSaveOk(data) {
    await progress.show({ statusText: <FormattedMessage id="iceworks.project.panel.page.create.progress.start" /> });
    await onOk({
      ...page.dataSource,
      ...data,
    });
    await progress.hide();
    toggleSaveModal();
  }

  function onSelect(block) {
    setSelectedBlocks(selectedBlocks.concat([block]));
  }

  useSocket('project.page.create.status', ({ text, percent }) => {
    progress.show({ statusText: text, percent });
  });

  useEffect(() => {
    material.getResources({ type: project.dataSource.type });
  }, []);

  return (
    [
      <Modal
        title={<FormattedMessage id="iceworks.project.panel.page.create.title" />}
        visible={on}
        onCancel={onCancel}
        onOk={onCreateOk}
        key="createModal"
      >
        <div className={styles.wrap}>
          <div className={styles.blocks}>
            {
              selectedBlocks.map(({ screenshot, name, title }) => {
                return (
                  <div className={styles.item}>
                    <div className={styles.screenshot}>
                      <img alt={title} src={screenshot} />
                    </div>
                    <div className={styles.name}>
                      {name}
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className={styles.material}>
            {
              materialSources.length ?
                <MaterialSelect
                  resources={materialSources}
                  onSelect={onSelect}
                /> :
                null
            }
          </div>
        </div>
      </Modal>,
      <SavePageModal
        on={onSaveModal}
        onCancel={onCloseSaveModal}
        onOk={onSaveOk}
        key="saveModal"
      />,
    ]
  );
};

CreatePageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreatePageModal;
