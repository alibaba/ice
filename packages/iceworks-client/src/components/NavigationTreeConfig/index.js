import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tree, Button, Dialog, Icon, Balloon, Menu, Message } from '@alifd/next';
import cn from 'classnames';
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
  const treeData = items;

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
                className={cn({
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
              className={cn({
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

    const { dropPosition } = info;
    const dragProps = info.dragNode.props;
    const dropProps = info.node.props;
    const { eventKey: dragKey } = dragProps;
    const { eventKey: dropKey } = dropProps;
    const data = cloneDeep(treeData);

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
   * 选择隐藏、显示导航
   */
  const onCheck = (checkedKeys, extra) => {
    const { checked, node: nodeItem } = extra;
    const { eventKey } = nodeItem.props;
    const data = cloneDeep(treeData);

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
        // checkable
        draggable
        selectable
        defaultExpandAll
        // checkedKeys={checkedKeys}
        checkStrictly
        onDrop={onDrop}
        onCheck={onCheck}
        className="navbar-config-panel-tree"
      >
        {loopRenderNodeElement(treeData)}
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
   * 主键，通常用 id
   */
  primaryKey: PropTypes.string,
  /**
   * 导航数据
   */
  items: PropTypes.array,
  /**
   * 导航数据发生变化时调用
   */
  onChange: PropTypes.func,

  onOpenEditModal: PropTypes.func,
  onDeleteLink: PropTypes.func,
};

export default NavigationTreeConfig;
