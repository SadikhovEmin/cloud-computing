module.exports = function (options) {
    //Import the mock data json file
    const mockData = require("./MOCK_DATA.json");
    //To DO: Add the patterns and their corresponding functions
    this.add("role:product, getProductPrice", productPrice);

    //To DO: add the pattern functions and describe the logic inside the function
    function productPrice(args, done) {
        var productId = args.productId;

        var res = mockData.find((p) => p["product_id"] === productId)[
            "product_price"
        ];

        done(null, { result: res });
    }
};
