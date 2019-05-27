const copyBtns = document.querySelectorAll('.copy-btn')

for (const btn of copyBtns) {
  btn.addEventListener('click', () => {
    const btnData = btn.dataset
    let text = ''

    if (btnData.text) {
      text = btnData.text
    } else {
      const target = document.querySelector(btnData.target)
      text = target.textContent
    }

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
      var originalText = btn.textContent
      btn.textContent = btnData.copiedText
      setTimeout(() => {
        btn.textContent = originalText
      }, 2000)
    }
  })
}
