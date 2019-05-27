function get (url, callback) {
  const xhr = new window.XMLHttpRequest()
  xhr.onreadystatechange = () => {
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

get('https://api.github.com/repos/goproxyio/goproxy', (err, res) => {
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
