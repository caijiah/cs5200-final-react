const ORDER_URL = process.env.REACT_APP_API_URL

const findOrdersForBuyer = (customerId) =>
    fetch(`${ORDER_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify({customerId}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .catch((error) => console.log(error))

const finishCurrentOrder = (customerId) =>
    fetch(`${ORDER_URL}/orders/finishOrder`, {
        method: 'POST',
        body: JSON.stringify({customerId}),
        headers: {
            'content-type' : 'application/json'
        }
    }).then((response) => response.json())

const orderService = {
    finishCurrentOrder,
    findOrdersForBuyer
}

export default orderService