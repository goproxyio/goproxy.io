import locales from '../../content/locales.json'
import enSiteConfig from '../../content/siteConfig.json'
import zhSiteConfig from '../../content/zh/siteConfig.json'

const siteConfig = {
  en: enSiteConfig,
  zh: zhSiteConfig
}

const defaultLocale = 'en'

const getLocale = (pathname) => {
  const re = /\/(.+?)\//
  const matched = pathname.match(re)
  let currentLocale = defaultLocale
  if (matched) {
    locales.forEach((v) => {
      if (v.value === matched[1]) {
        currentLocale = v.value
      }
    })
  }
  return currentLocale
}

const getSiteConfig = (pathname) => {
  const locale = getLocale(pathname)
  return siteConfig[locale] || siteConfig[defaultLocale]
}

export {
  defaultLocale,
  getLocale,
  getSiteConfig
}
