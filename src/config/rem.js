(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth
      var docbody = doc.body
      if (!clientWidth) return
      var fsize = Math.floor(clientWidth / 375 * 100)
      docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
      docbody.style.height = (win.screen.height / (100 * (clientWidth / 375))) + 'rem'
      var realfz = Math.floor(~~(+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px', '') * 100) / 100)
      if (fsize !== realfz) {
        // console.log(121312121)
        document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + realfz * (realfz / realfz) + "px";
        console.log(document.getElementsByTagName("html")[0].style.cssText)
      }
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
