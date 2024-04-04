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

export function nextDay (state) {
    state.gameCycle += 1;
}

export function initGameMarket (state, payload) {
    // magic number 100 because default data coming back from API is 100 trade days
    const MAX = 100 - state.lastPlayableCycle + 1;
    state.startCycle = Math.floor(Math.random() * (MAX + 1));
    for (let i = 0; i < payload.data.length; i++) {
        state.marketData.push(payload.data[i]);
    }
}
