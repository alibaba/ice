/* eslint arrow-parens:0, function-paren-newline: 0 */
import { useMappedState, useDispatch } from '@src/store';
import { useCallback } from 'react';

const useMaterial = (value = [], action) => {
  const { data } = useMappedState(
    useCallback((state) => ({ data: state }), []),
  );

  const dispatch = useDispatch();
  const onChange = useCallback(() => dispatch(action), value);

  return { data, onChange };
};

export default useMaterial;
