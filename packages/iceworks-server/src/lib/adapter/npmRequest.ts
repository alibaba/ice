export interface IParams {
  name: string;
  version: string;
  registry: string;
}

export default async (params: IParams): Promise<{ dist: { tarball: string }, dependencies: any }> => {
  return {
    dist: {
      tarball: ''
    },
    dependencies: {}
  };
}