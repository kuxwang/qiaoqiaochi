(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth
      var docbody = doc.body
      if (!clientWidth) return
      var fsize = 100 * (clientWidth / 375)
      docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
      docbody.style.height = (win.screen.height / (100 * (clientWidth / 375))) + 'rem'

      var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','')*100)/100
      // console.log(realfz)
      if(fsize !== realfz){
        document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + realfz * (realfz / realfz) +"px";
      }
    }
  if (!doc.addEventListener) return

  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

})(document, window)
