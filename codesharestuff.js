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

// import axios from 'axios'
const offers = []
for (let i = 0; i < 50000; i++) {
    offers.push({
        productId: Math.round(Math.random() * 10000),
        offerId: i,
        price: "$" + Math.round(Math.random() * 100)
    })
}
(async (offers) => {
    try {
        console.time("sortedOffers")
        // let offers = await axios.get('https://api.apify.com/v2/datasets/Gv6MxHyGzvPbchfLI/items?clean=true&format=json')

        let products = offers.map(e => e.productId)
        products = Array(... new Set(products))
        offers.sort((a, b) => Number(a.price.replace('$', '')) - Number(b.price.replace('$', '')))
        const sorted = products.map(prod => offers.find(offer => offer.productId === prod))
        // console.log(sorted);
        // axios.post("https://api.apify.com/v2/datasets/Gv6MxHyGzvPbchfLI/items?clean=true&format=json", sortedOffers)
        console.timeEnd("sortedOffers")

        console.log("sorted: ",sorted.length, sorted);
        console.log("prods: ",products.length);
    } catch (ex) {
        console.log(ex);
        return;
    }
})(offers)