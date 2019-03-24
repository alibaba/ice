const fs = require('fs');
const path = require('path');
const glob = require('glob');
const markTwain = require('mark-twain');
const { cut } = require('./participle');

const docsDir = path.resolve(__dirname, '../docs');
const destDir = path.join(__dirname, '../build');
const dest = path.join(destDir, 'docs.json');

// 与目录对应，补全目录的顺序以及展示 title
const allCategories = [
  {
    dir: 'docs',
    title: '',
    children: [
      {
        dir: 'basis',
        title: '入门指引',
      },
      {
        dir: 'advanced',
        title: '进阶指南',
      },
      {
        dir: 'iceworks',
        title: 'Iceworks',
      },
      {
        dir: 'materials',
        title: '物料',
      },
      {
        dir: 'pro',
        title: 'ICE Design Pro',
      },
      {
        dir: 'others',
        title: '其他',
      },

      // 单独页面展示设计文档
      {
        dir: 'design',
        title: '',
        children: [
          {
            dir: 'vision',
            title: '视觉',
          },
          {
            dir: 'mode',
            title: '设计模式',
          },
        ],
      },
    ],
  },
];

const result = collectCategoryData(allCategories, '')[0];
fs.writeFileSync(dest, JSON.stringify(result, null, 2), 'utf-8');
console.log('文档数据生成完毕. Docs DB Generated.');
console.log(dest);

function collectCategoryData(categories, parentDirPath) {
  const categoryResult = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const currentDirRelativePath = path.join(parentDirPath, category.dir);
    const currentDirAbsolutePath = path.resolve(
      process.cwd(),
      currentDirRelativePath
    );

    const data = {};
    data.title = category.title;
    data.dir = category.dir;
    data.files = getDirFiles(currentDirAbsolutePath);

    if (category.children && category.children.length > 0) {
      data.children = collectCategoryData(category.children, currentDirRelativePath);
    }

    categoryResult[i] = data;
  }

  return categoryResult;
}

function getDirFiles(dirPath) {
  const files = glob.sync('*.md', {
    nodir: true,
    ignore: 'README.md',
    cwd: dirPath,
  });

  console.log('getDirFiles', dirPath, files);

  let dirFilesData = [];
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
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
      path: filePath.replace(docsDir, '').replace(/\.md$/, ''),
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
