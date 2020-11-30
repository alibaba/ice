const path = require('path');
const glob = require('glob');
const { existsSync } = require('fs-extra');

const htmlContent = {};
const HTML_POSITIONS = {
  headAppend: {
    defaultValue: [],
    type: 'array',
  },
  headPrepend: {
    defaultValue: [],
    type: 'array',
  },
  bodyAppend: {
    defaultValue: [],
    type: 'array',
  },
  bodyPrepend: {
    defaultValue: [],
    type: 'array',
  },
  htmlAttrs: {
    defaultValue: '',
    type: 'object',
  },
  headAttrs: {
    defaultValue: '',
    type: 'object',
  },
  bodyAttrs: {
    defaultValue: '',
    type: 'object',
  },
  rootContainer: {
    defaultValue: [],
    type: 'string',
  },
};
const TAGS_INFO = {
  'meta': {
    selfClosing: true,
  },
  'title': {},
  'link': {
    selfClosing: true,
  },
  'style': {},
  'script': {},
};

function injectHTML(callback, position) {
  if (!Object.keys(HTML_POSITIONS).includes(position)) {
    console.warn('[user config]', `unknown position ${position}.`);
  }
  // store html content added by applyMethod
  htmlContent[position] = callback(htmlContent[position]);
}

function parseHTMLContent(content) {
  if (Object.prototype.toString.call(content) === '[object Object]') {
    const { tag, innerHTML, tagId, ...attrs } = content;
    const { selfClosing } = TAGS_INFO[tag];
    const attrStr = parseHTMLAttrs(attrs);
    return selfClosing && !innerHTML ? `<${tag}${attrStr}/>` : `<${tag}${attrStr}>${innerHTML}</${tag}>`;
  }
  return content;
}

function parseHTMLAttrs(attrs) {
  const attrKeys = Object.keys(attrs);
  return attrKeys.length ? ` ${attrKeys.map(attrKey => `${attrKey}="${attrs[attrKey]}"`).join(' ')}` : '';
}

function getHTMLParams() {
  const htmlParams = {};
  Object.keys(htmlContent).forEach((htmlPosition) => {
    const htmlTags = htmlContent[htmlPosition];
    htmlParams[htmlPosition] = Array.isArray(htmlTags) ? htmlTags.map(htmlTag => parseHTMLContent(htmlTag)).join('\n') : parseHTMLContent(htmlTags);
  });
  return htmlParams;
}

function modifyHTMLPluginOptions(config, pluginName, options, params) {
  if (config.plugins.get(pluginName)) {
    // spa HtmlWebpackPlugin
    config.plugin(pluginName).tap(([args]) => {
      const defaultValues = {};
      Object.keys(HTML_POSITIONS).forEach((positionKey) => {
        defaultValues[positionKey] = HTML_POSITIONS[positionKey].defaultValue;
      });
      const pluginOptions = {
        ...args,
        templateParameters: {
          ...(args.templateParameters || {}),
          ...defaultValues, // default value of html positions
          ...params,
        },
        ...options,
      };
      return [pluginOptions];
    });
  }
}

function configHTMLPlugin(config, context) {
  const { userConfig } = context;
  const htmlParams = getHTMLParams();
  const htmlPluginOptions = {
    template: path.join(__dirname, '../template/index.html'),
    inject: false,
  };
  const { entry } = userConfig;
    // mpa HtmlWebpackPlugin
  if (Object.prototype.toString.call(entry) === '[object Object]' && Object.keys(entry).length > 1)  {
    // delete multi HtmlWebpackPlugin
    Object.keys(entry).forEach((entryKey) => {
      const pluginName = `HtmlWebpackPlugin_${entryKey}`;
      modifyHTMLPluginOptions(config, pluginName, htmlPluginOptions, htmlParams);
    });
  } else {
    modifyHTMLPluginOptions(config, 'HtmlWebpackPlugin', htmlPluginOptions, htmlParams);
  }
}

// init htmlInjection
exports.init = (api) => {
  const { registerMethod, context, onGetWebpackConfig } = api;
  const { rootDir, userConfig } = context;

  registerMethod('injectHTML', injectHTML);
  const isExsitsHtml = existsSync(path.resolve(rootDir, 'public/index.html'));
  const isExsitsDocument = glob.sync('src/document/index.*', { path: rootDir } ).length > 0;
  // init htmlInjection added by plugin
  if (userConfig.htmlInjection || (!isExsitsHtml && !isExsitsDocument)) {
    onGetWebpackConfig((config) => {
      configHTMLPlugin(config, context);
    });
  }
};

exports.configWebpack = (config, options, context) => {
  if (options) {
    Object.keys(options).forEach((optionKey) => {
      if (HTML_POSITIONS[optionKey]) {
        const { type } = HTML_POSITIONS[optionKey];
        const value = options[optionKey];
        if (type === 'array') {
          const newValue = [];
          // overwrite content by tagId / unique tag
          value.forEach((tagInfo) => {
            const { tagId, tag } = tagInfo;
            let index = null;
            if (tag === 'title') {
              index = htmlContent[optionKey].findIndex(item => item.tag === tag);
            } else if (tagId) {
              index = htmlContent[optionKey].findIndex(item => item.tagId === tagId);
            }

            if (index > -1) {
              htmlContent[optionKey][index] = tagInfo;
            } else {
              newValue.push(tagInfo);
            }
          });
          htmlContent[optionKey] = (htmlContent[optionKey] || []).contact(newValue);
        } else if (type === 'object') {
          htmlContent[optionKey] = {
            ...(htmlContent[optionKey] || {}),
            ...value,
          };
        } else {
          htmlContent[optionKey] = value;
        }
      }
    });
    configHTMLPlugin(config, context);
  }
};
