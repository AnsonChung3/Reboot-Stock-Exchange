export function mutateHoldings (state, payload) {
    switch (payload.case) {
        case 'CREATE':
            delete payload.case;
            state.playerAccount.holdings.push(payload);
            break;
        case 'REMOVE':
            state.playerAccount.holdings.splice([payload.index], 1);
            console.log(state.playerAccount.holdings);
            break;
        case 'TRADE':
            state.playerAccount.holdings[payload.index].quantity += payload.quantity;
            break;
    }
}

export function mutateFunding (state, payload) {
    state.playerAccount.funding += payload;
    console.log(state.playerAccount.funding);
}

export function initGameMarket (state, payload) {
    for (let i = 0; i < payload.data.length; i++) {
        const MAX = payload.data[i].prices.length - state.lastPlayableCycle + 1;
        payload.data[i].startCycle = Math.floor(Math.random() * (MAX + 1));
        state.marketData.push(payload.data[i]);
    }
}
