export function getTotalHoldingValue (state) {
    let totalValue = 0;
    const length = state.playerAccount.holdings.length;
    const cycle = state.gameCycle + state.startCycle;

    if (length === 0) {
        return totalValue;
    }
    for (let i = 0; i < length; i++) {
        const stock = state.marketData.find((stock) => stock.symbol === state.playerAccount.holdings[i].symbol);
        const price = stock.prices[cycle];
        totalValue += (state.playerAccount.holdings[i].quantity * price);
    }
    // returns a number that's multiplied by 100 to force integer
    return totalValue;
}

export function getCurrentCycle (state) {
    return state.startCycle + state.gameCycle;
}
