import { getStartCycle } from './getters.js';

export function mutateHoldings (state, payload) {
    switch (payload.case) {
        case 'CREATE':
            delete payload.case;
            state.playerAccount.holdings.push(payload);
            break;
        case 'REMOVE':
            state.playerAccount.holdings.splice([payload.index], 1);
            break;
        case 'TRADE':
            state.playerAccount.holdings[payload.index].quantity += payload.quantity;
            break;
    }
}

export function mutateFunding (state, payload) {
    state.playerAccount.funding += payload;
}

export function nextDay (state) {
    state.gameCycle += 1;
}

export function initGameMarket (state, payload) {
    state.startCycle = getStartCycle;
    for (let i = 0; i < payload.data.length; i++) {
        state.marketData.push(payload.data[i]);
    }
}

export function resetGame (state) {
    state.startCycle = getStartCycle;
    state.gameCycle = 0;
    state.playerAccount = {
        funding: 100000 * 100,
        holdings: []
    };
}
