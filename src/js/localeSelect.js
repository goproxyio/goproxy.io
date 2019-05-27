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
  const expires = new Date(Date.now() + 365 * 24 * 3600 * 1000)
  document.cookie = 'lang=' + select.value + ';path=/;expires=' + expires.toGMTString()
  window.location.href = siteUrl
})
