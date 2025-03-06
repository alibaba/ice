
import {
  index,
  layout,
  physical,
  rootRoute,
  route,
} from '@tanstack/virtual-file-routes';

export default rootRoute('', [
  index('index.tsx'), route('home', 'home.tsx'),
]);
