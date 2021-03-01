import { useEffect, useRef, useMemo } from 'react';

interface ExecutorProps {
  useValue: () => any;
  onUpdate: (val: any) => void;
  namespace: string;
}

export default function(props: ExecutorProps) {
  const { useValue, onUpdate, namespace } = props;

  const updateRef = useRef(onUpdate);
  updateRef.current = onUpdate;
  const initialLoad = useRef(false);

  let data: any;
  try {
    data = useValue();
  } catch (e) {
    console.error(`Invoking '${namespace || 'unknown'}' hooks failed:`, e);
  }

  useMemo(() => {
    updateRef.current(data);
    initialLoad.current = false;
  }, []);

  useEffect(() => {
    if (initialLoad.current) {
      updateRef.current(data);
    } else {
      initialLoad.current = true;
    }
  });

  return null;
};
