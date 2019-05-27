import locales from '../i18n/locales.json'

const { origin } = window.location

const localeSiteMap = {}

if (Array.isArray(locales)) {
  locales.forEach(locale => {
    localeSiteMap[locale] = locale === 'en' ? origin : `${origin}/${locale}`
  })
}

const select = document.querySelector('.lang-switch')
select.addEventListener('change', function (e) {
  const siteUrl = localeSiteMap[select.value]
  window.location.href = siteUrl
})
