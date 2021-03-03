export type ProjectType = 'js' | 'ts';

export type useValue = (...args: any) => any;

export interface Hooks {
  [key: string]: useValue;
}
