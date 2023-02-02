import { RecursiveTemplate } from '@ice/shared';

export default class Template extends RecursiveTemplate {
  supportXS = false;
  adapter = {
    if: 'tt:if',
    else: 'tt:else',
    elseif: 'tt:elif',
    for: 'tt:for',
    forItem: 'tt:for-item',
    forIndex: 'tt:for-index',
    key: 'tt:key',
    type: 'tt',
  };

  replacePropName(name: string, value: string) {
    if (value === 'eh') {
      const nameLowerCase = name.toLowerCase();
      if (nameLowerCase === 'bindlongtap') return 'bindlongpress';
      return nameLowerCase;
    }
    return name;
  }
}
