let lang = {};

export const i18n = (translations: Object) => {
  lang = { ...lang, ...translations }
}

export const use = (initials: string) => {
  if (initials.trim().length) {
    const it = require(`./lang/${initials}`)['default']
    i18n(it)
  }
}

// Sample parse translation
export const st = (term: string) => {
  const properties = term.split(".")
  let text = lang

  properties.forEach(p => {
    text = text[p]
  })

  return text
}

export default { use, i18n, t: st }
