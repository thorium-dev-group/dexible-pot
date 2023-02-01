
const feeTokens = {
    [1]: [
        {
            //USDC
            token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            feed: "0x8fffffd4afb6115b954bd326cbe7b4ba576818f6"
        },
        {
            //WETH
            token: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            feed: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"
        }
    ],
    [42161]: [
        {
            //USDC
            token: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
            feed: "0x50834f3163758fcc1df9973b6e91f0f0f0434ad3"
        },
        {
            //WETH
            token: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
            feed: "0x639fe6ab55c921f74e7fac1ee960c0b6293ba612"
        }
    ]
}

const nativeWrappers = {
    [1]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    [42161]: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
}

module.exports = {
    feeTokens,
    nativeWrappers
}