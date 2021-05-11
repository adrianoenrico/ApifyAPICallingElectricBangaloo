const rewire = require("rewire")
const codesharestuff = rewire("./codesharestuff")
const getBestOffers = codesharestuff.__get__("getBestOffers")
