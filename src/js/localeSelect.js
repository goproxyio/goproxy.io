import locales from '../i18n/locales.json'

const { origin } = window.location

const localeSiteMap = {}

if (Array.isArray(locales)) {
  locales.forEach(({ name, label }) => {
    localeSiteMap[name] = name === 'en' ? origin : `${origin}/${name}`
  })
}

const select = document.querySelector('.lang-switch')
select.addEventListener('change', function (e) {
  const siteUrl = localeSiteMap[select.value]
  window.location.href = siteUrl
})
