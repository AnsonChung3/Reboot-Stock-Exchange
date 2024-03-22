export function mutateHoldings (state, payload) {
    switch (payload.case) {
        case 'CREATE':
            state.playerAccount.holdings.push({
                symbol: payload.symbol,
                quantity: payload.qty
            });
            break;
        case 'ADD':
            state.playerAccount.holdings[payload.index].quantity += payload.qty;
            break;
    }
}

export function mutateFunding (state, payload) {
    state.playerAccount.funding += payload;
    console.log(state.playerAccount.funding);
}

export function initGameMarket (state, payload) {
    for (let i = 0; i < payload.data.length; i++) {
        state.marketData.push(payload.data[i]);
    }
}
