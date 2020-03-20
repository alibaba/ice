export interface IInitialStates {
  [key: string]: any;
}

export interface IStore {
  initialStates?: IInitialStates;
  getInitialStates?: (initialData) => IInitialStates;
}
