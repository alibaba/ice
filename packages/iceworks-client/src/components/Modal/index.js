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

  return createPortal(<Dialog {...props}>{children}</Dialog>, modalRef.current);
};

export default Modal;
