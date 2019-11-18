import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Select, Input, Loading } from '@alifd/next';
import upperCamelCase from 'uppercamelcase';
import cx from 'classnames';
import socket from '@src/socket';
import Modal from '@components/Modal';
import Icon from '@components/Icon';
import BlockCard from '@components/BlockCard';
import ActionStatus from '@components/ActionStatus';
import useModal from '@hooks/useModal';
import useSocket from '@hooks/useSocket';
import showMessage from '@utils/showMessage';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import stores from '@stores';
import SavePageModal from './SavePageModal';
import styles from './BuildPageModal.module.scss';

const DEFAULT_CATEGORY = '全部';

const MaterialSelect = ({ resources, onSelect }) => {
  const resource = resources[0];
  const [data, setData] = useState({
    categories: [],
    materials: { },
    category: DEFAULT_CATEGORY,
    source: resource.source,
    isLoading: false,
  });
  const { categories = [], materials = {}, category, source, isLoading } = data;

  function onSetCateogry(setName) {
    setData({
      ...data,
      category: setName,
    });
  }

  function setLoading(value) {
    setData({
      ...data,
      isLoading: value,
    });
  }

  async function fetchMaterialBlocks(url) {
    const { blocks } = await socket.emit('material.index.getOne', { url });
    return blocks;
  }

  async function onSourceChange(value) {
    setLoading(true);
    const blocks = await fetchMaterialBlocks(value);
    setData({
      ...data,
      ...blocks,
      category: DEFAULT_CATEGORY,
      source: value,
      isLoading: false,
    });
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const blocks = await fetchMaterialBlocks(source);
      setData({
        ...data,
        ...blocks,
        isLoading: false,
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
      <Loading visible={isLoading} className={styles.main}>
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
      </Loading>
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

const BuildPageModal = ({
  on, onCancel, onOk, page, intl,
}) => {
  const { blocks = [] } = page || {};
  const {
    on: onSaveModal,
    setModal: setSaveModal,
  } = useModal();
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [materialSources, setMaterialSources] = useState([]);
  const [progress, material, project] = stores.useStores(['progress', 'material', 'project']);
  useEffect(() => {
    material.getResources({ type: project.dataSource.type });
  }, []);
  const { dataSource } = material;
  const { resource } = dataSource;
  const newMaterialSources = resource.official
    .concat(resource.custom)
    .filter(item => item.type === project.dataSource.type);
  if (newMaterialSources.length !== materialSources.length) {
    setMaterialSources(newMaterialSources);
  }

  function onCloseSaveModal() {
    setSaveModal(false);
  }

  async function onCreateOk() {
    // If has page, it is represented in edit mode
    if (page) {
      try {
        await onOk(selectedBlocks);
      } catch (error) {
        showMessage(error);
      }
    } else {
      setSaveModal(true);
    }
  }

  async function onSaveOk(data) {
    try {
      await onOk({
        blocks: selectedBlocks,
        ...data,
      });
    } catch (error) {
      showMessage(error);
    }

    setSaveModal(false);
  }

  function generateBlockName(value, count = 0) {
    const setName = upperCamelCase(value);
    const newName = !count ? setName : `${setName}${count}`;
    const isConflict = blocks.concat(selectedBlocks).some(({ name }) => upperCamelCase(name) === newName);
    if (isConflict) {
      return generateBlockName(setName, count + 1);
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

  const titleId = page ? 'iceworks.project.panel.page.update.title' : 'iceworks.project.panel.page.create.title';

  return (
    [
      <Modal
        title={<FormattedMessage id={titleId} />}
        visible={on}
        onCancel={onCancel}
        onOk={onCreateOk}
        key="createModal"
      >
        <div className={styles.wrap}>
          <div className={styles.main}>
            <div className={styles.existed}>
              {
                blocks.map(({ name }, index) => {
                  return (
                    <div key={index} className={styles.item}>
                      {name}
                    </div>
                  );
                })
              }
            </div>
            <SelectedBlocks
              helperClass={styles.blockIsDraging}
              blocks={selectedBlocks}
              onDelete={onDelete}
              onNameChange={onNameChange}
              useDragHandle
              lockAxis="y"
              onSortStart={onSortStart}
              onSortEnd={onSortEnd}
              isSorting={isSorting}
            />
          </div>
          <div className={styles.material}>
            {
              !material.getResources.error && materialSources.length ?
                <MaterialSelect
                  resources={materialSources}
                  onSelect={onSelect}
                /> :
                null
            }
            <ActionStatus
              store={stores}
              config={[
                {
                  storeName: 'material',
                  actions: [
                    {
                      actionName: 'getResources',
                      showLoading: true,
                      showError: true,
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </Modal>,
      <SavePageModal
        on={onSaveModal}
        onCancel={onCloseSaveModal}
        onOk={onSaveOk}
        intl={intl}
        key="saveModal"
      />,
    ]
  );
};

BuildPageModal.defaultProps = {
  page: null,
};

BuildPageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  page: PropTypes.object,
};

export default injectIntl(BuildPageModal);
