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
let offers = [
    {
        "productId": "dgdgfdfg",
        "offerId": "545g43g34g",
        "price": "$4.25"
    },
    {
        "productId": "dgdgfdfg",
        "offerId": "545g12343g34g",
        "price": "$4.12"
    },
    {
        "productId": "dgdgfdfg123",
        "offerId": "545g1234543g34g",
        "price": "$44.00"
    },
    {
        "productId": "dgdgfdfg123",
        "offerId": "51245g1212334543g34g",
        "price": "$40.00"
    },
]
const getBestOffers = async (offers) => {
    try{
            // let offers = await axios.get('https://api.apify.com/v2/datasets/Gv6MxHyGzvPbchfLI/items?clean=true&format=json')
    let products = offers.map(e => e.productId)
    products = Array(... new Set(products))
    console.log("prods", products);
    let sortedOffers = []
    for (let prod of products) {
        console.log("Current prod: ",prod)
        let sameProd = [];
        for (let offer of offers) {
            if (offer.productId == prod) {
                sameProd.push(offer)
            }
        }
        sameProd.sort((a, b) => Number(a.price.replace('$','')) - Number(b.price.replace('$','')))
        sortedOffers.push(sameProd[0])
    }
    // axios.post("https://api.apify.com/v2/datasets/Gv6MxHyGzvPbchfLI/items?clean=true&format=json", sortedOffers)
    return sortedOffers
    }catch(ex){
        console.log(ex);
        return;
    }
}

console.log(getBestOffers(offers));