export default function () {
    return {
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
