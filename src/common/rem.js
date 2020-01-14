// rem 调整
(function rem() {
  let timer = null;

  // 根据屏幕大小及dpi调整缩放和大小
  function onResize() {
    const width = Math.min(document.documentElement.clientWidth, 750);
    let e = width / 7.5;
    document.documentElement.style.fontSize = `${e}px`;
    const realitySize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    if (e !== realitySize) {
      e = e * e / realitySize;
      document.documentElement.style.fontSize = `${e}px`;
    }
  }
  window.addEventListener('resize', function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(onResize, 100);
  });
  onResize();
})();