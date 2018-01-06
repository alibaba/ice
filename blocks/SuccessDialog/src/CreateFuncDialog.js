'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// 包装 Dialog 类组件，使其支持 show、hide 这种命令式调用
const CreateFuncDialog = WrapperElement => {
  let instance = null;
  let container = null;
  let dialog = null;
  return class HOCDialog extends React.Component {
    static show = (props = {}) => {
      if (dialog) {
        dialog.setState({ visible: true });
      } else if (!instance && !container) {
        // 创建并打开一个弹窗，并传入初始化的 props
        // 如果已经有实例打开了，则不会继续打开
        container = document.createElement('div');
        document.body.appendChild(container);
        instance = ReactDOM.render(
          <WrapperElement {...props} visible={true} />,
          container
        );
      }
    };

    static hide = () => {
      if (instance && container) {
        instance.setState({ visible: false }, () => {
          setTimeout(() => {
            ReactDOM.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
            container = null;
            instance = null;
          }, 300);
        });
      }
    };
    handleClose = () => {
      dialog.setState({ visible: false });
    };
    render() {
      return (
        <WrapperElement
          ref={dialogRef => {
            dialog = dialogRef;
          }}
          onClose={this.handleClose}
          onCancel={this.handleClose}
          {...this.props}
        />
      );
    }
  };
};

export default CreateFuncDialog;
