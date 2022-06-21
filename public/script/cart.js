const price = document.querySelectorAll("#price");

const customerName = document.querySelector("#name");

const itemTotalPrice = document.querySelectorAll("#itemTotalPrice");

const orderCounts = document.querySelectorAll("#orderCount");

const cartTotalPrice = document.querySelector("#cartTotalPrice");

const orderPriceinput = document.querySelector("#orderPrice");

const order = document.querySelectorAll(".card-title");

// 토스 //

var clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

var tossPayments = TossPayments(clientKey);

var button = document.getElementById("payment-button"); // 결제하기 버튼

button.addEventListener("click", function () {
  tossPayments.requestPayment("카드", {
    amount: +orderPriceinput.value,
    orderId: "1K8oCTRJc-f1ixxdbGmj0",
    orderName: order[0].textContent + `외 ${order.length - 1} 건`,
    customerName: customerName.textContent,
    successUrl: "http://localhost:3000/customer/payments/success",
    failUrl: "http://localhost:3000/customer/payments/fail",
  });
});

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calcPrice = () => {
  let orderPrice = 0;
  for (let i = 0; i < orderCounts.length; i++) {
    const totalPrice = price[i].value * orderCounts[i].value;
    orderPrice += totalPrice;
    itemTotalPrice[i].textContent = numberWithCommas(totalPrice) + "원";
  }
  cartTotalPrice.textContent = numberWithCommas(orderPrice) + "원";
  orderPriceinput.value = orderPrice;
};

calcPrice();

for (let i = 0; i < orderCounts.length; i++) {
  orderCounts[i].addEventListener("change", function () {
    calcPrice();
  });
}
