import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Select, Input } from '@alifd/next';
import cx from 'classnames';
import socket from '@src/socket';
import stores from '@stores';
import Modal from '@components/Modal';
import Icon from '@components/Icon';
import BlockCard from '@components/BlockCard';
import useModal from '@hooks/useModal';
import useSocket from '@hooks/useSocket';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import pageStores from '../../stores';
import SavePageModal from './SavePageModal';
import styles from './CreatePageModal.module.scss';

const DEFAULT_CATEGORY = '全部';

const MaterialSelect = ({ resources, onSelect }) => {
  const resource = resources[0];
  const [data, setData] = useState({
    categories: [], materials: { }, category: DEFAULT_CATEGORY, source: resource.source,
  });
  const { categories = [], materials = {}, category, source } = data;

  function onSetCateogry(setName) {
    setData({
      ...data,
      category: setName,
    });
  }

  async function fetchMaterialBlocks(url) {
    const { blocks } = await socket.emit('material.index.getOne', { url });
    return blocks;
  }

  async function onSourceChange(value) {
    const blocks = await fetchMaterialBlocks(value);
    setData({
      ...data,
      ...blocks,
      category: DEFAULT_CATEGORY,
      source: value,
    });
  }

  useEffect(() => {
    (async () => {
      const blocks = await fetchMaterialBlocks(source);
      setData({
        ...data,
        ...blocks,
      });
    })();
  }, []);

  const categoryMaterials = materials[category] || [];

  return (
    <div className={styles.materialWrap}>
      <div className={styles.selectWrap}>
        <Select
          dataSource={resources.map(({ source: value, name: label }) => {
            return {
              label,
              value,
            };
          })}
          value={source}
          className={styles.select}
          onChange={onSourceChange}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.materials}>
          {
            categoryMaterials.map((dataSource, index) => {
              return (
                <div className={styles.item} key={index}>
                  <BlockCard
                    dataSource={dataSource}
                    onClick={() => onSelect(dataSource)}
                  />
                </div>
              );
            })
          }
        </div>
        {
          categories.length ?
            <div className={styles.categories}>
              {
                categories.map(({ name: categoryName }, index) => {
                  return (
                    <div
                      className={cx({
                        [styles.item]: true,
                        [styles.selected]: category === categoryName,
                      })}
                      key={index}
                      onClick={() => onSetCateogry(categoryName)}
                    >
                      {categoryName}
                    </div>
                  );
                })
              }
            </div> :
            null
        }
      </div>
    </div>
  );
};

MaterialSelect.propTypes = {
  resources: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const BlockDragHandle = SortableHandle(({ title, screenshot }) => (
  <div className={styles.screenshot}>
    <img alt={title} src={screenshot} />
  </div>
));

const SelectedBlock = SortableElement(({
  title, screenshot, name, onNameChange, onDelete, index, isSorting,
}) => {
  return (
    <div className={cx({ [styles.item]: true, [styles.isSorting]: isSorting })}>
      <BlockDragHandle
        title={title}
        screenshot={screenshot}
      />
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
});

const SelectedBlocks = SortableContainer(({ blocks, onNameChange, onDelete, isSorting }) => {
  return (
    <div className={styles.blocks}>
      {
        blocks.length ?
          blocks.map((block, index) => {
            return (
              <SelectedBlock
                {...block}
                index={index}
                onNameChange={onNameChange}
                onDelete={onDelete}
                isSorting={isSorting}
                key={index}
              />
            );
          }) :
          <div className={styles.empty}>
            <img src="https://img.alicdn.com/tfs/TB1yGn2mYZnBKNjSZFrXXaRLFXa-182-149.png" alt="区块" />
            <FormattedMessage id="iceworks.project.panel.page.create.builder.empty" />
          </div>
      }
    </div>
  );
});

const CreatePageModal = ({
  on, onCancel, onOk,
}) => {
  const {
    on: onSaveModal,
    setModal: setSaveModal,
  } = useModal();
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [page] = pageStores.useStores(['page']);
  const [progress, material, project] = stores.useStores(['progress', 'material', 'project']);
  const { dataSource } = material;
  const { resource } = dataSource;
  const materialSources = resource.official.concat(resource.custom);

  async function onCloseSaveModal() {
    await progress.hide();
    setSaveModal(false);
  }

  function onCreateOk() {
    page.setData({
      blocks: selectedBlocks,
    });
    setSaveModal(true);
  }

  async function onSaveOk(data) {
    await progress.show({ statusText: <FormattedMessage id="iceworks.project.panel.page.create.progress.start" /> });
    await onOk({
      ...page.dataSource,
      ...data,
    });
    await progress.hide();
    setSaveModal(false);
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

  function onSortStart() {
    setIsSorting(true);
  }

  function onSortEnd({ oldIndex, newIndex }) {
    setIsSorting(false);
    setSelectedBlocks([...arrayMove(selectedBlocks, oldIndex, newIndex)]);
  }

  useSocket('adapter.page.create.status', ({ text, percent }) => {
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
          <SelectedBlocks
            helperClass={styles.blockIsDraging}
            blocks={selectedBlocks}
            onDelete={onDelete}
            onChange={onNameChange}
            useDragHandle
            lockAxis="y"
            onSortStart={onSortStart}
            onSortEnd={onSortEnd}
            isSorting={isSorting}
          />
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
