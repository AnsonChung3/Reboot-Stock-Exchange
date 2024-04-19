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

export function initGameMarket (state, payload) {
    // this may or maynot need renaming
    // should add a helper function
    // return an array of 4 random numbers
    // state.marketData.push(localStorage.data[array])
    // paylod into this mutation should contain all of the stocks
    // but if I am pulling it from state, then i wouldn't need payload?
    // worth checking if payload can be empty
    const array = getArrayOfRandom(4, state.totalStockCount);
    console.log(array)

    // for (let i = 0; i < payload.data.length; i++) {
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
