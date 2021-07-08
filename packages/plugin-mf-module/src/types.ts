export interface Json<T> {
  [index: string]: T;
}

export interface ModuleFederation {
  name?: string;
  exposes: Json<string>;
  library?: Record<'type' | 'name', string>
  filename?: string;
}
