// - Make a request to this URL that returns a JSON
//   - https://api.apify.com/v2/datasets/Gv6MxHyGzvPbchfLI/items?clean=true&format=json
// - You get back an array of objects in the following shape (with a random number of objects):

// ```json
// [
//     {
//         "productId": "dgdgfdfg",
//         "offerId": "545g43g34g",
//         "price": "$4.25"
//     }
// ]
// ```

// Each object contains data about a single offer.
// One product can have multiple offers. `offerId` is always unique while `productId` might be same for more offers.

// - Process the data in a way that the new array will only contain the cheapest offer for each product.
// - Send the data back to the same API URL from where you downloaded the data,
//   the new array (with cheapest offers) should be send as the body/payload of the request.

import axios from 'axios'


const requestProducts = async () => {
    // let offers = await axios.get('https://api.apify.com/v2/datasets/Gv6MxHyGzvPbchfLI/items?clean=true&format=json')
    let offers = [
        {
            "productId": "dgdgfdfg",
            "offerId": "545g43g34g",
            "price": "$4.25"
        },
        {
            "productId": "dgdgfdfg",
            "offerId": "545g43g34g",
            "price": "$4.25"
        },
    ]
    let products = offers.map(e => e.productId)
    products = Array(new Set(...products))
    let sortedOffers = []
    for (prod of products) {
        let sameProd = []
        for (offer of offers) {
            if (offer.productId == prod) {
                sameProd.push(offer)
            }
        }
        sameProd.sort((a, b) => Number(a.price) - Number(b.price))
        sortedOffers.push(sameProd[0])
    }
    //   axios.post("https://api.apify.com/v2/datasets/Gv6MxHyGzvPbchfLI/items?clean=true&format=json", sortedOffers)
}