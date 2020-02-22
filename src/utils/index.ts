import locales from '../../content/locales.json'
import enSiteConfig from '../../content/siteConfig.json'
import zhSiteConfig from '../../content/zh/siteConfig.json'

export interface NavItem {
  url: string
  title: string
}

export interface Feature {
  icon?: string
  title?: string
  description?: string
}

export interface NotFound {
  title: string
  description: string
}

export interface DocLocale {
  postAt: string
  updatedAt: string
  prev: string
  next: string
}

export interface SiteConfig {
  name: string
  title: string
  dateFormat: string
  nav: NavItem[]
  slogan: string
  features: Feature[]
  userMapTitle: string
  copyright: string
  notFound: NotFound
  doc: DocLocale
}

export interface AllSiteConfig {
  [key: string]: SiteConfig
}

const allSiteConfig = {
  en: enSiteConfig as SiteConfig,
  zh: zhSiteConfig as SiteConfig
} as AllSiteConfig

export interface LocaleItem {
  value: string
  label: string
}

const defaultLocale = 'en'

const getLocale = (pathname: string): string => {
  const re = /\/(.+?)\//
  const matched = pathname.match(re)
  let currentLocale = defaultLocale
  if (matched) {
    locales.forEach((v: LocaleItem) => {
      if (v.value === matched[1]) {
        currentLocale = v.value
      }
    })
  }
  return currentLocale
}

const getSiteConfig = (pathname: string): SiteConfig => {
  const locale = getLocale(pathname)
  return allSiteConfig[locale] || allSiteConfig[defaultLocale]
}

export {
  defaultLocale,
  getLocale,
  getSiteConfig
}
