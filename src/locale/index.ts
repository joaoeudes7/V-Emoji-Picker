import Vue from 'vue';
import defaultLang from './lang/pt-Br';

// https://github.com/ElemeFE/element/blob/dev/src/locale/index.js

let lang = defaultLang

let i18nHandle = () => {
  // const vuei18n = Object.getPrototypeOf(this || Vue).$t;

  // if (typeof vuei18n === 'function' && !!Vue.locale) {
  //   if (!merged) {
  //     merged = true;
  //     Vue.locale(
  //       Vue.config.lang,
  //       deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
  //     );
  //   }
  //   return vuei18n.apply(this, arguments);
  // }
}

const use = (initials: Object) => {
  import(`./lang/${initials}`).then(newLang => {
    lang = newLang
  })
}

const i18n = (fn) => {
  i18nHandle = fn || i18nHandle
}

const t = function (path, options) {
  // let value = i18nHandle.apply(this, arguments);
  // if (value !== null && value !== undefined) return value;

  // const array = path.split('.');
  // let current = lang;

  // for (let i = 0, j = array.length; i < j; i++) {
  //   const property = array[i];
  //   value = current[property];
  //   if (i === j - 1) return format(value, options);
  //   if (!value) return '';
  //   current = value;
  // }
  return '';
};

export default { use, i18n, t }
