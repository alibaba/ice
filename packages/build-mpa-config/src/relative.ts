import * as path from 'path';
import { formatPath } from '@builder/app-helpers';

export default function(from: string, to: string) {
  return formatPath(path.relative(from, to));
}
