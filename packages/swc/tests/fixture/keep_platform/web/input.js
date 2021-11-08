import { isWeb, isWeex } from 'universal-env';

if (isWeb) {
  console.log('This is web');
} else if (isWeex) {
  console.log('This is weex');
} else {
  console.log('others');
}

