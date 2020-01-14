// rem 调整
(function () {
  var timer = null;

  // 根据屏幕大小及dpi调整缩放和大小
  function onResize() {
    var width = Math.min(document.documentElement.clientWidth, 750);
    var e = width / 7.5;
    document.documentElement.style.fontSize = e + 'px';
    var realitySize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    if (e !== realitySize) {
      e = e * e / realitySize;
      document.documentElement.style.fontSize = e + 'px';
    }
  }
  window.addEventListener('resize', function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(onResize, 100);
  });
  onResize();
})();