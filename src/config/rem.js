(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth
      var docbody = doc.body
      if (!clientWidth) return
      docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
      // docbody.style.height = (win.screen.height / (100 * (clientWidth / 375))) - 1.28 + 'rem'
      // console.log(win.screen.height)
      setTimeout(function () {
        // document.getElementById('app').style.display = 'block'
      }, 1)
    }
  if (!doc.addEventListener) return

  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

})(document, window)
