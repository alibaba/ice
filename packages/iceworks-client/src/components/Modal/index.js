import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Dialog } from '@alifd/next';

const Modal = ({ children, ...props }) => {
  const modalRef = useRef(null);

  if (!modalRef.current) {
    modalRef.current = document.createElement('div');
  }

  useEffect(() => {
    document.body.appendChild(modalRef.current);
    return () => {
      document.body.removeChild(modalRef.current);
    };
  });

  const { onCancel } = props;

  return createPortal(
    <Dialog {...props} onCancel={onCancel} onClose={onCancel}>
      {children}
    </Dialog>,
    modalRef.current,
  );
};

export default Modal;
