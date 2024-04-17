import { axios } from 'boot/axios.js';
import { APIKEY } from 'components/APIKEY.js';
import * as helpers from 'components/helpers.js';

export function trade ({ state, commit }, payload) {
    commit('mutateFunding', payload.tradeAmt);

    const index = state.playerAccount.holdings.findIndex(stock => stock.symbol === payload.symbol);
    payload.index = index;

    if (payload.quantity > 0 && index < 0) {
        payload.case = 'CREATE';
        delete payload.tradeAmt;
        commit('mutateHoldings', payload);
    } else if (Math.abs(payload.quantity) === state.playerAccount.holdings[index].quantity) {
        payload.case = 'REMOVE';
        commit('mutateHoldings', payload);
    } else {
        payload.case = 'TRADE';
        commit('mutateHoldings', payload);
    }
}

export function resetGame ({ commit }) {
    commit('setStartCycle');
    commit('resetGame');
}

export async function initGameData ({ commit, state }) {
    commit('setStartCycle');
    // response 1 is the unhandled raw response
    const response1 = await axios.get('http://api.marketstack.com/v1/tickers',
        {
            params: {
                access_key: APIKEY
            }
        });

    const gameData = [];
    // the upper limit for i need to change to a bigger data bank
    for (let i = 0; i < state.totalStockCount; i++) {
        gameData.push(helpers.trimObj(response1.data.data[i]));
    };

    const promises = [];
    for (let i = 0; i < gameData.length; i++) {
        promises.push(axios.get('http://api.marketstack.com/v1/eod',
            {
                params: {
                    access_key: APIKEY,
                    symbols: gameData[i].symbol
                }
            }
        )
            .then(response => {
                gameData[i].prices = helpers.mapPrices(response.data.data);
            })
        );
    }

    Promise.all(promises).then(() => {
        localStorage.setItem('game_data', JSON.stringify(gameData));
        // maybe need a new mutation
        // save the gameData to the store
        // it would be useful when resetting the game
        commit('initGameMarket', { data: gameData });
    });
}
