import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tree, Icon } from '@alifd/next';
import cx from 'classnames';
import cloneDeep from 'lodash.clonedeep';

import traverse from '../../utils/traverse';
import styles from './index.module.scss';
import './index.scss';

const { Node: TreeNode } = Tree;

const NavigationTreeConfig = ({
  items,
  primaryKey,
  onChange,
  onOpenEditModal,
  onDeleteLink,
}) => {
  const [selectedKey] = useState([], '');

  function onEdit(linkType, item) {
    onOpenEditModal({
      action: 'edit',
      formData: {
        ...item,
        linkType,
      },
    });
  }

  function onDelete(item) {
    onDeleteLink(item);
  }

  const renderRightIcons = (item) => {
    let linkType;

    if (Array.isArray(item.children)) {
      linkType = 'linkGroup';
    } else if (item.external) {
      linkType = 'externalLink';
    } else {
      linkType = 'link';
    }
    return (
      <div className="navbar-config-tree-set-icon">
        <Icon
          type="edit"
          title="编辑"
          size="xs"
          className={styles.icon}
          onClick={() => onEdit(linkType, item)}
        />
        <Icon
          type="ashbin"
          size="xs"
          title="删除"
          onClick={() => onDelete(item)}
        />
      </div>
    );
  };

  const loopRenderNodeElement = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            key={item[primaryKey]}
            label={(
              <span
                className={cx({
                  'navbar-config-tree-node-click': selectedKey === item[primaryKey],
                })}
              >
                <span>{item.name}</span>
                {renderRightIcons(item)}
              </span>
            )}
          >
            {item.children.length > 0 ? loopRenderNodeElement(item.children) : (
              <TreeNode
                style={{
                  display: 'none',
                }}
              />
            )}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item[primaryKey]}
          label={(
            <span
              className={cx({
                'navbar-config-tree-node-click': selectedKey === item[primaryKey],
              })}
            >
              <span>{item.name}</span>
              {renderRightIcons(item)}
            </span>
          )}
        />
      );
    });
  };

  const onDrop = (info) => {
    if (!info.dragNode) {
      return;
    }

    const {
      dropPosition,
      dragNode: {
        props: dragProps,
      },
      node: {
        props: dropProps,
      },
    } = info;
    const { eventKey: dragKey } = dragProps;
    const { eventKey: dropKey } = dropProps;
    const data = cloneDeep(items);

    let dragNode;
    traverse(data, (node, array, index) => {
      if (node[primaryKey] === dragKey) {
        array.splice(index, 1);
        dragNode = node;
      }
    }, true);

    traverse(data, (node, array, index) => {
      const cacheNode = node;
      if (cacheNode[primaryKey] === dropKey) {
        if (dropPosition === 0) {
          // 外链不能有子节点
          if (cacheNode.external) {
            array.splice(index + 1, 0, dragNode);
          } else {
            cacheNode.children = cacheNode.children || [];
            cacheNode.children.push(dragNode);
          }
        } else if (dropPosition === -1) {
          array.splice(index, 0, dragNode);
        } else {
          array.splice(index + 1, 0, dragNode);
        }
        return true;
      }
      return false;
    }, true);

    onChange(data);
  };

  /**
   * hide/show navigation
   */
  const onCheck = (checkedKeys, extra) => {
    const { checked, node: nodeItem } = extra;
    const { eventKey } = nodeItem.props;
    const data = cloneDeep(items);

    traverse(data, (node) => {
      const cacheNode = node;
      if (cacheNode[primaryKey] === eventKey) {
        cacheNode.hide = !checked;
        return true;
      }
      return false;
    }, true);

    onChange(data);
  };

  return (
    <div>
      <Tree
        draggable
        selectable
        defaultExpandAll
        checkStrictly
        onDrop={onDrop}
        onCheck={onCheck}
        className="navbarConfigPanelTree"
      >
        {loopRenderNodeElement(items)}
      </Tree>
    </div>
  );
};

NavigationTreeConfig.defaultProps = {
  primaryKey: 'id',
  items: [],
  onChange: () => {},
  onOpenEditModal: () => {},
  onDeleteLink: () => {},
};

NavigationTreeConfig.propTypes = {
  /**
   * primary key
   */
  primaryKey: PropTypes.string,
  /**
   * navigation data
   */
  items: PropTypes.array,
  /**
   * on navigation data change
   */
  onChange: PropTypes.func,

  /**
   * open edit modal
   */
  onOpenEditModal: PropTypes.func,

  /**
   * delete link
   */
  onDeleteLink: PropTypes.func,
};

export default NavigationTreeConfig;
