import { dynamic } from '@ice/runtime';

const Normal = dynamic(
  import('../../components/normal').then((mod) => {
    return {
      default: mod.NameExportComp,
    };
  }),
);

export default () => {
  return <Normal />;
};
