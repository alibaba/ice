import { useState } from 'react';

function useModal(bool = false) {
  const [on, setOn] = useState(bool);
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
  };
}

export default useModal;
