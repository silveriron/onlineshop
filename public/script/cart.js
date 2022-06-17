const price = document.querySelectorAll("#price")

const itemTotalPrice = document.querySelectorAll("#itemTotalPrice")

const orderCounts = document.querySelectorAll("#orderCount")

const cartTotalPrice = document.querySelector("#cartTotalPrice")

const orderPriceinput = document.querySelector("#orderPrice")


const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const calcPrice = () => {
    let orderPrice = 0;
    for (let i = 0; i < orderCounts.length; i++) {
        const totalPrice = price[i].value * orderCounts[i].value;
        orderPrice +=totalPrice;
        itemTotalPrice[i].textContent = numberWithCommas(totalPrice) + '원';
    }
    cartTotalPrice.textContent = numberWithCommas(orderPrice) + '원';
    orderPriceinput.value = orderPrice;
}

calcPrice();

for (let i = 0; i < orderCounts.length; i++) {
    orderCounts[i].addEventListener('change', function () {
        calcPrice();
    })
}