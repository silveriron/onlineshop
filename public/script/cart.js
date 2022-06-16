

const price = document.querySelectorAll("#price")

const itemTotalPrice = document.querySelectorAll("#itemTotalPrice")

const orderCounts = document.querySelectorAll("#orderCount")

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const calcPrice = () => {
    for (let i = 0; i < orderCounts.length; i++) {
        const totalPrice = price[i].value * orderCounts[i].value
        itemTotalPrice[i].textContent = numberWithCommas(totalPrice) + '원'
    }
}

calcPrice();

for (let i = 0; i < orderCounts.length; i++) {
    orderCounts[i].addEventListener('change', function () {
        const totalPrice = price[i].value * orderCounts[i].value
        itemTotalPrice[i].textContent = numberWithCommas(totalPrice) + '원'
    })
}