import { EMPTY_OBJ } from '@ice/shared';
import React from 'react';

interface ReactMeta {
  PageContext: React.Context<string>;
  R: typeof React;
}

export const reactMeta: ReactMeta = {
  PageContext: EMPTY_OBJ,
  R: React,
};
