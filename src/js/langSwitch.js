const langSiteMap = {
  'en': 'https://goproxy.io',
  'zh': 'https://goproxy.io/zh'
}

const select = document.querySelector('.lang-switch')
select.addEventListener('change', function (e) {
  const siteUrl = langSiteMap[select.value]
  const expires = new Date(Date.now() + 365 * 24 * 3600 * 1000)
  document.cookie = 'lang=' + select.value + ';path=/;expires=' + expires.toGMTString()
  window.location.href = siteUrl
})
