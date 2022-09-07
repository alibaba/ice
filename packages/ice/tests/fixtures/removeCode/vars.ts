import { a, z } from 'a';
import b from 'b';
import c from 'c';
import d from 'd';

const [e, f, ...rest] = a;
const { h, j } = b;
const [x, ...m] = c;
const zz = 'x';
const { k, l, ...s } = d;

export function getConfig() {
  return {
    x,
    k,
  };
}