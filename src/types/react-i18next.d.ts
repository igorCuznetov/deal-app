import 'react-i18next';
import common from '../../locales/ru/common.json';
import header from '../../locales/ru/header.json';
import home from '../../locales/ru/home.json';
import footer from '../../locales/ru/footer.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof common;
      header: typeof header;
      home: typeof home;
      footer: typeof footer;
    };
  }
}
