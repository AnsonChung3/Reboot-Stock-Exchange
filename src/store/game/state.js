export default function () {
    return {
        // game design is request 10 stock prices from API
        // and play with random 4 for each game
        totalStockCount: 10,
        // data from API should be stored in localStorage
        // marketData should only contain prices for each game
        // so 4 stocks, at the time of developing this game
        marketData: [],
        playerAccount: {
            // funding gets times 100 to be align with price data, force integer
            funding: 100000 * 100,
            holdings: []
        },
        gameCycle: 0,
        startCycle: 0,
        lastPlayableCycle: 3
    };
}
