import type { ReactElement } from 'react';

type ChildrenElement<T> = ChildrenElement<T>[] | T;

// Mocked `Rax.shared`.
const shared = {
  get Element(): any {
    warningCompat('shared.Element');
    return null;
  },
  get Host(): any {
    warningCompat('shared.Host');
    return null;
  },
  get Instance(): any {
    warningCompat('shared.Instance');
    return null;
  },
  flattenChildren,
};

function warningCompat(message: string) {
  let stack: string;
  try {
    throw new Error(`You are not allowed to use ${message}.`);
  } catch (error) {
    stack = error.stack;
  }
  console.error(`[RaxCompat] ${stack}`);
}

function flattenChildren(children: ChildrenElement<ReactElement>) {
  if (children == null) {
    return children;
  }

  const result: ReactElement[] = [];
  // If length equal 1, return the only one.
  traverseChildren(children, result);

  return result.length - 1 ? result : result[0];
}

function traverseChildren(children: ChildrenElement<ReactElement>, result: ReactElement[]) {
  if (Array.isArray(children)) {
    for (let i = 0, l = children.length; i < l; i++) {
      traverseChildren(children[i], result);
    }
  } else {
    result.push(children);
  }
}

export default shared;
