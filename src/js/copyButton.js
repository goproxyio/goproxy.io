if (!window.Element.prototype.matches) {
  window.Element.prototype.matches = window.Element.prototype.msMatchesSelector ||
                              window.Element.prototype.webkitMatchesSelector
}

if (!window.Element.prototype.closest) {
  window.Element.prototype.closest = function (s) {
    var el = this

    do {
      if (el.matches(s)) return el
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)
    return null
  }
}

const copyBtns = document.querySelectorAll('.copy-btn')

for (const btn of copyBtns) {
  btn.addEventListener('click', () => {
    const btnData = btn.dataset

    const container = btn.closest('figure')
    if (!container) return

    const target = container.querySelector('pre code')
    if (!target) return

    const text = target.textContent

    const fakeElem = document.createElement('textarea')
    // Avoid iPhone auto zooming
    fakeElem.style.fontSize = '12pt'
    fakeElem.style.position = 'fixed'
    fakeElem.style.top = '-9999px'
    fakeElem.setAttribute('readonly', true)
    fakeElem.value = text

    document.body.appendChild(fakeElem)
    fakeElem.select()
    fakeElem.setSelectionRange(0, fakeElem.value.length)

    let success = false
    try {
      success = document.execCommand('copy')
    } catch (err) {
      console.log(err)
    }

    fakeElem.parentNode.removeChild(fakeElem)

    if (success) {
      const btnTextEl = btn.querySelector('.btn-text')
      var originalText = btnTextEl.textContent
      btnTextEl.textContent = btnData.copiedText
      setTimeout(() => {
        btnTextEl.textContent = originalText
      }, 2000)
    }
  })
}
