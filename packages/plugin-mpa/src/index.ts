import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = ({ context, applyMethod, registerUserConfig, modifyUserConfig }) => {
  const { rootDir, userConfig } = context;

  if (userConfig.mpa) {
    const pages = applyMethod('getPages', rootDir);
  
    const mpaEntry = {};
    pages.forEach((pageName) => {
      const entryName = pageName.toLocaleLowerCase();
      mpaEntry[entryName] = `src/pages/${pageName}/app`;
    });
    // modify entry
    modifyUserConfig('entry', mpaEntry);
  }
  
  // register mpa in build.json
  registerUserConfig({
    name: 'mpa',
    validation: 'boolean',
  });
};

export default plugin;