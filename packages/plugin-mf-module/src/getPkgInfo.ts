import { Json } from './types';

const formatPkgName = (name: string) => {
  return name.replace(/[@\-/]/g, '_');
};

const getPkgInfo =
  (pkg: any): {
    pkgName: string,
    dependencies: Json<string>,
  } => {
    const { name = 'mfModule', dependencies = {} } = pkg;

    return {
      pkgName: formatPkgName(name as string),
      dependencies,
    };
  };

export default getPkgInfo;
