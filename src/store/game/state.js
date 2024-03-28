export default function () {
  return {
    test: 90,
    marketData: [],
    playerAccount: {
        // funding gets times 100 to be align with price data, force integer
        funding: 100000 * 100,
        holdings: []
    },
    gameCycle: 0,
    lastPlayableCycle: 5
  }
}
