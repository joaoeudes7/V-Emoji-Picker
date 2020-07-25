import langDefault from './lang/enUK';

let lang = langDefault;

export const i18n = (translations: Object) => {
  lang = { ...langDefault, ...translations };
};

// Sample parse translation
export const t = (term: string) => {
  const properties = term.split(".");
  let text = lang;

  properties.forEach(p => {
    text = text[p];
  });

  return text;
};

export default { i18n, t };
