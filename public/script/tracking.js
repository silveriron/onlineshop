const trackingButton = document.querySelector("#tracking");

trackingButton.addEventListener("click", () => {
  const id = trackingButton.dataset.id;
  //창 크기 지정
  var width = 600;
  var height = 800;

  //pc화면기준 가운데 정렬
  var left = window.screen.width / 2 - width / 2;
  var top = window.screen.height / 4;

  //윈도우 속성 지정
  var windowStatus =
    "width=" +
    width +
    ", height=" +
    height +
    ", left=" +
    left +
    ", top=" +
    top +
    ", scrollbars=yes, status=yes, resizable=yes, titlebar=yes";
  //seeminglyjs.tistory.com/359 [Seemingly Online:티스토리]
  출처: https: window.open(`/customer/tracking/${id}`, "pop", windowStatus);
});
