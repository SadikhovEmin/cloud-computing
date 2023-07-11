module.exports = function (options) {
    //Import the mock data json file
    const mockData = require("./MOCK_DATA.json");

    //Add the patterns and their corresponding functions
    this.add("role:product,cmd:getProductURL", productURL);
    this.add("role:product,cmd:getProductName", productName);

    //To DO: add the pattern functions and describe the logic inside the function
    function productURL(args, done) {
        var productId = args.productId;

        var res = mockData.find((p) => p["product_id"] === productId)[
            "productURL"
        ];

        done(null, { result: res });
    }

    function productName(args, callBack) {
        var productId = args.productId;

        var res = mockData.find((p) => p["product_id"] === productId)[
            "product_name"
        ];

        done(null, { result: res });
    }
};
