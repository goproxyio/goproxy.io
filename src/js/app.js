import '../css/app.css'

// Language switch
(function () {
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
})();

// Copy buttons
(function () {
  var copyBtns = document.querySelectorAll('.copy-btn')
  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var btnData = btn.dataset
      var text = ''

      if (btnData.text) {
        text = btnData.text
      } else {
        var target = document.querySelector(btnData.target)
        text = target.textContent
      }

      var fakeElem = document.createElement('textarea')
      // Avoid iPhone auto zooming
      fakeElem.style.fontSize = '12pt'
      fakeElem.style.position = 'fixed'
      fakeElem.style.top = '-9999px'
      fakeElem.setAttribute('readonly', true)
      fakeElem.value = text
      document.body.appendChild(fakeElem)
      fakeElem.select()
      fakeElem.setSelectionRange(0, fakeElem.value.length)

      var success = false
      try {
        success = document.execCommand('copy')
      } catch (err) {
      }

      fakeElem.parentNode.removeChild(fakeElem)

      if (success) {
        var originalText = btn.textContent
        btn.textContent = btnData.copiedText
        setTimeout(function () {
          btn.textContent = originalText
        }, 2000)
      }
    })
  })
})();

// Github button
(function () {
  function get (url, callback) {
    const xhr = new window.XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var status = xhr.status
        if (status >= 200 && status < 300) {
          callback && callback(null, xhr.responseText)
        } else {
          callback && callback(xhr)
        }
      }
    }
    xhr.open('get', url, true)
    xhr.send()
  }

  get('https://api.github.com/repos/goproxyio/goproxy', function (err, res) {
    if (err) {
      console.error(err)
    } else {
      const data = JSON.parse(res)
      const stars = data.stargazers_count
      const countElem = document.querySelector('.gh-count')
      countElem.textContent = stars
      countElem.style.display = 'inline'
    }
  })
})()
