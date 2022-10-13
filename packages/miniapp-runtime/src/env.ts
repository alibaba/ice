import { EMPTY_OBJ } from '@ice/shared';

import type { Document } from './dom/document.js';

interface Env {
  window;
  document: Document;
}

const env: Env = {
  window: EMPTY_OBJ,
  document: EMPTY_OBJ,
};

export default env;
