import { isWeb, isWeex, isKraken } from 'universal-env';

if (isWeb) {
  console.log('This is web');
} else if (isWeex) {
  console.log('This is weex');
} else {
  console.log('others1');
}

if (isKraken) {
  console.log('This is kraken');
} else {
  console.log('others2');
}

