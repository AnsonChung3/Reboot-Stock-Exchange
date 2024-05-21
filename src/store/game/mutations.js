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
    console.log('mutation key validity');
    state.validKey = payload;
}

export function dataValidity (state) {
    state.validData = !state.validData;
}

export function initGameMarket (state, payload) {
    console.log('init game market');
    const array = getArrayOfRandom(4, state.totalStockCount);
    console.log('playing with the following ones');
    console.log(array);

    for (let i = 0; i < array.length; i++) {
        const index = array[i];
        state.marketData.push(payload.data[index]);
    }
}

export function setStartCycle (state) {
    // magic number 100 because default data coming back from API is 100 trade days
    const MAX = 100 - state.lastPlayableCycle;
    const result = getRandom(MAX);
    console.log(`set start cycle to ${result}`);
    state.startCycle = result;
}

export function resetGame (state) {
    console.log('mutation reset game');
    state.gameCycle = 0;
    state.playerAccount = {
        funding: 100000 * 100,
        holdings: []
    };
    state.marketData = [];
}
