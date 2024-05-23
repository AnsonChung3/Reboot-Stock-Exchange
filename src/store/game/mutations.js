import { getRandom, getArrayOfRandom } from 'components/helpers.js';

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

export function keyValidity (state, payload) {
    state.validKey = payload;
}

export function dataValidity (state) {
    state.validData = !state.validData;
}

export function initGameMarket (state, payload) {
    const array = getArrayOfRandom(4, state.totalStockCount);

    for (let i = 0; i < array.length; i++) {
        const index = array[i];
        state.marketData.push(payload.data[index]);
    }
}

export function setStartCycle (state) {
    // magic number 100 because default data coming back from API is 100 trade days
    const MAX = 100 - state.lastPlayableCycle;
    const result = getRandom(MAX);
    state.startCycle = result;
}

export function resetGame (state) {
    state.gameCycle = 0;
    state.playerAccount = {
        funding: 100000 * 100,
        holdings: []
    };
    state.marketData = [];
}
