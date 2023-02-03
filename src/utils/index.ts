import locales from '../../content/locales.json'
import enSiteConfig from '../../content/siteConfig.json'
import zhSiteConfig from '../../content/zh/siteConfig.json'

export interface NavItem {
  url: string
  title: string
}

export interface SpecialSponsor {
  title: string
  image: string
  href: string
}

export interface Feature {
  icon?: string
  title?: string
  description?: string
}

export interface CryptoSponsor {
  title: string
  address: string
}

export interface NotFound {
  title: string
  description: string
}

export interface DocLocale {
  postAt: string
  updatedAt: string
  edit: string
  prev: string
  next: string
  copy: string
  copied: string
}

export interface SiteConfig {
  name: string
  title: string
  dateFormat: string
  nav: NavItem[]
  slogan: string
  specialSponsorTitle: string
  specialSponsors: SpecialSponsor[]
  features: Feature[]
  userMapTitle: string
  cryptoSponsorTitle: string
  cryptoSponsors: CryptoSponsor[]
  copyright: string
  notFound: NotFound
  doc: DocLocale
}

export interface AllSiteConfig {
  [key: string]: SiteConfig
}

const allSiteConfig = {
  en: enSiteConfig as SiteConfig,
  zh: zhSiteConfig as SiteConfig,
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

const isSameSite = (url: string): boolean => {
  const urlObj = new URL(url)
  const currentObj = new URL(window.location.href)
  return (
    urlObj.protocol === currentObj.protocol && urlObj.host === currentObj.host
  )
}

export { defaultLocale, getLocale, getSiteConfig, isSameSite }
