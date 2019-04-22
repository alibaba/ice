import React, { useContext } from 'react';
import { Radio } from '@alifd/next';
import { LocalContext, localeInfos } from '@components/Locale';
import map from 'lodash.map';

const RadioGroup = Radio.Group;

const SettingGeneral = () => {
  const { setLocale, locale } = useContext(LocalContext);
  const languageList = map(localeInfos, ({ label }, key) => ({
    value: key,
    label,
  }));

  return (
    <div>
      <div>SettingGeneral Page</div>
      <div>
        <RadioGroup
          dataSource={languageList}
          shape="button"
          size="small"
          value={locale}
          onChange={value => setLocale(value)}
        />
      </div>
    </div>
  );
};

export default SettingGeneral;
