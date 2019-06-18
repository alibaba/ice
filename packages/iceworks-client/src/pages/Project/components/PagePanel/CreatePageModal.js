import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
// TODO
const pageData = {
  blocks: mockData.blocks,
  layout: mockData.layout,
};

const MaterialSelect = ({ name, source }) => {
  const [data, setData] = useState({ categories: [], materials: { all: [] } });
  useEffect(() => {
    (async () => {
      const { blocks } = await socket.emit('material.index.getOne', { url: source });
      setData(blocks);
    })();
  }, []);

  const { categories = [], materials = {} } = data;

  return (
    <div>
      <div>
        {name}
      </div>
      <div>
        {
          materials.all.map((dataSource) => {
            return (
              <BlockCard dataSource={dataSource} />
            );
          })
        }
      </div>
    </div>
  );
};

MaterialSelect.propTypes = {
  name: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};

const CreatePageModal = ({
  on, onCancel, onOk,
}) => {
  const {
    on: onSaveModal,
    toggleModal: toggleSaveModal,
  } = useModal();
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
    page.setData(pageData);
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
          <div className={styles.page}>
            selectedBlocks
          </div>
          <div className={styles.material}>
            {materialSources.map((source, index) => {
              return (
                <MaterialSelect {...source} key={index} />
              );
            })}
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
