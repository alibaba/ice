/**
 * 这里我们需要关心的小程序种类有两类：
 * 1. 模板递归：
 *  - 支持：tmpl0 套 tmpl0
 *  - 不支持：这就使得我们必须生成多级的模板，tmpl0 套 tmpl1，tmpl1 套 tmpl2……
 *           直到超过阈值 N (N = config.miniapp.baseLevel) tmplN 会套组件 comp，组件 comp 重新再套 tmpl0。
 * 2. 小程序脚本语言（wxs, sjs, etc...）：
 *  - 支持：可以在模板使用函数缩减模板大小或提高性能（存疑），例如判断一个值是不是假值（falsy value）。
 *         将来或许会把数据序列化^1 的操作也放到小程序脚本语言里。
 *  - 不支持：使用纯 *xml 语法
 *
 * ^1: packages/miniapp-runtime/src/hydrate.ts
*/

import { isBooleanStringLiteral, isFunction, isNumber, isString } from '../is.js';
import { capitalize, hasOwn, indent, toCamelCase, toDashed, toKebabCase } from '../utils.js';
import {
  focusComponents,
  internalComponents,
  nestElements,
  singleQuote,
  voidElements,
} from './components.js';
import { Shortcuts } from './shortcuts.js';
import { getComponentsAlias } from './utils.js';

interface Component {
  nodeName: string;
  nodeAlias: string;
  attributes: Attributes;
}

interface Components {
  [key: string]: Record<string, string>;
}

interface ComponentConfig {
  includes: Set<string>;
  exclude: Set<string>;
  thirdPartyComponents: Map<string, Set<string>>;
  includeAll: boolean;
}

export interface IAdapter {
  if: string;
  else: string;
  elseif: string;
  for: string;
  forItem: string;
  forIndex: string;
  key: string;
  xs?: string;
  type: string;
}

export type Attributes = Record<string, string>;

export const styles = {
  style: `i.${Shortcuts.Style}`,
  class: `i.${Shortcuts.Class}`,
};

export const events = {
  bindtap: 'eh',
};

const weixinAdapter: IAdapter = {
  if: 'wx:if',
  else: 'wx:else',
  elseif: 'wx:elif',
  for: 'wx:for',
  forItem: 'wx:for-item',
  forIndex: 'wx:for-index',
  key: 'wx:key',
  xs: 'wxs',
  type: 'weapp',
};

export class BaseTemplate {
  protected exportExpr = 'module.exports =';
  protected isSupportRecursive: boolean;
  protected miniComponents: Components;
  protected thirdPartyPatcher: Record<string, Record<string, string>> = {};
  protected componentsAlias;
  protected modifyCompProps?: (compName: string, target: Record<string, string>) => Record<string, string>;
  protected modifyLoopBody?: (child: string, nodeName: string) => string;
  protected modifyLoopContainer?: (children: string, nodeName: string) => string;
  protected modifyTemplateResult?: (res: string, nodeName: string, level: number, children: string) => string;
  protected modifyThirdPartyLoopBody?: (child: string, nodeName: string) => string;
  public supportXS = false;
  public adapter = weixinAdapter;
  /** 组件列表 */
  public internalComponents = internalComponents;
  /** 可以 focus 聚焦的组件 */
  public focusComponents: Set<string> = focusComponents;
  /** 不需要渲染子节点的元素 */
  public voidElements: Set<string> = voidElements;
  /** 可以递归调用自身的组件 */
  public nestElements: Map<string, number> = nestElements;

  private buildAttribute(attrs: Attributes, nodeName: string): string {
    return Object.keys(attrs)
      .map(k => `${k}="${k.startsWith('bind') || k.startsWith('on') || k.startsWith('catch') ? attrs[k] : `{${this.getAttrValue(attrs[k], k, nodeName)}}`}" `)
      .join('');
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  protected replacePropName(name: string, value: string, _componentName?: string, _componentAlias?) {
    if (value === 'eh') return name.toLowerCase();
    return name;
  }

  protected createMiniComponents(components: Components) {
    const result: Components = Object.create(null);

    for (const key in components) {
      if (hasOwn(components, key)) {
        let component = components[key];
        const compName = toDashed(key);
        const newComp: Record<string, string> = Object.create(null);
        const componentAlias = this.componentsAlias[compName];

        if (isFunction(this.modifyCompProps)) {
          component = this.modifyCompProps(compName, component);
        }

        for (let prop in component) {
          if (hasOwn(component, prop)) {
            let propValue = component[prop];
            if (prop.startsWith('bind') || propValue === 'eh') {
              propValue = 'eh';
            } else if (propValue === '') {
              const propInCamelCase = toCamelCase(prop);
              const propAlias = componentAlias[propInCamelCase] || propInCamelCase;
              propValue = `i.${propAlias}`;
            } else if (isBooleanStringLiteral(propValue) || isNumber(+propValue)) {
              const propInCamelCase = toCamelCase(prop);
              const propAlias = componentAlias[propInCamelCase] || propInCamelCase;
              propValue = this.supportXS
                ? `xs.b(i.${propAlias},${propValue})`
                : `i.${propAlias}===undefined?${propValue}:i.${propAlias}`;
            } else {
              const propInCamelCase = toCamelCase(prop);
              const propAlias = componentAlias[propInCamelCase] || propInCamelCase;
              propValue = `i.${propAlias}||${propValue || singleQuote('')}`;
            }

            prop = this.replacePropName(prop, propValue, compName, componentAlias);

            newComp[prop] = propValue;
          }
        }
        if (compName !== 'block') {
          Object.assign(newComp, styles, this.getEvents());
        }

        if (compName === 'swiper-item') {
          delete newComp.style;
        }

        if (compName === 'view') {
          const reg = /^(bind|on)(touchmove|TouchMove)$/;
          const comp = { ...newComp };
          Object.keys(comp).forEach(originKey => {
            if (!reg.test(originKey)) return;

            const key = originKey.replace(reg, 'catch$2');
            comp[key] = comp[originKey];
            delete comp[originKey];
          });

          result['catch-view'] = comp;
        }

        if (compName === 'view' || compName === 'text' || compName === 'image') {
          const comp: Record<any, any> = {};
          Object.keys(newComp).forEach(key => {
            const value = newComp[key];
            if (value !== 'eh') comp[key] = value;
          });
          result[`static-${compName}`] = comp;
          if (compName === 'view') {
            result['pure-view'] = {
              style: comp.style,
              class: comp.class,
            };
          }
        }

        if (compName === 'slot' || compName === 'slot-view') {
          result[compName] = {
            slot: newComp?.name,
            ...styles,
          };
        } else {
          result[compName] = newComp;
        }
      }
    }

    return result;
  }

  protected buildBaseTemplate() {
    const { adapter } = this;

    const data = !this.isSupportRecursive && this.supportXS
      ? `${this.dataKeymap('i:item,l:\'\'')}`
      : this.dataKeymap('i:item');

    return `${this.buildXsTemplate()}
<template name="ice_tmpl">
  <block ${adapter.for}="{{root.cn}}" ${adapter.key}="sid">
    <template is="tmpl_0_${Shortcuts.Container}" data="{{${data}}}" />
  </block>
</template>
`;
  }

  protected buildThirdPartyAttr(attrs: Set<string>, patcher: Record<string, string> = {}) {
    return Array.from(attrs).reduce((str, attr) => {
      if (attr.startsWith('@')) {
        // vue2
        let value = attr.slice(1);
        if (value.indexOf('-') > -1) {
          value = `:${value}`;
        }
        return `${str}bind${value}="eh" `;
      } else if (attr.startsWith('bind')) {
        return `${str}${attr}="eh" `;
      } else if (attr.startsWith('on')) {
        // react, vue3
        let value = toKebabCase(attr.slice(2));
        if (value.indexOf('-') > -1) {
          // 兼容如 vant 某些组件的 bind:a-b 这类属性
          value = `:${value}`;
        }
        return `${str}bind${value}="eh" `;
      } else if (attr === 'class') {
        return `${str}class="{{i.${Shortcuts.Class}}}" `;
      } else if (attr === 'style') {
        return `${str}style="{{i.${Shortcuts.Style}}}" `;
      }

      const patchValue = patcher[attr];
      if (isBooleanStringLiteral(patchValue) || isNumber(patchValue) || isString(patchValue)) {
        const propValue = this.supportXS
          ? `xs.b(i.${toCamelCase(attr)},${patchValue})`
          : `i.${toCamelCase(attr)}===undefined?${patchValue}:i.${toCamelCase(attr)}`;
        return `${str}${attr}="{{${propValue}}}" `;
      }
      return `${str}${attr}="{{i.${toCamelCase(attr)}}}" `;
    }, '');
  }

  protected buildComponentTemplate(comp: Component, level: number) {
    return this.focusComponents.has(comp.nodeName)
      ? this.buildFocusComponentTemplte(comp, level)
      : this.buildStandardComponentTemplate(comp, level);
  }

  private getChildren(comp: Component, level: number): string {
    const { isSupportRecursive, adapter, supportXS } = this;
    const nextLevel = isSupportRecursive ? 0 : level + 1;

    const data = !this.isSupportRecursive && supportXS
      ? `${this.dataKeymap('i:item,l:l')}`
      : this.dataKeymap('i:item');

    let child = supportXS
      ? `<template is="{{xs.e(${isSupportRecursive ? 0 : 'cid+1'})}}" data="{{${data}}}" />`
      : `<template is="tmpl_${nextLevel}_${Shortcuts.Container}" data="{{${data}}}" />`;

    if (isFunction(this.modifyLoopBody)) {
      child = this.modifyLoopBody(child, comp.nodeName);
    }

    let children = this.voidElements.has(comp.nodeName)
      ? ''
      : `
    <block ${adapter.for}="{{i.${Shortcuts.Childnodes}}}" ${adapter.key}="sid">
      ${indent(child, 6)}
    </block>
  `;

    if (isFunction(this.modifyLoopContainer)) {
      children = this.modifyLoopContainer(children, comp.nodeName);
    }

    return children;
  }

  protected buildFocusComponentTemplte(comp: Component, level: number) {
    const children = this.getChildren(comp, level);
    const { nodeName } = comp;
    const { nodeAlias } = comp;
    const attrs = { ...comp.attributes };
    const templateName = this.supportXS
      ? `xs.c(i, 'tmpl_${level}_')`
      : `i.focus ? 'tmpl_${level}_${nodeAlias}_focus' : 'tmpl_${level}_${nodeAlias}_blur'`;
    delete attrs.focus;

    let res = `
<template name="tmpl_${level}_${nodeAlias}">
  <template is="{{${templateName}}}" data="{{${this.dataKeymap('i:i')}${children ? ',cid:cid' : ''}}}" />
</template>

<template name="tmpl_${level}_${nodeAlias}_focus">
  <${nodeName} ${this.buildAttribute(comp.attributes, nodeName)} id="{{i.uid||i.sid}}" data-sid="{{i.sid}}">${children}</${nodeName}>
</template>

<template name="tmpl_${level}_${nodeAlias}_blur">
  <${nodeName} ${this.buildAttribute(attrs, nodeName)} id="{{i.uid||i.sid}}" data-sid="{{i.sid}}">${children}</${nodeName}>
</template>
`;
    if (isFunction(this.modifyTemplateResult)) {
      res = this.modifyTemplateResult(res, nodeName, level, children);
    }

    return res;
  }

  protected buildStandardComponentTemplate(comp: Component, level: number) {
    const children = this.getChildren(comp, level);
    const { nodeAlias } = comp;

    let nodeName = '';
    switch (comp.nodeName) {
      case 'slot':
      case 'slot-view':
      case 'catch-view':
      case 'static-view':
      case 'pure-view':
        nodeName = 'view';
        break;
      case 'static-text':
        nodeName = 'text';
        break;
      case 'static-image':
        nodeName = 'image';
        break;
      default:
        nodeName = comp.nodeName;
        break;
    }

    let res = `
<template name="tmpl_${level}_${nodeAlias}">
  <${nodeName} ${this.buildAttribute(comp.attributes, comp.nodeName)} id="{{i.uid||i.sid}}" data-sid="{{i.sid}}">${children}</${nodeName}>
</template>
`;

    if (isFunction(this.modifyTemplateResult)) {
      res = this.modifyTemplateResult(res, comp.nodeName, level, children);
    }

    return res;
  }

  protected buildPlainTextTemplate(level: number): string {
    return `
<template name="tmpl_${level}_${this.componentsAlias['#text']._num}">
  <block>{{i.${Shortcuts.Text}}}</block>
</template>
`;
  }

  protected buildThirdPartyTemplate(level: number, componentConfig: ComponentConfig) {
    const { adapter, isSupportRecursive, supportXS, nestElements } = this;
    const nextLevel = isSupportRecursive ? 0 : level + 1;
    let template = '';

    const data = !isSupportRecursive && supportXS
      ? `${this.dataKeymap('i:item,l:l')}`
      : this.dataKeymap('i:item');

    componentConfig.thirdPartyComponents.forEach((attrs, compName) => {
      if (compName === 'custom-wrapper') {
        template += `
<template name="tmpl_${level}_${compName}">
  <${compName} i="{{i}}" l="{{l}}" id="{{i.uid||i.sid}}" data-sid="{{i.sid}}">
  </${compName}>
</template>
  `;
      } else {
        if (
          !isSupportRecursive &&
          supportXS &&
          nestElements.has(compName) &&
          level + 1 > nestElements.get(compName)!
        ) {
          return;
        }

        let child = supportXS
          ? `<template is="{{xs.e(${isSupportRecursive ? 0 : 'cid+1'})}}" data="{{${data}}}" />`
          : `<template is="tmpl_${nextLevel}_${Shortcuts.Container}" data="{{${data}}}" />`;

        if (isFunction(this.modifyThirdPartyLoopBody)) {
          child = this.modifyThirdPartyLoopBody(child, compName);
        }

        template += `
<template name="tmpl_${level}_${compName}">
  <${compName} ${this.buildThirdPartyAttr(attrs, this.thirdPartyPatcher[compName] || {})} id="{{i.uid||i.sid}}" data-sid="{{i.sid}}">
    <block ${adapter.for}="{{i.${Shortcuts.Childnodes}}}" ${adapter.key}="sid">
      ${child}
    </block>
  </${compName}>
</template>
  `;
      }
    });

    return template;
  }

  protected buildContainerTemplate(level: number, restart = false) {
    let tmpl = '';
    if (restart) {
      tmpl = `<block ${this.adapter.if}="{{i.nn === '#text'}}">
    <template is="tmpl_0_#text" data="{{i:i}}" />
  </block>
  <block ${this.adapter.else}>
    ${!this.isSupportRecursive && this.supportXS ? '<comp i="{{i}}" l="{{l}}" />' : '<comp i="{{i}}" />'}
  </block>`;
    } else {
      const xs = this.isSupportRecursive
        ? `xs.a(${level}, i.${Shortcuts.NodeName})`
        : `xs.a(${level}, i.${Shortcuts.NodeName}, l)`;

      const data = this.isSupportRecursive
        ? `${this.dataKeymap('i:i')}`
        : `${this.dataKeymap(`i:i,cid:${level},l:xs.f(l,i.${Shortcuts.NodeName})`)}`;

      tmpl = this.supportXS
        ? `<template is="{{${xs}}}" data="{{${data}}}" />`
        : `<template is="{{'tmpl_${level}_' + i.${Shortcuts.NodeName}}}" data="{{${this.dataKeymap('i:i')}}}" />`;
    }
    return `
<template name="tmpl_${level}_${Shortcuts.Container}">
  ${tmpl}
</template>
`;
  }

  protected dataKeymap(keymap: string) {
    return keymap;
  }

  protected getEvents(): any {
    return events;
  }
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  protected getAttrValue(value: string, _key: string, _nodeName: string) {
    return `{${value}}`;
  }

  protected buildXsTemplate() {
    return '';
  }

  public buildPageTemplate = (baseTempPath: string) => {
    const template = `<import src="${baseTempPath}"/>
<template is="ice_tmpl" data="{{${this.dataKeymap('root:root')}}}" />`;

    return template;
  };

  public buildBaseComponentTemplate = (ext: string) => {
    const data = !this.isSupportRecursive && this.supportXS
      ? this.dataKeymap('i:i,l:l')
      : this.dataKeymap('i:i');

    return `<import src="./base${ext}" />
<template is="tmpl_0_${Shortcuts.Container}" data="{{${data}}}" />`;
  };

  public buildCustomComponentTemplate = (ext: string) => {
    const { adapter } = this;
    const data = !this.isSupportRecursive && this.supportXS
      ? `${this.dataKeymap('i:item,l:\'\'')}`
      : this.dataKeymap('i:item');
    return `<import src="./base${ext}" />
  <block ${adapter.for}="{{i.${Shortcuts.Childnodes}}}" ${adapter.key}="sid">
    <template is="tmpl_0_container" data="{{${data}}}" />
  </block>`;
  };

  public buildXScript = () => {
    return `${this.exportExpr} {
  a: ${this.buildXSTmplName()},
  b: function (a, b) {
    return a === undefined ? b : a
  },
  c: ${this.buildXSTepFocus(Shortcuts.NodeName)},
  d: function (i, v) {
    return i === undefined ? v : i
  },
  e: function (n) {
    return 'tmpl_' + n + '_${Shortcuts.Container}'
  },
  ${this.buildXSTmpExtra()}
}`;
  };

  public mergeComponents(ctx, patch: Record<string, Record<string, string>>) {
    ctx.helper.recursiveMerge(this.internalComponents, patch);
  }

  public mergeThirdPartyComponents(patch: Record<string, Record<string, string>>) {
    this.thirdPartyPatcher = patch;
  }

  protected buildXSTmplName() {
    return `function (l, n) {
    return 'tmpl_' + l + '_' + n
  }`;
  }

  protected buildXSTepFocus(nn: string) {
    return `function(i, prefix) {
    var s = i.focus !== undefined ? 'focus' : 'blur'
    return prefix + i.${nn} + '_' + s
  }`;
  }

  protected buildXSTmpExtra() {
    return '';
  }
}

export class RecursiveTemplate extends BaseTemplate {
  public isSupportRecursive = true;

  public buildTemplate = (componentConfig: ComponentConfig) => {
    let template = this.buildBaseTemplate();
    if (!this.miniComponents) {
      this.componentsAlias = getComponentsAlias(this.internalComponents);
      this.miniComponents = this.createMiniComponents(this.internalComponents);
    }
    const ZERO_FLOOR = 0;
    const components = Object.keys(this.miniComponents)
      .filter(c => (
        componentConfig.includes.size &&
        !componentConfig.includeAll ? componentConfig.includes.has(c) : true
      ));

    template = components.reduce((current, nodeName) => {
      const attributes: Attributes = this.miniComponents[nodeName];
      const nodeAlias = this.componentsAlias[nodeName]._num;
      return current + this.buildComponentTemplate({ nodeName, nodeAlias, attributes }, ZERO_FLOOR);
    }, template);

    template += this.buildPlainTextTemplate(ZERO_FLOOR);
    template += this.buildThirdPartyTemplate(ZERO_FLOOR, componentConfig);
    template += this.buildContainerTemplate(ZERO_FLOOR);

    return template;
  };
}

export class UnRecursiveTemplate extends BaseTemplate {
  isSupportRecursive = false;
  private _baseLevel = 16;
  private componentConfig: ComponentConfig;

  set baseLevel(lv) {
    this._baseLevel = lv;
  }

  get baseLevel() {
    return this._baseLevel;
  }

  public buildTemplate = (componentConfig: ComponentConfig) => {
    this.componentConfig = componentConfig;
    if (!this.miniComponents) {
      this.componentsAlias = getComponentsAlias(this.internalComponents);
      this.miniComponents = this.createMiniComponents(this.internalComponents);
    }
    const components = Object.keys(this.miniComponents)
      .filter(c => (
        componentConfig.includes.size &&
        !componentConfig.includeAll ? componentConfig.includes.has(c) : true
      ));

    let template = this.buildBaseTemplate();
    for (let i = 0; i < this.baseLevel; i++) {
      template += this.supportXS
        ? this.buildOptimizeFloor(i, components, this.baseLevel === i + 1)
        : this.buildFloor(i, components, this.baseLevel === i + 1);
    }

    return template;
  };

  protected buildFloor(level: number, components: string[], restart = false) {
    if (restart) return this.buildContainerTemplate(level, restart);

    let template = components.reduce((current, nodeName) => {
      const attributes: Attributes = this.miniComponents[nodeName];
      const nodeAlias = this.componentsAlias[nodeName]._num;
      return current + this.buildComponentTemplate({ nodeName, nodeAlias, attributes }, level);
    }, '');

    template += this.buildPlainTextTemplate(level);
    template += this.buildThirdPartyTemplate(level, this.componentConfig);
    template += this.buildContainerTemplate(level, restart);

    return template;
  }

  protected buildOptimizeFloor(level: number, components: string[], restart = false) {
    if (restart) return this.buildContainerTemplate(level, restart);

    let template = components.reduce((current, nodeName) => {
      if (level !== 0) {
        if (!this.nestElements.has(nodeName)) {
          // 不可嵌套自身的组件只需输出一层模板
          return current;
        } else {
          // 部分可嵌套自身的组件实际上不会嵌套过深，这里按阈值限制层数
          const max = this.nestElements.get(nodeName)!;
          if (max > 0 && level >= max) {
            return current;
          }
        }
      }
      const attributes: Attributes = this.miniComponents[nodeName];
      const nodeAlias = this.componentsAlias[nodeName]._num;
      return current + this.buildComponentTemplate({ nodeName, nodeAlias, attributes }, level);
    }, '');

    if (level === 0) template += this.buildPlainTextTemplate(level);
    template += this.buildThirdPartyTemplate(level, this.componentConfig);
    template += this.buildContainerTemplate(level);

    return template;
  }

  protected buildXSTmplName() {
    const isLoopComps = [
      ...Array.from(this.nestElements.keys()),
      ...Array.from(this.componentConfig.thirdPartyComponents.keys()),
    ];
    const isLoopCompsSet = new Set(isLoopComps);
    const hasMaxComps: string[] = [];
    this.nestElements.forEach((max, comp) => {
      if (max > 1) {
        hasMaxComps.push(comp);
      } else if (max === 1 && isLoopCompsSet.has(comp)) {
        isLoopCompsSet.delete(comp);
      }
    });

    const { componentsAlias } = this;
    const listA = Array.from(isLoopCompsSet).map(item => componentsAlias[item]?._num || item);
    const listB = hasMaxComps.map(item => componentsAlias[item]?._num || item);
    const containerLevel = this.baseLevel - 1;

    return `function (l, n, s) {
    var a = ${JSON.stringify(listA)}
    var b = ${JSON.stringify(listB)}
    if (a.indexOf(n) === -1) {
      l = 0
    }
    if (b.indexOf(n) > -1) {
      var u = s.split(',')
      var depth = 0
      for (var i = 0; i < u.length; i++) {
        if (u[i] === n) depth++
      }
      l = depth
    }
    if (l >= ${containerLevel}) {
      return 'tmpl_${containerLevel}_${Shortcuts.Container}'
    }
    return 'tmpl_' + l + '_' + n
  }`;
  }

  protected buildXSTmpExtra() {
    const hasMaxComps: string[] = [];
    this.nestElements.forEach((max, comp) => {
      if (max > 1) hasMaxComps.push(comp);
    });

    const { componentsAlias } = this;
    const listA = hasMaxComps.map(item => componentsAlias[item]?._num || item);

    return `f: function (l, n) {
    var b = ${JSON.stringify(listA)}
    if (b.indexOf(n) > -1) {
      if (l) l += ','
      l += n
    }
    return l
  }`;
  }
}

export {
  capitalize,
  internalComponents,
  Shortcuts,
  toCamelCase,
};
