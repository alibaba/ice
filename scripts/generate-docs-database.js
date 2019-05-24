/**
 * 生成文档数据
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const markTwain = require('mark-twain');
const fse = require('fs-extra');
const rimraf = require('rimraf');
const { cut } = require('./participle');

const projectDir = path.resolve(__dirname, '..');
const docsDir = path.resolve(__dirname, '../docs');
const destDir = path.join(__dirname, '../build');

rimraf.sync(destDir);
fse.ensureDirSync(destDir);

// 与目录对应，补全目录的顺序以及展示 title
const allCategories = {
  guide: {
    title: {},
    children: [{
      title: {
        'zh-cn': '开发',
        'en-us': 'development',
      },
      dir: 'dev',
    }, {
      title: {
        'zh-cn': '测试',
        'en-us': 'test',
      },
      dir: 'test',
    }, {
      title: {
        'zh-cn': '发布资源',
        'en-us': 'publish assets',
      },
      dir: 'publish',
    }, {
      title: {
        'zh-cn': '后端集成',
        'en-us': 'backend',
      },
      dir: 'backend',
    }, {
      title: {
        'zh-cn': '产品监控',
        'en-us': 'monitor',
      },
      dir: 'monitor',
    }, {
      title: {
        'zh-cn': '资源',
        'en-us': 'resource',
      },
      dir: 'resource',
    }],
  },
  iceworks: {
    // Iceworks
    title: {},
  },
  materials: {
    // 自定义物料
    title: {},
  },
  cli: {
    // ice-scripts
    title: {},
    children: [{
      title: {
        'zh-cn': '基础指南',
        'en-us': 'basic',
      },
      dir: 'basic',
    }, {
      title: {
        'zh-cn': '进阶指南',
        'en-us': 'advanced',
      },
      dir: 'advanced',
    }, {
      title: {
        'zh-cn': '常见需求',
        'en-us': 'others',
      },
      dir: 'others',
    }],
  },
  design: {
    // 中后台设计理念
    title: {},
    children: [
      {
        title: {
          'zh-cn': '视觉',
          'en-us': 'vision',
        },
        dir: 'vision',
      },
      {
        title: {
          'zh-cn': '设计模式',
          'en-us': 'mode',
        },
        dir: 'mode',
      },
    ],
  },
};

Object.keys(allCategories).forEach((key) => {
  const category = allCategories[key];
  generateFile(category, key);
});

function generateFile(category, name) {
  ['zh-cn', 'en-us'].forEach((locale) => {
    const filename = `${name}-${locale}.json`;
    const destfile = path.join(destDir, filename);
    const baseDir = path.join(docsDir, name, locale === 'zh-cn' ? '' : locale);

    const docsData = collectCategoryData(category, baseDir, locale);
    fs.writeFileSync(destfile, JSON.stringify(docsData, null, 2), 'utf-8');
    console.log('generateFile', destfile);
  });
}

function collectCategoryData(category, baseDir, locale) {
  const result = {};

  result.title = category.title[locale];
  result.dir = category.dir;
  result.files = getDirFiles(baseDir);
  result.children = [];

  (category.children || []).forEach((child) => {
    const data = {};
    data.title = child.title[locale];
    data.dir = child.dir;
    data.files = getDirFiles(path.join(baseDir, child.dir));
    result.children.push(data);
  });

  return result;
}

function getDirFiles(dirPath) {
  const files = glob.sync('*.md', {
    nodir: true,
    cwd: dirPath,
  });

  let dirFilesData = [];
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // /docs/cli/en-us/basic/start.md -> /docs/cli/basic/start.md
    content = content.replace('/en-us', '');
    const jsonML = markTwain(content);

    // 隐藏文档过滤
    if (jsonML.meta.hide) {
      return;
    }

    if (!jsonML.meta.title) {
      throw new Error(`${file} 缺失标题, 请补充`);
    }

    // 分词 payload
    const participle = {
      title: cut(jsonML.meta.title),
      content: cut(content),
    };

    dirFilesData.push({
      filename: file,
      path: filePath.replace(projectDir, '').replace(/\.md$/, '').replace('/en-us', ''),
      ...jsonML.meta,
      participle,
      jsonml: jsonML.content,
    });
  });

  dirFilesData = dirFilesData.sort((pre, next) => {
    return pre.order - next.order;
  });

  return dirFilesData;
}
