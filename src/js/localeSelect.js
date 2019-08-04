import locales from '../i18n/locales.json'

const { origin, pathname } = window.location

const localeSiteMap = {}

if (Array.isArray(locales)) {
  locales.forEach(({ name, label }) => {
    localeSiteMap[name] = name === 'en' ? `${origin}${pathname.slice(3)}` : `${origin}/${name}${pathname}`
  })
}

const select = document.querySelector('.lang-switch')
select.addEventListener('change', function (e) {
  const siteUrl = localeSiteMap[select.value]
  window.location.href = siteUrl
})
