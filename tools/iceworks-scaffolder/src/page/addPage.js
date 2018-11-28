const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const uppercamelcase = require('uppercamelcase');
const write = require('write');

const logger = require('../logger');
const ScaffoldResult = require('../ScaffoldResult');
const project = require('../project');
const material = require('../material');
const utils = require('../utils');
const { getClientFolderName } = require('../utils');

module.exports = async function({ cwd, name, blocks, preview, nodeFramework = '' }, { scaffoldRuntimeConfig }, interpreter) {
  const pageResult = new ScaffoldResult();
  await project.checkExists(cwd);

  const pageFolderName = name;
  const templateData = {
    name: name,
    upperName: uppercamelcase(pageFolderName),
    blocks: [],
  };

  const scaffoldTemplate = await project.getScaffoldTemplate(scaffoldRuntimeConfig.templates.pageFolder);

  logger.info('pageTemplateFiles', scaffoldTemplate.page);

  if (scaffoldTemplate.page.length == 0) {
    // 提示用户是否继续生成 EMTPY_PAGE_TEMPLATE
    const whetherContinue = await utils.createInterpreter('EMTPY_PAGE_TEMPLATE', {}, interpreter);

    if (!whetherContinue) {
      throw new Error('项目不存在模板文件，终止创建');
    }
  } else {
    templateData.blocks = material.getBlockComponentsPaths({
      cwd,
      name,
      blocks,
      preview,
    });
    logger.info('templateData', templateData);
    for (let file of scaffoldTemplate.page) {
      let templateContent = fs.readFileSync(file);
      templateContent = templateContent.toString();

      const outputTemplateContent = await ejs.render(templateContent, templateData, { async: true });

      let basename = path.basename(file).replace('.ejs', '');
      basename = material.parseFilename(basename, templateData);

      const pageOutput = './pages/' + pageFolderName;
      const clientFolder = getClientFolderName(nodeFramework);

      const outputFilePath = path.join(cwd, clientFolder, pageOutput, basename);
      logger.info('outputFilePath', outputFilePath);
      await write(outputFilePath, outputTemplateContent);

      pageResult.appendFiles(outputFilePath);
      pageResult.setOutput('page', pageOutput);
    }
  }
  return pageResult;
};
