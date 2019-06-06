import { useState } from 'react';

function useModal(bool = false) {
  const [on, setOn] = useState(bool);
  const [loading, setLoading] = useState(false);
  const showModal = () => setOn(true);
  const hideModal = () => setOn(false);
  const toggleModal = () => setOn(!on);
  const setModal = (value) => setOn(value);
  return {
    on,
    showModal,
    hideModal,
    toggleModal,
    setModal,
    loading,
    setLoading,
  };
}

export default useModal;
