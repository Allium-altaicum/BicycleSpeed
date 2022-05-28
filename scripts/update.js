(() => {
  let count = 0;
  let stamp = 0;
  let imgElement = document.querySelector("img");
  function c(e) {
    let now = Date.now();
    if (now - stamp > 1000) {
      count = 1;
      stamp = now;
    } else {
      count++;
      stamp = now;
      if (count < 5) {
        return;
      }
      count = 0;
      let controller = navigator.serviceWorker.controller;
      if (controller) {
        controller.postMessage("更新");
        imgElement.style.outline = "10vh ridge #0f0";
        setTimeout(() => {
          imgElement.style.removeProperty("outline");
        }, 1000);
      }
    }
  }
  imgElement.addEventListener("click", c);
})();
