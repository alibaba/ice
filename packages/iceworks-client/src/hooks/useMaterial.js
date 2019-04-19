/* eslint arrow-parens:0, function-paren-newline: 0 */
import { useMappedState, useDispatch } from '@src/store';
import { useCallback } from 'react';

const useMaterial = () => {
  const { data } = useMappedState(
    useCallback((state) => ({ data: state }), []),
  );

  const dispatch = useDispatch();
  const onChange = useCallback(() => dispatch({ type: 'CHANGE', text: 'Use Hooks' }), []);

  return { data, onChange };
};

export default useMaterial;
