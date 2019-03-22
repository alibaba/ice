const fs = require('fs');
const path = require('path');
const glob = require('glob');
const markTwain = require('mark-twain');
const { cut } = require('./participle');

const destDir = path.join(__dirname, '../build');
const dest = path.join(destDir, 'docs.json');
const sourceDir = path.join(__dirname, '../docs');

// 与目录对应，补全目录的顺序以及展示 title
const allCategories = [
  {
    dir: 'basis',
    title: '基础',
  },
  {
    dir: 'advanced',
    title: '高级',
  },
  {
    dir: 'iceworks',
    title: '物料',
  },
  {
    dir: 'pro',
    title: 'pro',
  },
  {
    dir: 'others',
    title: '其他',
  },

  // 单独页面展示设计文档
  {
    dir: 'design',
    title: '设计',
    children: [
      {
        dir: 'vision',
        title: '视觉',
      },
      {
        dir: 'mode',
        title: '模式',
      },
    ],
  },
];

const result = [];
collectCategoryData(allCategories);

function collectCategoryData(categories, parentCategory) {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const dirPath = path.resolve(
      process.cwd(),
      'docs',
      parentCategory ? parentCategory.dir : '',
      category.dir
    );

    if (category.children && category.children.length > 0) {
      collectCategoryData(category.children, category);
    }
  }
}

glob(
  '**/*.md',
  {
    nodir: true,
    ignore: 'README.md',
    cwd: sourceDir,
  },
  (err, files) => {
    if (err) {
      throw err;
    }

    const result = {};

    files.forEach((file) => {
      const fileParts = file.split('/');
      let grandParent;
      let parent;
      let filename;

      if (fileParts.length > 3) {
        throw new Error(`目录最多支持三层！${file}`);
      }

      if (fileParts.length === 3) {
        grandParent = fileParts[0];
        parent = fileParts[1];
        filename = fileParts[2];
      } else if (fileParts.length === 2) {
        parent = fileParts[0];
        filename = fileParts[1];
      } else {
        filename = fileParts[0];
      }

      console.log(file, fileParts, grandParent, parent, filename);
      const content = fs.readFileSync(path.join(sourceDir, file), 'utf-8');

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

      const sourceData = {
        filename: file,
        path: file.replace(/\.md$/, ''),
        // ...jsonML.meta,
        participle,

        // jsonml: jsonML.content,
      };

      if (grandParent) {
        result[grandParent] = result[grandParent] || {};
        result[grandParent][parent] = result[grandParent][parent] || {};
        result[grandParent][parent].children = result[grandParent][parent].children || [];
        result[grandParent][parent].children.push(sourceData);
      } else if (parent) {
        result[parent] = result[parent] || {};
        result[parent].children = result[parent].children || [];
        result[parent].children.push(sourceData);
      } else {
        result.children = result.children || [];
        result.children.push(sourceData);
      }
    });

    fs.writeFileSync(dest, JSON.stringify(result, null, 2), 'utf-8');
    console.log('文档数据生成完毕. Docs DB Generated.');
    console.log(dest);
  }
);

/**
 * 从 jsonml 结构中获取纯字符串
 */
function getJsonmlString(jsonml) {
  let result = '';
  for (let i = 1; i < jsonml.length; i++) {
    if (Array.isArray(jsonml[i])) {
      result += getJsonmlString(jsonml[i]);
    } else if (typeof jsonml[i] === 'string') {
      result += jsonml[i] + ' ';
    }
  }
  return result;
}
