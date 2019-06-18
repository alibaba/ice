import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Select, Input } from '@alifd/next';
import mockData from '@src/mock';
import socket from '@src/socket';
import stores from '@stores';
import Modal from '@components/Modal';
import Icon from '@components/Icon';
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

  function generateBlockName(name, count = 0) {
    const newName = !count ? name : `${name}${count}`;
    const isConflict = selectedBlocks.some((block) => block.name === newName);
    if (isConflict) {
      return generateBlockName(name, count + 1);
    }
    return newName;
  }

  function onSelect(block) {
    setSelectedBlocks(selectedBlocks.concat([{ ...block, name: generateBlockName(block.name) }]));
  }

  function onDelete(targetIndex) {
    setSelectedBlocks(selectedBlocks.filter((block, index) => index !== targetIndex));
  }

  function onNameChange(name, targetIndex) {
    selectedBlocks[targetIndex].name = name;
    setSelectedBlocks([...selectedBlocks]);
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
              selectedBlocks.map(({ screenshot, name, title }, index) => {
                return (
                  <div className={styles.item} key={index}>
                    <div className={styles.screenshot}>
                      <img alt={title} src={screenshot} />
                    </div>
                    <div className={styles.name}>
                      <Input
                        value={name}
                        className={styles.input}
                        onChange={(value) => onNameChange(value, index)}
                      />
                      <Icon className={styles.icon} type="pencil" size="small" />
                    </div>
                    <Icon className={styles.trash} type="trash" size="small" onClick={() => onDelete(index)} />
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
